import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: 3,
        background: 'linear-gradient(to right, #E8A87C, #F7C59F, #C3B1E1)',
        transformOrigin: '0%',
        scaleX: scrollYProgress,
        zIndex: 9997,
      }}
    />
  )
}
