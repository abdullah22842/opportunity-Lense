"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewport } from "@/lib/useInViewport";

/**
 * Research visual — a latent-space traversal.
 *
 * Reads left to right: scattered samples on the left, flow paths across
 * the middle, and a structured two-arc manifold on the right, over a
 * measurement grid with frequency bands beneath. Deliberately
 * rectangular and grid-based so it doesn't restate the hero's circular
 * lens motif.
 *
 * All positions are computed deterministically so server and client
 * render identically.
 */

const W = 520;
const H = 360;

/** Stable pseudo-random in [0,1) from an integer seed. */
function rand(i: number, salt = 0) {
  return Math.abs(Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453) % 1;
}

/** Unstructured samples on the left. */
const NOISE = Array.from({ length: 46 }, (_, i) => ({
  x: 40 + rand(i, 1) * 120,
  y: 70 + rand(i, 2) * 200,
  r: 1.4 + rand(i, 3) * 1.6,
  d: rand(i, 4) * 3,
}));

/** Two interleaved arcs — the structure the samples resolve into. */
const MANIFOLD = (() => {
  const pts: { x: number; y: number; arc: 0 | 1 }[] = [];
  const n = 34;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const a = Math.PI * t;
    pts.push({
      x: 330 + Math.cos(a) * 68,
      y: 150 + Math.sin(a) * 68,
      arc: 0,
    });
    pts.push({
      x: 392 - Math.cos(a) * 68,
      y: 214 - Math.sin(a) * 68,
      arc: 1,
    });
  }
  return pts;
})();

/** Flow paths from the noise cloud toward the manifold. */
const FLOWS = Array.from({ length: 7 }, (_, i) => {
  const y0 = 84 + i * 28;
  const y1 = 120 + rand(i, 5) * 130;
  return `M158 ${y0} C 215 ${y0}, 235 ${y1}, 292 ${y1}`;
});

/** Frequency bands along the bottom. */
const BARS = Array.from({ length: 42 }, (_, i) => ({
  x: 40 + i * 11,
  h: 4 + rand(i, 6) * 26,
  d: (i % 9) * 0.16,
}));

export function ResearchVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLDivElement>();
  const reduce = reduced || !inView;

  return (
    <div className={className} ref={ref}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Abstract diagram: scattered data points on the left flow across into a structured two-arc manifold on the right, above a row of frequency bands."
      >
        <defs>
          <linearGradient id="ol-rv-brand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
          <linearGradient id="ol-rv-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0" />
            <stop offset="45%" stopColor="var(--color-cyan)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-violet)" stopOpacity="0.15" />
          </linearGradient>
          <pattern
            id="ol-rv-grid"
            width="26"
            height="26"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M26 0H0V26"
              fill="none"
              stroke="var(--color-border)"
              strokeWidth="0.6"
            />
          </pattern>
          <radialGradient id="ol-rv-vignette" cx="0.5" cy="0.45" r="0.62">
            <stop offset="55%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ol-rv-mask">
            <rect width={W} height={H} fill="url(#ol-rv-vignette)" />
          </mask>
        </defs>

        {/* Measurement grid */}
        <rect
          width={W}
          height={H}
          fill="url(#ol-rv-grid)"
          mask="url(#ol-rv-mask)"
          opacity="0.7"
        />

        {/* Axis marks — the sampled region */}
        <g stroke="var(--color-border-strong)" strokeWidth="1" fill="none">
          <path d="M32 62v-12h14" />
          <path d="M488 62v-12h-14" />
          <path d="M32 262v12h14" />
          <path d="M488 262v12h-14" />
        </g>

        {/* Flow paths */}
        <g fill="none" stroke="url(#ol-rv-flow)" strokeWidth="1.2">
          {FLOWS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              strokeDasharray="6 10"
              initial={{ strokeDashoffset: 0 }}
              animate={reduce ? undefined : { strokeDashoffset: [-64, 0] }}
              transition={{
                duration: 3.6 + (i % 3) * 0.7,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </g>

        {/* Unstructured samples */}
        <g fill="var(--color-cyan)">
          {NOISE.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={p.r}
              initial={{ opacity: 0.3 }}
              animate={reduce ? undefined : { opacity: [0.18, 0.55, 0.18] }}
              transition={{
                duration: 4.2,
                repeat: Infinity,
                delay: p.d,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Structured manifold */}
        <g>
          {MANIFOLD.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="2.4"
              fill={p.arc === 0 ? "var(--color-cyan)" : "var(--color-violet)"}
              initial={{ opacity: 0.7 }}
              animate={reduce ? undefined : { opacity: [0.45, 0.95, 0.45] }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                delay: (i % 12) * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Frequency bands */}
        <g>
          {BARS.map((b, i) => (
            <motion.rect
              key={i}
              x={b.x}
              width="5"
              rx="2"
              fill="url(#ol-rv-brand)"
              initial={{ height: b.h, y: 322 - b.h, opacity: 0.35 }}
              animate={
                reduce
                  ? undefined
                  : {
                      height: [b.h, b.h * 1.9, b.h],
                      y: [322 - b.h, 322 - b.h * 1.9, 322 - b.h],
                      opacity: [0.25, 0.6, 0.25],
                    }
              }
              transition={{
                duration: 2.9,
                repeat: Infinity,
                delay: b.d,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>
        <line
          x1="36"
          y1="324"
          x2="484"
          y2="324"
          stroke="var(--color-border)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
