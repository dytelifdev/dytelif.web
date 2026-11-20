"use client";

import { ArrowRightIcon, ChevronDownIcon, ChevronRightIcon, MailIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lockup } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import type { Contact } from "@/lib/contact";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";
import { isActive, type NavItem } from "./nav-links";
import { SocialLinks } from "./social-links";

const rowClass =
  "flex min-h-13 w-full items-center justify-between rounded-lg px-3 text-lg font-semibold text-ink transition-colors hover:bg-brand-soft hover:text-brand aria-[current=page]:bg-brand-soft aria-[current=page]:text-brand";

const subRowClass =
  "flex min-h-11 items-center justify-between gap-3 rounded-lg px-3 py-2 text-base leading-snug font-medium text-ink/80 transition-colors hover:bg-paper hover:text-brand aria-[current=page]:bg-paper aria-[current=page]:text-brand";

/**
 * Services as a group that opens in place: a tap on the row shows every service, with
 * "Tüm hizmetler" first. It starts open on a services page, so the current one is in view.
 */
function MenuGroup({
  item,
  pathname,
}: {
  item: NavItem & { children: NonNullable<NavItem["children"]> };
  pathname: string;
}) {
  const inSection = isActive(pathname, item.href);
  const [open, setOpen] = useState(inSection);
  const listId = "mobil-menu-hizmetler";

  return (
    <li>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
        className={cn(rowClass, inSection && "bg-brand-soft text-brand")}
      >
        {item.label}
        <ChevronDownIcon
          aria-hidden="true"
          className={cn(
            "size-5 text-ink/35 transition-transform duration-200 ease-out motion-reduce:transition-none",
            open && "rotate-180 text-brand",
          )}
        />
      </button>
      <ul
        id={listId}
        hidden={!open}
        className="mt-1 mb-2 grid animate-in gap-0.5 rounded-xl bg-sand p-1.5 duration-200 fade-in-0 slide-in-from-top-1 motion-reduce:animate-none"
      >
        <li>
          <SheetClose asChild>
            <Link
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
              className={cn(subRowClass, "font-semibold text-brand")}
            >
              Tüm hizmetler
              <ArrowRightIcon aria-hidden="true" className="size-4 shrink-0" />
            </Link>
          </SheetClose>
        </li>
        {item.children.map((child) => (
          <li key={child.href}>
            <SheetClose asChild>
              <Link
                href={child.href}
                prefetch
                aria-current={pathname === child.href ? "page" : undefined}
                className={subRowClass}
              >
                {child.label}
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    </li>
  );
}

/** The phone menu itself. Loaded on first use so the dialog code stays out of the initial page load. */
export default function MobileSheet({
  open,
  onOpenChange,
  items,
  contact,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavItem[];
  contact: Contact;
}) {
  const pathname = usePathname();
  const rows = [{ href: "/", label: "Ana sayfa" }, ...items];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent id="mobil-menu" side="right" className="w-full gap-0 border-l-0 bg-ivory p-0 sm:max-w-sm">
        <div className="flex h-18 items-center border-b border-line px-5">
          <SheetTitle className="sr-only">Menü</SheetTitle>
          <SheetDescription className="sr-only">Site sayfaları ve iletişim</SheetDescription>
          <Lockup className="h-8 text-logo-green" />
        </div>
        <nav aria-label="Mobil menü" className="flex-1 overflow-y-auto px-3 py-4">
          <ul className="flex flex-col gap-1">
            {rows.map((item) => {
              if ("children" in item && item.children?.length) {
                return <MenuGroup key={item.href} item={{ ...item, children: item.children }} pathname={pathname} />;
              }
              const current = item.href === "/" ? pathname === "/" : isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <SheetClose asChild>
                    <Link href={item.href} aria-current={current ? "page" : undefined} className={rowClass}>
                      {item.label}
                      <ChevronRightIcon aria-hidden="true" className="size-5 text-ink/35" />
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-line bg-sand px-5 py-5">
          <SheetClose asChild>
            <Button asChild size="lg">
              <Link href="/randevu">Randevu al</Link>
            </Button>
          </SheetClose>
          <Button asChild size="lg" variant="secondary">
            <a href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp&apos;tan yazın
            </a>
          </Button>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <SocialLinks socials={contact.socials} />
            <div className="flex gap-2">
              <Button asChild variant="ghost" size="icon" aria-label={`Ara: ${contact.phoneDisplay}`}>
                <a href={`tel:${contact.phoneDisplay.replace(/[^\d+]/g, "")}`}>
                  <PhoneIcon />
                </a>
              </Button>
              <Button asChild variant="ghost" size="icon" aria-label={`E-posta: ${contact.email}`}>
                <a href={`mailto:${contact.email}`}>
                  <MailIcon />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
