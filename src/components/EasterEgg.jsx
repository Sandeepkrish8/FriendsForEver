import { useEffect, useState, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const SECRET_CODE = 'forever5'

export default function EasterEgg() {
  const navigate   = useNavigate()
  const location   = useLocation()
  const bufRef     = useRef('')
  const [toast, setToast] = useState(false)

  const handleKeyDown = useCallback((e) => {
    // Ignore if user is typing in an input/textarea
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return
    // Only accumulate printable characters
    if (e.key.length !== 1) return

    bufRef.current = (bufRef.current + e.key.toLowerCase()).slice(-SECRET_CODE.length)

    if (bufRef.current === SECRET_CODE && location.pathname !== '/secret') {
      bufRef.current = ''
      setToast(true)
      setTimeout(() => {
        setToast(false)
        navigate('/secret')
      }, 1400)
    }
  }, [navigate, location.pathname])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Show a subtle hint in the footer area (only on home)
  // The toast appears when the code is typed
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="easter-toast"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0,  scale: 1 }}
          exit={{    opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          style={{
            position: 'fixed', bottom: 44, left: '50%', transform: 'translateX(-50%)',
            zIndex: 9999,
            background: 'linear-gradient(135deg,#C3B1E1,#D4A5A5)',
            color: '#0a0806',
            padding: '14px 32px', borderRadius: 50,
            fontWeight: 700, fontSize: 14, letterSpacing: 0.5,
            fontFamily: "'Lato', sans-serif",
            boxShadow: '0 10px 40px rgba(195,177,225,0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          🔓 Secret unlocked! Entering the vault…
        </motion.div>
      )}
    </AnimatePresence>
  )
}
