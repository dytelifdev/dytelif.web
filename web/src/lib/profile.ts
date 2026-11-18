/**
 * Professional facts taken from the client's CV (Temmuz 2025 mezuniyeti).
 * Personal fields from the CV (birth year, marital status, references'
 * contact details) are intentionally not published.
 */
export const PROFILE = {
  name: "Elif Sude Özkan",
  title: "Diyetisyen",
  degree: "Beslenme ve Diyetetik (İngilizce)",
  school: "Acıbadem Üniversitesi, Sağlık Bilimleri Fakültesi",
  graduation: "Temmuz 2025",
  summary: [
    "Acıbadem Üniversitesi Beslenme ve Diyetetik (İngilizce) bölümünden Temmuz 2025'te mezun oldum. Eğitimim boyunca farklı hastanelerde ve kliniklerde yaptığım stajlarla klinik ve toplu beslenme alanlarında uygulama deneyimi kazandım.",
    "Bilimsel temelli, sürdürülebilir ve bireye özgü beslenme yaklaşımını benimsiyorum. Etik değerlere bağlı kalarak, güncel bilimsel yayınları takip ederek ve mesleki gelişimime yatırım yaparak çalışıyorum.",
  ],
  experience: [
    {
      period: "Ağustos 2025 – devam ediyor",
      role: "Serbest çalışan diyetisyen",
      place: "Yüz yüze ve online beslenme danışmanlığı",
      points: [
        "Ön görüşmede anamnez alınması ve antropometrik ölçümlerin değerlendirilmesi",
        "Kan tahlili ve vücut analizi sonuçlarının yorumlanması",
        "Yetişkin, anne–çocuk ve geriatri gruplarında kişiye özgü beslenme programları",
        "Hastalık durumlarında bireysel gereksinimlere uygun beslenme planlaması",
        "Sürdürülebilir programların oluşturulması ve düzenli takibi",
      ],
    },
    {
      period: "Mayıs – Haziran 2025",
      role: "Stajyer diyetisyen",
      place: "Diyetisyen Hazal Doğan Kliniği",
      points: [
        "Bireysel danışan görüşmelerine katılım ve beslenme anamnezi",
        "Beden analizi (BIA) değerlendirmelerinin gözlemlenmesi ve yorumlanması",
        "Kişiye özgü program planlaması ve takip süreçleri",
      ],
    },
    {
      period: "Şubat – Mart 2025",
      role: "Stajyer diyetisyen",
      place: "Gaziosmanpaşa Eğitim ve Araştırma Fizik Tedavi Hastanesi",
      points: [
        "Poliklinik hastalarında beslenme durumunun değerlendirilmesi ve program planlaması",
        "Klinik durum ve laboratuvar sonuçlarının değerlendirilmesi",
        "Çocuk, gebe ve yetişkinlerde antropometrik ölçümler",
        "Diyabetli hastalara karbonhidrat sayımı eğitimi, kan glukozu ve insülin takibi",
      ],
    },
    {
      period: "Eylül 2024 – Ocak 2025",
      role: "Stajyer diyetisyen",
      place: "Acıbadem Hastaneleri (Kadıköy, Maslak, Ataşehir, International ve Bursa)",
      points: [
        "Poliklinik danışan takibi ve bireysel görüşmelerde gözlem ve destek",
        "Hastane mutfağı işleyişi, menü planlama ve standart reçete süreçleri",
      ],
    },
  ],
  skills: ["Antropometrik ölçüm teknikleri", "BeBiS ve SPSS", "Microsoft Office", "Canva ve Prezi ile içerik tasarımı"],
  languages: ["Türkçe", "İngilizce (B2)"],
  interests:
    "Yeni yemek tarifleri geliştirmek, güncel beslenme dergilerini ve bilimsel makaleleri takip etmek, tarihi yerleri gezmek, doğa yürüyüşü ve koşu.",
} as const;

/** How a consultation unfolds, in the order it happens (from the CV's practice notes). */
export const PROCESS = [
  {
    term: "Ön görüşme",
    detail: "Beslenme alışkanlıklarınızı ve geçmişinizi konuşuruz; boy, kilo ve çevre ölçümleri alınır.",
  },
  {
    term: "Değerlendirme",
    detail: "Kan tahlili ve vücut analizi sonuçlarınızı birlikte yorumlarız.",
  },
  {
    term: "Kişiye özgü plan",
    detail: "Yaşamınıza, yaş döneminize ve varsa sağlık durumunuza göre uygulanabilir bir program hazırlanır.",
  },
  {
    term: "Düzenli takip",
    detail: "Görüşmelerle plan güncellenir; kalıcı alışkanlıklar adım adım oturur.",
  },
] as const;

/**
 * Practice areas confirmed by the CV, shown as an unlinked register until the
 * editor publishes services in Sanity (the same texts seed the CMS).
 */
export const SERVICE_AREAS = [
  {
    title: "Yetişkin beslenme danışmanlığı",
    summary: "Ön görüşme, ölçüm ve tahlil değerlendirmesiyle başlayan; yaşamınıza uygun, sürdürülebilir program.",
  },
  {
    title: "Anne ve çocuk beslenmesi",
    summary: "Anne ve çocuk için dönemin ihtiyaçlarına göre planlanan, kişiye özgü program ve düzenli takip.",
  },
  {
    title: "İleri yaş (geriatri) beslenmesi",
    summary: "İleri yaş döneminin ihtiyaçlarına uygun, günlük hayata kolayca oturan plan ve takip.",
  },
  {
    title: "Hastalıklarda beslenme",
    summary:
      "Sağlık durumunuza ve bireysel gereksinimlerinize uygun planlama; tahlil sonuçlarınız birlikte değerlendirilir.",
  },
  {
    title: "Online beslenme danışmanlığı",
    summary: "Türkiye'nin her yerinden görüntülü görüşmeyle: aynı değerlendirme, kişiye özgü plan ve düzenli takip.",
  },
] as const;
