import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import saranImg from '../images/saran.jpeg'

const traits = ['Bold', 'Adventurous', 'Loyal']

export default function SaranSpotlight() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Parallax: image moves up slower than scroll
  const rawY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const imgY = useSpring(rawY, { stiffness: 60, damping: 20 })

  // Fade out text as user scrolls past
  const textOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 1, 0])
  const textY       = useTransform(scrollYProgress, [0, 1], ['0px', '-40px'])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Parallax photo with Ken Burns ── */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-15% 0',          // extra height for parallax headroom
          y: imgY,
          willChange: 'transform',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${saranImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            animation: 'kenBurns 18s ease-in-out infinite alternate',
          }}
        />
      </motion.div>

      {/* ── Gradient overlays ── */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(13,11,9,0.35) 0%, rgba(13,11,9,0.15) 40%, rgba(13,11,9,0.75) 80%, rgba(13,11,9,1) 100%)',
        zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse at 70% 50%, rgba(181,196,177,0.08) 0%, transparent 65%)',
        zIndex: 1,
      }} />

      {/* ── Animated text content ── */}
      <motion.div
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          opacity: textOpacity,
          y: textY,
          padding: '0 24px',
        }}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: '0.3em' }}
          whileInView={{ opacity: 1, letterSpacing: '0.5em' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{
            fontSize: 11, color: '#B5C4B1',
            textTransform: 'uppercase', marginBottom: 18,
            fontFamily: "'Lato', sans-serif", fontWeight: 300,
          }}
        >
          The Captain ⚡
        </motion.div>

        {/* Name */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(48px, 9vw, 110px)',
            fontWeight: 700,
            lineHeight: 1,
            marginBottom: 28,
            textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}
        >
          Saran Raj
        </motion.h2>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeOut' }}
          viewport={{ once: true }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(16px, 2.5vw, 24px)',
            color: 'rgba(255,255,255,0.75)',
            marginBottom: 36,
          }}
        >
          "First to arrive, last to leave."
        </motion.p>

        {/* Trait pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          viewport={{ once: true }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          {traits.map((t, i) => (
            <motion.span
              key={t}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
              style={{
                padding: '6px 18px',
                borderRadius: 999,
                border: '1px solid rgba(181,196,177,0.45)',
                background: 'rgba(181,196,177,0.1)',
                backdropFilter: 'blur(8px)',
                fontSize: 12,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: '#B5C4B1',
                fontFamily: "'Lato', sans-serif",
              }}
            >
              {t}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          viewport={{ once: true }}
          style={{ marginTop: 56, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
        >
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: 3, textTransform: 'uppercase' }}>
            scroll
          </div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(181,196,177,0.6), transparent)' }}
          />
        </motion.div>
      </motion.div>

      {/* Ken Burns keyframes injected inline */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.0) translate(0%, 0%); }
          25%  { transform: scale(1.06) translate(-1%, 0.5%); }
          50%  { transform: scale(1.10) translate(-0.5%, -1%); }
          75%  { transform: scale(1.06) translate(1%, -0.5%); }
          100% { transform: scale(1.0) translate(0.5%, 1%); }
        }
      `}</style>
    </section>
  )
}
