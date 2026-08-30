// LastLap content. Voice: human, a little dry, plain English. No em-dashes.

export const site = {
  name: "LastLap",
  url: "https://lastlap.vercel.app",
  location: "Brookfield, Bengaluru",
  openingDate: "1 July 2026",
  openingLine: "Opening 1 July 2026 · Brookfield",
  email: "hello@lastlap.in",
  // PLACEHOLDER. This number is a dummy and is wired into the nav, hero, FAQ,
  // waitlist and footer, so every "message us" click on the live site currently
  // goes nowhere. Swap all three fields together when the real line exists.
  whatsapp: {
    display: "+91 12345 12345",
    tel: "tel:+911234512345",
    wa: "https://wa.me/911234512345?text=Hey%20LastLap%2C%20tell%20me%20more",
  },
  // PLACEHOLDER until the lease is signed. Cubbon Park — a public park, chosen
  // deliberately so the map pin does not label somebody else's premises with
  // our name. The previous value was lifted straight out of a Google Maps place
  // entry and dropped the "LastLap" tooltip on a real, unrelated, operating
  // business. Never point these at an address we do not hold.
  //
  // Note this does not match the "Brookfield, Bengaluru" in the copy above and
  // in the FAQ. Replace both together with the real venue before launch.
  mapsUrl: "https://www.google.com/maps?q=12.9750,77.5933",
  coords: { lat: 12.975, lng: 77.5933 },
};

// Base URL for absolute metadata (canonical, OG image, sitemap, robots).
// Override per environment with NEXT_PUBLIC_SITE_URL (e.g. a Vercel preview URL).
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || site.url;

export const nav = {
  logo: "LastLap",
  links: [
    { label: "Home", href: "#home" },
    { label: "The Rigs", href: "#rigs" },
    { label: "Why Us", href: "#why" },
    { label: "FAQ", href: "#faq" },
  ],
  cta: { label: "Join the Waitlist", href: "#waitlist" },
  menuLinks: [
    { label: "Home", href: "#home" },
    { label: "The Rigs", href: "#rigs" },
    { label: "Why Us", href: "#why" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Join the Waitlist", href: "#waitlist" },
  ],
};

export const hero = {
  headingLines: ["Drive the cars", "you've always wanted."],
  paragraph:
    "Professional racing simulators with direct-drive wheels, real pedals, and seats that move with every corner. No license, no deposit, and no way to total anything. Get in and find your limit.",
  video: "/assets/hero.webm",
  videoMp4: "/assets/hero.mp4",
  poster: "/assets/hero-poster.webp",
};

export type Rig = {
  name: string;
  tag: string;
  blurb: string;
  specs: string[];
  beginner: boolean;
  image: string;
};

export const rigs = {
  header: {
    title: "Six seats. Pick your trouble.",
    paragraph:
      "Every rig is built like a real cockpit, not a chair with a wheel bolted on. Pricing and packages land at launch. For now, have a look at where you'll sit.",
    cta: { label: "Ask on WhatsApp", href: site.whatsapp.wa },
  },
  rigs: [
    { name: "The Rookie", tag: "Entry level", beginner: true, blurb: "Never held a wheel? Start here. Forgiving, friendly, fun.", specs: ["Direct drive", "2-pedal set", "Ultrawide screen"], image: "/assets/rig-rookie.webp" },
    { name: "The GT", tag: "All-rounder", beginner: false, blurb: "The sweet spot. GT3 cars, triple screens, all-day comfort.", specs: ["Direct drive", "Load-cell brake", "Triple screen"], image: "/assets/rig-gt.webp" },
    { name: "The Formula", tag: "Single-seater", beginner: false, blurb: "Feet up, hands forward. Sit like the open-wheel crowd.", specs: ["Formula wheel", "Load-cell brake", "Reclined position"], image: "/assets/rig-formula.webp" },
    { name: "The Motion", tag: "Motion", beginner: false, blurb: "The floor moves with you. Try it once and there's no going back.", specs: ["Motion platform", "Direct drive", "Triple screen"], image: "/assets/rig-motion.webp" },
    { name: "The Endurance", tag: "Long stints", beginner: false, blurb: "Built for the two-hour run that turns into three.", specs: ["Direct drive", "Comfort seat", "Triple + haptics"], image: "/assets/rig-endurance.webp" },
    { name: "The Apex", tag: "VR", beginner: false, blurb: "Strap on the headset and the room disappears. Just track.", specs: ["VR headset", "Direct drive", "Motion-ready"], image: "/assets/rig-apex.webp" },
  ] as Rig[],
  games: ["Assetto Corsa", "F1 24", "Forza Motorsport", "EA WRC", "iRacing", "Gran Turismo 7"],
};

export const why = {
  header: {
    title: "Made for people who've never raced.",
    paragraph:
      "And for the ones chasing two tenths off their best Spa time. Both fit right in here, no judgement either way.",
    cta: { label: "Join the waitlist", href: "#waitlist" },
  },
  feature: {
    title: "Feel every kerb",
    copy: "The wheel loads up through the fast corners. The seat leans when the back end steps out. Thirty seconds in and your brain forgets it's a screen. We've watched it happen a hundred times.",
    image: "/assets/why-thrill.webp",
  },
  comfort: {
    title: "First time? Sorted.",
    copy: "Half the people here have never raced before. We set you up, walk you through the pedals, and stay close until you stop spinning at turn one.",
    image: "/assets/why-comfort.webp",
  },
  textCards: [
    { title: "Nothing to lose", copy: "You can't dent it, can't total it, can't lose your insurance. Worst case, you hit respawn.", cta: { label: "How it works", href: "#how-it-works" } },
    { title: "Bring the whole crew", copy: "Birthdays, team offsites, a first date that isn't another dinner. Eight people, one leaderboard, sorted.", cta: { label: "Join the waitlist", href: "#waitlist" } },
  ],
  // Cafe, folded in: the cafe is half the point, so it lives here as a full pillar.
  service: {
    title: "The cafe is half the point",
    copy: "Proper espresso pulled right, an all-day kitchen, and something cold or something strong for the long stints. Come to race, or just come for the coffee and watch your friends spin off at the first corner. The wheel is always optional.",
    cta: { label: "Join the waitlist", href: "#waitlist" },
    image: "/assets/why-cafe.webp",
  },
};

export const session = {
  header: {
    title: "Door to grid in five minutes.",
    paragraph:
      "First time here? Nothing to stress about. Here's exactly how a session goes, start to finish.",
    cta: { label: "Save your spot", href: "#waitlist" },
  },
  defaultActive: 0,
  steps: [
    { num: "01", label: "Pick", title: "Pick your rig", caption: "Tell us your speed. First timer or lap-record chaser, there's a seat for you and we'll point you to it.", image: "/assets/step-pick.webp" },
    { num: "02", label: "Brief", title: "Quick briefing", caption: "Two minutes, tops. Wheel, pedals, and how not to stall on the grid. You'll pick up the rest on track.", image: "/assets/step-brief.webp" },
    { num: "03", label: "Drive", title: "Send it", caption: "Lights out. Pick a car, pick a circuit, and find out what understeer really feels like. The seat does the rest.", image: "/assets/step-drive.webp" },
    { num: "04", label: "Refuel", title: "Refuel and brag", caption: "Climb out, grab a coffee or something cold, and argue about who braked too late. The cafe is right there.", image: "/assets/step-refuel.webp" },
  ],
};

export const space = {
  header: {
    title: "Quiet bar energy, loud engines.",
    paragraph:
      "Think low light and warm wood, not neon and a queue. No headache, no shouting. Just good seats and the sound of someone two rows over getting Eau Rouge very wrong.",
    cta: { label: "Come see it", href: "#waitlist" },
  },
  images: [
    { src: "/assets/space-lead.webp", alt: "The main floor at dusk" },
    { src: "/assets/why-thrill.webp", alt: "Drivers mid-session" },
    { src: "/assets/space-detail.webp", alt: "A rig up close" },
    { src: "/assets/step-drive.webp", alt: "Out on track" },
    { src: "/assets/why-comfort.webp", alt: "The cockpit detail" },
  ],
};

export const faq = {
  header: {
    titleLines: ["Questions?", "Answered."],
    paragraph:
      "If the answer isn't here, message us. We actually reply, usually within the hour.",
    cta: { label: "Message us", href: site.whatsapp.wa },
  },
  items: [
    { q: "Do I need a driving license?", a: "Nope. Not for these. If you can hold a game controller, you can drive here. A license is only for the real road." },
    { q: "I've never raced in my life. Will I embarrass myself?", a: "Everyone spins at turn one on day one. That's basically the welcome ritual. We set you up and stay close. By lap five you'll be fine, by lap ten you won't want to leave." },
    { q: "What can I actually drive?", a: "GT3 monsters, F1 cars, rally beasts, everyday road cars. Running Assetto Corsa, F1 24, Forza, EA WRC and more. Tell us what you fancy." },
    { q: "Can I just come for the cafe?", a: "Of course. The wheel is optional. Come to work, eat, or just watch your friends crash in slow motion. The coffee alone is worth the trip." },
    { q: "Where are you and when do you open?", a: "Brookfield, Bengaluru. Doors open 1 July 2026. Join the waitlist and you'll be the first to know the day we go live, plus 25% off your first race." },
    { q: "Good for a group or a birthday?", a: "Made for it. Eight people, one leaderboard, endless trash talk. Drop us a message and we'll sort the rest." },
  ],
};

export const waitlist = {
  perk: "Everyone on the list gets 25% off their first race when we open.",
  perkShort: "25% off your first race",
  title: "Be first on the grid.",
  paragraph:
    "Doors open July 2026. Drop your number and email, and the day we go live, you'll be the first to know. Everyone on the list gets 25% off their first race. No spam, just the one message that matters.",
  button: { label: "Save my spot", labelShort: "Save spot" },
  sending: "Saving...",
  successTitle: "You're on the list.",
  successBody:
    "We've got you. You'll hear from us the moment we open, with your 25% off ready to go. Until then, drive safe out there.",
  consent: "No spam, just the one message when we open.",
  sourceLabel: "How did you hear about us?",
  sources: ["Instagram", "A friend told me", "Google", "Reddit", "Walked past", "Somewhere else"],
  whatsappNote: "In a hurry? Just",
  image: "/assets/space-detail.webp",
};

export const footer = {
  logo: "LastLap",
  tagline: "Sim racing and seriously good coffee. Brookfield, Bengaluru.",
  contactLabel: "Say hi",
  columns: [
    { title: "Explore", links: [
      { label: "Home", href: "#home" },
      { label: "The Rigs", href: "#rigs" },
      { label: "Why Us", href: "#why" },
      { label: "How It Works", href: "#how-it-works" },
    ] },
    { title: "More", links: [
      { label: "FAQ", href: "#faq" },
      { label: "Join the Waitlist", href: "#waitlist" },
      { label: "WhatsApp us", href: site.whatsapp.wa },
      { label: "Privacy", href: "#" },
    ] },
  ],
  socials: ["instagram", "whatsapp", "x", "youtube"] as const,
  copyright: "© 2026 LastLap. Brookfield, Bengaluru.",
  privacy: "Privacy Policy",
};
