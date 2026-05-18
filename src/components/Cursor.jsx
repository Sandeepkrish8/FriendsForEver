import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    // Only apply on devices with a fine pointer (mouse), not touch
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = -200, mouseY = -200
    let ringX  = -200, ringY  = -200
    let raf

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      dot.style.left = mouseX + 'px'
      dot.style.top  = mouseY + 'px'
    }

    const loop = () => {
      ringX += (mouseX - ringX) * 0.1
      ringY += (mouseY - ringY) * 0.1
      ring.style.left = ringX + 'px'
      ring.style.top  = ringY + 'px'
      raf = requestAnimationFrame(loop)
    }

    // Event delegation – hover effect on interactive elements
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .memory-card, .vibe-tag, .squad-card')) {
        ring.style.transform = 'translate(-50%,-50%) scale(1.8)'
        ring.style.borderColor = 'rgba(232,168,124,0.9)'
        dot.style.opacity = '0'
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], .memory-card, .vibe-tag, .squad-card')) {
        ring.style.transform = 'translate(-50%,-50%) scale(1)'
        ring.style.borderColor = 'rgba(232,168,124,0.5)'
        dot.style.opacity = '1'
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Inner dot — snaps to cursor */}
      <div ref={dotRef} style={{
        position: 'fixed', zIndex: 99999, pointerEvents: 'none',
        width: 8, height: 8, borderRadius: '50%',
        background: '#E8A87C',
        left: -200, top: -200,
        transform: 'translate(-50%,-50%)',
        transition: 'opacity 0.2s ease',
        mixBlendMode: 'screen',
      }} />
      {/* Outer ring — lags behind (lerp) */}
      <div ref={ringRef} style={{
        position: 'fixed', zIndex: 99998, pointerEvents: 'none',
        width: 34, height: 34, borderRadius: '50%',
        border: '1.5px solid rgba(232,168,124,0.5)',
        left: -200, top: -200,
        transform: 'translate(-50%,-50%)',
        transition: 'transform 0.25s ease, border-color 0.25s ease',
      }} />
    </>
  )
}
