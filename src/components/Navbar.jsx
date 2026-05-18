import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const sections = [
  { id: 'hero',       label: 'Home' },
  { id: 'squad',      label: 'Squad' },
  { id: 'memories',   label: 'Memories' },
  { id: 'coverflow',  label: 'Reel' },
  { id: 'cube',       label: 'Cube' },
  { id: 'timeline',   label: 'Timeline' },
  { id: 'quiz',       label: 'Quiz' },
  { id: 'vibe',       label: 'Our Vibe' },
  { id: 'messages',   label: 'Wall' },
  { id: 'birthdays',  label: 'Birthdays' },
  { id: 'constellation', label: '✦ Stars' },
  { id: 'room',        label: '3D Room' },
  { id: 'polaroids',   label: 'Polaroids' },
]

export default function Navbar() {
  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)

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

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed', top: 20, left: '50%', transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex', gap: 4, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
        background: 'rgba(10,8,6,0.72)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(232,168,124,0.18)',
        borderRadius: 50, padding: '8px 16px',
        boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
        opacity: visible ? 1 : 0.85,
        transition: 'opacity 0.3s ease',
      }}
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          style={{
            background: active === id ? '#E8A87C' : 'transparent',
            border: 'none',
            borderRadius: 20,
            padding: '5px 14px',
            cursor: 'pointer',
            color: active === id ? '#0a0806' : 'rgba(255,255,255,0.6)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.4,
            fontFamily: "'Lato', sans-serif",
            transition: 'all 0.25s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            if (active !== id) e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={e => {
            if (active !== id) e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
          }}
        >
          {label}
        </button>
      ))}
    </motion.nav>
  )
}
