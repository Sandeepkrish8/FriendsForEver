import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memories } from '../data/data'

function Lightbox({ item, onClose, onPrev, onNext }) {
  return (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(5,4,3,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 2000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 24, right: 24,
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', borderRadius: '50%', width: 42, height: 42,
          cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >×</button>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); onPrev() }}
        style={{
          position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', borderRadius: '50%', width: 46, height: 46,
          cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >‹</button>

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); onNext() }}
        style={{
          position: 'absolute', right: 20, top: '50%', transform: 'translateY(-50%)',
          background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
          color: '#fff', borderRadius: '50%', width: 46, height: 46,
          cursor: 'pointer', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >›</button>

      {/* Image */}
      <motion.div
        key={item.id}
        initial={{ scale: 0.82, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', maxWidth: '85vw', maxHeight: '82vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <img
          src={item.img} alt={item.caption}
          style={{
            maxWidth: '100%', maxHeight: '70vh',
            borderRadius: 16,
            boxShadow: '0 30px 80px rgba(0,0,0,0.7)',
            objectFit: 'contain',
          }}
        />
        <div style={{ marginTop: 18, textAlign: 'center' }}>
          <div style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>{item.caption}</div>
          <div style={{ color: '#E8A87C', fontSize: 12, letterSpacing: 2, marginTop: 6 }}>{item.year}</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function MemoriesGallery() {
  const [selected, setSelected] = useState(null)

  // ── Emoji reactions (persisted in localStorage) ───────────────────────────
  const RXNS = ['❤️', '😂', '🔥', '🥹', '👏']
  const [reactions, setReactions] = useState(() => {
    try { return JSON.parse(localStorage.getItem('ff-reactions') || '{}') } catch { return {} }
  })
  const toggleRxn = (memId, emoji, e) => {
    e.stopPropagation()
    setReactions(prev => {
      const key = `${memId}-${emoji}`
      const next = { ...prev, [key]: !prev[key] }
      try { localStorage.setItem('ff-reactions', JSON.stringify(next)) } catch {}
      return next
    })
  }

  const selectedIdx = memories.findIndex(m => m.id === selected?.id)

  const prev = useCallback(() => {
    const i = (selectedIdx - 1 + memories.length) % memories.length
    setSelected(memories[i])
  }, [selectedIdx])

  const next = useCallback(() => {
    const i = (selectedIdx + 1) % memories.length
    setSelected(memories[i])
  }, [selectedIdx])

  return (
    <section id="memories" style={{ padding: '110px 24px', background: 'rgba(255,255,255,0.018)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            Frozen in Time
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700,
          }}>
            Our Memories
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15 }}>
            Click any photo to relive the moment.
          </p>
        </div>

        {/* Masonry grid */}
        <div
          className="memories-masonry"
          style={{ columns: '3 200px', gap: 14 }}
        >
          {memories.map(m => (
            <div
              key={m.id}
              className="memory-card"
              onClick={() => setSelected(m)}
              style={{
                position: 'relative', overflow: 'hidden',
                borderRadius: 14, marginBottom: 14,
                breakInside: 'avoid',
              }}
            >
              <img
                src={m.img} alt={m.caption}
                style={{
                  width: '100%', display: 'block',
                  filter: 'brightness(0.82)',
                  transition: 'filter 0.4s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.filter = 'brightness(0.6)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'brightness(0.82)'}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(10,8,6,0.85) 0%, transparent 55%)',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'flex-end', padding: 14,
                pointerEvents: 'none',
              }}>
                <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{m.caption}</div>
                <div style={{ color: '#E8A87C', fontSize: 11, letterSpacing: 2, marginTop: 4 }}>{m.year}</div>
                {/* Emoji reactions */}
                <div
                  onClick={e => e.stopPropagation()}
                  style={{
                    display: 'flex', gap: 4, marginTop: 10,
                    pointerEvents: 'all',
                  }}
                >
                  {RXNS.map(em => (
                    <button
                      key={em}
                      onClick={e => toggleRxn(m.id, em, e)}
                      style={{
                        background: reactions[`${m.id}-${em}`] ? 'rgba(232,168,124,0.35)' : 'rgba(0,0,0,0.4)',
                        border: `1px solid ${reactions[`${m.id}-${em}`] ? 'rgba(232,168,124,0.8)' : 'rgba(255,255,255,0.15)'}`,
                        borderRadius: 20, padding: '2px 7px',
                        fontSize: 13, cursor: 'pointer',
                        transform: reactions[`${m.id}-${em}`] ? 'scale(1.2)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {em}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <Lightbox item={selected} onClose={() => setSelected(null)} onPrev={prev} onNext={next} />
        )}
      </AnimatePresence>
    </section>
  )
}
