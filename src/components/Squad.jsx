import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { gsap } from '../lib/gsap'
import { friends } from '../data/data'

// ── 3D Flip Card ────────────────────────────────────────────────────────────
function FriendCard({ friend }) {
  const [flipped, setFlipped] = useState(false)

  // Tilt only active when not flipped
  const cardRef = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const cfg = { stiffness: 200, damping: 28 }
  const spX = useSpring(mx, cfg)
  const spY = useSpring(my, cfg)
  const tiltX = useTransform(spY, [0, 1], [10, -10])
  const tiltY = useTransform(spX, [0, 1], [-10, 10])

  const onMove = (e) => {
    if (flipped || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => { mx.set(0.5); my.set(0.5) }

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="squad-card"
      style={{ perspective: '900px', height: 380 }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 18 }}
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          // tilt only on front
          rotateX: flipped ? 0 : tiltX,
          rotateY: flipped ? 180 : tiltY,
        }}
        whileHover={flipped ? {} : { y: -8, boxShadow: `0 24px 60px ${friend.color}25` }}
        onClick={() => setFlipped(f => !f)}
      >
        {/* ── FRONT FACE ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${friend.color}40`,
          borderRadius: 24, padding: '28px 26px',
          overflow: 'hidden', cursor: 'pointer',
        }}>
          {/* Radial glow */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `radial-gradient(circle at top left, ${friend.color}18, transparent 65%)`,
            pointerEvents: 'none',
          }} />

          {/* Avatar + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
              border: `3px solid ${friend.color}`, boxShadow: `0 0 22px ${friend.color}60`,
            }}>
              <img src={friend.img} alt={friend.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div style={{ fontSize: 22, marginBottom: 2 }}>{friend.emoji}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700 }}>{friend.name}</div>
              <div style={{ fontSize: 11, color: friend.color, fontWeight: 700, letterSpacing: 1.2 }}>
                {friend.nickname.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Traits */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
            {friend.traits.map(t => (
              <span key={t} style={{
                background: `${friend.color}22`, color: friend.color,
                border: `1px solid ${friend.color}45`,
                borderRadius: 20, padding: '3px 11px', fontSize: 11, fontWeight: 600,
              }}>{t}</span>
            ))}
          </div>

          {/* Quote */}
          <div style={{
            fontSize: 13, color: 'rgba(255,255,255,0.7)',
            fontStyle: 'italic', lineHeight: 1.6, marginBottom: 14,
          }}>
            "{friend.quote}"
          </div>

          {/* Flip hint */}
          <div style={{
            position: 'absolute', bottom: 12, right: 16,
            fontSize: 10, color: `${friend.color}70`,
            letterSpacing: 1.5, textTransform: 'uppercase',
          }}>
            tap to flip ↻
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: `linear-gradient(135deg, ${friend.color}22 0%, rgba(15,10,6,0.96) 60%)`,
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          border: `1px solid ${friend.color}55`,
          borderRadius: 24, padding: '32px 26px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          overflow: 'hidden', cursor: 'pointer',
        }}>
          {/* Large emoji watermark */}
          <div style={{
            position: 'absolute', fontSize: 110, opacity: 0.06,
            top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            pointerEvents: 'none', userSelect: 'none',
          }}>{friend.emoji}</div>

          {/* Content */}
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, marginBottom: 6, color: friend.color }}>
            {friend.name}
          </div>
          <div style={{ fontSize: 12, color: `${friend.color}90`, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 22 }}>
            {friend.role}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18 }}>♑</span>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Zodiac</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)' }}>{friend.zodiac}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ fontSize: 18 }}>✦</span>
              <div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>Fun Fact</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>{friend.funFact}</div>
              </div>
            </div>

            <div style={{
              marginTop: 8, fontStyle: 'italic', fontSize: 12,
              color: 'rgba(255,255,255,0.55)', lineHeight: 1.6,
              borderTop: `1px solid ${friend.color}25`, paddingTop: 14,
            }}>
              "{friend.quote}"
            </div>
          </div>

          {/* Flip back hint */}
          <div style={{
            position: 'absolute', bottom: 12, right: 16,
            fontSize: 10, color: `${friend.color}70`,
            letterSpacing: 1.5, textTransform: 'uppercase',
          }}>
            tap to flip ↺
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Squad() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.squad-card', {
        opacity: 0, y: 70, duration: 0.85,
        stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="squad" ref={sectionRef} style={{ padding: '110px 24px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
          The Ones Who Matter
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700,
        }}>
          Meet the Squad
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15, maxWidth: 380, margin: '12px auto 0' }}>
          Five different souls. One unstoppable story.
        </p>
      </div>

      {/* Cards grid */}
      <div
        className="squad-grid"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}
      >
        {friends.map(f => <FriendCard key={f.id} friend={f} />)}
      </div>
    </section>
  )
}
