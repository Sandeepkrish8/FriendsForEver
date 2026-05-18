import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const sections = [
  { id: 'hero',          label: 'Home' },
  { id: 'squad',         label: 'Squad' },
  { id: 'memories',      label: 'Memories' },
  { id: 'coverflow',     label: 'Reel' },
  { id: 'cube',          label: 'Cube' },
  { id: 'timeline',      label: 'Timeline' },
  { id: 'quiz',          label: 'Quiz' },
  { id: 'vibe',          label: 'Our Vibe' },
  { id: 'messages',      label: 'Wall' },
  { id: 'birthdays',     label: 'Birthdays' },
  { id: 'constellation', label: '✦ Stars' },
  { id: 'room',          label: '3D Room' },
  { id: 'polaroids',     label: 'Polaroids' },
]

export default function Navbar() {
  const [active,    setActive]    = useState('hero')
  const [visible,   setVisible]   = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [isMobile,  setIsMobile]  = useState(() => window.innerWidth <= 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 60)
      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 200 && rect.bottom >= 200) setActive(id)
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on scroll
  useEffect(() => {
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true, once: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  const scrollTo = (id) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  /* ─── Mobile nav ─────────────────────────────────────────────── */
  if (isMobile) {
    return (
      <>
        {/* Hamburger pill */}
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'fixed', top: 16, right: 16, zIndex: 1001,
            background: 'rgba(10,8,6,0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(232,168,124,0.22)',
            borderRadius: 50, padding: '10px 16px',
            boxShadow: '0 4px 30px rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}
        >
          {/* Active label */}
          <span style={{ fontSize: 11, color: '#E8A87C', letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: "'Lato',sans-serif", fontWeight: 700 }}>
            {sections.find(s => s.id === active)?.label ?? 'Menu'}
          </span>
          {/* Burger button */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', gap: 4, padding: 2,
            }}
            aria-label="Open navigation"
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                animate={menuOpen
                  ? i === 1 ? { opacity: 0, scaleX: 0 }
                  : i === 0 ? { rotate: 45,  y: 8 }
                  : { rotate: -45, y: -8 }
                  : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.22 }}
                style={{
                  display: 'block', width: 20, height: 2,
                  background: '#E8A87C', borderRadius: 2,
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </motion.div>

        {/* Full-screen slide-down menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
                background: 'rgba(10,8,6,0.96)',
                backdropFilter: 'blur(28px)',
                WebkitBackdropFilter: 'blur(28px)',
                borderBottom: '1px solid rgba(232,168,124,0.15)',
                padding: '72px 24px 28px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
              }}
            >
              {sections.map(({ id, label }) => (
                <motion.button
                  key={id}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(id)}
                  style={{
                    background: active === id ? '#E8A87C' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${active === id ? '#E8A87C' : 'rgba(232,168,124,0.15)'}`,
                    borderRadius: 12, padding: '12px 16px',
                    color: active === id ? '#0a0806' : 'rgba(255,255,255,0.75)',
                    fontSize: 13, fontWeight: 700,
                    fontFamily: "'Lato', sans-serif",
                    letterSpacing: 0.5, cursor: 'pointer',
                    textAlign: 'center',
                  }}
                >
                  {label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </>
    )
  }

  /* ─── Desktop pill nav ───────────────────────────────────────── */
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'nowrap', justifyContent: 'center',
        background: 'rgba(10,8,6,0.72)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(232,168,124,0.18)',
        borderRadius: 50, padding: '8px 16px',
        boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
        opacity: visible ? 1 : 0.85,
        transition: 'opacity 0.3s ease',
        maxWidth: 'calc(100vw - 32px)',
        overflowX: 'auto',
      }}
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          style={{
            background: active === id ? '#E8A87C' : 'transparent',
            border: 'none', borderRadius: 20,
            padding: '5px 14px', cursor: 'pointer',
            color: active === id ? '#0a0806' : 'rgba(255,255,255,0.6)',
            fontSize: 12, fontWeight: 700, letterSpacing: 0.4,
            fontFamily: "'Lato', sans-serif",
            transition: 'all 0.25s ease', whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => { if (active !== id) e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { if (active !== id) e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
        >
          {label}
        </button>
      ))}
    </motion.nav>
  )
}

