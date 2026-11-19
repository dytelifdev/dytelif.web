"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { cn } from "@/lib/utils";

/**
 * Large round WhatsApp shortcut, bottom right. It steps aside while a page's own
 * WhatsApp action (`data-wa-cta`) or the footer is in view, so it never doubles
 * a visible action.
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
        "wa-float fixed right-4 bottom-4 z-40 grid size-16 place-items-center rounded-full bg-brand text-white shadow-lift ring-4 ring-white transition-[opacity,translate,background-color,bottom] duration-300 ease-out-expo hover:bg-brand-dark focus-visible:outline-offset-4 sm:right-6 sm:bottom-6",
        hidden ? "pointer-events-none translate-y-3 opacity-0" : "opacity-100",
      )}
    >
      <WhatsAppIcon className="size-8" />
    </a>
  );
}
