"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "loading" | "done";

/**
 * Thin blue line across the top edge during internal navigation.
 * Starts on an internal link click or back/forward and completes when the new
 * route commits. Only transform and opacity animate (see .route-progress in
 * globals.css); reduced motion keeps the signal without the travel.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("idle");
  const [committedPath, setCommittedPath] = useState(pathname);
  const timers = useRef<{ hide?: number; safety?: number }>({});

  // The new route committed: complete the line (adjusted during render, no extra effect pass).
  if (pathname !== committedPath) {
    setCommittedPath(pathname);
    if (phase === "loading") setPhase("done");
  }

  useEffect(() => {
    const t = timers.current;
    if (phase === "done") t.hide = window.setTimeout(() => setPhase("idle"), 360);
    // A cancelled or failed navigation must never leave the line hanging.
    if (phase === "loading") t.safety = window.setTimeout(() => setPhase("done"), 10_000);
    return () => {
      window.clearTimeout(t.hide);
      window.clearTimeout(t.safety);
    };
  }, [phase]);

  useEffect(() => {
    const start = () => setPhase("loading");
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element | null)?.closest?.("a[href]");
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target === "_blank" || anchor.hasAttribute("download"))
        return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return; // same page or hash jump
      start();
    }
    window.addEventListener("click", onClick, { capture: true });
    window.addEventListener("popstate", start);
    return () => {
      window.removeEventListener("click", onClick, { capture: true });
      window.removeEventListener("popstate", start);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-100 h-0.75">
      <div data-phase={phase} className="route-progress h-full origin-left bg-route" />
    </div>
  );
}
