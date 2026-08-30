# Engineering

How this codebase is built and how to work in it. Page design and responsive behaviour live in [landing-page.md](landing-page.md).

## Stack

- **Next.js 16** (App Router, `src/` dir, Turbopack), **React 19**, **TypeScript**.
- **Tailwind v4**, CSS-first config via `@theme` in `src/app/globals.css` (no `tailwind.config`).
- **Framer Motion** for animation; **ShadCN** (base-nova preset) is installed but only the FAQ Accordion is used.
- **react-leaflet + Leaflet** for the waitlist map (CARTO dark tiles, no API key).
- **lucide-react** for icons.
- Fonts via `next/font/google`: **Funnel Display** (headings) and **Geist** (body).
- Waitlist data: **Neon** (serverless Postgres) + **Prisma 7** + **Resend** (saves contacts; confirmation emails dormant). Validation with **zod**.

## Repo structure

```
src/
  app/
    layout.tsx        # fonts, metadata, <Providers>
    page.tsx          # composes the sections in order
    globals.css       # design tokens (@theme), type-scale classes, leaflet + utility styles
    providers.tsx     # <MotionConfig reducedMotion="user">
    not-found.tsx     # 404 page (noindex)
    robots.ts         # /robots.txt
    sitemap.ts        # /sitemap.xml
    opengraph-image.tsx # generated 1200x630 OG / Twitter card (next/og)
    icon.svg          # favicon (theme-adaptive); favicon.ico is the legacy fallback
    actions/waitlist.ts   # "use server" Server Action for the waitlist
  components/
    sections/         # Nav, Hero, Rigs, Why, HowItWorks, TheSpace, FAQ, Waitlist, Footer
    primitives/       # Container, Section, Reveal, AccentCTA, SectionHeader, DateTag
    rigs/             # RigCard, RigsCarousel
    space/            # SpaceCarousel
    waitlist/         # WaitlistForm, LocationMap, MapInner
    ui/               # ShadCN (accordion)
  lib/
    content.ts        # ALL copy + structured data (single source of truth)
    prisma.ts         # lazy Prisma client (driver adapter)
    resend.ts         # Resend client (dormant until launch)
    waitlist-types.ts # shared WaitlistState type
    utils.ts          # cn()
  generated/prisma/   # Prisma client output (gitignored, regenerated on install)
prisma/schema.prisma  # WaitlistSignup model
prisma.config.ts      # Prisma 7 CLI config (loads .env.local)
public/assets/        # webp images + hero video (see landing-page.md)
docs/                 # this folder
```

## Content model

`src/lib/content.ts` is the single source of truth for every piece of copy and structured data (nav, hero, rigs, why, session, space, faq, waitlist, footer, plus `site` with WhatsApp number and map coords). **Edit copy and data there, not inside components.** Components are presentational and read from this module.

## Commands

- `npm run dev` — local dev (Turbopack).
- `npm run build` — production build (run this to verify before shipping).
- `npm run db:push` — push the Prisma schema to Neon (creates/updates the table).
- `npm run lint` — ESLint.
- `postinstall` runs `prisma generate` automatically (so the generated client exists on Vercel).

## Env and deployment

- Local: **`.env.local`** holds `DATABASE_URL` (Neon **pooled** connection string, host has `-pooler`) and `RESEND_API_KEY`, plus optional `NEXT_PUBLIC_SITE_URL` (base URL for canonical/OG/sitemap/robots; defaults to `https://lastlap.vercel.app`). `.env.example` documents them.
- Next.js loads `.env.local` at runtime. `prisma.config.ts` explicitly loads `.env.local` too (Prisma's default only reads `.env`).
- Vercel: set `DATABASE_URL` and `RESEND_API_KEY` (and `NEXT_PUBLIC_SITE_URL` if the deployed domain differs from `https://lastlap.vercel.app`) in the project's Environment Variables (`.env.local` is gitignored and never deploys). Root is the app; the page is statically prerendered.

## Waitlist backend

- Form: `components/waitlist/WaitlistForm.tsx` (client) posts to the Server Action.
- Action: `app/actions/waitlist.ts` validates with zod (**optional** email, required Indian phone, required source), drops bot submissions via a `company` honeypot, then writes a `WaitlistSignup` row via Prisma. A duplicate email (`P2002`) is treated as success.
- Prisma client: `lib/prisma.ts` builds a lazy singleton with the `@prisma/adapter-pg` driver adapter, constructed only when `DATABASE_URL` is set (so local dev without a DB returns a soft success and the UI flow still works).
- Resend: `lib/resend.ts` saves each signup that has an email as a Resend contact via `contacts.create` (the global Contacts endpoint, no audience ID needed in the installed SDK; best-effort: never throws, so it can't fail the signup). No confirmation email is sent yet; `sendWaitlistConfirmation` stays a dormant stub until launch. Without `RESEND_API_KEY`, contact-saving is skipped.
- **To collect real signups:** set `DATABASE_URL`, run `npm run db:push` once, then submit. Contacts are also saved to Resend whenever `RESEND_API_KEY` is set.

## Roadmap (phases)

- **Phase 1 (current):** landing page + waitlist capture.
- **Phase 2 (later):** client booking + payments, and an owner/admin platform. Not built yet. The `WaitlistSignup` table is intentionally simple so it can grow into a customers/leads/bookings schema; Neon + Prisma were chosen to support that without rework.

## Conventions

- **Voice:** plain, human English. No em-dashes, no generic AI filler.
- **Minimal diffs:** make the smallest change that solves the problem; match existing patterns.
- **Animation:** use the `Reveal` primitive for scroll-in reveals; CTAs use `AccentCTA` (text + arrow + red bar), not filled buttons (the waitlist submit is the one intentional filled button).
- **Logos:** do not reproduce trademarked logos. Use icons, chips, or placeholders.
- **Verify UI** at mobile, tablet, and desktop before calling a change done.

## Gotchas

- **Prisma 7:** the datasource has no `url` in the schema (it lives in `prisma.config.ts`); a driver adapter is required; the client is generated to `src/generated/prisma` (gitignored, rebuilt by `postinstall`).
- **`prisma.config.ts`** must load `.env.local` itself; Prisma's built-in dotenv only reads `.env`.
- **`next/image`** serves resized AVIF/WebP at runtime, so source images only need to be reasonably sized webp.
- **Leaflet z-index:** Leaflet's internal z-indexes climb to ~1000. The map wrapper uses `isolate` so they stay contained below the fixed nav (`z-50`). Keep that.
- **Reduced motion** is handled globally via `<MotionConfig reducedMotion="user">`. Do not branch the rendered tree on `useReducedMotion()` (it causes a hydration mismatch); gate behaviour in effects instead.
- **`.env.local` must exist before `npm install`, not after.** `postinstall` runs `prisma generate`, which loads `prisma.config.ts`, which resolves `DATABASE_URL` eagerly and throws `PrismaConfigEnvError` when it is unset — and the Prisma CLI loads that config before dispatching any command, so the failure is fatal rather than skipped. On a fresh clone: `cp .env.example .env.local` and fill it in *first*. Any placeholder that parses as a Postgres URL is enough to get through install if you only want to run the UI.
