import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import emailjs from '@emailjs/browser'
import './ProjectModal.css'

interface Props {
  open: boolean
  onClose: () => void
}

const SERVICES = [
  'Création de site web',
  'Application web',
  'Solution digitale sur mesure',
  'Logiciel de gestion',
  'Communication digitale',
  'Autre',
]

export default function ProjectModal({ open, onClose }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' })

  if (!open) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.sendForm(
        'service_djems',
        'template_djems',
        formRef.current!,
        'YOUR_PUBLIC_KEY'
      )
      setStatus('success')
      setForm({ name: '', email: '', phone: '', service: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const close = () => { onClose(); setStatus('idle') }

  return createPortal(
    <div className="modal-overlay" onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={close} aria-label="Fermer">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {status === 'success' ? (
          <div className="modal-success">
            <div className="modal-success-icon">✓</div>
            <h3>Message envoyé !</h3>
            <p>Nous vous répondrons dans les 24h. Merci pour votre confiance.</p>
            <button className="btn-primary" onClick={close}>Fermer</button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <span className="modal-label">Nouveau projet</span>
              <h2 className="modal-title">Démarrons ensemble</h2>
              <p className="modal-desc">Remplissez ce formulaire et nous vous recontactons rapidement.</p>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Nom complet *</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Jean Dupont" required />
                </div>
                <div className="form-group">
                  <label>Email *</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jean@exemple.com" required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Téléphone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="+237 6XX XXX XXX" />
                </div>
                <div className="form-group">
                  <label>Type de projet *</label>
                  <select name="service" value={form.service} onChange={handleChange} required>
                    <option value="">Sélectionner...</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Décrivez votre projet *</label>
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Parlez-nous de votre idée, vos objectifs, votre budget estimé..." rows={5} required />
              </div>

              {status === 'error' && (
                <p className="form-error">Une erreur est survenue. Contactez-nous directement : djieritechnology@gmail.com</p>
              )}

              <div className="form-footer">
                <a href="tel:+237686618240" className="form-phone">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M3 1h3l1.5 4L6 6.5c1 2 2.5 3.5 4.5 4.5L12 9.5l4 1.5v3a1 1 0 01-1 1C6.16 15 1 9.84 1 2a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  +237 686 618 240
                </a>
                <button type="submit" className="btn-primary form-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Envoi...' : 'Envoyer →'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
