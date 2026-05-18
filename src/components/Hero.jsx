import { useEffect, useRef, useMemo } from 'react'
import { motion, useMotionValue, useTransform, useSpring, animate, useInView } from 'framer-motion'

// ── Animated counter for hero stats ─────────────────────────────────────────
function StatCounter({ numericTo, suffix = '', symbol, label }) {
  const ref    = useRef(null)
  const numRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (!inView || symbol) return
    // Start after hero GSAP entry animation (~1.9 s)
    const timer = setTimeout(() => {
      if (!numRef.current) return
      const ctrl = animate(0, numericTo, {
        duration: 1.8,
        ease: 'easeOut',
        onUpdate: v => { if (numRef.current) numRef.current.textContent = Math.round(v) + suffix },
      })
      return () => ctrl.stop()
    }, 1900)
    return () => clearTimeout(timer)
  }, [inView, numericTo, suffix, symbol])

  return (
    <div ref={ref} className="hero-stat" style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 38, fontWeight: 700, color: '#E8A87C' }}>
        {symbol
          ? <motion.span initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.9, duration: 0.8 }}>{symbol}</motion.span>
          : <span ref={numRef}>0{suffix}</span>
        }
      </div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.38)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 2 }}>
        {label}
      </div>
    </div>
  )
}
import { gsap } from '../lib/gsap'
import { friends } from '../data/data'

export default function Hero({ scrollTo }) {
  const heroRef  = useRef(null)
  const mouseX   = useMotionValue(0.5)
  const mouseY   = useMotionValue(0.5)
  const springCfg = { stiffness: 40, damping: 18 }
  const spX      = useSpring(mouseX, springCfg)
  const spY      = useSpring(mouseY, springCfg)
  const rotateX  = useTransform(spY, [0, 1], [8, -8])
  const rotateY  = useTransform(spX, [0, 1], [-8, 8])

  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x:    Math.random() * 100,
      y:    Math.random() * 100,
      size: Math.random() * 5 + 2,
      dur:  Math.random() * 8 + 5,
      del:  Math.random() * 5,
    })), [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.hc', {
        y: 80, opacity: 0, duration: 0.7, stagger: 0.028, ease: 'power4.out',
      })
      .from('.hero-sub',  { y: 24, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .from('.hero-cta',  { y: 18, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from('.hero-stat', { y: 16, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.4')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e) => {
    if (!heroRef.current) return
    const r = heroRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width)
    mouseY.set((e.clientY - r.top) / r.height)
  }
  const handleMouseLeave = () => { mouseX.set(0.5); mouseY.set(0.5) }

  const title = 'Forever Five'

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        justifyContent: 'center', position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse at 20% 50%, #1a1008 0%, #0a0806 65%)',
      }}
    >
      {/* Floating particles */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute',
          left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size,
          borderRadius: '50%',
          background: p.id % 3 === 0 ? '#E8A87C' : p.id % 3 === 1 ? '#F7C59F' : '#C3B1E1',
          animation: `float ${p.dur}s ease-in-out ${p.del}s infinite`,
          pointerEvents: 'none',
        }} />
      ))}

      {/* Gradient rings */}
      {[260, 370, 490].map((sz, i) => (
        <div key={sz} style={{
          position: 'absolute',
          width: sz, height: sz,
          borderRadius: '50%',
          border: `1px solid rgba(232,168,124,${0.09 - i * 0.025})`,
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Orbiting avatar ring */}
      <div
        className="orbit-ring"
        style={{
          position: 'absolute',
          width: 500, height: 500,
          borderRadius: '50%',
          border: '1px solid rgba(232,168,124,0.08)',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          pointerEvents: 'none',
        }}
      >
        {friends.map((f, i) => (
          <div
            key={f.id}
            className={`orbit-avatar orbit-${i}`}
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: 44, height: 44,
              marginLeft: -22, marginTop: -22,
              borderRadius: '50%', overflow: 'hidden',
              border: `3px solid ${f.color}`,
              boxShadow: `0 0 18px ${f.color}70`,
            }}
          >
            <img
              src={f.img} alt={f.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {/* 3-D tilt card */}
      <div style={{ perspective: '1200px', zIndex: 10 }}>
        <motion.div
          style={{
            rotateX, rotateY,
            textAlign: 'center',
            maxWidth: 720,
            padding: '0 24px',
          }}
        >
          {/* Title with per-character split for GSAP */}
          <div className="hero-title" style={{
            fontSize: 'clamp(50px, 9vw, 102px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700, lineHeight: 1.08,
            marginBottom: 18, overflow: 'hidden',
          }}>
            <div style={{
              background: 'linear-gradient(135deg,#E8A87C 0%,#F7C59F 38%,#C3B1E1 75%,#E8A87C 100%)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 4.5s linear infinite',
              display: 'inline-block',
            }}>
              {title.split('').map((ch, i) => (
                <span key={i} className="hc" style={{ display: 'inline-block' }}>
                  {ch === ' ' ? '\u00A0' : ch}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <div className="hero-sub" style={{
            fontSize: 'clamp(13px, 2.2vw, 19px)',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: 3, fontWeight: 300,
            marginBottom: 44, textTransform: 'uppercase',
          }}>
            Not just friends. A whole universe.
          </div>

          {/* CTA buttons */}
          <div className="hero-cta" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
            <motion.button
              whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('squad')}
              style={{
                background: 'linear-gradient(135deg,#E8A87C,#F7C59F)',
                color: '#0a0806', border: 'none', borderRadius: 50,
                padding: '13px 34px', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', letterSpacing: 0.5,
                fontFamily: "'Lato', sans-serif",
                animation: 'pulseGlow 2.5s ease infinite',
              }}
            >
              Meet the Squad ↓
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.06, background: 'rgba(232,168,124,0.12)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollTo('memories')}
              style={{
                background: 'transparent', color: '#E8A87C',
                border: '1px solid rgba(232,168,124,0.4)',
                borderRadius: 50, padding: '13px 34px', fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: "'Lato', sans-serif",
              }}
            >
              Our Memories ✨
            </motion.button>
          </div>

          {/* Animated stats */}
          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
            <StatCounter numericTo={5}  suffix=""  label="Friends" />
            <StatCounter numericTo={4}  suffix="+" label="Years" />
            <StatCounter symbol="∞"               label="Memories" />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 38, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        color: 'rgba(255,255,255,0.28)', fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
      }}>
        <span>Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 38, background: 'linear-gradient(to bottom,#E8A87C,transparent)' }}
        />
      </div>
    </section>
  )
}
