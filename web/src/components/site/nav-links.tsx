"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation. The current page is drawn as a heavier rule, not a colour change. */
export function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Ana menü" className={className}>
      <ul className="flex items-center gap-6 xl:gap-8">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className={cn(
                "relative block py-2.5 text-[0.9375rem] text-on-surface/85 transition-colors hover:text-on-surface",
                "after:absolute after:inset-x-0 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-out-expo hover:after:scale-x-100",
                "aria-[current=page]:text-on-surface aria-[current=page]:after:h-0.5 aria-[current=page]:after:scale-x-100",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
