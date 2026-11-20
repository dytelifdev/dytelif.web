"use client";

import { MapPinIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/**
 * Google map of the practice, loaded only when the visitor asks for it: the site promises
 * no third-party cookies, and the embed would set Google's on page load. Until then a
 * plan-paper panel holds its place at the same size, so nothing shifts when it loads.
 * The loaded map is toned down to grey with a warm cast to sit in the palette.
 */
export function MapEmbed({ query, label }: { query: string; label: string }) {
  const [open, setOpen] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=tr&z=16&output=embed`;

  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-sand ring-1 ring-line sm:aspect-16/10">
      {open ? (
        <iframe
          src={src}
          title={`${label} konumu, Google Haritalar`}
          className="absolute inset-0 size-full border-0 [filter:grayscale(1)_sepia(0.16)_contrast(0.94)]"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] bg-size-[2rem_2rem] bg-center p-6 text-center">
          <div className="flex max-w-xs flex-col items-center rounded-xl bg-paper/95 px-6 py-6 ring-1 ring-line">
            <MapPinIcon aria-hidden="true" className="size-6 text-brass-ink" strokeWidth={1.75} />
            <p className="mt-3 font-bold text-ink">{label}</p>
            <p className="mt-1 text-sm leading-snug text-ink-soft">Harita, Google Haritalar üzerinden yüklenir.</p>
            <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => setOpen(true)}>
              Haritayı gösterin
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
