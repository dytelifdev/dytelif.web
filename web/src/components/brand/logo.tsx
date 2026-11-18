import { cn } from "@/lib/utils";

/**
 * The client's ES mark and "Dyt. Elif Sude Özkan" lettering, outlined and served
 * from one cached sprite (/brand/logo.svg). Letters follow `currentColor`; the
 * gilt swoosh and the lockup divider follow `--logo-accent` (set per surface).
 * Outer viewBoxes only carry the aspect ratio; each symbol maps its own box.
 */
const LABEL = "Dyt. Elif Sude Özkan";

/** Horizontal lockup: monogram, divider, lettering. The primary logo. Pass label="" inside a labelled link. */
export function Lockup({ className, label = LABEL }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 2094.5 373"
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn("h-10 w-auto", className)}
    >
      <use href="/brand/logo.svg#lockup" />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 463.5 65.6" role="img" aria-label={LABEL} className={cn("h-7 w-auto", className)}>
      <use href="/brand/logo.svg#wordmark" />
    </svg>
  );
}

/** ES monogram. Pass label="" where it is decorative. */
export function Monogram({ className, label = LABEL }: { className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 94 100"
      role={label ? "img" : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cn("h-8 w-auto", className)}
    >
      <use href="/brand/logo.svg#monogram" />
    </svg>
  );
}
