"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

/**
 * Hidden while any element marked `data-wa-cta` (a page's own WhatsApp action
 * or contact list) or the footer is in view, so it never doubles a visible
 * action or covers the content beside it.
 */
export function FloatingWhatsApp({ href }: { href: string }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-wa-cta], footer");
    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp'tan yazın (yeni sekmede açılır)"
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      className={cn(
        "fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-sm bg-folder text-paper ring-1 ring-paper/70 transition-[opacity,translate] duration-300 ease-out-expo focus-visible:outline-offset-4 sm:right-6 sm:bottom-6",
        hidden ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100",
      )}
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
