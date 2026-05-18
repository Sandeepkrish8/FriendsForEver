import { motion } from 'framer-motion'
import { vibes } from '../data/data'

export default function Vibe() {
  return (
    <section id="vibe" style={{ padding: '110px 24px', background: 'rgba(255,255,255,0.018)' }}>
      <div style={{ maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        {/* Header */}
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
          What We're About
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700, marginBottom: 14,
        }}>
          Our Vibe
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginBottom: 52, fontSize: 15 }}>
          The things that make us, us.
        </p>

        {/* Vibe tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 72 }}>
          {vibes.map((v, i) => (
            <motion.div
              key={v.label}
              className="vibe-tag"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(232,168,124,0.2)',
                borderRadius: 50, padding: '12px 22px',
                display: 'flex', alignItems: 'center', gap: 8,
              }}
            >
              <span style={{ fontSize: 20 }}>{v.icon}</span>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: 500 }}>{v.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Group quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            padding: '44px 40px',
            background: 'rgba(232,168,124,0.05)',
            border: '1px solid rgba(232,168,124,0.2)',
            borderRadius: 24, position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: -20, left: -10, fontSize: 120,
            fontFamily: "'Playfair Display', serif",
            color: 'rgba(232,168,124,0.06)', lineHeight: 1, pointerEvents: 'none',
          }}>
            "
          </div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(17px, 3vw, 26px)',
            fontStyle: 'italic', color: 'rgba(255,255,255,0.88)',
            lineHeight: 1.75, position: 'relative',
          }}>
            We didn't find each other by accident.<br />
            We were meant to make these memories.
          </p>
          <div style={{ marginTop: 20, color: '#E8A87C', fontSize: 13, letterSpacing: 2 }}>
            — Forever Five
          </div>
        </motion.div>
      </div>
    </section>
  )
}
