import { getContact } from "@/lib/contact";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { FloatingWhatsApp } from "./floating-whatsapp";

/** Persistent WhatsApp shortcut; it steps aside whenever a page's own WhatsApp action is on screen. */
export async function WhatsAppButton() {
  const { whatsapp } = await getContact();
  return <FloatingWhatsApp href={whatsappHref(whatsapp, WHATSAPP_GREETING)} />;
}
