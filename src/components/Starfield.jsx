import { useEffect, useRef } from 'react'

const NUM_STARS = 320

export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const mouse = { x: 0, y: 0 }
    let W, H, raf

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()

    // Build stars: each has 3D coords + speed
    const stars = Array.from({ length: NUM_STARS }, () => makestar(W, H))
    function makestar(w, h) {
      return {
        x: (Math.random() - 0.5) * w * 2,
        y: (Math.random() - 0.5) * h * 2,
        z: Math.random() * 90 + 10,   // depth 10-100 (10 = near, 100 = far)
        speed: Math.random() * 0.18 + 0.04,
      }
    }

    const onMouse = (e) => {
      mouse.x = e.clientX / W - 0.5
      mouse.y = e.clientY / H - 0.5
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      const mx = mouse.x * 55
      const my = mouse.y * 55

      for (const s of stars) {
        // Perspective projection
        const persp = 100 / s.z
        const px = (s.x + mx * (1 - s.z / 100)) * persp + W / 2
        const py = (s.y + my * (1 - s.z / 100)) * persp + H / 2

        if (px < -2 || px > W + 2 || py < -2 || py > H + 2) {
          // Recycle off-screen stars
          s.z -= s.speed
          if (s.z <= 0) { Object.assign(s, makestar(W, H)) }
          continue
        }

        const nearness  = 1 - s.z / 100            // 0=far, 1=near
        const radius    = Math.max(0.4, nearness * 2.5)
        const alpha     = Math.max(0.07, nearness * 0.75)
        const warmR     = 255
        const warmG     = Math.round(210 + nearness * 30)
        const warmB     = Math.round(130 + nearness * 110)

        ctx.beginPath()
        ctx.arc(px, py, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${warmR},${warmG},${warmB},${alpha})`
        ctx.fill()

        // Bright stars get a subtle glow
        if (nearness > 0.8) {
          ctx.beginPath()
          ctx.arc(px, py, radius * 2.6, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${warmR},${warmG},${warmB},${alpha * 0.18})`
          ctx.fill()
        }

        // Move star toward viewer
        s.z -= s.speed
        if (s.z <= 0) Object.assign(s, makestar(W, H))
      }

      raf = requestAnimationFrame(draw)
    }

    window.addEventListener('mousemove', onMouse)
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.55,
      }}
    />
  )
}
