import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container, Folio, Railed } from "./folio";

/**
 * Folder-green opening band of every inner page: title left of the rail, lead
 * text right of it. `size="title"` suits long CMS headlines (posts, services).
 */
export function PageIntro({
  title,
  lead,
  size = "display",
  children,
}: {
  title: ReactNode;
  lead?: ReactNode;
  size?: "display" | "title";
  children?: ReactNode;
}) {
  return (
    <Folio surface="folder">
      <Container className="pt-12 pb-14 lg:pt-20 lg:pb-20">
        <Railed
          aside={
            <h1 className={cn("pb-6 font-display lg:pb-0", size === "display" ? "text-display" : "text-title")}>
              {title}
            </h1>
          }
          mainClassName="flex flex-col justify-end gap-8"
        >
          {lead ? <p className="max-w-2xl text-lg leading-relaxed text-on-surface-soft sm:text-xl">{lead}</p> : null}
          {children}
        </Railed>
      </Container>
    </Folio>
  );
}
