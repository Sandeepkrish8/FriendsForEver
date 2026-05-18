import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Squad from '../components/Squad'
import MemoriesGallery from '../components/MemoriesGallery'
import CoverFlow from '../components/CoverFlow'
import PhotoCube from '../components/PhotoCube'
import ConstellationMap from '../components/ConstellationMap'
import Diorama3DRoom from '../components/Diorama3DRoom'
import PolaroidBoard from '../components/PolaroidBoard'
import SaranSpotlight from '../components/SaranSpotlight'
import Timeline from '../components/Timeline'
import Quiz from '../components/Quiz'
import Vibe from '../components/Vibe'
import MessageWall from '../components/MessageWall'
import BirthdayCountdown from '../components/BirthdayCountdown'
import SpotifyEmbed from '../components/SpotifyEmbed'
import Footer from '../components/Footer'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  exit:    { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
}

const scrollTo = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Home() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Navbar />
      <Hero scrollTo={scrollTo} />
      <Squad />
      <MemoriesGallery />
      <CoverFlow />
      <PhotoCube />
      <SaranSpotlight />
      <ConstellationMap />
      <Diorama3DRoom />
      <PolaroidBoard />
      <Timeline />
      <Quiz />
      <Vibe />
      <MessageWall />
      <BirthdayCountdown />
      <SpotifyEmbed />
      <Footer scrollTo={scrollTo} />
    </motion.div>
  )
}
