import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/site/legal-page";
import { getContact } from "@/lib/contact";
import { SITE } from "@/lib/site";
import { getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Gizlilik Politikası",
  description:
    "Bu sitenin hangi bilgileri nasıl kullandığı: formlar, ziyaret istatistikleri, barındırma ve dış bağlantılar.",
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default async function PrivacyPage() {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);
  return (
    <LegalPage
      href="/gizlilik-politikasi"
      title="Gizlilik Politikası"
      lead="Bu sitenin hangi bilgileri, hangi amaçla ve nasıl kullandığı."
      value={settings?.privacyPolicy}
      fallback={
        <>
          <h2>Formlar</h2>
          <p>
            İletişim ve randevu formlarında paylaştığınız bilgiler yalnızca talebinize dönüş yapmak için e-postayla{" "}
            {SITE.name}&apos;a iletilir; sitede saklanmaz. Ayrıntılar için{" "}
            <Link href="/kvkk">KVKK Aydınlatma Metni</Link>&apos;ne bakabilirsiniz.
          </p>
          <h2>Ziyaret istatistikleri</h2>
          <p>
            Sayfaların kaç kez görüntülendiği, çerez kullanmayan ve kişisel bilgi toplamayan Vercel Web Analytics ile
            anonim olarak ölçülür.
          </p>
          <h2>Barındırma ve görseller</h2>
          <p>
            Site Vercel üzerinde yayınlanır; içerik ve görseller Sanity üzerinden sunulur. Bu altyapılar, hizmetin
            güvenli çalışması için IP adresi ve tarayıcı bilgisi gibi standart teknik kayıtlar tutabilir.
          </p>
          <h2>Dış bağlantılar</h2>
          <p>
            WhatsApp, Instagram, Google Haritalar ve diğer sosyal medya bağlantılarını açtığınızda ilgili hizmetin kendi
            gizlilik koşulları geçerli olur.
          </p>
          <h2>İletişim</h2>
          <p>
            Gizlilikle ilgili sorularınız için <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine
            yazabilirsiniz.
          </p>
        </>
      }
    />
  );
}
