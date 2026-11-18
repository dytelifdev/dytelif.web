import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Surface = "folder" | "olive" | "paper";

/**
 * A full-width field of one material. Sections change by a hard colour cut,
 * never a fade; each surface re-points the semantic colour tokens so every
 * component inside (text, rules, buttons, focus rings) adapts on its own.
 */
export function Folio({
  surface = "paper",
  className,
  children,
  ...props
}: ComponentProps<"section"> & { surface?: Surface }) {
  return (
    <section data-surface={surface} className={cn("surface", className)} {...props}>
      {children}
    </section>
  );
}

/** Page container shared by every section so the mounting rail lines up down the page. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-336 px-4 sm:px-8 lg:px-12", className)} {...props} />;
}

/**
 * Two-part layout hung on the off-centre mounting rail (about 42% from the left
 * on large screens). The rail is a hairline in the surface's rule colour.
 */
export function Railed({
  aside,
  children,
  className,
  asideClassName,
  mainClassName,
}: {
  aside: ReactNode;
  children: ReactNode;
  className?: string;
  asideClassName?: string;
  mainClassName?: string;
}) {
  return (
    <div className={cn("grid lg:grid-cols-[minmax(0,11fr)_minmax(0,15fr)]", className)}>
      <div className={cn("lg:pr-10 xl:pr-14", asideClassName)}>{aside}</div>
      <div className={cn("border-rule lg:border-l lg:pl-10 xl:pl-14", mainClassName)}>{children}</div>
    </div>
  );
}
