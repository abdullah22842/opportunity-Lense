"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Route-level error boundary. Explains what happened and offers a
 * concrete next step rather than a stack trace or an apology.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Replace with a real reporter (Sentry, etc.) when one exists.
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-1 items-center">
      <Container className="py-[var(--space-section-y)]">
        <h1 className="max-w-[20ch] text-[clamp(1.8rem,1.2rem+2vw,2.4rem)]! leading-[1.15]!">
          Something went wrong on this page.
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg text-ink-soft">
          The page failed to load. Trying again usually clears it.
        </p>
        {error.digest && (
          <p className="mt-3 font-mono text-sm text-muted">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-9 flex flex-wrap gap-4">
          <Button onClick={reset}>Try again</Button>
          <Button href="/" variant="secondary">
            Back to home
          </Button>
        </div>
      </Container>
    </main>
  );
}
