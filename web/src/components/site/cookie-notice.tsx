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
 * A small card, bottom left. While it is open, <html data-cookie-notice> lifts the
 * WhatsApp button above it on phones, where the card spans the width.
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
      className="fixed inset-x-3 bottom-3 z-50 rounded-xl border border-line bg-paper p-4 text-ink shadow-float sm:inset-x-auto sm:bottom-5 sm:left-5 sm:max-w-sm sm:p-5"
    >
      <p className="text-sm leading-relaxed">
        Bu site yalnızca gerekli teknolojileri kullanır; reklam veya takip çerezi yoktur.{" "}
        <Link
          href="/cerez-politikasi"
          className="font-semibold text-brand underline decoration-brass/60 underline-offset-[0.2em] transition-colors hover:decoration-brand"
        >
          Çerez Politikası
        </Link>
      </p>
      <Button type="button" size="sm" onClick={accept} className="mt-3 w-full sm:w-auto">
        Tamam
      </Button>
    </div>
  );
}
