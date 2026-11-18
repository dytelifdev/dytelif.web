# dytelif.web

Dyt. Elif Sude Özkan'ın web sitesi ve içerik paneli. Tek depoda iki bağımsız uygulama:

```text
dytelif.web/
├── web/      Next.js 16 sitesi (App Router, Tailwind 4, shadcn/ui). Yayın hedefi: Vercel
├── studio/   Sanity Studio (içerik paneli). Yayın hedefi: <seçilecek-ad>.sanity.studio
├── brand/    Logo ve monogram dosyaları (SVG, açık/koyu zemin)
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

| Komut (studio/) | Ne yapar |
| --- | --- |
| `pnpm dev` | Studio'yu yerelde açar (Sanity hesabıyla giriş ister) |
| `pnpm typegen` | Şemayı çıkarır ve `web/src/sanity/types.ts` tiplerini GROQ sorgularından üretir |
| `pnpm seed` | `seed/initial-content.ndjson` içindeki başlangıç içeriğini yalnızca eksik belgeler için yükler |
| `pnpm deploy` | Studio'yu `*.sanity.studio` adresine yayınlar |

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

Gizli değerler hiçbir zaman `NEXT_PUBLIC_` ile başlamaz. Site Sanity'den yalnızca yayımlanmış içeriği token olmadan okur.

## Nasıl çalışır

- **Önbellek:** Bütün sayfalar derlemede statik üretilir (Cache Components, `'use cache'` + `cacheTag`). İçerik türüne göre etiketlenir: `siteSettings`, `service`, `post`, `galleryItem`, `announcement`, `product`.
- **İçerik güncelleme:** Studio'da Yayınla → Sanity webhook'u `POST /api/revalidate` → imza doğrulanır → ilgili etiket hemen geçersiz kılınır. GitHub push gerekmez. Webhook kurulana kadar içerik en geç 1 saatte bir yenilenir.
- **Formlar:** İletişim (`/iletisim`) ve randevu talebi (`/randevu`) → `POST /api/contact` → Zod doğrulaması (tarayıcıda ve sunucuda), honeypot, Turnstile sunucu doğrulaması → Resend ile e-posta. Form verisi hiçbir yerde saklanmaz, loglanmaz. Randevu talebi randevu oluşturmaz; diyetisyen kişiye kendisi döner.
- **Ürünler (`/urunler`):** Varsayılan durum "Çok yakında". Studio > Site ayarları > Ürünler'de "Ürünleri göster" seçilir ve en az bir ürün tanıtımı yayımlanırsa kod değişikliği olmadan liste görünür. Fiyat, sepet, ödeme yoktur.
- **Görseller:** Sanity CDN üzerinden boyutlandırılır (`web/src/sanity/image-loader.ts`); bulanık önizleme (LQIP) Sanity'den gelir.
- **Rota çizgisi:** İç bağlantılarda ekranın üstünde ince mavi ilerleme çizgisi (`components/site/route-progress.tsx`).

## Fotoğraflar (Sanity > Site ayarları ve Galeri)

Sitede şu an `web/public/photo/` klasöründeki 12 fotoğraf kullanılıyor (eşleştirmeler ve alt metinler `web/src/lib/photos.ts` içinde). Studio'daki ilgili alana fotoğraf yüklendiğinde her zaman o öncelikli olur, kod değişikliği gerekmez. Ne Sanity'de ne klasörde fotoğraf yoksa bronz damgalı, tasarlanmış boş föy görünür. Bu fotoğraflar Vercel'e gidebilmek için depoya dahildir; depo public olduğundan istemediğiniz bir kare varsa klasörden çıkarıp `photos.ts`'ten silin ya da depoyu private yapın.

| Alan | Oran | Öneri | Alternatif metin örneği |
| --- | --- | --- | --- |
| Ana sayfa portresi (`heroImage`) | 4:5 dikey | En az 1600 px yükseklik, yüz üst üçte birde; odak noktasını yüze getirin | "Diyetisyen Elif Sude Özkan, danışmanlık odasında" |
| Hakkımda portresi (`aboutImage`) | 3:4 dikey | Farklı bir kare (çalışırken, ölçüm sırasında) | "Elif Sude Özkan danışanıyla beslenme planını inceliyor" |
| Ürünler görseli (`productsImage`) | 4:5 | Ürünler hazır olduğunda | Ürünün kısa tanımı |
| Galeri | Serbest | Uzun kenar en az 1600 px | Fotoğrafta ne olduğunu anlatan bir cümle |
| Paylaşım görseli (`ogImage`) | 1200×630 | Boşsa site logolu varsayılan görseli kullanır | — |

Başka bir diyetisyene ya da stok sitelerine ait fotoğraf kullanmayın.

## Logo ve favicon

- **Wordmark:** "Dyt." italik, "Elif Sude Özkan" yüksek kontrastlı bir didone (Bodoni Moda, OFL). Harfler SVG path'e çevrildi; font yüklenmeden her yerde aynı görünür. Didone, herbaryum föylerinin basıldığı 19. yüzyıl matbaacılığından gelir ve sitenin "föy" dünyasıyla aynı kaynaktan beslenir.
- **Monogram:** Kalın gövdesini paylaşan bir "eö" ligatürü (Elif ve Özkan). Ö'nün iki noktası bronz tonda; Türkçe imza olarak 16 px'te bile okunur. Yaprak, kalp, çatal gibi hazır sembol kullanılmadı.
- Dosyalar: `brand/wordmark-yesil.svg`, `brand/wordmark-krem.svg`, `brand/monogram-yesil-zemin.svg`, `brand/monogram-krem-zemin.svg`, `brand/monogram-seffaf.svg`. Sitede `web/public/brand/logo.svg` sprite'ı, `web/src/app/icon.svg`, `favicon.ico` (16/32/48) ve derlemede üretilen `apple-icon` kullanılır.

## Yayına alma adımları (sizin yapacaklarınız)

1. **Anahtarları yenileyin.** Ekran görüntülerinde görünen Resend API anahtarını iptal edip yenisini oluşturun. Turnstile secret'ı da paylaşıldığı için Cloudflare'de yenilemeniz önerilir. GitHub hesap parolasını değiştirin.
2. **Sanity girişi ve başlangıç içeriği:** `cd studio && pnpm exec sanity login` (info.elifsudeozkan@gmail.com hesabı) → `pnpm seed`. Hizmet metinleri CV'den türetildi; Studio'da gözden geçirin.
3. **Sanity CORS:** sanity.io/manage → vuzgi5tw → API → CORS origins: `http://localhost:3333` (credentials açık) ve Studio yayın adresi.
4. **Studio yayını:** `cd studio && pnpm deploy` → hostname'i seçin (ör. `dytelif`). Bu adres henüz belirlenmedi. Yayından sonra sanity.io/manage/project/vuzgi5tw/studios sayfasındaki `appId` değerini `studio/sanity.cli.ts` içindeki `deployment` bölümüne ekleyin.
5. **Vercel:** GitHub deposunu içe aktarın, **Root Directory: `web`**. Yukarıdaki ortam değişkenlerini Production ve Preview için girin. Alan adını (`dytelifsudeozkan.com`) bağlayıp DNS kayıtlarını ekleyin. Vercel'de Web Analytics'i açın.
6. **Resend alan adı doğrulaması:** Resend → Domains → `dytelifsudeozkan.com` ekleyin, DNS kayıtlarını girin. `RESEND_FROM_EMAIL` olarak bu alandan bir adres kullanın. `onboarding@resend.dev` yalnızca Resend hesabının kendi adresine gönderebilir, müşteriye ulaşmaz.
7. **Turnstile hostname'leri:** Cloudflare → Turnstile → widget → Hostnames: `dytelifsudeozkan.com`, `www.dytelifsudeozkan.com`, Vercel önizleme alanı ve yerel test için `localhost`. Site key ve secret'ı panelden kopyala-yapıştır yapın.
8. **Sanity webhook (site yayına alındıktan sonra):** sanity.io/manage → API → Webhooks → Create:
   - URL: `https://dytelifsudeozkan.com/api/revalidate`
   - Dataset: `production`, Trigger: Create, Update, Delete
   - Filter: `_type in ["siteSettings","service","post","galleryItem","announcement","product"]`
   - Projection: `{_type, "slug": slug.current}`
   - HTTP method: POST, Secret: `SANITY_REVALIDATE_SECRET` ile aynı değer
9. **Sanity planı:** Panelde deneme süresi görünüyor; deneme bitince ücretsiz planın limitlerini hesabınızdan doğrulayın.

## Henüz eksik olanlar

- Profesyonel fotoğraflar, X (Twitter) adresi, DoktorTakvimi profil adresi (alanları Studio'da hazır; boşken sitede görünmez).
- Hukukçu onaylı KVKK aydınlatma metni: Studio > Site ayarları > İletişim > "KVKK aydınlatma metni" alanı. Boşken İletişim sayfasında yalnızca formun veriyi nasıl işlediğini anlatan kısa bir açıklama gösterilir.
- Canlı e-posta gönderimi: yeni Resend anahtarı ve doğrulanmış gönderici alan adı gelene kadar test edilmedi.
