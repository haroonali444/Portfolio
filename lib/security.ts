import validator from 'validator'

// Validate email format
export function validateEmail(email: string): boolean {
  return validator.isEmail(email)
}

// Validate and sanitize string input
export function sanitizeInput(input: string): string {
  // Trim whitespace
  let sanitized = input.trim()

  // Escape HTML special characters to prevent XSS
  sanitized = validator.escape(sanitized)

  // Remove any potential SQL injection patterns (as extra layer)
  sanitized = sanitized.replace(/['";\\]/g, '')

  return sanitized
}

// Validate input length
export function validateLength(input: string, min: number, max: number): boolean {
  const length = input.trim().length
  return length >= min && length <= max
}

// Comprehensive contact form validation
export function validateContactForm(data: {
  name?: string
  email?: string
  subject?: string
  message?: string
}): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Name validation
  if (!data.name || !validateLength(data.name, 2, 100)) {
    errors.push('Name must be between 2 and 100 characters')
  }

  // Email validation
  if (!data.email || !validateEmail(data.email)) {
    errors.push('Invalid email address')
  }

  // Subject validation
  if (!data.subject || !validateLength(data.subject, 3, 200)) {
    errors.push('Subject must be between 3 and 200 characters')
  }

  // Message validation
  if (!data.message || !validateLength(data.message, 10, 5000)) {
    errors.push('Message must be between 10 and 5000 characters')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Rate limiting key generator
export function getRateLimitKey(request: Request): string {
  // Use IP address or forwarded IP for rate limiting
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown'
  return ip
}

// Sanitize output for email (prevent email injection)
export function sanitizeEmailOutput(text: string): string {
  // Remove newlines that could be used for header injection
  return text.replace(/[\r\n]/g, ' ').trim()
}
