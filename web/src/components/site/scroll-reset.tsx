"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Every new page opens at its top, on every browser. Next.js scrolls only when the new
 * page's first element is out of view, which can leave a short page opened mid-way on
 * some phones. Back and forward keep the browser's own restored position, and links
 * with a #fragment keep jumping to their target.
 */
export function ScrollReset() {
  const pathname = usePathname();
  const previous = useRef(pathname);
  const fromHistory = useRef(false);

  useEffect(() => {
    const mark = () => {
      fromHistory.current = true;
    };
    window.addEventListener("popstate", mark);
    return () => window.removeEventListener("popstate", mark);
  }, []);

  // Layout effect: runs before the new page paints, so the old scroll position never flashes.
  useLayoutEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    const restoring = fromHistory.current;
    fromHistory.current = false;
    if (restoring || window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
