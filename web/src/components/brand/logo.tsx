import { cn } from "@/lib/utils";

/**
 * Outlined brand lettering served from one cached sprite (/brand/logo.svg).
 * Colour follows `currentColor`; the monogram's dots follow `--logo-accent`.
 * Outer viewBoxes only carry the aspect ratio; each symbol maps its own box.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 371.2 46.4" role="img" aria-label="Dyt. Elif Sude Özkan" className={cn("h-7 w-auto", className)}>
      <use href="/brand/logo.svg#wordmark" />
    </svg>
  );
}

export function Monogram({ className, label = "Dyt. Elif Sude Özkan" }: { className?: string; label?: string }) {
  return (
    <svg viewBox="0 0 82.6 67.2" role="img" aria-label={label} className={cn("h-8 w-auto", className)}>
      <use href="/brand/logo.svg#monogram" />
    </svg>
  );
}
