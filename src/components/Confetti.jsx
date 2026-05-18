import { useEffect, useRef } from 'react'

const COLORS = ['#E8A87C', '#F7C59F', '#C3B1E1', '#D4A5A5', '#B5C4B1', '#ffffff', '#ffd700']

export default function Confetti({ active }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    if (!active) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 130 }, () => ({
      x:        Math.random() * canvas.width,
      y:        -Math.random() * 300 - 10,
      w:        Math.random() * 10 + 4,
      h:        Math.random() * 5 + 2,
      color:    COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      vy:       Math.random() * 3 + 1.5,
      vx:       (Math.random() - 0.5) * 2.5,
      opacity:  1,
    }))

    const startTime = Date.now()

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const elapsed = (Date.now() - startTime) / 1000

      let alive = false
      particles.forEach(p => {
        p.y        += p.vy
        p.x        += p.vx
        p.rotation += p.rotSpeed
        if (elapsed > 2.5) p.opacity -= 0.01
        p.opacity = Math.max(0, p.opacity)

        if (p.y < canvas.height + 20 && p.opacity > 0) alive = true

        ctx.save()
        ctx.globalAlpha = p.opacity
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })

      if (alive) {
        rafRef.current = requestAnimationFrame(draw)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [active])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 5000,
      }}
    />
  )
}
