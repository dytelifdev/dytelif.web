"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lockup } from "@/components/brand/logo";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { isActive, type NavItem } from "./nav-links";

export function MobileNav({ items, whatsapp }: { items: NavItem[]; whatsapp: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="-mr-2 lg:hidden" aria-label="Menüyü aç">
          <MenuIcon className="size-6" strokeWidth={1.5} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        data-surface="folder"
        className="w-full gap-0 border-l-0 bg-folder p-0 text-paper shadow-none sm:max-w-md"
      >
        <div className="flex h-18 items-center border-b border-rule px-5">
          <SheetTitle className="sr-only">Menü</SheetTitle>
          <SheetDescription className="sr-only">Site sayfaları ve iletişim</SheetDescription>
          <Lockup className="h-9" />
        </div>
        <nav aria-label="Mobil menü" className="flex-1 overflow-y-auto px-5 py-4">
          <ul>
            <li>
              <SheetClose asChild>
                <Link
                  href="/"
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="flex min-h-14 items-center border-b border-rule font-display text-3xl aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                >
                  Ana sayfa
                </Link>
              </SheetClose>
            </li>
            {items.map((item) => (
              <li key={item.href}>
                <SheetClose asChild>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center border-b border-rule font-display text-3xl aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-8"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <div className="grid gap-3 border-t border-rule px-5 py-5">
          <SheetClose asChild>
            <Button asChild size="lg">
              <Link href="/randevu">Randevu talebi gönderin</Link>
            </Button>
          </SheetClose>
          <Button asChild size="lg" variant="outline">
            <a href={whatsappHref(whatsapp, WHATSAPP_GREETING)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon /> WhatsApp&apos;tan yazın
            </a>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
