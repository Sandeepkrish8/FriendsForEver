import { motion } from 'framer-motion'
import { friends } from '../data/data'

export default function Footer({ scrollTo }) {
  return (
    <footer style={{
      padding: '72px 24px 44px',
      background: '#050403',
      borderTop: '1px solid rgba(232,168,124,0.1)',
      textAlign: 'center',
    }}>
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px, 4vw, 42px)',
          fontWeight: 700,
          background: 'linear-gradient(135deg,#E8A87C,#F7C59F,#C3B1E1)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: 14,
        }}
      >
        Forever Five 🤍
      </motion.div>

      <p style={{
        color: 'rgba(255,255,255,0.35)', fontSize: 14,
        marginBottom: 32, maxWidth: 360, margin: '0 auto 32px',
        lineHeight: 1.6,
      }}>
        Built with love, laughter, and probably too many late nights.
      </p>

      {/* Avatar row */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
        {friends.map(f => (
          <motion.div
            key={f.id}
            whileHover={{ scale: 1.22, y: -4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18 }}
            title={f.name}
            style={{
              width: 40, height: 40, borderRadius: '50%', overflow: 'hidden',
              border: `2px solid ${f.color}60`,
              cursor: 'default',
            }}
          >
            <img src={f.img} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        ))}
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
        {['hero','squad','memories','coverflow','cube','constellation','room','polaroids','timeline','quiz','vibe','messages','birthdays'].map(s => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            style={{
              background: 'transparent', border: 'none',
              color: 'rgba(255,255,255,0.35)', fontSize: 12,
              cursor: 'pointer', letterSpacing: 1.5,
              textTransform: 'uppercase', fontFamily: "'Lato', sans-serif",
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#E8A87C'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}
          >
            {s === 'hero' ? 'Home' : s}
          </button>
        ))}
      </div>

      {/* Easter egg hint */}
      <div style={{
        display: 'inline-block',
        fontSize: 11, color: 'rgba(255,255,255,0.14)',
        letterSpacing: 1.5, marginBottom: 24,
        borderTop: '1px solid rgba(255,255,255,0.06)',
        paddingTop: 20,
      }}>
        psst — there's a secret somewhere on this page 🔮
      </div>

      <p style={{
        color: 'rgba(255,255,255,0.15)', fontSize: 11,
        letterSpacing: 2, display: 'block',
      }}>
        {new Date().getFullYear()} · FOREVER FIVE · ALWAYS
      </p>
    </footer>
  )
}
