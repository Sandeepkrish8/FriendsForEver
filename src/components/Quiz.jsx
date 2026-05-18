import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { quizQuestions, friends } from '../data/data'
import Confetti from './Confetti'

const ANSWER_COLORS = ['#E8A87C', '#F7C59F', '#B5C4B1', '#D4A5A5', '#C3B1E1']

export default function Quiz() {
  const [step, setStep]         = useState(0)   // 0 = intro, 1-5 = questions, 6 = result
  const [answers, setAnswers]   = useState([])
  const [selected, setSelected] = useState(null) // current Q selection
  const [confettiOn, setConfettiOn] = useState(false)

  const currentQ = step >= 1 && step <= quizQuestions.length ? quizQuestions[step - 1] : null

  const handleStart = () => setStep(1)

  const handleSelect = (friendIdx) => setSelected(friendIdx)

  const handleNext = () => {
    if (selected === null) return
    const next = [...answers, selected]
    setAnswers(next)
    setSelected(null)
    if (step < quizQuestions.length) {
      setStep(s => s + 1)
    } else {
      setStep(quizQuestions.length + 1) // result
      setConfettiOn(true)
      setTimeout(() => setConfettiOn(false), 4500)
    }
  }

  const handleRestart = () => {
    setStep(0); setAnswers([]); setSelected(null); setConfettiOn(false)
  }

  // Compute result
  const getResult = () => {
    const counts = Array(friends.length).fill(0)
    answers.forEach(a => counts[a]++)
    const maxIdx = counts.indexOf(Math.max(...counts))
    return friends[maxIdx]
  }

  const progress = step >= 1 && step <= quizQuestions.length
    ? ((step - 1) / quizQuestions.length) * 100
    : step > quizQuestions.length ? 100 : 0

  const slideVariants = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit:    { opacity: 0, x: -60, transition: { duration: 0.25, ease: 'easeIn' } },
  }

  return (
    <section id="quiz" style={{
      padding: '110px 24px',
      background: 'rgba(255,255,255,0.018)',
    }}>
      <Confetti active={confettiOn} />
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
          Find Your Match
        </div>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700,
        }}>
          Who Are You?
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 12, fontSize: 15, maxWidth: 380, margin: '12px auto 0' }}>
          Answer 5 questions to find your Forever Five twin.
        </p>
      </div>

      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        {/* Progress bar (visible during questions) */}
        {step >= 1 && step <= quizQuestions.length && (
          <div style={{ marginBottom: 32 }}>
            <div style={{
              height: 4, background: 'rgba(255,255,255,0.08)',
              borderRadius: 4, overflow: 'hidden',
            }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                style={{ height: '100%', background: 'linear-gradient(to right,#E8A87C,#C3B1E1)', borderRadius: 4 }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>Question {step} of {quizQuestions.length}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{Math.round(progress)}%</span>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* ── Intro ── */}
          {step === 0 && (
            <motion.div
              key="intro"
              variants={slideVariants} initial="initial" animate="animate" exit="exit"
              style={{ textAlign: 'center', padding: '48px 32px' }}
              className="glass"
            >
              <div style={{ fontSize: 56, marginBottom: 20 }}>🎭</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, marginBottom: 14 }}>
                The Personality Match Quiz
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>
                Five questions, five friends. Find out which member of the squad shares your vibe.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                onClick={handleStart}
                style={{
                  background: 'linear-gradient(135deg,#E8A87C,#F7C59F)',
                  color: '#0a0806', border: 'none', borderRadius: 50,
                  padding: '14px 40px', fontSize: 15, fontWeight: 700,
                  cursor: 'pointer', fontFamily: "'Lato', sans-serif",
                }}
              >
                Let's Find Out →
              </motion.button>
            </motion.div>
          )}

          {/* ── Questions ── */}
          {currentQ && (
            <motion.div
              key={`q-${step}`}
              variants={slideVariants} initial="initial" animate="animate" exit="exit"
            >
              <div className="glass" style={{ padding: '36px 32px' }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 700,
                  marginBottom: 32, lineHeight: 1.4,
                }}>
                  {currentQ.question}
                </h3>

                <div className="quiz-options" style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12, marginBottom: 32,
                }}>
                  {currentQ.options.map((opt, i) => {
                    const isSelected = selected === opt.friend
                    return (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleSelect(opt.friend)}
                        style={{
                          background: isSelected ? `${ANSWER_COLORS[i]}20` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${isSelected ? ANSWER_COLORS[i] : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: 12, padding: '14px 16px',
                          color: isSelected ? '#fff' : 'rgba(255,255,255,0.7)',
                          fontSize: 13, lineHeight: 1.5, cursor: 'pointer',
                          textAlign: 'left', fontFamily: "'Lato', sans-serif",
                          transition: 'all 0.25s ease',
                          boxShadow: isSelected ? `0 0 20px ${ANSWER_COLORS[i]}30` : 'none',
                        }}
                      >
                        <span style={{ color: ANSWER_COLORS[i], fontWeight: 700, marginRight: 8 }}>
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt.text}
                      </motion.button>
                    )
                  })}
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <motion.button
                    whileHover={{ scale: selected !== null ? 1.05 : 1 }}
                    whileTap={{ scale: selected !== null ? 0.95 : 1 }}
                    onClick={handleNext}
                    style={{
                      background: selected !== null
                        ? 'linear-gradient(135deg,#E8A87C,#F7C59F)'
                        : 'rgba(255,255,255,0.08)',
                      color: selected !== null ? '#0a0806' : 'rgba(255,255,255,0.3)',
                      border: 'none', borderRadius: 50,
                      padding: '12px 32px', fontSize: 14, fontWeight: 700,
                      cursor: selected !== null ? 'pointer' : 'not-allowed',
                      fontFamily: "'Lato', sans-serif",
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {step < quizQuestions.length ? 'Next →' : 'See Result ✨'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Result ── */}
          {step === quizQuestions.length + 1 && (
            <motion.div
              key="result"
              variants={slideVariants} initial="initial" animate="animate" exit="exit"
            >
              {(() => {
                const match = getResult()
                return (
                  <div className="glass" style={{ padding: '48px 32px', textAlign: 'center' }}>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.2 }}
                    >
                      <div style={{
                        width: 100, height: 100, borderRadius: '50%', overflow: 'hidden',
                        border: `4px solid ${match.color}`,
                        boxShadow: `0 0 40px ${match.color}70`,
                        margin: '0 auto 20px',
                      }}>
                        <img src={match.img} alt={match.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    </motion.div>

                    <div style={{ fontSize: 36, marginBottom: 8 }}>{match.emoji}</div>
                    <div style={{ fontSize: 13, color: match.color, letterSpacing: 3, marginBottom: 8, fontWeight: 700 }}>
                      YOU ARE
                    </div>
                    <h3 style={{
                      fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, marginBottom: 6,
                    }}>
                      {match.name}
                    </h3>
                    <div style={{ color: match.color, fontWeight: 700, marginBottom: 16, letterSpacing: 1.5, fontSize: 13 }}>
                      "{match.nickname}"
                    </div>
                    <p style={{
                      color: 'rgba(255,255,255,0.6)', fontSize: 15, lineHeight: 1.7,
                      fontStyle: 'italic', marginBottom: 24, maxWidth: 420, margin: '0 auto 24px',
                    }}>
                      "{match.quote}"
                    </p>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
                      {match.traits.map(t => (
                        <span key={t} style={{
                          background: `${match.color}22`, color: match.color,
                          border: `1px solid ${match.color}45`,
                          borderRadius: 20, padding: '4px 14px', fontSize: 12, fontWeight: 600,
                        }}>{t}</span>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={handleRestart}
                      style={{
                        background: 'transparent', color: '#E8A87C',
                        border: '1px solid rgba(232,168,124,0.4)',
                        borderRadius: 50, padding: '11px 30px',
                        fontSize: 13, fontWeight: 600, cursor: 'pointer',
                        fontFamily: "'Lato', sans-serif",
                      }}
                    >
                      ↺ Try Again
                    </motion.button>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
