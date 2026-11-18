"use client";

import { Share2Icon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

/** Native share sheet on phones, copy-to-clipboard elsewhere. */
export function ShareButton({ title, path }: { title: string; path: string }) {
  async function share() {
    const url = new URL(path, window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // dismissed by the visitor
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Bağlantı kopyalandı.");
    } catch {
      toast.error("Bağlantı kopyalanamadı.");
    }
  }
  return (
    <Button type="button" variant="outline" size="sm" onClick={share}>
      <Share2Icon /> Paylaş
    </Button>
  );
}
