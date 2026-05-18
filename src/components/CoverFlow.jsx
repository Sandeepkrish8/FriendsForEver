import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { memories } from '../data/data'

export default function CoverFlow() {
  const [active, setActive]       = useState(0)
  const [lightbox, setLightbox]   = useState(null)
  const count = memories.length

  // Compute the visual style for card at index i relative to active
  const layout = (i) => {
    const off = i - active
    const abs = Math.abs(off)
    if (abs > 3) return null   // too far, skip rendering
    return {
      rotateY:    off * 42,
      x:          off * 195,
      z:          -abs * 95,
      scale:      off === 0 ? 1 : Math.max(0.62, 1 - abs * 0.14),
      opacity:    off === 0 ? 1 : Math.max(0.35, 1 - abs * 0.22),
      zIndex:     10 - abs,
    }
  }

  const prev = () => setActive(a => Math.max(0, a - 1))
  const next = () => setActive(a => Math.min(count - 1, a + 1))

  // Keyboard nav
  const onKey = (e) => {
    if (e.key === 'ArrowLeft')  prev()
    if (e.key === 'ArrowRight') next()
  }

  return (
    <section
      id="coverflow"
      tabIndex={0}
      onKeyDown={onKey}
      style={{ padding: '110px 24px', overflow: 'hidden', outline: 'none', position: 'relative', zIndex: 1 }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
          3D Photo Reel
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700 }}>
          Flip Through Us
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15 }}>
          Click a side card to bring it forward &nbsp;·&nbsp; Click center to enlarge
        </p>
      </div>

      {/* 3D Stage */}
      <div
        style={{
          perspective: 1400,
          height: 380,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {memories.map((m, i) => {
          const s = layout(i)
          if (!s) return null
          const isActive = i === active

          return (
            <motion.div
              key={m.id}
              animate={{ rotateY: s.rotateY, x: s.x, z: s.z, scale: s.scale, opacity: s.opacity }}
              transition={{ type: 'spring', stiffness: 88, damping: 20 }}
              style={{
                position: 'absolute',
                width: 246,
                height: 330,
                borderRadius: 18,
                overflow: 'hidden',
                zIndex: s.zIndex,
                cursor: isActive ? 'zoom-in' : 'pointer',
                transformStyle: 'preserve-3d',
                boxShadow: isActive
                  ? '0 28px 80px rgba(0,0,0,0.75), 0 0 0 2px rgba(232,168,124,0.55)'
                  : '0 10px 40px rgba(0,0,0,0.5)',
              }}
              onClick={() => isActive ? setLightbox(m) : setActive(i)}
            >
              <img
                src={m.img}
                alt={m.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
                draggable={false}
              />

              {/* Reflection strip at bottom */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
                background: 'linear-gradient(to top, rgba(5,4,3,0.9) 0%, transparent 100%)',
                pointerEvents: 'none',
              }} />

              {/* Caption — only on active card */}
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '26px 18px 16px',
                    textAlign: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>{m.caption}</div>
                  <div style={{ color: '#E8A87C', fontSize: 11, letterSpacing: 2, marginTop: 5 }}>{m.year}</div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24, marginTop: 52 }}>
        <motion.button
          whileHover={{ scale: 1.12, x: -3 }} whileTap={{ scale: 0.92 }}
          onClick={prev}
          disabled={active === 0}
          style={{
            background: 'rgba(232,168,124,0.12)', border: '1px solid rgba(232,168,124,0.3)',
            borderRadius: '50%', width: 46, height: 46,
            color: '#E8A87C', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: active === 0 ? 'not-allowed' : 'pointer', opacity: active === 0 ? 0.35 : 1,
          }}
        >←</motion.button>

        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          {memories.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              animate={{
                width: i === active ? 22 : 7,
                background: i === active ? '#E8A87C' : 'rgba(232,168,124,0.28)',
              }}
              style={{ height: 7, borderRadius: 4, border: 'none', cursor: 'pointer', padding: 0 }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.12, x: 3 }} whileTap={{ scale: 0.92 }}
          onClick={next}
          disabled={active === count - 1}
          style={{
            background: 'rgba(232,168,124,0.12)', border: '1px solid rgba(232,168,124,0.3)',
            borderRadius: '50%', width: 46, height: 46,
            color: '#E8A87C', fontSize: 20, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: active === count - 1 ? 'not-allowed' : 'pointer', opacity: active === count - 1 ? 0.35 : 1,
          }}
        >→</motion.button>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 3000,
              background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <motion.div
              initial={{ scale: 0.65, rotateY: -28, opacity: 0 }}
              animate={{ scale: 1,    rotateY:   0, opacity: 1 }}
              exit={{    scale: 0.65, rotateY:  28, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 100, damping: 18 }}
              style={{ textAlign: 'center', transformStyle: 'preserve-3d' }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={lightbox.img} alt={lightbox.caption}
                style={{ maxWidth: '82vw', maxHeight: '74vh', borderRadius: 18, objectFit: 'contain', boxShadow: '0 40px 120px rgba(0,0,0,0.85)' }}
                draggable={false}
              />
              <div style={{ marginTop: 18, color: '#fff', fontSize: 16, fontWeight: 600 }}>{lightbox.caption}</div>
              <div style={{ color: '#E8A87C', fontSize: 12, letterSpacing: 2, marginTop: 6 }}>{lightbox.year}</div>
              <motion.button
                whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
                onClick={() => setLightbox(null)}
                style={{
                  marginTop: 22, background: 'rgba(232,168,124,0.15)',
                  border: '1px solid rgba(232,168,124,0.4)', borderRadius: 24,
                  padding: '8px 28px', color: '#E8A87C', fontSize: 13, cursor: 'pointer',
                }}
              >Close</motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
