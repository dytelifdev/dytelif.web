"use client";

import { MenuIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Contact } from "@/lib/contact";
import type { NavItem } from "./nav-links";

const loadSheet = () => import("./mobile-sheet");
const MobileSheet = dynamic(loadSheet, { ssr: false });

/**
 * Menu button for phones and tablets. The sheet's code (Radix dialog) is fetched
 * when the pointer or focus first reaches the button, and mounted on first open.
 */
export function MobileNav({ items, contact }: { items: NavItem[]; contact: Contact }) {
  const [open, setOpen] = useState(false);
  const [used, setUsed] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="-mr-2 xl:hidden"
        aria-label="Menüyü aç"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={used ? "mobil-menu" : undefined}
        onPointerEnter={loadSheet}
        onFocus={loadSheet}
        onTouchStart={loadSheet}
        onClick={() => {
          setUsed(true);
          setOpen(true);
        }}
      >
        <MenuIcon className="size-6" />
      </Button>
      {used ? <MobileSheet open={open} onOpenChange={setOpen} items={items} contact={contact} /> : null}
    </>
  );
}
