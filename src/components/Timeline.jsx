import { useRef, useEffect } from 'react'
import { gsap } from '../lib/gsap'
import { timeline } from '../data/data'

export default function Timeline() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Spine line draw
      gsap.from('.tl-spine', {
        scaleY: 0, transformOrigin: 'top center', duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })

      // Each timeline item
      gsap.utils.toArray('.tl-item').forEach((el, i) => {
        const dir = i % 2 === 0 ? -60 : 60
        gsap.from(el, {
          opacity: 0, x: dir, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' },
        })
      })

      // Dots
      gsap.from('.tl-dot', {
        scale: 0, duration: 0.5, stagger: 0.2, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" ref={sectionRef} style={{ padding: '110px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 72 }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
          The Journey
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700,
        }}>
          Our Story
        </h2>
      </div>

      {/* Timeline body */}
      <div style={{ maxWidth: 760, margin: '0 auto', position: 'relative' }}>
        {/* Spine */}
        <div
          className="tl-spine"
          style={{
            position: 'absolute', left: '50%', top: 0, bottom: 0,
            width: 1,
            background: 'linear-gradient(to bottom, transparent, #E8A87C70, #E8A87C70, transparent)',
            transform: 'translateX(-50%)',
          }}
        />

        {timeline.map((item, i) => (
          <div
            key={item.year}
            className="tl-item timeline-card"
            style={{
              display: 'flex',
              justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end',
              marginBottom: 64, position: 'relative',
            }}
          >
            {/* Centre dot */}
            <div
              className="tl-dot"
              style={{
                position: 'absolute', left: '50%', top: 22,
                width: 14, height: 14, borderRadius: '50%',
                background: '#E8A87C',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 22px #E8A87C90', zIndex: 2,
              }}
            />
            {/* Icon badge */}
            <div style={{
              position: 'absolute', left: '50%', top: -4,
              transform: 'translate(-50%, 0)',
              zIndex: 3, fontSize: 22, lineHeight: 1,
            }}>
              {item.icon}
            </div>

            {/* Card */}
            <div
              style={{
                width: '44%',
                background: 'rgba(255,255,255,0.04)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(232,168,124,0.14)',
                borderRadius: 16, padding: '22px 26px',
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(232,168,124,0.4)'
                e.currentTarget.style.background = 'rgba(232,168,124,0.07)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(232,168,124,0.14)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
              }}
            >
              <div style={{
                color: '#E8A87C', fontWeight: 700, fontSize: 12,
                letterSpacing: 2.5, marginBottom: 8,
              }}>
                {item.year}
              </div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 20, fontWeight: 700, marginBottom: 10,
              }}>
                {item.title}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.58)', fontSize: 14, lineHeight: 1.65 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
