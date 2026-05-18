import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { friends } from '../data/data'

// ─── Constellation layout (normalized 0–1) ───────────────────────────────────
const STAR_POS = [
  { x: 0.50, y: 0.20 },  // Sandeep  — top centre
  { x: 0.20, y: 0.48 },  // Nishnath — far left
  { x: 0.80, y: 0.44 },  // Saran    — far right
  { x: 0.34, y: 0.76 },  // Jagan    — bottom left
  { x: 0.66, y: 0.72 },  // Aswin    — bottom right
]

const LINES = [[0,1],[0,2],[1,3],[2,4],[3,4],[1,2],[0,3],[0,4]]

export default function ConstellationMap() {
  const canvasRef = useRef(null)
  const rotRef    = useRef({ x: 0, y: 0 })
  const dragRef   = useRef({ active: false, lx: 0, ly: 0 })
  const [hovered, setHovered] = useState(null)

  // ── Canvas animation ──────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    let W = 0, H = 0, raf

    const bgStars = Array.from({ length: 160 }, () => ({
      bx: Math.random(), by: Math.random(),
      r:  Math.random() * 1.5 + 0.2,
      a:  Math.random() * 0.55 + 0.12,
      ph: Math.random() * Math.PI * 2,
      sp: Math.random() * 0.012 + 0.003,
    }))

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, W, H)

      const px = rotRef.current.x * 0.006
      const py = rotRef.current.y * 0.006

      // Twinkling background stars (parallax with drag)
      bgStars.forEach(s => {
        const sx = ((s.bx + px * 0.06) % 1 + 1) % 1 * W
        const sy = ((s.by + py * 0.06) % 1 + 1) % 1 * H
        const a  = s.a * (0.6 + 0.4 * Math.sin(t * s.sp * 60 + s.ph))
        ctx.beginPath()
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,238,210,${a})`
        ctx.fill()
      })

      // Projected screen positions (parallax shift, not full 3D rotation)
      const pts = STAR_POS.map(pos => ({
        x: pos.x * W + rotRef.current.x * 0.14,
        y: pos.y * H + rotRef.current.y * 0.14,
      }))

      // Animated dashed constellation lines
      ctx.save()
      LINES.forEach(([a, b]) => {
        ctx.beginPath()
        ctx.setLineDash([5, 13])
        ctx.lineDashOffset = -(t * 16)
        ctx.moveTo(pts[a].x, pts[a].y)
        ctx.lineTo(pts[b].x, pts[b].y)
        ctx.strokeStyle = 'rgba(232,168,124,0.22)'
        ctx.lineWidth = 1.2
        ctx.stroke()
      })
      // Mid-point glow dots
      LINES.forEach(([a, b]) => {
        const mx = (pts[a].x + pts[b].x) / 2
        const my = (pts[a].y + pts[b].y) / 2
        ctx.beginPath()
        ctx.arc(mx, my, 1.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(232,168,124,${0.12 + 0.14 * Math.sin(t * 1.4)})`
        ctx.fill()
      })
      ctx.restore()

      // Star halos + sparkle rays around each friend position
      pts.forEach((p, i) => {
        const f     = friends[i]
        const pulse = 0.72 + 0.28 * Math.sin(t * 1.7 + i * 1.1)

        // Outer glow gradient
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 52 * pulse)
        grad.addColorStop(0,   `${f.color}38`)
        grad.addColorStop(0.5, `${f.color}14`)
        grad.addColorStop(1,   'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, 52 * pulse, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // 4 main sparkle rays
        for (let s = 0; s < 4; s++) {
          const angle = s * (Math.PI / 2) + t * 0.38
          const inner = 24, outer = inner + 10 + 7 * Math.sin(t * 2.1 + s)
          ctx.beginPath()
          ctx.moveTo(p.x + Math.cos(angle) * inner, p.y + Math.sin(angle) * inner)
          ctx.lineTo(p.x + Math.cos(angle) * outer, p.y + Math.sin(angle) * outer)
          ctx.strokeStyle = `${f.color}80`
          ctx.lineWidth = 1.8
          ctx.stroke()
        }
        // 4 diagonal soft rays
        for (let s = 0; s < 4; s++) {
          const angle = s * (Math.PI / 2) + Math.PI / 4 + t * 0.38
          const inner = 16, outer = inner + 6 + 3 * Math.sin(t * 2.1 + s + 1)
          ctx.beginPath()
          ctx.moveTo(p.x + Math.cos(angle) * inner, p.y + Math.sin(angle) * inner)
          ctx.lineTo(p.x + Math.cos(angle) * outer, p.y + Math.sin(angle) * outer)
          ctx.strokeStyle = `${f.color}40`
          ctx.lineWidth = 0.9
          ctx.stroke()
        }
      })

      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  // ── Drag handlers ─────────────────────────────────────────────────────────
  const onPointerDown = (e) => {
    dragRef.current = { active: true, lx: e.clientX, ly: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!dragRef.current.active) return
    rotRef.current.x += (e.clientX - dragRef.current.lx)
    rotRef.current.y += (e.clientY - dragRef.current.ly)
    rotRef.current.x  = Math.max(-200, Math.min(200, rotRef.current.x))
    rotRef.current.y  = Math.max(-120, Math.min(120, rotRef.current.y))
    dragRef.current.lx = e.clientX
    dragRef.current.ly = e.clientY
  }
  const onPointerUp = () => { dragRef.current.active = false }

  return (
    <section id="constellation" style={{ padding: '110px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            Written in the Stars
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700 }}>
            Our Constellation
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15 }}>
            Drag to pan the star map &nbsp;·&nbsp; Hover a star to identify
          </p>
        </div>

        {/* Stage */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            position: 'relative', width: '100%', height: 520,
            borderRadius: 28,
            background: 'radial-gradient(ellipse at 35% 30%, #100820 0%, #040309 70%)',
            border: '1px solid rgba(232,168,124,0.10)',
            overflow: 'hidden', cursor: 'grab',
          }}
        >
          {/* Canvas (bg stars + lines + halos) */}
          <canvas
            ref={canvasRef}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          />

          {/* Friend avatar overlays at fixed star positions */}
          {STAR_POS.map((pos, i) => {
            const f = friends[i]
            return (
              <motion.div
                key={f.id}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                whileHover={{ scale: 1.28 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                style={{
                  position: 'absolute',
                  left: `${pos.x * 100}%`, top: `${pos.y * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 56, height: 56,
                  borderRadius: '50%', overflow: 'hidden',
                  border: `3px solid ${f.color}`,
                  boxShadow: `0 0 22px ${f.color}80, 0 0 55px ${f.color}28`,
                  zIndex: 5, cursor: 'pointer',
                }}
              >
                <img src={f.img} alt={f.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', userSelect: 'none' }}
                  draggable={false}
                />
              </motion.div>
            )
          })}

          {/* Hover tooltip */}
          <AnimatePresence>
            {hovered !== null && (
              <motion.div
                key={hovered}
                initial={{ opacity: 0, y: 10, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 0.16 }}
                style={{
                  position: 'absolute',
                  left: `${STAR_POS[hovered].x * 100}%`,
                  top: `calc(${STAR_POS[hovered].y * 100}% - 82px)`,
                  transform: 'translateX(-50%)',
                  background: 'rgba(6,4,14,0.96)',
                  border: `1px solid ${friends[hovered].color}55`,
                  borderRadius: 16, padding: '12px 20px',
                  textAlign: 'center', zIndex: 20,
                  pointerEvents: 'none',
                  backdropFilter: 'blur(20px)',
                  minWidth: 155,
                }}
              >
                <div style={{ fontSize: 20, marginBottom: 4 }}>{friends[hovered].emoji}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: friends[hovered].color }}>
                  {friends[hovered].name.split(' ')[0]}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 3 }}>
                  {friends[hovered].zodiac} · {friends[hovered].nickname}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 6, fontStyle: 'italic', lineHeight: 1.4 }}>
                  "{friends[hovered].traits[0]}, {friends[hovered].traits[1]}"
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom legend */}
          <div style={{
            position: 'absolute', bottom: 18, left: 0, right: 0,
            display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {friends.map(f => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.color, boxShadow: `0 0 7px ${f.color}` }} />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)' }}>{f.name.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
