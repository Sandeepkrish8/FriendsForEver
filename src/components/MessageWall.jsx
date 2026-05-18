import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'ff-messages'
const EMOJIS = ['🤍', '✨', '🔥', '😂', '🥹', '💫', '🌙', '⚡']

const SEED = [
  { id: 1, name: 'Saran ☀️',    emoji: '🥹', date: 'May 19, 2026',
    text: "This site made me cry actual tears. I love you guys so much. Forever means forever." },
  { id: 2, name: 'Aswin 🍕', emoji: '❤️', date: 'May 19, 2026',
    text: "OK I was NOT ready for this. Someone is cutting onions. P.S. come over and I'll cook to celebrate." },
  { id: 3, name: 'Jagan ⚡',   emoji: '🔥', date: 'May 20, 2026',
    text: "This slaps harder than every spontaneous plan I ever made. Which is saying a lot." },
  { id: 4, name: 'Nishanth 🌙',   emoji: '🌙', date: 'May 20, 2026',
    text: "Every memory is worth keeping — and this page keeps them all beautifully. So proud of us." },
  { id: 5, name: 'Sandeep 🧠',   emoji: '✨', date: 'May 21, 2026',
    text: "I had this planned for a while. Finally shipped it. Worth every single 2AM session." },
]

export default function MessageWall() {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : SEED
    } catch { return SEED }
  })
  const [form, setForm]           = useState({ name: '', text: '', emoji: '🤍' })
  const [success, setSuccess]     = useState(false)
  const [nameErr, setNameErr]     = useState(false)
  const [textErr, setTextErr]     = useState(false)

  // Persist on change (skip initial seed write — only write when user adds)
  const persist = (msgs) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs)) } catch {}
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const nErr = !form.name.trim()
    const tErr = !form.text.trim()
    setNameErr(nErr); setTextErr(tErr)
    if (nErr || tErr) return

    const msg = {
      id: Date.now(),
      name: form.name.trim(),
      text: form.text.trim(),
      emoji: form.emoji,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    }
    const updated = [msg, ...messages]
    setMessages(updated)
    persist(updated)
    setForm({ name: '', text: '', emoji: '🤍' })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <section id="messages" style={{ padding: '110px 24px', background: 'rgba(255,255,255,0.018)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            Leave Your Mark
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, marginBottom: 12,
          }}>
            The Message Wall
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 15 }}>
            Say something. We're listening. 💌
          </p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(232,168,124,0.2)',
            borderRadius: 20, padding: '32px 28px',
            marginBottom: 48,
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            {/* Name */}
            <div>
              <input
                type="text"
                placeholder="Your name"
                maxLength={40}
                value={form.name}
                onChange={e => { setForm(f => ({ ...f, name: e.target.value })); setNameErr(false) }}
                style={{
                  width: '100%', background: 'rgba(255,255,255,0.07)',
                  border: `1px solid ${nameErr ? '#D4A5A5' : 'rgba(255,255,255,0.12)'}`,
                  borderRadius: 10, padding: '12px 16px',
                  color: '#fff', fontSize: 14, fontFamily: "'Lato', sans-serif",
                  outline: 'none',
                }}
              />
              {nameErr && <div style={{ color: '#D4A5A5', fontSize: 11, marginTop: 4 }}>Name is required</div>}
            </div>

            {/* Emoji selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {EMOJIS.map(em => (
                <button
                  key={em} type="button"
                  onClick={() => setForm(f => ({ ...f, emoji: em }))}
                  style={{
                    fontSize: 20, background: form.emoji === em ? 'rgba(232,168,124,0.25)' : 'transparent',
                    border: `1px solid ${form.emoji === em ? '#E8A87C' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: 8, padding: '6px 8px', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {em}
                </button>
              ))}
            </div>
          </div>

          {/* Message textarea */}
          <textarea
            placeholder="Leave a note for the squad…"
            maxLength={280}
            rows={3}
            value={form.text}
            onChange={e => { setForm(f => ({ ...f, text: e.target.value })); setTextErr(false) }}
            style={{
              width: '100%', background: 'rgba(255,255,255,0.07)',
              border: `1px solid ${textErr ? '#D4A5A5' : 'rgba(255,255,255,0.12)'}`,
              borderRadius: 10, padding: '12px 16px',
              color: '#fff', fontSize: 14, fontFamily: "'Lato', sans-serif",
              resize: 'none', marginBottom: 4, outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            {textErr
              ? <span style={{ color: '#D4A5A5', fontSize: 11 }}>Message is required</span>
              : <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 11 }}>{form.text.length}/280</span>
            }
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              style={{
                background: 'linear-gradient(135deg,#E8A87C,#F7C59F)',
                color: '#0a0806', border: 'none', borderRadius: 50,
                padding: '12px 30px', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: "'Lato', sans-serif",
              }}
            >
              Post Note →
            </motion.button>
            <AnimatePresence>
              {success && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  style={{ color: '#B5C4B1', fontSize: 13 }}
                >
                  ✓ Note posted!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        {/* Messages grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          <AnimatePresence>
            {messages.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i < 5 ? i * 0.07 : 0, duration: 0.5 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(232,168,124,0.13)',
                  borderRadius: 16, padding: '22px 20px',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: -12, right: -4,
                  fontSize: 56, opacity: 0.08, lineHeight: 1,
                }}>
                  {m.emoji}
                </div>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{m.emoji}</div>
                <div style={{
                  fontFamily: "'Playfair', serif",
                  color: 'rgba(255,255,255,0.88)', fontSize: 14,
                  lineHeight: 1.65, marginBottom: 14, fontStyle: 'italic',
                }}>
                  "{m.text}"
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#E8A87C', fontWeight: 700, fontSize: 13 }}>— {m.name}</span>
                  <span style={{ color: 'rgba(255,255,255,0.28)', fontSize: 11, letterSpacing: 1 }}>{m.date}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
