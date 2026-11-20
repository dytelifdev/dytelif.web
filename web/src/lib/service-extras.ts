/**
 * What each service page says that no other page does: one focus section and a few
 * questions of its own, in place of the site-wide process band and FAQ. General
 * information only: no weight or time promises, and anything about medication,
 * supplements or insulin stays with the client's physician. Keyed by service slug;
 * a service added later in Studio simply shows neither block until it gets an entry.
 */
export type ServiceExtra = {
  focus: {
    title: string;
    lead: string;
    points: { term: string; detail: string }[];
    /** A short closing remark under the points. */
    note?: string;
  };
  faqs: { question: string; answer: string }[];
};

export const SERVICE_EXTRAS: Record<string, ServiceExtra> = {
  "yetiskin-beslenme-danismanligi": {
    focus: {
      title: "Yoğun bir hayata uyan beslenme",
      lead: "Plan takviminize göre kurulur. İş günü, seyahat ve dışarıda yemek için ayrı ilkeler belirleriz.",
      points: [
        {
          term: "İş günü",
          detail: "Mesai ve toplantı saatlerine göre öğün zamanları; masada ya da yolda hazırlanabilen seçenekler.",
        },
        {
          term: "Seyahat",
          detail: "Otel kahvaltısı, havalimanı ve yol için önceden düşünülmüş, pratik tercihler.",
        },
        {
          term: "Dışarıda yemek",
          detail: "Menüden seçim yaparken dikkat edilecekler; davetleri ve buluşmaları dışarıda bırakmayan bir düzen.",
        },
        {
          term: "Hafta sonu",
          detail: "Sevdiğiniz yemeklere yer açan, haftaya dengeli dönmeyi kolaylaştıran bir esneklik.",
        },
      ],
    },
    faqs: [
      {
        question: "Çok yoğun çalışıyorum, programa uyabilir miyim?",
        answer:
          "Program, çalışma saatlerinize ve yemek imkânlarınıza göre kurulur. Uygulanamayan bir öneri, görüşmede birlikte güncellenir.",
      },
      {
        question: "Dışarıda yemek zorunda kaldığım günler ne olacak?",
        answer:
          "Bu günler planın bir parçasıdır. Menüden seçim yaparken kullanabileceğiniz basit ilkeleri birlikte belirleriz.",
      },
      {
        question: "Hedefim kilo vermek değil; bu hizmet bana uygun mu?",
        answer:
          "Evet. Daha dengeli beslenmek, enerjinizi korumak ya da alışkanlıklarınızı düzenlemek de bu hizmetin konusudur.",
      },
    ],
  },
  "kilo-yonetimi": {
    focus: {
      title: "Yasak listesi yerine düzen",
      lead: "Kısıtlamalar kısa sürede yorar. Kalıcı olan, gündelik hayatınıza oturan bir düzendir.",
      points: [
        {
          term: "Yasak yerine yer",
          detail:
            "Sevdiğiniz yiyecekler listeden çıkarılmaz; planda nasıl ve ne sıklıkla yer alacakları birlikte belirlenir.",
        },
        {
          term: "Ölçüyle takip",
          detail: "İlerleme yalnızca tartıyla değil, çevre ölçümleri ve vücut analiziyle birlikte izlenir.",
        },
        {
          term: "Küçük adımlar",
          detail: "Her görüşmede bir ya da iki alışkanlık üzerine çalışılır; değişim adım adım gelir.",
        },
        {
          term: "Gerçekçi hedef",
          detail: "Kilo ve süre vaadi verilmez. Hedefler bedeninize ve yaşamınıza göre birlikte konur.",
        },
      ],
    },
    faqs: [
      {
        question: "Ne kadar sürede kilo veririm?",
        answer:
          "Bunu önceden söylemek doğru olmaz. Hız; başlangıç noktanıza, sağlık durumunuza ve yaşamınıza göre değişir. Hedefler ölçümlere bakılarak birlikte belirlenir.",
      },
      {
        question: "Sevdiğim yiyecekleri bırakmam gerekecek mi?",
        answer:
          "Hayır. Amaç yasak koymak değil; sevdiğiniz yiyeceklerin dengeli bir düzende nasıl yer alacağını birlikte planlamak.",
      },
      {
        question: "Hedefime ulaştıktan sonra ne oluyor?",
        answer: "Takip görüşmelerinde, ulaştığınız kiloyu korumaya yönelik bir düzen birlikte kurulur.",
      },
    ],
  },
  "anne-ve-cocuk-beslenmesi": {
    focus: {
      title: "Sofrada birlikte",
      lead: "Çocuklar en çok sofrada gördüklerinden öğrenir. Plan, ailenin ortak sofrasından başlar.",
      points: [
        {
          term: "Ortak sofra",
          detail: "Ayrı bir çocuk menüsü yerine, aynı sofrada küçük uyarlamalarla herkese uyan yemekler.",
        },
        {
          term: "Seçici yeme",
          detail:
            "Yeni bir yiyeceği kabul etmek zaman alabilir; ısrar etmeden, farklı biçimlerde yeniden sunmak işe yarar.",
        },
        {
          term: "Örnek olmak",
          detail: "Ebeveynin tabağı, çocuğun en güçlü örneğidir. Değişim birlikte yapıldığında kolaylaşır.",
        },
        {
          term: "Dönemine göre",
          detail: "Çocuğunuzun yaşına ve gelişimine uygun öğün düzeni ve porsiyonlar.",
        },
      ],
    },
    faqs: [
      {
        question: "Çocuğum çok seçici yiyor, ne yapabiliriz?",
        answer:
          "Seçici yeme çocuklukta sık görülür. Baskı kurmadan, yeni yiyecekleri farklı biçimlerde ve tekrar tekrar sunmak gibi pratik yöntemleri birlikte planlarız.",
      },
      {
        question: "Ailenin geri kalanı için ayrı yemek mi hazırlanacak?",
        answer: "Hayır. Amaç, aynı sofrada küçük uyarlamalarla herkese uyan bir düzen kurmak.",
      },
      {
        question: "Görüşmeye çocuğumla birlikte mi gelmeliyim?",
        answer: "Bunu çocuğunuzun yaşına ve ihtiyaca göre, randevu öncesinde birlikte belirleriz.",
      },
    ],
  },
  "gebelik-ve-emzirme-beslenmesi": {
    focus: {
      title: "Dönem dönem ihtiyaçlar",
      lead: "Gebelikte ve emzirmede ihtiyaçlar her dönemde değişir; plan da sizinle birlikte değişir.",
      points: [
        {
          term: "İlk üç ay",
          detail: "Bulantı ve iştah değişikliklerine uyumlu, küçük ve sık öğünler.",
        },
        {
          term: "İkinci üç ay",
          detail: "Artan ihtiyaçlar için demir, kalsiyum ve protein kaynaklarının sofrada dengeli yer alması.",
        },
        {
          term: "Son üç ay",
          detail: "Mide yanması ve dolgunluk hissine karşı daha küçük porsiyonlar ve yeterli sıvı.",
        },
        {
          term: "Emzirme",
          detail: "Anne için yeterli enerji ve sıvı; bebeğinizle değişen gün düzenine uyan pratik öğünler.",
        },
      ],
      note: "Takviyelerin gerekip gerekmediğine ve dozuna hekiminiz karar verir; plan bu önerilerle uyumlu kurulur.",
    },
    faqs: [
      {
        question: "Gebelikte iki kişilik mi yemeliyim?",
        answer:
          "Hayır. Enerji ihtiyacı artar ama iki katına çıkmaz. Önemli olan miktardan çok besin çeşitliliği ve kalitesidir.",
      },
      {
        question: "Takviye kullanmalı mıyım?",
        answer:
          "Folik asit, demir ya da D vitamini gibi takviyelerin gerekip gerekmediğine ve dozuna hekiminiz karar verir. Beslenme planı bu önerilerle uyumlu kurulur.",
      },
      {
        question: "Emzirirken kilo vermeye çalışabilir miyim?",
        answer:
          "Bu dönemde ani kısıtlamalar önerilmez. Enerjinizi ve süt üretimini destekleyen, dengeli bir düzen birlikte planlanır.",
      },
    ],
  },
  "ileri-yas-beslenmesi": {
    focus: {
      title: "Kolay, keyifli, yeterli",
      lead: "İleri yaşta beslenme; iştah, çiğneme ve günlük ritim gibi pratik konularla şekillenir.",
      points: [
        {
          term: "İştah",
          detail: "Az ama besleyici öğünler; iştahın azaldığı günler için küçük, sık ara öğünler.",
        },
        {
          term: "Çiğneme",
          detail: "Yumuşak dokulu, kolay hazırlanan ve tadından ödün vermeyen yemekler.",
        },
        {
          term: "Sıvı",
          detail: "Susama hissi azalabildiği için gün içine yayılmış, alışkanlığa bağlanmış sıvı tüketimi.",
        },
        {
          term: "Kas ve kemik",
          detail: "Yeterli protein, kalsiyum ve D vitamini kaynaklarının günlük düzende yer alması.",
        },
      ],
    },
    faqs: [
      {
        question: "Görüşmeye bir yakınımla gelebilir miyim?",
        answer:
          "Elbette. Yemekleri hazırlayan ya da bakımda destek olan bir yakınınızın görüşmede bulunması, planı uygulamayı kolaylaştırır.",
      },
      {
        question: "Düzenli kullandığım ilaçlar plana etki eder mi?",
        answer:
          "Evet, dikkate alınır. İlaçlarınızın ve tanılarınızın listesini getirmeniz önerilir; plan hekiminizin önerileriyle uyumlu kurulur.",
      },
      {
        question: "İştahım çok az, ne yapabilirim?",
        answer:
          "Az yenen günlerde öğünlerin besin değeri önem kazanır. Küçük porsiyonlarla daha besleyici seçenekleri birlikte planlarız.",
      },
    ],
  },
  "hastaliklarda-beslenme": {
    focus: {
      title: "Hekiminizle uyum içinde",
      lead: "Beslenme planı tedavinizin yerine geçmez, onu destekler. Hekiminizin önerileri planın çerçevesini çizer.",
      points: [
        {
          term: "Tahliller",
          detail: "Kan tahlili sonuçlarınız birlikte okunur; planın hangi değerleri dikkate aldığı açıkça konuşulur.",
        },
        {
          term: "Hekim önerileri",
          detail: "Doktorunuzun beslenmeyle ilgili önerileri ve kısıtlamaları plana olduğu gibi yansıtılır.",
        },
        {
          term: "İlaç ve öğün",
          detail: "Kullandığınız ilaçlar not edilir; öğün zamanları ve içerikleri buna göre düzenlenir.",
        },
        {
          term: "Güncelleme",
          detail: "Yeni tahlil sonuçları geldikçe plan değişen ihtiyaçlarınıza göre güncellenir.",
        },
      ],
    },
    faqs: [
      {
        question: "Görüşmeye neler getirmeliyim?",
        answer:
          "Varsa son tahlil sonuçlarınızı, tanılarınızı, kullandığınız ilaçları ve hekiminizin beslenmeyle ilgili önerilerini.",
      },
      {
        question: "Beslenme planı ilaçlarımın yerine geçer mi?",
        answer: "Hayır. Beslenme planı tedavinizi destekler; ilaçlarınızla ilgili her karar hekiminize aittir.",
      },
      {
        question: "Planım ne zaman güncellenir?",
        answer: "Takip görüşmelerinde ve yeni tahlil sonuçlarınız geldiğinde, değişen ihtiyaçlarınıza göre.",
      },
    ],
  },
  "diyabette-beslenme": {
    focus: {
      title: "Karbonhidrat sayımı nedir?",
      lead: "Öğünlerdeki karbonhidrat miktarını takip ederek kan şekerini daha öngörülebilir kılmayı amaçlayan bir yöntem.",
      points: [
        {
          term: "Değişim",
          detail:
            "Belirli bir karbonhidrat miktarı, çoğunlukla 15 gram, bir değişim sayılır. Farklı yiyecekler aynı ölçüyle karşılaştırılır.",
        },
        {
          term: "Etiket okuma",
          detail: "Paketli ürünlerde toplam karbonhidrat ve porsiyon bilgisinin nasıl okunacağı birlikte çalışılır.",
        },
        {
          term: "Öğün dengesi",
          detail: "Karbonhidrat yasaklanmaz; gün içine dengeli dağıtılır, lif ve proteinle birlikte planlanır.",
        },
        {
          term: "İnsülin",
          detail: "Doz kararları hekiminize aittir; sayım, bu kararları destekleyen bir araçtır.",
        },
      ],
    },
    faqs: [
      {
        question: "Diyabette ekmek ve meyve tamamen yasak mı?",
        answer:
          "Hayır. Önemli olan miktar, tür ve öğündeki dengedir. Tam tahıllar ve meyveler uygun porsiyonlarla planda yer alabilir.",
      },
      {
        question: "Karbonhidrat sayımını öğrenmek zor mu?",
        answer:
          "İlk başta yeni gelebilir. Sık tükettiğiniz yiyeceklerle başlayarak, örnek öğünler üzerinden adım adım öğrenilir.",
      },
      {
        question: "Kan şekeri ölçümlerimi getirmeli miyim?",
        answer:
          "Evet. Ölçüm kayıtlarınız, HbA1c dahil tahlil sonuçlarınız ve kullandığınız ilaçlar değerlendirmeyi kolaylaştırır.",
      },
    ],
  },
  "online-beslenme-danismanligi": {
    focus: {
      title: "Online görüşme nasıl işler?",
      lead: "Yüz yüze görüşmeyle aynı değerlendirme ve takip; yalnızca ekran üzerinden.",
      points: [
        {
          term: "Gerekenler",
          detail: "Kameralı bir telefon ya da bilgisayar, sessiz bir ortam ve iyi bir internet bağlantısı.",
        },
        {
          term: "Ölçümler",
          detail: "Evde alınabilecek ölçümler, kilo ve bel çevresi gibi, görüşmede adım adım birlikte alınır.",
        },
        {
          term: "Tahliller",
          detail: "Tahlil sonuçlarınızı görüşmeden önce dijital olarak iletebilirsiniz.",
        },
        {
          term: "Takip",
          detail: "Takip görüşmeleri de görüntülü yapılır; gün ve saati birlikte belirleriz.",
        },
      ],
    },
    faqs: [
      {
        question: "Online görüşme yüz yüze kadar etkili mi?",
        answer:
          "Değerlendirme, kişiye özgü plan ve takip aynı şekilde ilerler. Vücut analizi gibi cihaz gerektiren ölçümler yalnızca yüz yüze yapılabilir.",
      },
      {
        question: "Ölçümlerimi kendim alabilir miyim?",
        answer: "Evet. Kilo ve çevre ölçümlerini evde nasıl alacağınızı görüşmede birlikte, adım adım planlarız.",
      },
      {
        question: "Görüşme saatini nasıl belirliyoruz?",
        answer: "Randevu talebinizden sonra size dönüş yapılır; gün ve saati birlikte belirleriz.",
      },
    ],
  },
  "vucut-analizi-ve-olcum": {
    focus: {
      title: "Neler ölçülür?",
      lead: "Tartının gösterdiği tek sayının ötesinde, bedeninizin bileşimine dair daha net bir tablo.",
      points: [
        {
          term: "Yağ ve kas",
          detail: "Vücut yağ oranı ve yağsız kütle; kilo değişiminin nereden geldiğini anlamaya yardımcı olur.",
        },
        {
          term: "Vücut suyu",
          detail: "Toplam vücut suyu; ölçümün yorumlanmasında ve sıvı dengesinin izlenmesinde kullanılır.",
        },
        {
          term: "Çevre ölçümleri",
          detail: "Bel ve kalça çevresi gibi ölçümler, tartının göstermediği değişimleri görünür kılar.",
        },
        {
          term: "Karşılaştırma",
          detail: "Aynı koşullarda tekrarlanan ölçümler, ilerlemeyi tahminle değil verilerle izlemenizi sağlar.",
        },
      ],
      note: "Ölçümden önceki birkaç saat ağır yemek yememeniz, aynı gün yoğun egzersiz yapmamanız ve ölçümden hemen önce tuvalete gitmeniz önerilir.",
    },
    faqs: [
      {
        question: "Ölçüme aç karna mı gelmeliyim?",
        answer:
          "Ağır bir öğünden hemen sonra ölçüm yapılmaması önerilir. Önceki birkaç saat hafif kalmanız ve yoğun egzersizden kaçınmanız sonuçların doğruluğunu artırır.",
      },
      {
        question: "Vücut analizi herkese uygun mu?",
        answer:
          "Kalp pili gibi elektronik bir tıbbi cihazınız varsa ya da gebeyseniz, bunu ölçümden önce mutlaka belirtin.",
      },
      {
        question: "Ölçümler ne zaman tekrarlanır?",
        answer: "Takip görüşmelerinde, mümkünse aynı saatte ve aynı koşullarda tekrarlanır.",
      },
    ],
  },
};

/** "Nereden başlamalı?" on /hizmetler: a visitor's own words, pointing to the service that fits. */
export const SERVICE_GUIDE = [
  { need: "Daha dengeli beslenmek, bir düzen kurmak istiyorum", slug: "yetiskin-beslenme-danismanligi" },
  { need: "Kilo vermek ya da kilomu korumak istiyorum", slug: "kilo-yonetimi" },
  { need: "Çocuğumun ve ailemin sofrası için destek arıyorum", slug: "anne-ve-cocuk-beslenmesi" },
  { need: "Hamileyim ya da emziriyorum", slug: "gebelik-ve-emzirme-beslenmesi" },
  { need: "Annem, babam ya da kendim için ileri yaşta destek istiyorum", slug: "ileri-yas-beslenmesi" },
  { need: "Bir sağlık sorunum ve tahlil sonuçlarım var", slug: "hastaliklarda-beslenme" },
  { need: "Diyabetim ya da kan şekeri sorunum var", slug: "diyabette-beslenme" },
  { need: "Bursa dışındayım ya da gelmeye vaktim yok", slug: "online-beslenme-danismanligi" },
  { need: "Önce başlangıç noktamı öğrenmek istiyorum", slug: "vucut-analizi-ve-olcum" },
] as const;

/** "Ön görüşmeye hazırlık" on /randevu: what to bring, in the order a visitor gathers it. */
export const VISIT_PREP = [
  {
    term: "Tahlil sonuçları",
    detail: "Varsa güncel kan tahlili sonuçlarınız; online görüşmede önceden iletebilirsiniz.",
  },
  { term: "İlaç ve takviyeler", detail: "Düzenli kullandığınız ilaçların ve takviyelerin adları." },
  {
    term: "Birkaç günlük not",
    detail: "İsterseniz son birkaç günde ne yediğinizi kısaca yazın; değerlendirmeyi kolaylaştırır.",
  },
  { term: "Hedef ve sorular", detail: "Neyi değiştirmek istediğiniz ve aklınızdaki sorular." },
  {
    term: "Ölçüm için",
    detail: "Rahat kıyafetler. Vücut analizinden önceki birkaç saat ağır yemek ve yoğun egzersizden kaçının.",
  },
  { term: "Online görüşmede", detail: "Kameralı bir cihaz, sessiz bir ortam; varsa evdeki tartınız ve bir mezura." },
] as const;
