import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Register of entries, ruled like an herbarium accession book: one heavy rule
 * on top, hairlines between rows, the whole row is the link.
 */
export function Ledger({ children, className }: { children: ReactNode; className?: string }) {
  return <ul className={cn("border-t-2 border-on-surface", className)}>{children}</ul>;
}

export function LedgerEntry({
  href,
  title,
  meta,
  summary,
  media,
  headingLevel = "h3",
}: {
  href: string;
  title: string;
  meta?: ReactNode;
  summary?: string | null;
  media?: ReactNode;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  return (
    <li className="border-b border-rule">
      <Link href={href} className="group grid gap-x-8 gap-y-3 py-7 sm:grid-cols-[minmax(0,1fr)_auto] lg:py-9">
        <div
          className={cn(
            "grid gap-x-6 gap-y-3",
            media ? "grid-cols-[5rem_minmax(0,1fr)] sm:grid-cols-[7rem_minmax(0,1fr)]" : "",
          )}
        >
          {media ? <div className="row-span-3">{media}</div> : null}
          {meta ? <p className="text-sm text-on-surface-soft">{meta}</p> : null}
          <Heading className="font-display text-2xl leading-tight text-balance decoration-1 underline-offset-[0.18em] group-hover:underline sm:text-3xl">
            {title}
          </Heading>
          {summary ? <p className="max-w-2xl text-on-surface-soft">{summary}</p> : null}
        </div>
        <ArrowUpRightIcon
          aria-hidden="true"
          strokeWidth={1.25}
          className="hidden size-8 self-start transition-transform duration-300 ease-out-expo group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
        />
      </Link>
    </li>
  );
}
