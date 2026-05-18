import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { friends } from '../data/data'

// ─── Room objects — one per friend ───────────────────────────────────────────
const ITEMS = [
  { fi: 0, emoji: '💡', label: 'The Whiteboard',  desc: 'Plans, schemes & big ideas',  x: '38%', y: '42%' },
  { fi: 1, emoji: '🎵', label: 'Music Corner',    desc: 'Where the vibe is born',       x: '68%', y: '36%' },
  { fi: 2, emoji: '🗺️', label: 'Adventure Wall',  desc: 'Every trip pinned here',       x: '18%', y: '52%' },
  { fi: 3, emoji: '📚', label: 'The Reading Nook', desc: 'Deep thoughts live here',     x: '52%', y: '64%' },
  { fi: 4, emoji: '🍕', label: 'The Food Spot',   desc: 'Always something cooking',     x: '80%', y: '56%' },
]

export default function Diorama3DRoom() {
  const [active, setActive] = useState(null)
  const containerRef = useRef(null)

  // Mouse tilt
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotY = useSpring(mx, { stiffness: 40, damping: 18 })
  const rotX = useSpring(my, { stiffness: 40, damping: 18 })

  const onMouseMove = (e) => {
    if (!containerRef.current) return
    const r = containerRef.current.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width  - 0.5   // -0.5 to 0.5
    const ny = (e.clientY - r.top)  / r.height - 0.5
    mx.set(nx *  12)   // ±6 deg
    my.set(ny * -10)
  }
  const onMouseLeave = () => { mx.set(0); my.set(0) }

  return (
    <section id="room" style={{ padding: '110px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            The Hangout Spot
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700 }}>
            Our 3D Room
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15 }}>
            Move your mouse around &nbsp;·&nbsp; Hover the objects to discover
          </p>
        </div>

        {/* Perspective wrapper */}
        <div style={{ perspective: 1100, perspectiveOrigin: '50% 50%' }}>
          <motion.div
            ref={containerRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{
              position: 'relative',
              maxWidth: 820, height: 480,
              margin: '0 auto',
              transformStyle: 'preserve-3d',
              rotateX: rotX,
              rotateY: rotY,
            }}
          >

            {/* ── Back wall ───────────────────────────────────────────────── */}
            <div style={{
              position: 'absolute', inset: 0,
              transform: 'translateZ(-200px)',
              background: 'linear-gradient(160deg, #12082a 0%, #0a0618 55%, #0e0b1f 100%)',
              borderRadius: 8,
              overflow: 'hidden',
            }}>
              {/* Window */}
              <div style={{
                position: 'absolute', top: 32, left: '50%', transform: 'translateX(-50%)',
                width: 150, height: 120,
                background: 'linear-gradient(135deg, #1a1040 0%, #0d0828 100%)',
                border: '4px solid rgba(232,168,124,0.25)',
                borderRadius: 8,
                overflow: 'hidden',
                boxShadow: '0 0 40px rgba(195,177,225,0.15) inset',
              }}>
                {/* Moon */}
                <div style={{
                  position: 'absolute', top: 14, right: 22,
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #f5e6c8, #c4a96e)',
                  boxShadow: '0 0 20px rgba(245,230,200,0.5)',
                }} />
                {/* Stars in window */}
                {[{t:8,l:14},{t:22,l:42},{t:38,l:28},{t:12,l:68},{t:44,l:78}].map((p,i)=>(
                  <div key={i} style={{
                    position:'absolute', top:p.t, left:p.l,
                    width:2, height:2, borderRadius:'50%',
                    background:'#fff', opacity:0.6,
                  }}/>
                ))}
                {/* Window frame cross */}
                <div style={{ position:'absolute', inset:0, borderRight:'2px solid rgba(232,168,124,0.2)', width:'50%' }} />
                <div style={{ position:'absolute', inset:0, borderBottom:'2px solid rgba(232,168,124,0.2)', height:'50%' }} />
              </div>

              {/* Wall decorations */}
              <div style={{
                position: 'absolute', bottom: 20, left: 30,
                fontSize: 11, color: 'rgba(232,168,124,0.25)',
                letterSpacing: 3, textTransform: 'uppercase',
              }}>
                Forever Five &nbsp;🤍
              </div>
              {/* Fairy lights */}
              <div style={{ position:'absolute', top: 14, left: 0, right: 0, display:'flex', justifyContent:'space-around' }}>
                {Array.from({length:16},(_,i)=>(
                  <motion.div key={i}
                    animate={{ opacity:[0.3,1,0.3], scale:[0.8,1,0.8] }}
                    transition={{ duration:1.5+i*0.1, repeat:Infinity, delay:i*0.09 }}
                    style={{
                      width:7, height:7, borderRadius:'50%',
                      background: friends[i % 5].color,
                      boxShadow:`0 0 8px ${friends[i%5].color}`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* ── Left wall ───────────────────────────────────────────────── */}
            <div style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: 200,
              transformOrigin: 'left center',
              transform: 'rotateY(90deg)',
              background: 'linear-gradient(to right, #0e0824 0%, #0a0618 100%)',
              borderLeft: '1px solid rgba(232,168,124,0.08)',
            }}>
              {/* Photo frames on left wall */}
              {[0,1,2].map(i => (
                <div key={i} style={{
                  position: 'absolute',
                  top: 40 + i * 120, left: 30,
                  width: 50, height: 60,
                  border: '2px solid rgba(232,168,124,0.2)',
                  borderRadius: 4, overflow: 'hidden',
                  background: 'rgba(0,0,0,0.4)',
                }}>
                  <img src={friends[i].img} alt={friends[i].name}
                    style={{ width:'100%', height:'100%', objectFit:'cover', opacity:0.6 }}
                  />
                </div>
              ))}
            </div>

            {/* ── Floor ───────────────────────────────────────────────────── */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              height: 220,
              transformOrigin: 'center bottom',
              transform: 'rotateX(-90deg)',
              background: [
                'repeating-linear-gradient(90deg, rgba(232,168,124,0.04) 0px, transparent 1px, transparent 59px, rgba(232,168,124,0.04) 60px)',
                'repeating-linear-gradient(0deg,  rgba(232,168,124,0.04) 0px, transparent 1px, transparent 59px, rgba(232,168,124,0.04) 60px)',
                'linear-gradient(to top, #1a0e05 0%, #120a04 100%)',
              ].join(','),
            }} />

            {/* ── Ceiling ─────────────────────────────────────────────────── */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 80,
              transformOrigin: 'center top',
              transform: 'rotateX(90deg)',
              background: 'linear-gradient(to bottom, #0a0618, transparent)',
            }} />

            {/* ── Room objects ─────────────────────────────────────────────── */}
            {ITEMS.map((item, i) => {
              const f = friends[item.fi]
              const isActive = active === i
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: item.x, top: item.y,
                    transform: 'translate(-50%, -50%)',
                    zIndex: isActive ? 30 : 10,
                  }}
                >
                  <motion.div
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    whileHover={{ y: -22, scale: 1.15 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                  >
                    {/* Object platform */}
                    <div style={{
                      width: 68, height: 68,
                      borderRadius: 18,
                      background: `linear-gradient(135deg, ${f.color}20, rgba(15,10,6,0.9))`,
                      border: `2px solid ${f.color}${isActive ? 'cc' : '40'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 30,
                      boxShadow: isActive ? `0 16px 48px ${f.color}40, 0 0 0 4px ${f.color}20` : `0 8px 24px rgba(0,0,0,0.5)`,
                      transition: 'box-shadow 0.3s, border-color 0.3s',
                    }}>
                      {item.emoji}
                    </div>
                    <div style={{
                      fontSize: 10, color: f.color,
                      letterSpacing: 1.2, textTransform: 'uppercase',
                      marginTop: 6, fontWeight: 700,
                    }}>
                      {f.name.split(' ')[0]}
                    </div>

                    {/* Shadow on "floor" */}
                    <div style={{
                      width: 50, height: 10,
                      background: `radial-gradient(ellipse, ${f.color}30, transparent 70%)`,
                      margin: '4px auto 0',
                      borderRadius: '50%',
                    }} />
                  </motion.div>

                  {/* Hover card */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.88 }}
                        style={{
                          position: 'absolute',
                          bottom: '110%', left: '50%',
                          transform: 'translateX(-50%)',
                          background: 'rgba(8,5,18,0.97)',
                          border: `1px solid ${f.color}55`,
                          borderRadius: 16, padding: '14px 18px',
                          minWidth: 180, textAlign: 'center',
                          pointerEvents: 'none',
                          backdropFilter: 'blur(20px)',
                          boxShadow: `0 20px 60px ${f.color}25`,
                        }}
                      >
                        <div style={{ fontSize: 24, marginBottom: 6 }}>{item.emoji}</div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 700, color: f.color }}>
                          {item.label}
                        </div>
                        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 5 }}>
                          {item.desc}
                        </div>
                        <div style={{
                          marginTop: 10, paddingTop: 8,
                          borderTop: `1px solid ${f.color}25`,
                          fontSize: 11, color: f.color,
                          letterSpacing: 1, textTransform: 'uppercase',
                        }}>
                          {f.name.split(' ')[0]} · {f.role.split(' ').slice(0,3).join(' ')}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}

            {/* Ambient room glow */}
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at 50% 85%, rgba(232,168,124,0.04), transparent 60%)',
            }} />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
