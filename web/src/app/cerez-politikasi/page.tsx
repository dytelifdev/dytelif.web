import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { getContact } from "@/lib/contact";
import { getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Çerez Politikası",
  description: "Bu sitede reklam ya da takip çerezi kullanılmaz. Hangi teknolojilerin neden kullanıldığını öğrenin.",
  alternates: { canonical: "/cerez-politikasi" },
};

export default async function CookiePage() {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);
  return (
    <LegalPage
      href="/cerez-politikasi"
      title="Çerez Politikası"
      lead="Bu sitede reklam ya da takip çerezi kullanılmaz. Kullanılan teknolojiler ve nedenleri aşağıda."
      value={settings?.cookiePolicy}
      fallback={
        <>
          <h2>Çerez nedir?</h2>
          <p>
            Çerezler, ziyaret ettiğiniz sitelerin tarayıcınıza kaydettiği küçük metin dosyalarıdır. Reklam, takip ya da
            sitenin çalışması gibi farklı amaçlarla kullanılabilir.
          </p>
          <h2>Bu sitede hangi çerezler kullanılıyor?</h2>
          <p>
            Bu site reklam veya takip çerezi kullanmaz. Ziyaret istatistikleri, çerez kullanmayan Vercel Web Analytics
            ile anonim olarak ölçülür.
          </p>
          <h2>Çerez bildirimine verdiğiniz cevap</h2>
          <p>
            Bildirimdeki &quot;Kabul et&quot; seçiminiz, bildirimin her sayfada tekrar çıkmaması için tarayıcınızın
            yerel depolamasında saklanır. Bu bir çerez değildir ve sunucuya gönderilmez; tarayıcı verilerinizi silerek
            kaldırabilirsiniz.
          </p>
          <h2>Formlardaki güvenlik doğrulaması</h2>
          <p>
            İletişim ve randevu formlarında otomatik gönderimleri engellemek için Cloudflare Turnstile kullanılır. Bu
            doğrulama yalnızca güvenlik amacıyla çalışır ve Cloudflare&apos;in kendi gizlilik koşullarına tabidir.
          </p>
          <h2>Dış bağlantılar</h2>
          <p>
            Instagram, WhatsApp ya da Google Haritalar bağlantılarını açtığınızda bu hizmetlerin kendi çerezleri geçerli
            olur.
          </p>
          <h2>Çerezleri nasıl yönetebilirsiniz?</h2>
          <p>
            Tarayıcınızın ayarlarından çerezleri ve site verilerini görebilir, silebilir ya da engelleyebilirsiniz.
            Sorularınız için <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine yazabilirsiniz.
          </p>
        </>
      }
    />
  );
}
