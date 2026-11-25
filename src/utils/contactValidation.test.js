import { describe, expect, it } from 'vitest'
import { validateContact } from './contactValidation.js'

describe('validateContact', () => {
  it('requires all fields and reports an invalid email clearly', () => {
    expect(validateContact({ name: ' ', email: 'not-an-email', subject: '', message: '' })).toEqual({
      name: 'Enter your name.',
      email: 'Enter a valid email address.',
      subject: 'Enter a subject.',
      message: 'Enter a message.',
    })
  })

  it('accepts trimmed values with a valid email address', () => {
    expect(validateContact({
      name: ' Shaikh Anis ',
      email: 'anis@example.com ',
      subject: 'Opportunity',
      message: 'Hello',
    })).toEqual({})
  })
})
