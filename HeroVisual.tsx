"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInViewport } from "@/lib/useInViewport";

/**
 * Hero visual — an abstract lens.
 *
 * The composition reads outward-in: detection brackets frame the field,
 * an aperture ring sweeps around a feature-map grid whose cells resolve
 * from scattered to structured, and a small three-layer graph sits over
 * it with a signal travelling its edges. Reads as vision + network +
 * generative sampling without any figurative imagery.
 *
 * Everything is a single inline SVG so it scales without assets and
 * inherits the brand tokens directly.
 */

const CENTER = 210;

/** Feature-map cells. Opacity stands in for activation strength. */
const CELLS = (() => {
  const out: { x: number; y: number; o: number; d: number }[] = [];
  const size = 15;
  const gap = 3;
  const span = 5;
  let i = 0;
  for (let r = -span; r <= span; r++) {
    for (let c = -span; c <= span; c++) {
      const dist = Math.hypot(r, c);
      if (dist > span) continue;
      // Deterministic pseudo-random so server and client agree.
      const n = Math.abs(Math.sin((r * 12.9898 + c * 78.233) * 43758.5453));
      const o = 0.05 + n * 0.42 * (1 - dist / (span + 1.4));
      out.push({
        x: CENTER + c * (size + gap) - size / 2,
        y: CENTER + r * (size + gap) - size / 2,
        o,
        d: (i++ % 11) * 0.24,
      });
    }
  }
  return out;
})();

/** Three-layer graph, positioned across the lens. */
const LAYERS = [
  { x: 96, ys: [140, 210, 280] },
  { x: 210, ys: [112, 175, 245, 308] },
  { x: 324, ys: [155, 210, 265] },
];

const EDGES: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let l = 0; l < LAYERS.length - 1; l++) {
  for (const y1 of LAYERS[l].ys) {
    for (const y2 of LAYERS[l + 1].ys) {
      EDGES.push({ x1: LAYERS[l].x, y1, x2: LAYERS[l + 1].x, y2 });
    }
  }
}

export function HeroVisual({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInViewport<HTMLDivElement>();
  // Skip loops for reduced-motion users and while off screen.
  const reduce = reduced || !inView;
  const spin = (dur: number, dir = 1) =>
    reduce
      ? undefined
      : {
          rotate: dir * 360,
          transition: { duration: dur, repeat: Infinity, ease: "linear" as const },
        };

  return (
    <div className={className} ref={ref}>
      <svg
        viewBox="0 0 420 420"
        className="h-auto w-full"
        role="img"
        aria-label="Abstract lens: an aperture ring around a grid of activated cells, overlaid with a small neural network graph."
      >
        <defs>
          <linearGradient id="ol-hv-brand" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-cyan)" />
            <stop offset="100%" stopColor="var(--color-violet)" />
          </linearGradient>
          <radialGradient id="ol-hv-core" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="var(--color-cyan)" stopOpacity="0.55" />
            <stop offset="60%" stopColor="var(--color-violet)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-violet)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="ol-hv-mask" cx="0.5" cy="0.5" r="0.5">
            <stop offset="55%" stopColor="#fff" stopOpacity="1" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id="ol-hv-fade">
            <rect width="420" height="420" fill="url(#ol-hv-mask)" />
          </mask>
        </defs>

        {/* Ambient core glow */}
        <circle cx={CENTER} cy={CENTER} r="180" fill="url(#ol-hv-core)" />

        {/* Feature map — the data being looked at */}
        <g mask="url(#ol-hv-fade)">
          {CELLS.map((c, i) => (
            <motion.rect
              key={i}
              x={c.x}
              y={c.y}
              width="15"
              height="15"
              rx="2.5"
              fill="var(--color-cyan)"
              initial={{ opacity: c.o }}
              animate={
                reduce
                  ? undefined
                  : { opacity: [c.o, Math.min(c.o * 2.6, 0.75), c.o] }
              }
              transition={{
                duration: 4.6,
                repeat: Infinity,
                delay: c.d,
                ease: "easeInOut",
              }}
            />
          ))}
        </g>

        {/* Detection brackets — the framing gesture of computer vision */}
        <g stroke="var(--color-border-strong)" strokeWidth="1.5" fill="none">
          <path d="M46 96V54h42" />
          <path d="M374 96V54h-42" />
          <path d="M46 324v42h42" />
          <path d="M374 324v42h-42" />
        </g>

        {/* Outer aperture ring, sweeping */}
        <motion.g
          style={{ originX: "210px", originY: "210px" }}
          animate={spin(46)}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r="168"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
          />
          <circle
            cx={CENTER}
            cy={CENTER}
            r="168"
            fill="none"
            stroke="url(#ol-hv-brand)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="70 985"
          />
          {[0, 90, 180, 270].map((a) => (
            <rect
              key={a}
              x={CENTER - 1}
              y={CENTER - 174}
              width="2"
              height="12"
              rx="1"
              fill="var(--color-border-strong)"
              transform={`rotate(${a} ${CENTER} ${CENTER})`}
            />
          ))}
        </motion.g>

        {/* Inner ring, counter-rotating, with data ticks */}
        <motion.g
          style={{ originX: "210px", originY: "210px" }}
          animate={spin(34, -1)}
        >
          <circle
            cx={CENTER}
            cy={CENTER}
            r="132"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="2 10"
          />
        </motion.g>

        {/* Network edges */}
        <g stroke="var(--color-violet)" strokeOpacity="0.22" strokeWidth="0.9">
          {EDGES.map((e, i) => (
            <line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2} />
          ))}
        </g>

        {/* A signal travelling one path through the network */}
        {!reduce && (
          <motion.circle
            r="3"
            fill="var(--color-cyan)"
            initial={{ opacity: 0 }}
            animate={{
              cx: [LAYERS[0].x, LAYERS[1].x, LAYERS[2].x],
              cy: [LAYERS[0].ys[1], LAYERS[1].ys[2], LAYERS[2].ys[0]],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: 1.1,
              ease: "easeInOut",
            }}
          />
        )}

        {/* Network nodes */}
        {LAYERS.map((layer, li) =>
          layer.ys.map((y, ni) => (
            <motion.circle
              key={`${li}-${ni}`}
              cx={layer.x}
              cy={y}
              r={li === 1 ? 4.5 : 4}
              fill="var(--color-bg)"
              stroke="url(#ol-hv-brand)"
              strokeWidth="1.4"
              initial={{ opacity: 0.75 }}
              animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
              transition={{
                duration: 3.4,
                repeat: Infinity,
                delay: (li * 4 + ni) * 0.22,
                ease: "easeInOut",
              }}
            />
          ))
        )}

        {/* Aperture core */}
        <circle
          cx={CENTER}
          cy={CENTER}
          r="30"
          fill="var(--color-bg)"
          fillOpacity="0.55"
          stroke="var(--color-border-strong)"
          strokeWidth="1"
        />
        <motion.circle
          cx={CENTER}
          cy={CENTER}
          r="8"
          fill="url(#ol-hv-brand)"
          initial={{ opacity: 0.9 }}
          animate={reduce ? undefined : { opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
