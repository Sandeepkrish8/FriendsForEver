import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen({ onDone }) {
  const [visible, setVisible] = useState(true)
  const [phase, setPhase]     = useState('logo') // 'logo' | 'subtitle'

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('subtitle'), 600)
    const t2 = setTimeout(() => setVisible(false),    2200)
    const t3 = setTimeout(onDone,                     2900)
    return () => [t1, t2, t3].forEach(clearTimeout)
  }, [onDone])

  const chars = 'Forever Five'.split('')

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            background: '#0a0806',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Pulsing decorative rings */}
          {[140, 220, 310].map((sz, i) => (
            <motion.div
              key={sz}
              animate={{ scale: [1, 1.12, 1], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', width: sz, height: sz,
                borderRadius: '50%',
                border: '1px solid rgba(232,168,124,0.3)',
              }}
            />
          ))}

          {/* Animated title */}
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(36px, 7vw, 80px)',
            fontWeight: 700,
            display: 'flex', overflow: 'hidden',
          }}>
            {chars.map((ch, i) => (
              <motion.span
                key={i}
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.045 + 0.1, duration: 0.6, ease: 'easeOut' }}
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg,#E8A87C,#F7C59F,#C3B1E1)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {ch === ' ' ? '\u00A0' : ch}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <AnimatePresence>
            {phase === 'subtitle' && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                style={{
                  color: 'rgba(255,255,255,0.4)', fontSize: 13,
                  letterSpacing: 4, marginTop: 16, textTransform: 'uppercase',
                  fontFamily: "'Lato', sans-serif",
                }}
              >
                Loading your memories…
              </motion.p>
            )}
          </AnimatePresence>

          {/* Progress bar at bottom */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 'subtitle' ? 1 : 0.3 }}
            transition={{ duration: 1.7, ease: 'easeOut' }}
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 3, transformOrigin: '0%',
              background: 'linear-gradient(to right,#E8A87C,#C3B1E1)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
