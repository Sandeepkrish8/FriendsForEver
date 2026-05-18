import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  exit:    { opacity: 0, scale: 1.05, transition: { duration: 0.4, ease: 'easeIn' } },
}

const secrets = [
  "Aarav once colour-coded the entire friend group's schedule using a spreadsheet — with conditional formatting.",
  "Diya has a playlist for literally every possible emotion and situation in life. Over 200 playlists.",
  "Rohan said 'it's just a quick drive' and somehow we ended up in another state.",
  "Priya wrote a 3,000-word essay about why the group dynamic mirrors a Greek tragedy. She framed it.",
  "Karthik once woke up at 5AM just to slow-cook breakfast for everyone's surprise. No occasion.",
  "There is a group chat called 'The Real Council' that everyone is in except Rohan. He knows.",
  "The 2021 road trip GPS was deliberately ignored after mile 40. Nobody admits who did it.",
  "Every single photo from 2020 was taken on one phone. Its screen was cracked the whole year.",
  "The beach trip had zero sunscreen packed between all five of them. Collectively.",
]

const deletedScenes = [
  { title: "The Great Playlist Coup of 2020", desc: "Diya wrestled the aux cable from Karthik for 48 straight minutes. Sources say it escalated." },
  { title: "Rohan's 'Shortcut'", desc: "A 20-minute drive that took 3 hours, a forest, and one very confused deer." },
  { title: "Aarav's 47-Step Plan", desc: "A plan so detailed it required a second Google Doc just for the appendices. We ignored it." },
  { title: "The Midnight Ramen Disaster", desc: "Karthik tried to cook ramen in a hotel kettle. Twice. Both times failed. He's never recovered." },
  { title: "Priya's 3AM Revelation", desc: "She woke everyone up to share 'an important philosophical insight.' It was about pudding." },
]

export default function SecretPage() {
  const navigate = useNavigate()

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(ellipse at 30% 20%, #1a0a1a 0%, #0a0806 50%, #0a0f1a 100%)',
        padding: '0 24px 80px',
        fontFamily: "'Lato', sans-serif",
        overflowX: 'hidden',
      }}
    >
      {/* Back button */}
      <div style={{ padding: '28px 0 0' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: '1px solid rgba(195,177,225,0.3)',
            color: '#C3B1E1',
            borderRadius: 50,
            padding: '8px 22px',
            cursor: 'pointer',
            fontSize: 13,
            fontFamily: "'Lato', sans-serif",
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(195,177,225,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          ← Back Home
        </button>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', padding: '70px 0 60px', maxWidth: 700, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
          style={{ fontSize: 72, marginBottom: 20 }}
        >
          🔮
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div style={{
            fontSize: 12, letterSpacing: 5, color: '#C3B1E1',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            You found it
          </div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(38px, 7vw, 70px)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #C3B1E1, #D4A5A5, #E8A87C)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: 20,
          }}>
            The Inner Circle
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, lineHeight: 1.7 }}>
            Welcome to the part of the site no one was meant to see.
            You typed the code. You earned this. 👏
          </p>
        </motion.div>
      </div>

      {/* Secrets grid */}
      <div style={{ maxWidth: 900, margin: '0 auto 80px' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 32, textAlign: 'center',
          marginBottom: 12, color: '#C3B1E1',
        }}>
          Classified Intel 🗂️
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginBottom: 40, fontSize: 14 }}>
          Things the squad never officially confirmed.
        </p>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {secrets.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5, duration: 0.6 }}
              style={{
                background: 'rgba(195,177,225,0.07)',
                border: '1px solid rgba(195,177,225,0.18)',
                borderRadius: 16, padding: '20px 22px',
              }}
            >
              <span style={{ color: '#C3B1E1', marginRight: 10, fontSize: 18 }}>🔒</span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, lineHeight: 1.6 }}>{s}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Deleted scenes */}
      <div style={{ maxWidth: 700, margin: '0 auto 80px' }}>
        <h2 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 32, textAlign: 'center',
          marginBottom: 12, color: '#D4A5A5',
        }}>
          Deleted Scenes 🎬
        </h2>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', marginBottom: 40, fontSize: 14 }}>
          Chapters that didn't make the highlight reel.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {deletedScenes.map((sc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i + 0.8, duration: 0.6 }}
              style={{
                background: 'rgba(212,165,165,0.07)',
                border: '1px solid rgba(212,165,165,0.18)',
                borderRadius: 16, padding: '20px 24px',
              }}
            >
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: '#D4A5A5', marginBottom: 8 }}>
                {sc.title}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, lineHeight: 1.6 }}>{sc.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Closing message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          maxWidth: 600, margin: '0 auto',
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(232,168,124,0.06)',
          border: '1px solid rgba(232,168,124,0.2)',
          borderRadius: 24,
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{
          position: 'absolute', top: -15, left: -10, fontSize: 100,
          fontFamily: "'Playfair Display', serif", color: 'rgba(232,168,124,0.06)', lineHeight: 1,
        }}>"</div>
        <p style={{
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(16px, 3vw, 22px)',
          fontStyle: 'italic', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, position: 'relative',
        }}>
          If you found this page, you're probably one of us.<br />
          Or you're dangerously nosy. Either way — welcome home.
        </p>
        <div style={{ marginTop: 16, color: '#E8A87C', fontSize: 13, letterSpacing: 2 }}>
          — The Admin 🤍
        </div>
      </motion.div>
    </motion.div>
  )
}
