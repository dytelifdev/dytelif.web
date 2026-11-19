"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string; children?: { href: string; label: string }[] };

export function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const linkClass =
  "flex min-h-11 items-center gap-1 rounded-lg px-3 text-[0.9375rem] font-semibold text-ink/80 transition-colors hover:bg-brand-soft hover:text-brand aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand";

/**
 * Services menu: opens on hover, or with the arrow button from the keyboard; closes on
 * leave, Escape, outside click, choosing an item, and every route change.
 */
function SubMenu({
  item,
  pathname,
}: {
  item: NavItem & { children: NonNullable<NavItem["children"]> };
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);
  const ref = useRef<HTMLLIElement>(null);
  // Navigating closes it: a menu opened on another page is no longer open here.
  const visible = open && openedAt === pathname;

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [visible]);

  const show = () => {
    setOpenedAt(pathname);
    setOpen(true);
  };

  return (
    <li
      ref={ref}
      className="relative flex items-center"
      onPointerEnter={(e) => e.pointerType === "mouse" && show()}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
    >
      <Link
        href={item.href}
        aria-current={isActive(pathname, item.href) ? "page" : undefined}
        className={cn(linkClass, "pr-1.5")}
        onClick={() => setOpen(false)}
      >
        {item.label}
      </Link>
      <button
        type="button"
        aria-expanded={visible}
        aria-controls="hizmetler-menusu"
        aria-label={`${item.label} alt menüsü`}
        onClick={() => (visible ? setOpen(false) : show())}
        className="-ml-1 grid size-8 place-items-center rounded-md text-ink/70 transition-colors hover:text-brand"
      >
        <ChevronDownIcon
          aria-hidden="true"
          className={cn("size-4 transition-transform duration-200", visible && "rotate-180")}
        />
      </button>
      <div
        id="hizmetler-menusu"
        hidden={!visible}
        className="absolute top-full left-1/2 z-50 w-76 -translate-x-1/2 pt-3"
      >
        <ul className="rounded-xl border border-line bg-white p-2 shadow-lift">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                prefetch
                aria-current={pathname === child.href ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="flex min-h-11 items-center rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-ink/85 transition-colors hover:bg-brand-soft hover:text-brand aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

/** Desktop navigation. State is a green tint, never an underline. */
export function NavLinks({ items, className }: { items: NavItem[]; className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Ana menü" className={className}>
      <ul className="flex items-center gap-0.5">
        {items.map((item) =>
          item.children?.length ? (
            <SubMenu key={item.href} item={{ ...item, children: item.children }} pathname={pathname} />
          ) : (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className={linkClass}
              >
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}
