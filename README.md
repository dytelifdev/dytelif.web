# dytelif.web

Dyt. Elif Sude Özkan'ın web sitesi ve içerik paneli. Tek depoda iki bağımsız uygulama:

```text
dytelif.web/
├── web/      Next.js 16 sitesi (App Router, Tailwind 4, shadcn/ui). Yayın hedefi: Vercel
├── studio/   Sanity Studio (içerik paneli). Yayında: https://dytelifsudeozkan.sanity.studio
├── brand/    Logo dosyaları: yatay logo, ES monogramı, yazı (SVG; png/ altında PNG)
└── PRODUCT.md, .impeccable/   Ürün ve tasarım kararları (tasarım araçları için)
```

Sanity projesi: **vuzgi5tw**, dataset **production** (public). Studio sitenin içinde değildir; `/studio` ve `/admin` sitede 404 döner.

## Yerel çalışma

Gereksinim: Node 22+, pnpm 11.

```bash
cd web && pnpm install && pnpm dev        # http://localhost:3000
cd studio && pnpm install && pnpm dev     # http://localhost:3333
```

`web/.env.example` dosyasını `web/.env.local` olarak kopyalayıp değerleri doldurun. `.env.local` Git'e girmez.

| Komut (web/) | Ne yapar |
| --- | --- |
| `pnpm dev` / `pnpm build` / `pnpm start` | Geliştirme, üretim derlemesi, üretim sunucusu |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Route tiplerini üretir ve TypeScript kontrolü yapar |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm test` | Vitest: form şeması, `/api/contact` (Turnstile ve Resend taklit edilir, gerçek e-posta gitmez), `/api/revalidate` imza doğrulaması, zengin metin bağlantı güvenliği, paylaşım görseli sırası |

| Komut (studio/) | Ne yapar |
| --- | --- |
| `pnpm dev` | Studio'yu yerelde açar (Sanity hesabıyla giriş ister) |
| `pnpm typegen` | Şemayı çıkarır ve `web/src/sanity/types.ts` tiplerini GROQ sorgularından üretir |
| `pnpm seed` | `seed/` klasörünü (`data.ndjson` + `images/`) geçici bir arşive paketler ve yalnızca eksik belgeleri yükler: site ayarları, 5 hizmet, 7 iş birliği ve logoları |
| `pnpm deploy` | Studio'yu https://dytelifsudeozkan.sanity.studio adresine yayınlar (`appId` `sanity.cli.ts` içinde) |

Şema veya sorgu değiştiğinde `cd studio && pnpm typegen` çalıştırın.

> CSS teması (`globals.css` içindeki `@theme`) değiştiği halde derlemede görünmüyorsa `web/.next/cache/turbopack` klasörünü silip yeniden derleyin.

## Ortam değişkenleri (web)

| Değişken | Gizli mi | Açıklama |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Hayır | `vuzgi5tw` |
| `NEXT_PUBLIC_SANITY_DATASET` | Hayır | `production` |
| `NEXT_PUBLIC_SITE_URL` | Hayır | Canlıda `https://dytelifsudeozkan.com`, yerelde `http://localhost:3000` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Hayır | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | **Evet** | Turnstile secret key. Üretimde yoksa form gönderimi reddedilir |
| `RESEND_API_KEY` | **Evet** | Resend API anahtarı |
| `RESEND_FROM_EMAIL` | Hayır | Doğrulanmış alan adından gönderici, ör. `form@dytelifsudeozkan.com` |
| `CONTACT_TO_EMAIL` | Hayır | Bildirimlerin gideceği adres: `info.elifsudeozkan@gmail.com` |
| `SANITY_REVALIDATE_SECRET` | **Evet** | Sanity webhook'u ile aynı gizli değer |
| `SHOW_SAMPLE_TESTIMONIALS` | Hayır | Yalnızca tasarım önizlemesi: `true` iken, Studio'da gerçek yorum yokken ana sayfada üç örnek yorum görünür. Vercel'in production ortamında bu ayar yok sayılır. **Vercel'de tanımlamayın.** |

Gizli değerler hiçbir zaman `NEXT_PUBLIC_` ile başlamaz. Site Sanity'den yalnızca yayımlanmış içeriği token olmadan okur.

## Nasıl çalışır

- **Önbellek:** Bütün sayfalar derlemede statik üretilir (Cache Components, `'use cache'` + `cacheTag`). İçerik türüne göre etiketlenir: `siteSettings`, `service`, `post`, `galleryItem`, `announcement`, `partner`, `product`, `testimonial` (`src/sanity/tags.ts`). Sanity istekleri `cache: "no-store"` ile yapılır; böylece tek önbellek etiketli kayıttır ve webhook onu anında yeniler.
- **Yayın tarihi:** Blog yazıları ve duyurular, yayın tarihi gelmeden sitede görünmez. Saat UTC ile karşılaştırılır.
- **İçerik güncelleme:** Studio'da Yayınla → Sanity webhook'u `POST /api/revalidate` → imza doğrulanır → ilgili etiket hemen geçersiz kılınır. GitHub push gerekmez. Webhook kurulana kadar içerik en geç 1 saatte bir yenilenir.
- **Formlar:** İletişim (`/iletisim`) ve randevu talebi (`/randevu`) → `POST /api/contact` → Zod doğrulaması (tarayıcıda ve sunucuda), honeypot, Turnstile sunucu doğrulaması → Resend ile e-posta. Form verisi hiçbir yerde saklanmaz, loglanmaz. Randevu talebi randevu oluşturmaz; diyetisyen kişiye kendisi döner.
- **Ürünler (`/urunler`):** Varsayılan durum "Çok yakında". Sayfanın başlığı, metni, görseli ve SEO alanları Studio > Site ayarları > Ürünler'den yönetilir. Orada "Ürünleri göster" seçilir ve en az bir ürün tanıtımı yayımlanırsa kod değişikliği olmadan liste görünür. Fiyat, sepet, ödeme yoktur.
- **İş birlikleri:** Studio > İş birlikleri'nde ad, alan, semt, Instagram kullanıcı adı (@ olmadan) ve logo girilir. Ana sayfada ve Hakkımda'nın sonunda kendiliğinden kayan bir şeritte kart olarak görünür (Embla carousel; fareyle üzerine ya da klavyeyle içine gelince durur, hareketi azaltma tercihinde hiç kaymaz); kartın tamamı Instagram hesabına bağlanır. Kullanıcı adı boşsa satır bağlantısız kalır. Yayımlanmış kayıt yoksa bölüm görünmez.
- **Adres:** Studio > Site ayarları > İletişim > Açık adres. Footer'da, İletişim sayfasında ve arama motorlarına verilen yapılandırılmış veride kullanılır. "Harita bağlantısı" boşsa adres Google Maps'te aranır.
- **Paylaşım görseli:** Her sayfa sırayla kendi SEO görselini ya da kapak görselini, sonra Site ayarları'ndaki "Paylaşım görseli"ni, ikisi de yoksa logolu varsayılan kartı (`/og.png`) kullanır (`src/lib/open-graph.ts`).
- **Görseller:** Sanity CDN üzerinden boyutlandırılır (`web/src/sanity/image-loader.ts`); bulanık önizleme (LQIP) Sanity'den gelir.
- **Rota çizgisi:** İç bağlantılarda ekranın üstünde ince mavi ilerleme çizgisi (`components/site/route-progress.tsx`).
- **Danışan yorumları:** Studio > Danışan yorumları. Yalnızca danışanın izniyle, gerçek yorumlar girilir ("yayın izni var" kutusu işaretlenmeden yayımlanamaz). Yayımlanmış yorum yoksa ana sayfada bölüm görünmez.
- **Sosyal medya:** Studio > Site ayarları > Sosyal medya. Instagram, X, Facebook ve LinkedIn simgeleri üst şeritte, footer'da ve iletişim sayfasında her zaman görünür; adres girilince tıklanır olur. TikTok ve YouTube yalnızca adresi girildiğinde çıkar.
- **Sıkça sorulan sorular:** Studio > Site ayarları > Ana sayfa > Sıkça sorulan sorular. Boşken sitedeki varsayılan sorular gösterilir.
- **Yasal sayfalar:** `/kvkk`, `/gizlilik-politikasi`, `/cerez-politikasi`. Metinler Studio > Site ayarları > Yasal metinler'den gelir; boşken sitenin gerçek veri akışını anlatan taslak metin görünür. Hukukçu onayıyla güncelleyin.
- **Çerez bildirimi:** Site reklam ya da takip çerezi kullanmaz; bildirim yalnızca bilgilendirir ve cevabı tarayıcıda (localStorage) saklar.
- **Hizmet görselleri:** Hizmete Studio'dan görsel yüklenmediyse `web/public/images/` altındaki lisanslı stok fotoğraf (Unsplash License) kullanılır; eşleştirme `web/src/lib/visuals.ts`.

## Fotoğraflar (Sanity > Site ayarları ve Galeri)

Galeri Sanity'den gelir: Elif'in 11 fotoğrafı alt metinleri, kategorileri ve yüz odaklı kırpma noktalarıyla Studio > Galeri'ye yüklendi (19.11.2026). Galeri sayfasında sıra "Sıra" alanıyla değişir. Ana sayfadaki Instagram alanı `web/public/photo/` altındaki altı kareyi gösterir ve Instagram profiline bağlanır. Portreler (ana sayfa, hakkımda) ve galeri boşken kullanılan yedekler `web/public/photo/` klasöründen gelir (eşleştirmeler ve alt metinler `web/src/lib/photos.ts` içinde). Studio'daki ilgili alana fotoğraf yüklendiğinde her zaman o öncelikli olur, kod değişikliği gerekmez. Ne Sanity'de ne klasörde fotoğraf yoksa logolu, sade bir krem alan görünür. Bu fotoğraflar Vercel'e gidebilmek için depoya dahildir; depo public olduğundan istemediğiniz bir kare varsa klasörden çıkarıp `photos.ts`'ten silin ya da depoyu private yapın.

| Alan | Oran | Öneri | Alternatif metin örneği |
| --- | --- | --- | --- |
| Ana sayfa portresi (`heroImage`) | 4:5 dikey | En az 1600 px yükseklik, yüz üst üçte birde; odak noktasını yüze getirin | "Diyetisyen Elif Sude Özkan, danışmanlık odasında" |
| Hakkımda portresi (`aboutImage`) | 3:4 dikey | Farklı bir kare (çalışırken, ölçüm sırasında) | "Elif Sude Özkan danışanıyla beslenme planını inceliyor" |
| Ürünler görseli (`productsImage`) | 4:5 | Ürünler hazır olduğunda | Ürünün kısa tanımı |
| Galeri | Serbest | Uzun kenar en az 1600 px | Fotoğrafta ne olduğunu anlatan bir cümle |
| Paylaşım görseli (`ogImage`) | 1200×630 | Boşsa site logolu varsayılan görseli kullanır | — |

Başka bir diyetisyene ya da stok sitelerine ait fotoğraf kullanmayın.

## Logo ve favicon

Logo, Elif'in kendi "ES" logosudur (19.11.2026'da onaylandı).

- **ES monogramı:** Müşterinin verdiği görselden vektöre çevrildi (potrace). Krem harfler ve altın kıvrım ayrı path'ler; kıvrım E'nin önünden geçip S'nin altına girer. Renkler görselden ölçüldü: zemin `#012c15`, krem `#fcf1e2`, altın `#c8955e → #e8c293`, açık zeminde sönük altın `#b28e69`.
- **Yazı:** "Dyt. Elif Sude Özkan", Source Serif 4 Display (550 ağırlık, OFL) ile -0.025em aralıkla SVG path'e çevrildi. Yatay logodaki oranlar (monogram, ayraç ve yazı arası boşluklar, büyük harf yüksekliği) müşterinin yatay logosundan piksel ölçüsüyle alındı.
- **Favicon:** `icon.svg` ve `favicon.ico` sekme boyutu için ayarlı: ince çizgiler biraz kalınlaştırıldı, 16 px'te en fazla. Uygulama simgeleri (`/brand/icon-192.png`, `/brand/icon-512.png`, `apple-icon`) aslına sadık.
- **Dosyalar:** `brand/logo-yatay-yesil.svg` (açık zemin), `brand/logo-yatay-krem.svg` (koyu zemin), `brand/monogram-yesil-zemin.svg`, `brand/monogram-krem-zemin.svg`, `brand/monogram-seffaf.svg`, `brand/wordmark-yesil.svg`, `brand/wordmark-krem.svg`; `brand/png/` altında Instagram profil görseli (1080×1080) ve 2400 px yatay logolar.
- **Sitede:** `web/public/brand/logo.svg` sprite'ı (`Lockup`, `Monogram`, `Wordmark` bileşenleri; harfler `currentColor`, kıvrım ve ayraç `--logo-accent`). Kullanılan diğer dosyalar `web/src/app/icon.svg`, `favicon.ico` (16/32/48), derlemede üretilen `apple-icon` ve varsayılan paylaşım görseli `/og.png` (`web/src/app/og.png/route.tsx`). Path verisi `web/src/components/brand/paths.ts` içinde.

## Yayına alma adımları (sizin yapacaklarınız)

1. **Anahtarları yenileyin.** Ekran görüntülerinde görünen Resend API anahtarını iptal edip yenisini oluşturun. Turnstile secret'ı da paylaşıldığı için Cloudflare'de yenilemeniz önerilir. GitHub hesap parolasını değiştirin.
2. **Sanity girişi ve başlangıç içeriği:** 18.11.2026'da yapıldı: CLI info.elifsudeozkan@gmail.com ile giriş yaptı, `pnpm seed` site ayarlarını ve 5 hizmeti yükledi. Başka bir bilgisayarda: `cd studio && pnpm exec sanity login --provider google --no-open`, verilen bağlantıyı gizli pencerede açıp doğru hesabı seçin; ardından `pnpm seed` (yalnızca eksik belgeleri ekler). Hizmet metinleri CV'den türetildi; Studio'da gözden geçirin.
3. **Sanity CORS:** `http://localhost:3333` kayıtlı. Yayındaki Studio sorunsuz açılıyor; bir gün "CORS" hatası görürseniz sanity.io/manage → vuzgi5tw → API → CORS origins'e `https://dytelifsudeozkan.sanity.studio` adresini ekleyin.
4. **Studio yayını:** Yapıldı (19.11.2026): https://dytelifsudeozkan.sanity.studio. `appId` `studio/sanity.cli.ts` içinde. Şema değiştiğinde `cd studio && pnpm deploy` yeterli.
5. **Vercel:** GitHub deposunu içe aktarın, **Root Directory: `web`**. Yukarıdaki ortam değişkenlerini Production ve Preview için girin. Alan adını (`dytelifsudeozkan.com`) bağlayıp DNS kayıtlarını ekleyin. Vercel'de Web Analytics'i açın.
6. **Resend alan adı doğrulaması:** Resend → Domains → `dytelifsudeozkan.com` ekleyin, DNS kayıtlarını girin. `RESEND_FROM_EMAIL` olarak bu alandan bir adres kullanın. `onboarding@resend.dev` yalnızca Resend hesabının kendi adresine gönderebilir, müşteriye ulaşmaz.
7. **Turnstile hostname'leri:** Cloudflare → Turnstile → widget → Hostname Management: `dytelifsudeozkan.com`, `www.dytelifsudeozkan.com`, Vercel önizleme alanı ve yerel test için `localhost`. Liste eksikse widget "Web sitesine bağlanılamıyor" gösterir (hata 110200). Site key ve secret'ı panelden kopyala-yapıştır yapın; yerel anahtarlar `web/.env.local`'de doğrulandı.
8. **Sanity webhook (site yayına alındıktan sonra):** sanity.io/manage → API → Webhooks → Create:
   - URL: `https://dytelifsudeozkan.com/api/revalidate`
   - Dataset: `production`, Trigger: Create, Update, Delete
   - Filter: `_type in ["siteSettings","service","post","galleryItem","announcement","partner","product","testimonial"]`
   - Projection: `{_type, "slug": slug.current}`
   - HTTP method: POST, Secret: `SANITY_REVALIDATE_SECRET` ile aynı değer
9. **Sanity planı:** Panelde deneme süresi görünüyor; deneme bitince ücretsiz planın limitlerini hesabınızdan doğrulayın.

## Henüz eksik olanlar

- Profesyonel fotoğraflar, X (Twitter) adresi, DoktorTakvimi profil adresi (alanları Studio'da hazır; boşken sitede görünmez).
- Hukukçu onaylı KVKK aydınlatma metni: Studio > Site ayarları > İletişim > "KVKK aydınlatma metni" alanı. Boşken İletişim sayfasında yalnızca formun veriyi nasıl işlediğini anlatan kısa bir açıklama gösterilir.
- Canlı e-posta gönderimi: yeni Resend anahtarı ve doğrulanmış gönderici alan adı gelene kadar test edilmedi.
- Blog: 3 yazı **taslak** olarak Studio'da (dengeli tabak, besin etiketi, su tüketimi). Genel bilgilendirme metinleridir; diyetisyen okuyup düzelttikten sonra "Yayınla"ya basınca sitede görünür.
- İş birlikleri: logolar Instagram ekran görüntülerinden kırpıldı (148 px). Asıl logo dosyaları gelince Studio'da değiştirin. Gizem Koçun'un Instagram kullanıcı adı eksik; girildiğinde satır bağlantılı olur.
