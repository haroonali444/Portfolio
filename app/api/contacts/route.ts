import { Pool } from 'pg'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateContactForm, sanitizeInput, sanitizeEmailOutput, getRateLimitKey } from '@/lib/security'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const resend = new Resend(process.env.RESEND_API_KEY)

// Simple in-memory rate limiting (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(key: string): boolean {
  const now = Date.now()
  const limit = rateLimitMap.get(key)

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 }) // 60 second window
    return true
  }

  if (limit.count >= 5) {
    // Max 5 requests per minute
    return false
  }

  limit.count++
  return true
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitKey = getRateLimitKey(request)
  if (!checkRateLimit(rateLimitKey)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    )
  }

  // CORS and security check
  const origin = request.headers.get('origin')
  if (origin && !origin.includes(process.env.VERCEL_URL || 'localhost')) {
    return NextResponse.json(
      { error: 'Unauthorized origin' },
      { status: 403 }
    )
  }

  const client = await pool.connect()
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate and sanitize input
    const validation = validateContactForm({ name, email, subject, message })
    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.errors },
        { status: 400 }
      )
    }

    // Sanitize all inputs
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)

    // Use parameterized queries to prevent SQL injection
    const result = await client.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id, name, email, subject, message, createdAt, read',
      [sanitizedName, sanitizedEmail, sanitizedSubject, sanitizedMessage]
    )

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        // Sanitize for email to prevent header injection
        const emailSubject = sanitizeEmailOutput(sanitizedSubject)
        const emailName = sanitizeEmailOutput(sanitizedName)
        const emailAddress = sanitizeEmailOutput(sanitizedEmail)

        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'haroonali8838@gmail.com',
          subject: `New Portfolio Contact: ${emailSubject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Contact Form Submission</h2>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> ${emailName}</p>
                <p><strong>Email:</strong> ${emailAddress}</p>
                <p><strong>Subject:</strong> ${emailSubject}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${sanitizedMessage}</p>
              </div>
              <p style="color: #666; font-size: 12px;">
                View all messages at: <a href="http://localhost:3000/admin/messages">Admin Dashboard</a>
              </p>
            </div>
          `,
        })
      } catch (emailError) {
        console.error('Email sending failed:', emailError)
        // Don't fail the request if email fails
      }
    }

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 201 }
    )
  } catch (error) {
    // Don't expose detailed error messages to clients
    console.error('Error saving contact:', error)
    return NextResponse.json(
      { error: 'Failed to process your request. Please try again later.' },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}

export async function GET(request: NextRequest) {
  // Protect GET endpoint - only allow from same origin
  const origin = request.headers.get('origin')
  const referer = request.headers.get('referer')

  // Allow only admin dashboard access
  if (!referer || !referer.includes('/admin/messages')) {
    return NextResponse.json(
      { error: 'Unauthorized access' },
      { status: 403 }
    )
  }

  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM contacts ORDER BY createdAt DESC LIMIT 1000')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}
