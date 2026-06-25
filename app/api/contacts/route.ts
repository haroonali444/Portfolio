import { Pool } from 'pg'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const client = await pool.connect()
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await client.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES ($1, $2, $3, $4) RETURNING id, name, email, subject, message, createdAt, read',
      [name, email, subject, message]
    )

    // Send email notification
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: 'haroonali8838@gmail.com',
          subject: `New Portfolio Contact: ${subject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #333;">New Contact Form Submission</h2>
              <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p><strong>From:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px;">${message}</p>
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
      { success: true, data: result.rows[0] },
      { status: 201 }
    )
  } catch (error) {
    console.error('[v0] Error saving contact:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('[v0] Error details:', errorMessage)
    return NextResponse.json(
      { error: 'Failed to save contact', details: errorMessage },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}

export async function GET() {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM contacts ORDER BY createdAt DESC')
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('[v0] Error fetching contacts:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      { error: 'Failed to fetch contacts', details: errorMessage },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}
