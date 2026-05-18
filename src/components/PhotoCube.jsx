import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'
import { memories } from '../data/data'

const FACES = memories.slice(0, 6)
const SZ = 220   // cube face edge length in px

const FACE_TRANSFORMS = [
  `translateZ(${SZ / 2}px)`,                          // front
  `rotateY(180deg) translateZ(${SZ / 2}px)`,          // back
  `rotateY( 90deg) translateZ(${SZ / 2}px)`,          // right
  `rotateY(-90deg) translateZ(${SZ / 2}px)`,          // left
  `rotateX( 90deg) translateZ(${SZ / 2}px)`,          // top
  `rotateX(-90deg) translateZ(${SZ / 2}px)`,          // bottom
]

export default function PhotoCube() {
  const rotX   = useMotionValue(18)
  const rotY   = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 55, damping: 22 })
  const springY = useSpring(rotY, { stiffness: 55, damping: 22 })

  const dragging  = useRef(false)
  const last      = useRef({ x: 0, y: 0 })
  const autoAngle = useRef(0)
  const autoRef   = useRef(null)
  const [hoveredFace, setHoveredFace] = useState(null)

  // Auto-rotate when idle
  useEffect(() => {
    autoRef.current = setInterval(() => {
      if (!dragging.current) {
        autoAngle.current += 0.35
        rotY.set(autoAngle.current)
      }
    }, 16)
    return () => clearInterval(autoRef.current)
  }, [rotY])

  const onPointerDown = (e) => {
    dragging.current = true
    last.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - last.current.x
    const dy = e.clientY - last.current.y
    autoAngle.current = rotY.get()          // sync so auto-rotate continues smoothly
    rotY.set(rotY.get() + dx * 0.55)
    rotX.set(Math.max(-65, Math.min(65, rotX.get() - dy * 0.55)))
    last.current = { x: e.clientX, y: e.clientY }
  }
  const onPointerUp = () => { dragging.current = false }

  return (
    <section id="cube" style={{ padding: '110px 24px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            Six Sides · Infinite Memories
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700 }}>
            Memory Cube
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15 }}>
            Drag to spin &nbsp;·&nbsp; Every face is a memory
          </p>
        </div>

        {/* Cube viewport */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 340 }}>
          <div
            style={{ perspective: 900, width: SZ, height: SZ, cursor: 'grab' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            <motion.div
              style={{
                width: SZ,
                height: SZ,
                position: 'relative',
                transformStyle: 'preserve-3d',
                rotateX: springX,
                rotateY: springY,
              }}
            >
              {FACE_TRANSFORMS.map((transform, i) => (
                <motion.div
                  key={i}
                  onPointerEnter={() => setHoveredFace(i)}
                  onPointerLeave={() => setHoveredFace(null)}
                  animate={{ boxShadow: hoveredFace === i ? `0 0 40px ${FACES[i] ? '#E8A87C' : 'transparent'}90` : '0 0 0px transparent' }}
                  style={{
                    position: 'absolute',
                    width: SZ, height: SZ,
                    transform,
                    overflow: 'hidden',
                    borderRadius: 10,
                    border: '2px solid rgba(232,168,124,0.35)',
                    backfaceVisibility: 'visible',
                  }}
                >
                  <img
                    src={FACES[i].img}
                    alt={FACES[i].caption}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', userSelect: 'none', pointerEvents: 'none' }}
                    draggable={false}
                  />
                  {/* Caption overlay */}
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.82), transparent)',
                    padding: '20px 10px 8px',
                    textAlign: 'center',
                    color: '#fff', fontSize: 11, letterSpacing: 0.5,
                    pointerEvents: 'none',
                  }}>
                    {FACES[i].caption}
                    <div style={{ color: '#E8A87C', fontSize: 10, marginTop: 2 }}>{FACES[i].year}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Face labels */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 48 }}>
          {FACES.map((m, i) => (
            <motion.span
              key={m.id}
              whileHover={{ scale: 1.06, y: -2 }}
              style={{
                background: 'rgba(232,168,124,0.1)',
                border: '1px solid rgba(232,168,124,0.25)',
                borderRadius: 20, padding: '5px 14px',
                fontSize: 12, color: 'rgba(255,255,255,0.65)',
              }}
            >
              {i + 1}. {m.caption}
            </motion.span>
          ))}
        </div>

      </div>
    </section>
  )
}
