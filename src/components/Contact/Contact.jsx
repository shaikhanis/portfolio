import { useEffect, useState } from 'react'
import { ArrowUpRight, Send } from 'lucide-react'
import { SectionHeader } from '../common/SectionHeader/SectionHeader.jsx'
import { Button } from '../common/Button/Button.jsx'
import { contact, activeSocialLinks, emailHref } from '../../data/socialLinks.js'
import { socialIcons } from '../common/BrandIcons/socialIcons.js'
import { validateContact } from '../../utils/contactValidation.js'

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [sending, setSending] = useState(false)
  const canSend = Boolean(contact.email)

  useEffect(() => {
    const fillResumeSubject = () => {
      setValues((current) => ({ ...current, subject: 'Resume request' }))
      setFeedback(null)
    }
    window.addEventListener('portfolio:resume-request', fillResumeSubject)
    return () => window.removeEventListener('portfolio:resume-request', fillResumeSubject)
  }, [])

  const updateField = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: undefined }))
    setFeedback(null)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!canSend || sending) return

    const nextErrors = validateContact(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setFeedback({ type: 'error', text: 'There is a problem with your message. Check the fields below and try again.' })
      return
    }

    const message = values.message.trim()
    if (contact.formProvider === 'mailto') {
      const mailto = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(
        `From: ${values.name.trim()} (${values.email.trim()})\n\n${message}`,
      )}`
      setFeedback({ type: 'success', text: 'Your email app is opening with your message ready to send.' })
      window.location.href = mailto
      return
    }

    setSending(true)
    setFeedback(null)
    try {
      const recipient = contact.formsubmitAlias || contact.email
      const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message,
          _subject: `Portfolio contact: ${values.subject.trim()}`,
        }),
      })
      const result = await response.json()
      if (!response.ok || result.success === false) {
        throw new Error('The message service did not accept the request.')
      }
      setFeedback({ type: 'success', text: 'Your message has been sent. Thank you for getting in touch.' })
      setValues({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setFeedback({
        type: 'error',
        text: error instanceof Error ? `We could not send your message. ${error.message}` : 'We could not send your message. Please try again.',
      })
    } finally {
      setSending(false)
    }
  }

  const fieldError = (name) => errors[name]

  return (
    <section id="contact" className="section" aria-labelledby="contact-title">
      <div className="container-site">
        <SectionHeader
          index="08"
          label="Contact"
          title="Have a Project or Opportunity in Mind?"
          titleId="contact-title"
        />
        <div className="contact-grid">
          <div className="contact-copy">
            <h3>Let’s make something meaningful.</h3>
            <p>
              I&apos;m always interested in connecting with people building meaningful digital products and exploring
              exciting frontend engineering opportunities.
            </p>
            <div className="contact-links">
              {emailHref ? <a href={emailHref}>Email me <ArrowUpRight size={15} aria-hidden="true" /></a> : null}
              {activeSocialLinks.map((link) => {
                const Icon = socialIcons[link.id]
                return (
                  <a key={link.id} href={link.href} target="_blank" rel="noopener noreferrer">
                    {Icon ? <Icon size={16} aria-hidden="true" /> : null}
                    {link.label}<ArrowUpRight size={15} aria-hidden="true" />
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )
              })}
            </div>
          </div>
          <div>
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              {!canSend ? (
                <p className="contact-form__feedback" role="status">
                  Messaging isn&apos;t connected yet. Add your professional email in <code>src/data/socialLinks.js</code> to enable the mail app or configured form delivery.
                </p>
              ) : null}
              {feedback ? (
                <p className={`contact-form__feedback contact-form__feedback--${feedback.type}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
                  {feedback.text}
                </p>
              ) : null}
              <div className="contact-form__field">
                <label htmlFor="contact-name">Full Name</label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={updateField}
                  aria-invalid={Boolean(fieldError('name'))}
                  aria-describedby={fieldError('name') ? 'contact-name-error' : undefined}
                />
                {fieldError('name') ? <span id="contact-name-error" className="contact-form__error">{fieldError('name')}</span> : null}
              </div>
              <div className="contact-form__field">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={updateField}
                  aria-invalid={Boolean(fieldError('email'))}
                  aria-describedby={fieldError('email') ? 'contact-email-error' : undefined}
                />
                {fieldError('email') ? <span id="contact-email-error" className="contact-form__error">{fieldError('email')}</span> : null}
              </div>
              <div className="contact-form__field contact-form__field--wide">
                <label htmlFor="contact-subject">Subject</label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={values.subject}
                  onChange={updateField}
                  aria-invalid={Boolean(fieldError('subject'))}
                  aria-describedby={fieldError('subject') ? 'contact-subject-error' : undefined}
                />
                {fieldError('subject') ? <span id="contact-subject-error" className="contact-form__error">{fieldError('subject')}</span> : null}
              </div>
              <div className="contact-form__field contact-form__field--wide">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={values.message}
                  onChange={updateField}
                  aria-invalid={Boolean(fieldError('message'))}
                  aria-describedby={fieldError('message') ? 'contact-message-error' : undefined}
                />
                {fieldError('message') ? <span id="contact-message-error" className="contact-form__error">{fieldError('message')}</span> : null}
              </div>
              <div className="contact-form__submit">
                <Button type="submit" aria-disabled={!canSend || sending} icon={<Send size={16} />}>
                  {sending ? 'Sending…' : 'Send message'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
