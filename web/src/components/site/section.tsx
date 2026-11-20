import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** One content width for the whole site, so every band lines up with the header. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

/** Ivory is the page, sand the alternating band; green and night green are the dark bands. */
export type Tone = "ivory" | "sand" | "green" | "deep";

const toneClass: Record<Tone, string> = {
  ivory: "bg-ivory",
  sand: "bg-sand",
  green: "bg-brand",
  deep: "bg-deep",
};

/** A full-width band. Dark tones flip text, rings and the logo swoosh through data-tone. */
export function Section({
  tone = "ivory",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: Tone }) {
  const dark = tone === "green" || tone === "deep";
  return (
    <section data-tone={dark ? "dark" : undefined} className={cn(toneClass[tone], className)} {...props}>
      {children}
    </section>
  );
}

/** Section heading with an optional lead and an action on the right (stacked on phones). */
export function SectionHeader({
  title,
  lead,
  action,
  align = "left",
  id,
  className,
  actionClassName,
}: {
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  align?: "left" | "center";
  id?: string;
  className?: string;
  actionClassName?: string;
}) {
  const center = align === "center";
  return (
    <div
      className={cn(
        "mb-10 flex flex-col gap-5 lg:mb-14",
        center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", center && "mx-auto")}>
        <h2 id={id} className="text-headline font-bold">
          {title}
        </h2>
        {lead ? (
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground [[data-tone=dark]_&]:text-white/80">
            {lead}
          </p>
        ) : null}
      </div>
      {action ? <div className={cn("shrink-0", actionClassName)}>{action}</div> : null}
    </div>
  );
}
