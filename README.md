# LastLap

The pre-launch landing page and waitlist for a sim racing lounge and cafe in
Brookfield, Bengaluru. One page, one conversion: get on the list before the
doors open.

This repository is published as a **case study** — a real, shipped commercial
site with its design and engineering decisions written down. It is not a
template. Every string in `src/lib/content.ts` belongs to one business, and the
branding is not reusable. See [License](#license).

**Live:** https://last-lap.vercel.app

---

## What it is

A single scrolling page — hero, the rigs, why us, how it works, the space, FAQ,
waitlist, footer — plus a Server Action that writes signups to Postgres. There
is no CMS, no auth, no admin. Phase 2 (booking and payments, an owner
dashboard) is deliberately not built; the schema is just shaped so it can grow
into that without a rewrite.

## The parts worth reading

If you are here from a portfolio link, these are the decisions I would point at.

**The waitlist inverts the usual field priority.** Email is optional; an Indian
mobile number is required. That is not a style choice — the audience is local,
WhatsApp-first, and far more likely to give a phone number than an address they
check weekly. `src/app/actions/waitlist.ts` encodes it: `email` is
`.optional()`, `phone` matches `/^(\+?91)?[6-9]\d{9}$/` and is required.

**A duplicate signup is a success, not an error.** `email` is `@unique`, and the
action catches Prisma's `P2002` and returns success anyway. Someone who signs up
twice should see "you're on the list", not a validation failure — they *are* on
the list. Telling them otherwise is both worse UX and a small enumeration leak.

**Spam handling is a honeypot, not a CAPTCHA.** A `company` field is rendered
off-screen with `tabIndex={-1}`; a filled one returns success without writing.
Bots fill every field, humans never see it. This is the cheap 80% — a real
launch push needs rate limiting on top, and that is not in yet.

**Prisma 7 with a driver adapter, built lazily.** The datasource carries no
`url` in the schema; it lives in `prisma.config.ts`. The client is a lazy
singleton constructed only when `DATABASE_URL` is set, so local development
without a database still exercises the full UI flow instead of crashing. The
Prisma 7 setup is genuinely fiddly and trips people up in public issues —
`docs/engineering.md` has the specifics.

**Reduced motion is global, not per-component.** `<MotionConfig
reducedMotion="user">` in `providers.tsx`. Branching the rendered tree on
`useReducedMotion()` causes a hydration mismatch, so behaviour is gated inside
effects instead.

**One accent colour, used sparingly.** Near-black ground, a single deep red, and
CTAs that are text plus an arrow plus a red bar rather than filled buttons. The
waitlist submit is the one intentional filled button on the page, because it is
the only thing the page is actually asking for.

## Running it

Requires Node 20+.

```bash
git clone https://github.com/Terra-01/LastLap.git
cd LastLap
cp .env.example .env.local
```

**Fill in `.env.local` before you install.** This is not optional and it is not
the usual order. `postinstall` runs `prisma generate`, which loads
`prisma.config.ts`, which resolves `DATABASE_URL` eagerly and throws if it is
unset — and the Prisma CLI loads that config before dispatching any command, so
install fails outright. Any string that parses as a Postgres URL is enough to
get through install if you only want to look at the UI.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Environment

| Variable | Required | What it does |
|---|---|---|
| `DATABASE_URL` | For real signups | Neon **pooled** connection string (the host contains `-pooler`). Unset, the waitlist logs instead of writing and the UI flow still works. |
| `RESEND_API_KEY` | No | Saves each signup with an email as a Resend contact. No email is ever sent — the confirmation is a dormant stub until launch. |
| `NEXT_PUBLIC_SITE_URL` | No | Base URL for canonical links, the OG image, sitemap and robots. Defaults to the Vercel URL. |

To collect real signups: set `DATABASE_URL`, run `npm run db:push` once, then
submit the form.

## Stack

Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind v4
(CSS-first `@theme`, no config file) · Framer Motion · react-leaflet with CARTO
dark tiles (no API key) · Prisma 7 + `@prisma/adapter-pg` against Neon · Resend
· zod. Fonts are Funnel Display and Geist via `next/font/google`.

## Documentation

- **[docs/engineering.md](docs/engineering.md)** — stack, repo structure,
  content model, commands, env, the waitlist backend, and the gotchas.
- **[docs/landing-page.md](docs/landing-page.md)** — section-by-section
  structure, the design system, and the responsive decisions.

`src/lib/content.ts` is the single source of truth for all copy and structured
data. Edit it there, not inside components.

## Honest notes

- **The venue imagery is AI-generated placeholder art**, including the hero
  video, which carries a visible Veo watermark. The space does not exist yet.
  All of it gets replaced with photography once it does.
- **The contact details and the map pin are placeholders too.** The WhatsApp
  number is a dummy, and the map points at Cubbon Park rather than the real
  address, which is not public until the lease is signed. Both are marked as
  such in `src/lib/content.ts`.
- **This is a marketing site, not a product.** The waitlist endpoint is
  unauthenticated and unthrottled, which is normal for a public signup form and
  still wants a rate limit before any real launch push.

## License

Not licensed for reuse. The code is public to be read, not copied — the
branding, copy and imagery belong to a real business, and the AI-generated
placeholder art is not mine to sublicense. If you want to use something here,
open an issue and ask; the answer for a genuinely separable technical piece is
very likely yes.
