import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TermRow = { term: ReactNode; detail: ReactNode; key?: string };

/**
 * Short term beside its explanation, ruled like a ledger: a brass hairline on top,
 * linen lines between rows. Used for the service focus notes, the visit checklist
 * and the CV on Hakkımda.
 */
export function TermRows({
  items,
  termWidth = "11rem",
  className,
}: {
  items: readonly TermRow[];
  /** Width of the term column from the sm breakpoint up. */
  termWidth?: string;
  className?: string;
}) {
  return (
    <dl className={cn("border-t border-brass/60", className)}>
      {items.map((item, i) => (
        <div
          key={item.key ?? (typeof item.term === "string" ? item.term : i)}
          style={{ "--term-w": termWidth } as CSSProperties}
          className="grid gap-1.5 border-b border-line py-5 sm:grid-cols-[minmax(0,var(--term-w))_minmax(0,1fr)] sm:gap-8 sm:py-6"
        >
          <dt className="font-bold text-ink">{item.term}</dt>
          <dd className="leading-relaxed text-ink-soft">{item.detail}</dd>
        </div>
      ))}
    </dl>
  );
}
