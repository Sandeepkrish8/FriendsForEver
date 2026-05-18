import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { memories } from '../data/data'

// ─── Stable random values per photo (seeded by index) ────────────────────────
const CONFIGS = memories.map((_, i) => {
  const seed = i * 137.508 + 42
  const pseudo = (n) => ((Math.sin(n) * 43758.5453) % 1 + 1) % 1
  return {
    rot:   (pseudo(seed)      - 0.5) * 28,   // -14 to +14 deg
    offX:  (pseudo(seed + 1)  - 0.5) * 20,   // ±10px wobble
    pin:   Math.floor(pseudo(seed + 2) * 4),  // pin colour index
  }
})

const PIN_COLORS = ['#E8A87C', '#C3B1E1', '#D4A5A5', '#B5C4B1']

// ─── Individual polaroid ──────────────────────────────────────────────────────
function Polaroid({ m, cfg, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: -120, rotate: cfg.rot }}
      whileInView={{ opacity: 1, y: 0, rotate: cfg.rot }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        delay: index * 0.06,
        type: 'spring',
        stiffness: 60,
        damping: 14,
      }}
      whileHover={{ rotate: 0, scale: 1.12, y: -14, zIndex: 50 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onOpen(m)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transformOrigin: 'center center',
        marginLeft: cfg.offX,
        zIndex: hovered ? 50 : index,
        display: 'inline-block',
      }}
    >
      {/* Push pin */}
      <div style={{
        position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
        width: 14, height: 14, borderRadius: '50%',
        background: PIN_COLORS[cfg.pin],
        boxShadow: `0 2px 8px ${PIN_COLORS[cfg.pin]}80, 0 0 0 2px rgba(0,0,0,0.3) inset`,
        zIndex: 10,
      }} />

      {/* Polaroid frame */}
      <div style={{
        background: '#f5f0e8',
        padding: '10px 10px 38px 10px',
        borderRadius: 4,
        boxShadow: hovered
          ? '0 30px 70px rgba(0,0,0,0.65), 0 4px 16px rgba(0,0,0,0.4)'
          : '0 8px 28px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)',
        transition: 'box-shadow 0.3s ease',
        width: 170,
      }}>
        {/* Photo */}
        <div style={{
          width: '100%', paddingBottom: '100%',
          position: 'relative', overflow: 'hidden',
          borderRadius: 2,
        }}>
          <img
            src={m.img} alt={m.caption}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'saturate(0.88) contrast(1.05)',
            }}
            draggable={false}
          />
          {/* Film grain overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.04\'/%3E%3C/svg%3E")',
            pointerEvents: 'none', opacity: 0.4,
          }} />
        </div>

        {/* Caption text */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 38, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 1,
          padding: '0 8px',
        }}>
          <div style={{
            fontFamily: 'Dancing Script, Caveat, cursive',
            fontSize: 12, color: '#4a3728',
            fontWeight: 600, textAlign: 'center',
            lineHeight: 1.3, letterSpacing: 0.3,
          }}>
            {m.caption}
          </div>
          <div style={{ fontSize: 10, color: '#8a7060', letterSpacing: 1 }}>
            {m.year}
          </div>
        </div>
      </div>

      {/* Tape strip (some photos) */}
      {index % 3 === 0 && (
        <div style={{
          position: 'absolute', top: -4, left: '50%', transform: 'translateX(-50%)',
          width: 50, height: 14,
          background: 'rgba(245,230,200,0.45)',
          backdropFilter: 'blur(2px)',
          zIndex: 8,
        }} />
      )}
    </motion.div>
  )
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ item, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 4000,
        background: 'rgba(0,0,0,0.94)', backdropFilter: 'blur(18px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <motion.div
        initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        exit={{ scale: 0.7, rotate: 8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        onClick={e => e.stopPropagation()}
        style={{
          background: '#f5f0e8',
          padding: '18px 18px 64px 18px',
          borderRadius: 6,
          boxShadow: '0 40px 120px rgba(0,0,0,0.85)',
          maxWidth: '82vw',
          textAlign: 'center',
        }}
      >
        <img
          src={item.img} alt={item.caption}
          style={{ maxWidth: '70vw', maxHeight: '62vh', objectFit: 'contain', borderRadius: 3, display: 'block' }}
          draggable={false}
        />
        <div style={{ fontFamily: 'Dancing Script, Caveat, cursive', fontSize: 18, color: '#4a3728', marginTop: 12 }}>
          {item.caption}
        </div>
        <div style={{ fontSize: 12, color: '#8a7060', letterSpacing: 1.5, marginTop: 4 }}>{item.year}</div>
        <motion.button
          whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
          onClick={onClose}
          style={{
            marginTop: 14, background: 'rgba(74,55,40,0.1)',
            border: '1px solid rgba(74,55,40,0.25)',
            borderRadius: 20, padding: '6px 22px',
            color: '#4a3728', fontSize: 12, cursor: 'pointer',
          }}
        >Close ✕</motion.button>
      </motion.div>
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function PolaroidBoard() {
  const [lightbox, setLightbox] = useState(null)
  const boardRef = useRef(null)
  const inView   = useInView(boardRef, { once: true, margin: '-80px' })

  return (
    <section id="polaroids" style={{ padding: '110px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            Pinned Moments
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700 }}>
            Polaroid Board
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15 }}>
            Each one a real moment &nbsp;·&nbsp; Click to enlarge
          </p>
        </div>

        {/* Cork board */}
        <div
          ref={boardRef}
          style={{
            background: [
              'radial-gradient(ellipse at 20% 20%, rgba(142,100,52,0.4), transparent 40%)',
              'radial-gradient(ellipse at 80% 80%, rgba(120,80,30,0.3), transparent 40%)',
              'repeating-linear-gradient(135deg, transparent, transparent 18px, rgba(0,0,0,0.025) 18px, rgba(0,0,0,0.025) 20px)',
              'linear-gradient(135deg, #5c3d1e 0%, #4a2e0f 50%, #5a3820 100%)',
            ].join(','),
            borderRadius: 24,
            padding: '48px 40px 40px',
            border: '6px solid rgba(80,50,20,0.6)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04) inset',
            minHeight: 420,
          }}
        >
          {/* Inner shadow for depth */}
          <div style={{
            position: 'relative',
            display: 'flex', flexWrap: 'wrap',
            gap: 22, justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
            {memories.map((m, i) => (
              <Polaroid
                key={m.id}
                m={m}
                cfg={CONFIGS[i]}
                index={i}
                onOpen={setLightbox}
              />
            ))}
          </div>
        </div>

        {/* Caption */}
        <p style={{ textAlign: 'center', marginTop: 24, color: 'rgba(255,255,255,0.2)', fontSize: 12, fontStyle: 'italic' }}>
          Hover to straighten &nbsp;·&nbsp; Click to enlarge
        </p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && <Lightbox item={lightbox} onClose={() => setLightbox(null)} />}
      </AnimatePresence>
    </section>
  )
}
