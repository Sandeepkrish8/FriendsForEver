// ─── Friends ─────────────────────────────────────────────────────────────────
export const friends = [
  {
    id: 1,
    name: "Sandeep Krishnan P",
    nickname: "The Mastermind",
    emoji: "🧠",
    traits: ["Strategic", "Calm", "Witty"],
    quote: "Plans made at 2AM hit different.",
    color: "#E8A87C",
    img: "/images/sandeep.jpeg",
    role: "The one who remembers everything",
    zodiac: "Gemini",
    funFact: "Has a backup plan for the backup plan.",
    birthday: "07-01-2002",   // July 1, 2002
  },
  {
    id: 2,
    name: "Nishnath",
    nickname: "Sunshine",
    emoji: "☀️",
    traits: ["Bubbly", "Creative", "Caring"],
    quote: "If I'm laughing, we're all laughing.",
    color: "#F7C59F",
    img: "/images/nishanth.jpeg",
    role: "Mood lifter since day one",
    zodiac: "Leo",
    funFact: "Knows every word to every song ever made.",
    birthday: "03-05-2002",   // March 5, 2002
  },
  {
    id: 3,
    name: "Saran raj",
    nickname: "The Captain",
    emoji: "⚡",
    traits: ["Bold", "Adventurous", "Loyal"],
    quote: "First to arrive, last to leave.",
    color: "#B5C4B1",
    img: "/images/saran.jpeg",
    role: "Leader of every plan gone wrong",
    zodiac: "Aries",
    funFact: "Has gotten us lost on 4 different continents.",
    birthday: "10-04-2001",   // October 4, 2001
  },
  {
    id: 4,
    name: "Jagan",
    nickname: "Philosopher",
    emoji: "🌙",
    traits: ["Deep", "Honest", "Empathetic"],
    quote: "Every memory is worth keeping.",
    color: "#D4A5A5",
    img: "/images/jagan.jpeg",
    role: "3AM talks specialist",
    zodiac: "Pisces",
    funFact: "Has read more books than most libraries own.",
    birthday: "03-05",   // March 5
  },
  {
    id: 5,
    name: "Aswin Raj",
    nickname: "The Chef",
    emoji: "🍕",
    traits: ["Funny", "Generous", "Foodie"],
    quote: "Food fixes everything. Trust me.",
    color: "#C3B1E1",
    img: "/images/aswin.jpeg",
    role: "Unofficial group caterer",
    zodiac: "Taurus",
    funFact: "Once drove 2 hours for a specific biryani.",
    birthday: "05-03",   // May 3
  },
]

// ─── Memories ─────────────────────────────────────────────────────────────────
export const memories = [
  { id: 1, img: "/images/memeories/wonderla.jpeg", caption: "Wonderla Trip 🚗",   year: "2025" },
  { id: 2, img: "/images/beach.jpeg",  caption: "Beach sunset vibes 🌅",          year: "2022" },
  { id: 3, img: "/images/memeories/murugan.jpeg",  caption: "Thiruthani 📚",    year: "2025" },
  { id: 4, img: "/images/memeories/birthday.jpeg",  caption: "Birthday chaos 🎂",               year: "2025" },
  { id: 5, img: "/images/memeories/grp.jpeg",  caption: "group madness 🎊",             year: "2025" },
  { id: 6, img: "/images/memeories/rareEvent.jpeg",  caption: "Café conversations ☕",           year: "2025" },
  { id: 7, img: "https://picsum.photos/seed/mem7/400/280",  caption: "Group project survivors 💻",      year: "2020" },
  { id: 8, img: "/images/memeories/cooking.jpeg",  caption: "We cook and Eat 🎆",   year: "2026" },
  { id: 9, img: "/images/memeories/ni8.jpeg",  caption: "Spontaneous midnight walk 🌙",   year: "2022" },
  { id:10, img: "/images/memeories/VGP.jpeg", caption: "VGP Water Park 🗺️",       year: "2021" },
]

// ─── Timeline ─────────────────────────────────────────────────────────────────
export const timeline = [
  {
    year: "2016",
    title: "The Beginning",
    desc: "Five strangers walked into the same classroom. Nobody knew what was coming.",
    icon: "🌱",
  },
  {
    year: "2020",
    title: "Lockdown Bond",
    desc: "Zoom calls, late nights, and memes. Distance made us closer somehow.",
    icon: "🏠",
  },
  {
    year: "2021",
    title: "First Road Trip",
    desc: "Packed into one car, 0% planning, 100% memories. Best decision ever.",
    icon: "🚗",
  },
  {
    year: "2022",
    title: "Through the Storms",
    desc: "Exams, heartbreaks, and fights. We stayed. That's what matters.",
    icon: "🌧️",
  },
  {
    year: "2023",
    title: "Level Unlocked",
    desc: "Graduations, new chapters, same crew. Forever is the plan.",
    icon: "🎓",
  },
]

// ─── Vibes ────────────────────────────────────────────────────────────────────
export const vibes = [
  { icon: "🎵", label: "Indie & Lo-fi" },
  { icon: "🍕", label: "Midnight Food Runs" },
  { icon: "🎮", label: "Gaming Nights" },
  { icon: "📸", label: "Random Photography" },
  { icon: "🌊", label: "Beach & Mountains" },
  { icon: "🎬", label: "Movie Marathons" },
  { icon: "🚗", label: "Spontaneous Trips" },
  { icon: "☕", label: "Café Hopping" },
  { icon: "📖", label: "Sharing Books" },
  { icon: "🌙", label: "Late Night Talks" },
  { icon: "🎤", label: "Karaoke Disasters" },
  { icon: "🧩", label: "Puzzle Nights" },
]

// ─── Quiz ─────────────────────────────────────────────────────────────────────
// Each option's `friend` index maps to the friends array above (0–4)
export const quizQuestions = [
  {
    question: "Your ideal Friday night is…",
    options: [
      { text: "Planning the perfect itinerary for the whole week ahead",  friend: 0 },
      { text: "Calling everyone up for a spontaneous group hangout",      friend: 1 },
      { text: "Leading the crew on a midnight drive to absolutely nowhere", friend: 2 },
      { text: "A deep philosophical conversation under a starry sky",     friend: 3 },
      { text: "Cooking a feast and feeding the entire squad",             friend: 4 },
    ],
  },
  {
    question: "In a group project, you are the one…",
    options: [
      { text: "Mapping out the full strategy and colour-coded timeline",  friend: 0 },
      { text: "Keeping everyone's energy and spirits impossibly high",    friend: 1 },
      { text: "Taking charge and making quick, bold decisions",           friend: 2 },
      { text: "Asking if the project has any deeper meaning at all",      friend: 3 },
      { text: "Making sure there are snacks and everyone is fed first",   friend: 4 },
    ],
  },
  {
    question: "Your camera roll is 90% full of…",
    options: [
      { text: "Screenshots of plans, schedules, and meticulous research", friend: 0 },
      { text: "Selfies and spontaneous group photos at random places",    friend: 1 },
      { text: "Blurry action shots from crazy adventures",                friend: 2 },
      { text: "Aesthetic sunrises and pictures of your journal entries",  friend: 3 },
      { text: "Food pics. Obviously. Unashamedly.",                       friend: 4 },
    ],
  },
  {
    question: "When a friend is going through something tough, you…",
    options: [
      { text: "Make a detailed game plan to help them fix it step by step", friend: 0 },
      { text: "Show up with high energy, jokes, and unlimited distractions", friend: 1 },
      { text: "Rally the whole crew together immediately",                  friend: 2 },
      { text: "Sit with them in silence and simply listen",                 friend: 3 },
      { text: "Arrive at their door with homemade food, no questions asked", friend: 4 },
    ],
  },
  {
    question: "Your friends would describe you as…",
    options: [
      { text: "The one who always has a Plan A, B, and C ready",         friend: 0 },
      { text: "The one who instantly brightens every single room",        friend: 1 },
      { text: "The fearless daredevil who says yes to everything",        friend: 2 },
      { text: "The deep thinker who actually gets you",                   friend: 3 },
      { text: "The one who loves everyone through good food",             friend: 4 },
    ],
  },
]
