"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * A row of slides that keeps flowing on its own (Embla + Auto Scroll plugin).
 * It pauses under the pointer or keyboard focus, can be dragged, and stays still
 * for visitors who prefer reduced motion. Embla starts only when the strip comes
 * near the viewport, so it adds no work to the first load.
 */
export function AutoScrollStrip({ label, children }: { label: string; children: ReactNode }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: true, align: "start" }, [
    AutoScroll({ speed: 0.7, startDelay: 400, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true }),
  ]);
  const regionRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = regionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const autoScroll = emblaApi?.plugins().autoScroll;
    if (!autoScroll) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) autoScroll.stop();
  }, [emblaApi]);

  return (
    <div ref={regionRef} role="region" aria-roledescription="kayan şerit" aria-label={label} className="mt-10 lg:mt-12">
      <div
        ref={near ? emblaRef : undefined}
        className="overflow-hidden mask-[linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        <ul className="-ml-5 flex touch-pan-y">{children}</ul>
      </div>
    </div>
  );
}
