# Landing page

The structure, design system, and responsive behaviour of the pre-launch page. For stack, commands, and the waitlist backend see [engineering.md](engineering.md). All copy and data come from `src/lib/content.ts`; design tokens are defined in `src/app/globals.css`. This file describes and points to those, it does not restate values that would drift.

## Goal

A pre-launch interest-checker. The single conversion is the **waitlist** (email + phone + "how did you hear about us"), sweetened with a **25% off** perk. Secondary contact is a **WhatsApp** button and an interactive map. Tone: "paddock at dusk, not esports stadium" (dark, warm, editorial, calm).

## Section order

Composed in `src/app/page.tsx`. Each section component lives in `components/sections/`.

| # | Section (id) | Purpose |
|---|---|---|
| 1 | **Nav** (header) | Sticky bar, transparent over the hero then solid. Hamburger + full-screen menu on mobile/tablet; inline links + "Join the Waitlist" on desktop. |
| 2 | **Hero** (`#home`) | Background video (poster + webm/mp4), a loud opening-date tag, the headline, and an embedded compact waitlist form with the 25% pill. |
| 3 | **The Rigs** (`#rigs`) | Six simulator rigs. Carousel on mobile/tablet, grid on desktop. A "games" chip strip below. |
| 4 | **Why Us** (`#why`) | Bento of differentiators with text overlaid on imagery. The cafe is folded in here as a pillar. |
| 5 | **How It Works** (`#how-it-works`) | A four-step process that auto-rotates (image with overlaid title/caption + a filling progress-rail timeline). |
| 6 | **The Space** (`#space`) | Atmosphere gallery. Carousel on mobile, editorial grid on tablet/desktop. |
| 7 | **FAQ** (`#faq`) | Accordion (ShadCN base-ui) with red arrows. |
| 8 | **Waitlist** (`#waitlist`) | Split card: the full waitlist form (+ WhatsApp button + 25% pill) beside an interactive dark Leaflet map. |
| 9 | **Footer** (`#footer`) | Brand wordmark, tagline, link columns, social icons, WhatsApp, opening-date tag. |

## Design system

Tokens are CSS variables in `src/app/globals.css`; the site is always dark (no theme toggle).

- **Color:** `--background` `#0A0A0A`, `--foreground` `#FFFFFF`, brand `--brand` `#B81D1D` (+ `--brand-hover`), `--hairline` `rgba(255,255,255,.1)`, plus a muted foreground. The deep red is the only accent.
- **Typography:** **Funnel Display** for headings via the `.t-display` → `.t-h6` classes (weight 400/500, tight tracking, fluid `clamp()` sizes); **Geist** for body via `.t-body` / `.t-small` / `.t-eyebrow`. The "LastLap" wordmark uses `font-heading`.
- **Spacing / grid:** `Container` = `max-w-[1440px]` with `px-5 / sm:px-8 / lg:px-16`; `Section` = `py-20 lg:py-24`; base gap `4` (1rem); 8px rhythm.
- **Radii:** `2px` everywhere (sharp, editorial). Exceptions: social icons and map controls ~10px.
- **Motion:** the `Reveal` primitive (fade up, opacity 0 to 1 + translateY, fires once in view); shared ease `cubic-bezier(.44, 0, .56, 1)`; durations are kept snappy. CTAs use `AccentCTA` (text + arrow + a red bar; `underline` and `sideline` variants), never filled buttons, except the waitlist submit. Reduced motion is respected globally.

## Component inventory

- **Container / Section** — width + horizontal padding; section vertical rhythm.
- **Reveal** — scroll-in fade/slide wrapper.
- **AccentCTA** — the signature red-bar text CTA.
- **SectionHeader** — the two-column heading + paragraph + CTA pattern reused by most sections.
- **DateTag** — the small "Opening ..." pill with a pulsing dot.
- **RigCard / RigsCarousel** — a rig card; the responsive carousel/grid + mobile dots.
- **SpaceCarousel** — the mobile gallery carousel + dots.
- **WaitlistForm** — shared form (email, phone, source, submit, WhatsApp button); used in the hero and the waitlist section.
- **LocationMap / MapInner** — the dark Leaflet map (client-only, dynamically imported).

## Responsive choices

Breakpoints: Tailwind **`sm` = 640px** (tablet, including the Galaxy Z Fold inner screen) and **`lg` = 1024px** (desktop). Mobile is below 640.

- **Nav:** hamburger + full-screen menu below `lg`; inline links + "Join the Waitlist" button at `lg`+. The hamburger is hidden on desktop.
- **The Rigs:** scroll-snap carousel below `lg` — **1 card on mobile** (`<640`), **2 cards on tablet** (`640–1023`), with the next card peeking. **Dot indicators show on mobile only.** Three-column grid at `lg`+.
- **How It Works:** **mobile (`<sm`) shows only the image** (the step-list timeline is hidden); **tablet (`sm–lg`) shows the image with the timeline below**; **desktop (`lg`) puts the timeline on the left and the image on the right.** The auto-rotate begins from step 01 only when the section scrolls into view, never pauses on hover, and a click jumps to a step.
- **The Space:** **mobile (`<sm`) is a carousel** with a peek of the next image and **dot indicators**; `sm`+ is the editorial multi-column grid.
- **Waitlist:** form fields go two-up at `sm`+; the submit label is **"Save spot" on mobile** and "Save my spot" at `sm`+; the map sits in an `isolate` stacking context; a dedicated WhatsApp button sits beside the submit.
- **Utilities:** carousels use a peek affordance and the `.no-scrollbar` utility.

## Assets

In `public/assets`, all webp, compressed with `cwebp` (images) and `ffmpeg` (video). Naming:

- Rigs: `rig-rookie`, `rig-gt`, `rig-formula`, `rig-motion`, `rig-endurance`, `rig-apex`.
- Why: `why-thrill`, `why-comfort`, `why-cafe`.
- Steps: `step-pick`, `step-brief`, `step-drive`, `step-refuel`.
- Space: `space-lead`, `space-detail`.
- Hero: `hero.webm` + `hero.mp4` fallback + `hero-poster.webp` (the `<video>` has both sources and the poster).

These are AI-generated placeholders to be swapped with real photos as the venue is built. The game "logos" are currently styled chips (icon + name); drop real brand-logo SVGs in to swap them.
