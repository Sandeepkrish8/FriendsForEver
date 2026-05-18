import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { friends } from '../data/data'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns a Date of the next occurrence of MM-DD (could be this year or next) */
function nextBirthday(mmdd) {
  const [mm, dd] = mmdd.split('-').map(Number)
  const now  = new Date()
  const thisYear = new Date(now.getFullYear(), mm - 1, dd, 0, 0, 0)
  if (thisYear > now) return thisYear
  return new Date(now.getFullYear() + 1, mm - 1, dd, 0, 0, 0)
}

/** Returns true if today is the birthday */
function isTodayBirthday(mmdd) {
  const [mm, dd] = mmdd.split('-').map(Number)
  const now = new Date()
  return now.getMonth() + 1 === mm && now.getDate() === dd
}

/** Countdown object { days, hours, minutes, seconds } until a future Date */
function timeUntil(target) {
  const diff = Math.max(0, target - Date.now())
  const days    = Math.floor(diff / 86_400_000)
  const hours   = Math.floor((diff % 86_400_000) / 3_600_000)
  const minutes = Math.floor((diff % 3_600_000)  /    60_000)
  const seconds = Math.floor((diff %    60_000)  /     1_000)
  return { days, hours, minutes, seconds }
}

/** Format MM-DD as a readable string, e.g. "June 8" */
function formatDate(mmdd) {
  const [mm, dd] = mmdd.split('-').map(Number)
  return new Date(2000, mm - 1, dd).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
}

// ─── Flip digit tile ─────────────────────────────────────────────────────────
function Digit({ value, label, color }) {
  const str = String(value).padStart(2, '0')
  return (
    <div style={{ textAlign: 'center', minWidth: 52 }}>
      <motion.div
        key={str}
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 30, fontWeight: 700,
          color, lineHeight: 1,
          background: 'rgba(255,255,255,0.06)',
          border: `1px solid ${color}30`,
          borderRadius: 10, padding: '8px 10px',
          minWidth: 52, display: 'inline-block', textAlign: 'center',
        }}
      >
        {str}
      </motion.div>
      <div style={{ fontSize: 9, letterSpacing: 2, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginTop: 5 }}>
        {label}
      </div>
    </div>
  )
}

// ─── Single birthday card ─────────────────────────────────────────────────────
function BirthdayCard({ friend, isNext, index }) {
  const isToday = isTodayBirthday(friend.birthday)
  const target  = nextBirthday(friend.birthday)

  const [tick, setTick] = useState(() => timeUntil(target))

  useEffect(() => {
    const id = setInterval(() => setTick(timeUntil(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 80, damping: 18 }}
      whileHover={{ y: -6, boxShadow: `0 28px 64px ${friend.color}30` }}
      style={{
        background: isToday
          ? `linear-gradient(135deg, ${friend.color}28 0%, rgba(15,10,6,0.92) 60%)`
          : 'rgba(255,255,255,0.045)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        border: `1px solid ${isToday || isNext ? friend.color + '70' : friend.color + '25'}`,
        borderRadius: 24,
        padding: '28px 24px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `radial-gradient(circle at top right, ${friend.color}15, transparent 65%)`,
      }} />

      {/* "Next up" ribbon */}
      {isNext && !isToday && (
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: friend.color,
            color: '#0a0806', fontSize: 9, fontWeight: 800,
            letterSpacing: 1.5, textTransform: 'uppercase',
            borderRadius: 20, padding: '3px 10px',
          }}
        >
          Next Up 🎯
        </motion.div>
      )}

      {/* Today badge */}
      {isToday && (
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
          style={{
            position: 'absolute', top: 14, right: 14,
            background: `linear-gradient(90deg, ${friend.color}, #fff)`,
            color: '#0a0806', fontSize: 10, fontWeight: 800,
            letterSpacing: 1.5, textTransform: 'uppercase',
            borderRadius: 20, padding: '4px 12px',
          }}
        >
          🎂 TODAY!
        </motion.div>
      )}

      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
        <div style={{
          position: 'relative', flexShrink: 0,
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: '50%', overflow: 'hidden',
            border: `3px solid ${friend.color}`,
            boxShadow: `0 0 ${isToday ? 28 : 16}px ${friend.color}${isToday ? '90' : '50'}`,
          }}>
            <img src={friend.img} alt={friend.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {/* Emoji badge */}
          <div style={{
            position: 'absolute', bottom: -4, right: -4,
            fontSize: 16, lineHeight: 1,
            background: 'rgba(10,8,6,0.9)', borderRadius: '50%', padding: 3,
          }}>{friend.emoji}</div>
        </div>

        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700, marginBottom: 2 }}>
            {friend.name}
          </div>
          <div style={{ fontSize: 11, color: friend.color, letterSpacing: 1.2, fontWeight: 700 }}>
            {friend.nickname.toUpperCase()}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 3 }}>
            🎂 {formatDate(friend.birthday)}
          </div>
        </div>
      </div>

      {/* Countdown or Today message */}
      {isToday ? (
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          style={{
            textAlign: 'center', padding: '16px 0',
            fontFamily: "'Playfair Display', serif",
            fontSize: 18, color: friend.color,
          }}
        >
          🎉 Happy Birthday, {friend.name.split(' ')[0]}! 🎉
        </motion.div>
      ) : (
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Digit value={tick.days}    label="Days"    color={friend.color} />
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 18, color: `${friend.color}50`, fontSize: 20 }}>:</div>
          <Digit value={tick.hours}   label="Hours"   color={friend.color} />
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 18, color: `${friend.color}50`, fontSize: 20 }}>:</div>
          <Digit value={tick.minutes} label="Mins"    color={friend.color} />
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: 18, color: `${friend.color}50`, fontSize: 20 }}>:</div>
          <Digit value={tick.seconds} label="Secs"    color={friend.color} />
        </div>
      )}

      {/* Days-away bar */}
      {!isToday && (
        <div style={{ marginTop: 18 }}>
          <div style={{
            height: 3, borderRadius: 2,
            background: 'rgba(255,255,255,0.08)',
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(2, 100 - (tick.days / 365) * 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.1 + 0.3 }}
              style={{ height: '100%', background: `linear-gradient(to right, ${friend.color}80, ${friend.color})`, borderRadius: 2 }}
            />
          </div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 5, textAlign: 'right' }}>
            {tick.days} day{tick.days !== 1 ? 's' : ''} to go
          </div>
        </div>
      )}
    </motion.div>
  )
}

// ─── Main section ─────────────────────────────────────────────────────────────
export default function BirthdayCountdown() {
  // Find the friend whose birthday is coming up soonest
  const nextFriendId = friends.reduce((soonest, f) => {
    const t = nextBirthday(f.birthday) - Date.now()
    return t < soonest.diff ? { id: f.id, diff: t } : soonest
  }, { id: null, diff: Infinity }).id

  // Sort cards: today first, then by days ascending
  const sorted = [...friends].sort((a, b) => {
    const da = nextBirthday(a.birthday) - Date.now()
    const db = nextBirthday(b.birthday) - Date.now()
    return da - db
  })

  return (
    <section id="birthdays" style={{ padding: '110px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            Mark Your Calendars
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px, 5vw, 56px)', fontWeight: 700 }}>
            Birthday Countdowns 🎂
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', marginTop: 14, fontSize: 15 }}>
            Live ticking countdowns to every squad member's big day.
          </p>
        </div>

        {/* Cards */}
        <div
          className="birthday-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 22,
          }}
        >
          {sorted.map((f, i) => (
            <BirthdayCard
              key={f.id}
              friend={f}
              isNext={f.id === nextFriendId}
              index={i}
            />
          ))}
        </div>

        {/* Group birthday note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          style={{
            marginTop: 52, textAlign: 'center',
            fontSize: 13, color: 'rgba(255,255,255,0.3)',
            fontStyle: 'italic',
          }}
        >
          🤍 "A birthday is just the first day of another 365-day journey around the sun."
        </motion.div>

      </div>
    </section>
  )
}
