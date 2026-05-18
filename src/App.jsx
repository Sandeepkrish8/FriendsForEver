import { useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import SecretPage from './pages/SecretPage'
import EasterEgg from './components/EasterEgg'
import Cursor from './components/Cursor'
import ScrollProgress from './components/ScrollProgress'
import LoadingScreen from './components/LoadingScreen'
import Starfield from './components/Starfield'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"       element={<Home />} />
        <Route path="/secret" element={<SecretPage />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [appReady, setAppReady] = useState(false)
  return (
    <BrowserRouter>
      <LoadingScreen onDone={() => setAppReady(true)} />
      {appReady && (
        <>
          <Starfield />
          <Cursor />
          <ScrollProgress />
          <EasterEgg />
          <AnimatedRoutes />
        </>
      )}
    </BrowserRouter>
  )
}
