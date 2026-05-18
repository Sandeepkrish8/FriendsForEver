import { motion } from 'framer-motion'

// Replace PLAYLIST_ID with your own Spotify playlist ID to customise.
// Default: "Chill Hits" by Spotify
const PLAYLIST_ID = '37i9dQZF1DX4WYpdgoIcn6'

export default function SpotifyEmbed() {
  return (
    <section style={{ padding: '80px 24px', maxWidth: 780, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 11, letterSpacing: 5, color: '#E8A87C', textTransform: 'uppercase', marginBottom: 14 }}>
            The Soundtrack
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, marginBottom: 12,
          }}>
            Our Playlist
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 14 }}>
            The songs that soundtrack every memory.
          </p>
        </div>

        <div style={{
          borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          border: '1px solid rgba(232,168,124,0.12)',
        }}>
          <iframe
            title="Forever Five Playlist"
            src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
            width="100%"
            height="380"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            style={{ display: 'block' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
