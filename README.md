# Opportunity Lens — website foundation

Foundation for the Opportunity Lens marketing site. This is scaffolding
only — most page sections have not been built yet. It exists to prove
the architecture, design tokens, and tooling all work together.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first config via `@theme` in `app/globals.css`)
- **Lucide** icons
- **Framer Motion** for the one orchestrated hero entrance
- `clsx` + `tailwind-merge` for a small `cn()` class-merging helper

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` produces a production
build; `npm run lint` runs ESLint.

## Structure

```
app/                    Routes, layout, global styles, metadata, favicon/icons
components/
  ui/                   Design-system primitives (Button, Section, Container, Badge, Logo)
  sections/             Page sections composed from ui/ primitives (Hero is the example)
data/                   Site-wide content and config (site.ts: nav, services, metadata copy)
lib/                    Shared utilities (cn())
styles/                 Supplementary stylesheets (typography.css), imported into globals.css
public/                 Static assets: favicons, manifest, OG image placeholder
```

### Why this shape

- **`data/` is the single source of truth for copy that appears in
  multiple places** (site name, tagline, nav links, service catalog).
  As the company grows and more pages/sections are added, new content
  goes here rather than getting hardcoded into components.
- **`components/ui` vs `components/sections`** separates reusable,
  content-agnostic primitives from page-specific compositions, so the
  design system can be reused across future pages (About, Services,
  Work, Research, Contact) without duplication.
- **Design tokens live in `app/globals.css`** as CSS custom properties
  mapped into Tailwind's `@theme`, so color/type/spacing/breakpoint
  decisions are centralized and themeable (e.g. a future dark mode)
  without touching component code.

## Design system summary

Dark, premium, technological — see `app/page.tsx` for a living preview
of every token and primitive below (run `npm run dev` and open `/`).

- **Color** — near-black surfaces layered by elevation (`bg` →
  `bg-elevated` → `surface`), off-white text, electric cyan (`cyan`)
  as the primary signal color, and a quieter violet (`violet`) used
  mostly in gradients and glow rather than solid fills. Full palette
  in `styles/tokens.css`.
- **Type** — `Unbounded` (bold geometric display, headlines) paired
  with `Manrope` (grotesk, body/UI). Large, fluid type scale defined
  in `styles/typography.css`.
- **Borders & cards** — hairline borders (`--color-border`), rounded
  corners (`--radius-sm` → `--radius-xl`), and a subtle top sheen on
  cards rather than heavy drop shadows. See `.card` /
  `.card-interactive` / `.card-featured` in `styles/components.css`
  and the `Card` component in `components/ui/Card.tsx`.
- **Buttons & badges** — `.btn-primary/secondary/ghost` and
  `.badge-neutral/cyan/violet` component classes in
  `styles/components.css`, wrapped by the `Button` and `Badge`
  components.
- **Gradients & glow** — `--gradient-brand` (cyan → violet, for
  borders/accents), `--gradient-hero-glow` (one ambient radial glow,
  reserved for hero-level use via the `.surface-glow` class), and
  `--glow-cyan-sm/md` box-shadow tokens for on-hover or on-demand glow.
  Used deliberately, not on every element.
- **Breakpoints** — Tailwind's default `sm/md/lg/xl/2xl`, plus a
  `xs` (360px) tier for small phones and a `3xl` (1440px) tier for
  wide desktop, defined in the `@theme` block in `styles/tokens.css`.
- **Motion** — Framer Motion is used deliberately, not by default.
  The current example (`components/sections/Hero.tsx`) does a single
  staggered entrance; avoid adding per-card hover/scroll animation
  everywhere as new sections are built. Motion tokens (`--duration-*`,
  `--ease-standard`) live in `styles/tokens.css`.

## Not built yet

Header/nav, full hero, Services/Work/Research/About/Contact pages,
footer, and real copy/imagery. `app/page.tsx` is currently a design
system preview (color/type/button/badge/card specimens), not the
final homepage — individual homepage sections come next.
