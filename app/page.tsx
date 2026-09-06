import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { Hero } from "@/components/sections/Hero";

const swatches: { name: string; varName: string; hex: string }[] = [
  { name: "Background", varName: "--color-bg", hex: "#08090C" },
  { name: "Elevated", varName: "--color-bg-elevated", hex: "#0E1014" },
  { name: "Surface", varName: "--color-surface", hex: "#131519" },
  { name: "Border", varName: "--color-border", hex: "#22252C" },
  { name: "Text", varName: "--color-text", hex: "#F3F4F7" },
  { name: "Text soft", varName: "--color-text-soft", hex: "#C7CAD3" },
  { name: "Muted", varName: "--color-muted", hex: "#888C97" },
  { name: "Cyan (primary)", varName: "--color-cyan", hex: "#3ECBF0" },
  { name: "Violet (secondary)", varName: "--color-violet", hex: "#8B7EF2" },
];

const typeSpecimens = [
  { tag: "h1" as const, label: "Display / H1", sample: "Intelligence, applied." },
  { tag: "h2" as const, label: "Display / H2", sample: "Research-driven systems." },
  { tag: "h3" as const, label: "Display / H3", sample: "Built for production." },
  { tag: "h4" as const, label: "Display / H4", sample: "A focused approach." },
];

const checks = [
  "Dark surface system with layered elevation (bg → elevated → surface)",
  "Electric cyan primary accent + restrained violet secondary",
  "Reusable tokens for color, type, spacing, radius, shadow, gradient, motion",
  "Component classes: .card, .btn, .badge — plus matching React primitives",
  "Fluid, large-scale display type (Unbounded) paired with Manrope body text",
];

/**
 * DESIGN SYSTEM PREVIEW — not the final homepage.
 * Exercises every token and primitive (color, type, buttons, badges,
 * cards, gradients, glow) so the system can be reviewed as a whole
 * before individual homepage sections are built.
 */
export default function Home() {
  return (
    <main className="flex-1">
      <div className="flex items-center justify-between px-6 py-6 sm:px-10">
        <Logo />
        <Badge tone="cyan">Design system preview</Badge>
      </div>

      <Hero />

      {/* ---------- Typography ---------- */}
      <Section className="border-t border-line" containerClassName="max-w-[52rem]">
        <Badge tone="neutral">Typography</Badge>
        <div className="mt-8 space-y-8">
          {typeSpecimens.map((spec) => (
            <div key={spec.tag} className="border-b border-line pb-8 last:border-none">
              <p className="mb-2 text-sm text-muted">{spec.label}</p>
              <spec.tag className="mb-0!">{spec.sample}</spec.tag>
            </div>
          ))}
          <p className="prose-measure text-ink-soft">
            Body text runs in Manrope at a comfortable measure — this
            paragraph demonstrates the default reading size and line
            height used across long-form content.
          </p>
        </div>
      </Section>

      {/* ---------- Color tokens ---------- */}
      <Section className="border-t border-line">
        <Badge tone="neutral">Color</Badge>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map((s) => (
            <div key={s.varName}>
              <div
                className="h-20 rounded-[var(--radius-md)] border border-line"
                style={{ backgroundColor: s.hex }}
              />
              <p className="mt-2 text-sm text-ink-soft">{s.name}</p>
              <p className="font-mono text-xs text-muted">{s.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- Buttons & badges ---------- */}
      <Section className="border-t border-line">
        <Badge tone="neutral">Buttons &amp; badges</Badge>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="primary">Primary action</Button>
          <Button variant="secondary">Secondary action</Button>
          <Button variant="ghost">Ghost action</Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Badge tone="neutral">Neutral</Badge>
          <Badge tone="cyan">Cyan</Badge>
          <Badge tone="violet">Violet</Badge>
        </div>
      </Section>

      {/* ---------- Cards & gradients ---------- */}
      <Section className="border-t border-line">
        <Badge tone="neutral">Cards, gradients &amp; glow</Badge>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          <Card>
            <h4 className="text-lg!">Default card</h4>
            <p className="mt-2 text-sm text-ink-soft">
              Surface, hairline border, and a subtle top sheen.
            </p>
          </Card>
          <Card interactive>
            <h4 className="text-lg!">Interactive card</h4>
            <p className="mt-2 text-sm text-ink-soft">
              Lifts slightly on hover — use for clickable content.
            </p>
          </Card>
          <Card featured>
            <h4 className="text-lg!">Featured card</h4>
            <p className="mt-2 text-sm text-ink-soft">
              Faint brand-gradient border — reserve for one highlight per page.
            </p>
          </Card>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-8">
          <p className="font-display text-3xl text-gradient-brand">
            Gradient text
          </p>
          <Button className="shadow-[var(--glow-cyan-md)]">Glow on demand</Button>
        </div>
      </Section>

      {/* ---------- Foundation checklist ---------- */}
      <Section className="border-t border-line" containerClassName="max-w-[52rem]">
        <h2 className="text-2xl">System, verified</h2>
        <ul className="mt-8 space-y-4">
          {checks.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink-soft">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-cyan" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Container as="footer" className="border-t border-line py-8 text-sm text-muted">
        Opportunity Lens — design system preview. Homepage sections not yet built.
      </Container>
    </main>
  );
}
