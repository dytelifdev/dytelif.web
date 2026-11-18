"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { Inquiry } from "@/lib/inquiry";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
/** Production refuses to send without bot protection; development may run without keys. */
const formUnavailable = !turnstileSiteKey && process.env.NODE_ENV === "production";

/** Shared submit flow for both forms: bot check, POST, honest result, fresh token. */
export function useInquirySubmit() {
  const [token, setToken] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const [sent, setSent] = useState(false);

  const refreshToken = useCallback(() => {
    setToken("");
    setResetKey((k) => k + 1);
  }, []);

  const submit = useCallback(
    async (values: Inquiry) => {
      if (turnstileSiteKey && !token) {
        toast.error("Lütfen güvenlik doğrulamasının tamamlanmasını bekleyin.");
        return false;
      }
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ...values, turnstileToken: token }),
        });
        const data = (await res.json().catch(() => ({}))) as { message?: string };
        refreshToken();
        if (!res.ok) {
          toast.error(data.message || "Mesaj gönderilemedi. Lütfen tekrar deneyin.");
          return false;
        }
        toast.success(data.message || "Mesajınız iletildi.");
        setSent(true);
        return true;
      } catch {
        refreshToken();
        toast.error("Bağlantı kurulamadı. İnternet bağlantınızı kontrol edip tekrar deneyin.");
        return false;
      }
    },
    [token, refreshToken],
  );

  return { submit, sent, setSent, setToken, resetKey, turnstileSiteKey, formUnavailable };
}
