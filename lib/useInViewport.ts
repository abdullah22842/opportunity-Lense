"use client";

import { useCallback, useRef, useState } from "react";

/**
 * True while the element is on screen.
 *
 * The decorative SVGs run looping animations. Left ungated they burn
 * frames the whole time the page is open, including far off screen, so
 * each visual gates its loops on this.
 *
 * Uses a callback ref rather than useEffect for two reasons: it only
 * ever runs on the client (so initial state can't diverge between
 * server and client and trip hydration), and it avoids setting state
 * synchronously inside an effect.
 */
export function useInViewport<T extends Element>(rootMargin = "200px") {
  const [inView, setInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const ref = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node) return;

      // No IntersectionObserver: run the animations rather than never
      // starting them.
      if (typeof IntersectionObserver === "undefined") {
        setInView(true);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { rootMargin }
      );
      observer.observe(node);
      observerRef.current = observer;
    },
    [rootMargin]
  );

  return { ref, inView };
}
