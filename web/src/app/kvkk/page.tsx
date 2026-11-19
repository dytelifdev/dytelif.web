import type { Metadata } from "next";
import { LegalPage } from "@/components/site/legal-page";
import { getContact } from "@/lib/contact";
import { addressLines, SITE } from "@/lib/site";
import { getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni",
  description:
    "İletişim ve randevu formlarında paylaştığınız kişisel verilerin nasıl işlendiğine dair aydınlatma metni.",
  alternates: { canonical: "/kvkk" },
};

export default async function KvkkPage() {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);
  return (
    <LegalPage
      href="/kvkk"
      title="KVKK Aydınlatma Metni"
      lead="6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında, formlarda paylaştığınız bilgilerin nasıl işlendiği."
      value={settings?.privacyNotice}
      fallback={
        <>
          <h2>Veri sorumlusu</h2>
          <p>
            {SITE.name}. Adres: {addressLines(contact.address).join(", ")}. E-posta:{" "}
            <a href={`mailto:${contact.email}`}>{contact.email}</a>.
          </p>
          <h2>Hangi veriler işlenir?</h2>
          <p>
            İletişim ve randevu formlarında yazdığınız ad soyad, e-posta adresi ve/veya telefon numarası, tercih
            ettiğiniz hizmet, görüşme biçimi ve iletişim kanalı ile mesajınız. Formlar sağlık geçmişi, teşhis ya da kilo
            gibi sağlık bilgisi istemez; lütfen mesajınıza bu tür bilgiler yazmayın.
          </p>
          <h2>Hangi amaçla?</h2>
          <p>Yalnızca talebinize dönüş yapmak ve görüşme zamanını sizinle birlikte planlamak için.</p>
          <h2>Kimlere aktarılır?</h2>
          <p>
            Form içeriği, e-posta gönderim hizmeti (Resend) aracılığıyla e-postayla {SITE.name}&apos;a iletilir.
            Otomatik gönderimleri engellemek için Cloudflare Turnstile doğrulaması kullanılır. Bu hizmet sağlayıcıların
            sunucuları yurt dışında bulunabilir. Verileriniz başka bir amaçla üçüncü kişilerle paylaşılmaz.
          </p>
          <h2>Ne kadar süre saklanır?</h2>
          <p>
            Bu site form içeriklerini bir veritabanında saklamaz ve kayıt altına almaz. İletilen e-posta, talebinizin
            karşılanması için gerekli süre boyunca saklanır.
          </p>
          <h2>Haklarınız</h2>
          <p>Kanunun 11. maddesi uyarınca;</p>
          <ul>
            <li>kişisel verilerinizin işlenip işlenmediğini öğrenme ve işlenmişse bilgi talep etme,</li>
            <li>işlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>aktarıldığı üçüncü kişileri bilme,</li>
            <li>eksik ya da yanlış işlenmişse düzeltilmesini, şartları oluşmuşsa silinmesini isteme,</li>
            <li>kanuna aykırı işleme nedeniyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
          </ul>
          <p>
            haklarına sahipsiniz. Taleplerinizi <a href={`mailto:${contact.email}`}>{contact.email}</a> adresine
            iletebilirsiniz.
          </p>
        </>
      }
    />
  );
}
