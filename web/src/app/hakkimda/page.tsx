import { ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { PortableText } from "@/components/portable-text";
import { CtaBand } from "@/components/site/cta-band";
import { PageHero } from "@/components/site/page-hero";
import { Partners } from "@/components/site/partners";
import { Photo } from "@/components/site/photo";
import { Container, Section, SectionHeader } from "@/components/site/section";
import { TermRows } from "@/components/site/term-rows";
import { Button } from "@/components/ui/button";
import { getContact } from "@/lib/contact";
import { PHOTOS } from "@/lib/photos";
import { PROFILE } from "@/lib/profile";
import { WHATSAPP_GREETING, whatsappHref } from "@/lib/site";
import { serviceVisual } from "@/lib/visuals";
import { getServices, getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Diyetisyen Elif Sude Özkan: kişiye özel, ölçüme dayalı ve sürdürülebilir beslenme danışmanlığı. Nilüfer, Bursa'da yüz yüze, Türkiye'nin her yerinden online.",
  alternates: { canonical: "/hakkimda" },
};

const STORY = [
  "Acıbadem Üniversitesi Beslenme ve Diyetetik bölümünden mezun oldum. Hastane polikliniklerinden özel bir diyetisyen kliniğine uzanan stajlarım boyunca, beslenmenin her insanda farklı bir hikâye olduğunu gördüm.",
  "Bugün yetişkinlerden anne ve çocuklara, gebelik döneminden ileri yaşa kadar farklı ihtiyaçlarla çalışıyorum. Her süreç sizi dinlemekle başlıyor; ölçümleriniz, tahlilleriniz ve alışkanlıklarınız birlikte değerlendiriliyor.",
  "Amacım kısa süreli bir diyet değil. Sevdiğiniz yemeklerle, gündelik hayatınıza uyan ve yıllarca sürdürebileceğiniz bir düzeni birlikte kurmak.",
];

const PRINCIPLES = [
  {
    title: "Size özel",
    text: "Hazır liste yok. Planınız; yaşınıza, işinize, alışkanlıklarınıza ve damak zevkinize göre kurulur.",
  },
  {
    title: "Ölçülebilir",
    text: "Ölçümler, vücut analizi ve tahlil sonuçlarıyla ilerlemenizi tahminle değil, verilerle izleriz.",
  },
  {
    title: "Sürdürülebilir",
    text: "Yasaklar yerine küçük ve kalıcı adımlar. Her görüşmede planı birlikte güncelleriz.",
  },
];

const MOMENTS = [
  { photo: PHOTOS.graduation, caption: "Mezuniyet, Temmuz 2025" },
  { photo: PHOTOS.event, caption: "Bir beslenme ve diyetetik etkinliğinde" },
  { photo: PHOTOS.university, caption: "Acıbadem Üniversitesi" },
];

function CvEntry({ title, place }: { title: string; place: string }) {
  return (
    <>
      <span className="block text-lg leading-snug font-bold text-ink">{title}</span>
      <span className="mt-1 block">{place}</span>
    </>
  );
}

export default async function AboutPage() {
  const [settings, contact, services] = await Promise.all([getSettings(), getContact(), getServices()]);

  return (
    <>
      <PageHero
        title={`Merhaba, ben ${PROFILE.name}`}
        lead="Sağlıklı beslenmeyi bir yasak listesi değil, hayatınıza uyan bir düzen olarak görüyorum. Nilüfer'de yüz yüze, Türkiye'nin her yerinden online görüşüyorum."
        crumbs={[{ href: "/hakkimda", label: "Hakkımda" }]}
        media={
          <Photo
            image={settings?.aboutImage}
            fallback={PHOTOS.aboutPortrait}
            aspect={4 / 5}
            eager
            sizes="(min-width: 1024px) 28rem, 92vw"
            className="bg-white/10"
          />
        }
      >
        <Button asChild size="lg" variant="white">
          <Link href="/randevu">Randevu talebi gönderin</Link>
        </Button>
        <Button asChild size="lg" variant="outline-light">
          <a href={whatsappHref(contact.whatsapp, WHATSAPP_GREETING)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon /> WhatsApp&apos;tan yazın
          </a>
        </Button>
      </PageHero>

      <Section tone="ivory" aria-labelledby="beni-taniyin" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <h2 id="beni-taniyin" className="text-headline font-bold">
              Beni tanıyın
            </h2>
            <div className="mt-6 grid gap-5 text-lg leading-relaxed text-ink-soft">
              {settings?.aboutIntro?.length ? (
                <div className="prose-site text-lg">
                  <PortableText value={settings.aboutIntro} />
                </div>
              ) : (
                STORY.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)
              )}
            </div>
          </div>
          <Photo
            fallback={PHOTOS.consult}
            aspect={4 / 5}
            sizes="(min-width: 1024px) 30rem, 92vw"
            className="mx-auto w-full max-w-md lg:max-w-none"
          />
        </Container>
      </Section>

      <Section tone="sand" aria-labelledby="prensipler" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeader id="prensipler" title="Çalışma prensiplerim" align="center" />
          <ul className="grid gap-5 md:grid-cols-3 lg:gap-6">
            {PRINCIPLES.map((item) => (
              <li key={item.title} className="rounded-2xl bg-paper p-8 shadow-card">
                <h3 className="text-2xl font-bold text-brand">{item.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {services.length > 0 ? (
        <Section tone="ivory" aria-labelledby="neler-yapiyorum" className="py-16 sm:py-20 lg:py-24">
          <Container>
            <SectionHeader
              id="neler-yapiyorum"
              title="Neler yapıyorum?"
              lead="Her dönemin ve her ihtiyacın kendine özgü bir beslenme yaklaşımı var."
              action={
                <Button asChild variant="outline">
                  <Link href="/hizmetler">
                    Tüm hizmetler <ArrowRightIcon />
                  </Link>
                </Button>
              }
            />
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <li key={service._id}>
                  <Link
                    href={`/hizmetler/${service.slug}`}
                    prefetch
                    className="group flex items-center gap-4 rounded-2xl border border-line p-3 transition-colors hover:border-brand/40 hover:bg-brand-soft"
                  >
                    <Photo
                      image={service.image}
                      fallback={serviceVisual(service.slug)}
                      aspect={1}
                      alt=""
                      sizes="4.5rem"
                      className="size-18 shrink-0 rounded-xl"
                    />
                    <span className="flex-1 leading-snug font-semibold text-ink group-hover:text-brand">
                      {service.title}
                    </span>
                    <ArrowRightIcon aria-hidden="true" className="mr-2 size-4 shrink-0 text-brand" />
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section tone="sand" aria-labelledby="egitim-deneyim" className="py-16 sm:py-20 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <h2 id="egitim-deneyim" className="text-headline font-bold">
              Eğitim ve deneyim
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Acıbadem Üniversitesi&apos;nde başlayan, hastane ve klinik stajlarıyla süren bir yol.
            </p>
          </div>
          <TermRows
            termWidth="12rem"
            items={[
              ...PROFILE.experience.map((item) => ({
                key: `${item.period}-${item.place}`,
                term: <span className="tabular text-[0.9375rem] font-semibold text-brass-ink">{item.period}</span>,
                detail: <CvEntry title={item.role} place={item.place} />,
              })),
              {
                key: "egitim",
                term: (
                  <span className="tabular text-[0.9375rem] font-semibold text-brass-ink">{PROFILE.graduation}</span>
                ),
                detail: <CvEntry title={`Lisans, ${PROFILE.degree}`} place={PROFILE.school} />,
              },
            ]}
          />
        </Container>
      </Section>

      <Section tone="ivory" aria-labelledby="kareler" className="py-16 sm:py-20 lg:py-24">
        <Container>
          <SectionHeader id="kareler" title="Kareler" lead="Eğitimden ve meslekten birkaç an." />
          <ul className="grid grid-cols-3 gap-3 sm:gap-6">
            {MOMENTS.map((moment) => (
              <li key={moment.caption}>
                <figure>
                  <Photo fallback={moment.photo} aspect={4 / 5} sizes="(min-width: 1024px) 25rem, 31vw" />
                  <figcaption className="mt-2 text-xs text-ink-soft sm:mt-3 sm:text-sm">{moment.caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand title="Tanışmak için bir mesaj yeterli." />
      <Partners />
    </>
  );
}
