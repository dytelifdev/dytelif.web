"use client";

import Link from "next/link";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";

const KEY = "cerez-bildirimi";
const CHANGE = "cerez-bildirimi-degisti";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CHANGE, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CHANGE, onChange);
  };
}

// Fallback when storage is blocked: the answer holds until the tab is closed.
let acceptedInMemory = false;

function readAnswer() {
  if (acceptedInMemory) return "kabul";
  try {
    return localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

/**
 * Cookie notice. The site sets no advertising or tracking cookies, so this only
 * informs and remembers the answer in the browser (localStorage, not a cookie).
 * While it is open, <html data-cookie-notice> lifts the WhatsApp button above it.
 */
export function CookieNotice() {
  // The server renders nothing; the browser shows the notice until it is accepted.
  const answer = useSyncExternalStore(subscribe, readAnswer, () => "kabul");
  const open = answer !== "kabul";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const el = ref.current;
    if (!open || !el) return;
    root.setAttribute("data-cookie-notice", "");
    // The observer reports the height after the browser's own layout (its first call comes
    // right after the notice appears), so reading it never forces an extra reflow.
    const observer = new ResizeObserver(([entry]) => {
      const height = entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height;
      root.style.setProperty("--cookie-notice-h", `${Math.round(height)}px`);
    });
    observer.observe(el);
    return () => {
      observer.disconnect();
      root.removeAttribute("data-cookie-notice");
    };
  }, [open]);

  if (!open) return null;

  function accept() {
    acceptedInMemory = true;
    try {
      localStorage.setItem(KEY, "kabul");
    } catch {
      // storage blocked: the in-memory answer covers this visit
    }
    window.dispatchEvent(new Event(CHANGE));
  }

  return (
    <div
      ref={ref}
      role="region"
      aria-label="Çerez bildirimi"
      data-tone="dark"
      className="fixed inset-x-0 bottom-0 z-50 bg-charcoal text-white"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:px-6 lg:px-8">
        <p className="text-sm leading-relaxed text-white/85">
          Bu site yalnızca çalışması için gerekli teknolojileri kullanır; reklam veya takip çerezi kullanılmaz.
          Ayrıntılar için{" "}
          <Link href="/cerez-politikasi" className="font-semibold text-white underline underline-offset-2">
            Çerez Politikası
          </Link>
          .
        </p>
        <Button type="button" variant="white" size="sm" onClick={accept} className="shrink-0 self-start sm:self-auto">
          Kabul et
        </Button>
      </div>
    </div>
  );
}
