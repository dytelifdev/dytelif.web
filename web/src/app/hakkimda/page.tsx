import type { Metadata } from "next";
import { Container, Folio, Railed } from "@/components/herbarium/folio";
import { PageIntro } from "@/components/herbarium/page-intro";
import { MountedPhoto, SpecimenLabel } from "@/components/herbarium/specimen";
import { PortableText } from "@/components/portable-text";
import { ClosingCta } from "@/components/site/closing-cta";
import { getContact } from "@/lib/contact";
import { PHOTOS } from "@/lib/photos";
import { PROFILE } from "@/lib/profile";
import { getSettings } from "@/sanity/fetch";

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Dyt. Elif Sude Özkan: Acıbadem Üniversitesi Beslenme ve Diyetetik mezunu. Eğitim, klinik staj deneyimi ve bilimsel temelli, sürdürülebilir beslenme yaklaşımı.",
  alternates: { canonical: "/hakkimda" },
};

export default async function AboutPage() {
  const [settings, contact] = await Promise.all([getSettings(), getContact()]);

  return (
    <>
      <PageIntro
        title="Hakkımda"
        lead="Bilimsel temelli, sürdürülebilir ve kişiye özgü beslenme; Nilüfer'de yüz yüze, Türkiye'nin her yerinden online."
      />

      <Folio surface="paper">
        <Container className="py-16 lg:py-24">
          <Railed
            aside={
              <div className="mx-auto mb-14 flex max-w-sm flex-col gap-0 lg:sticky lg:top-10 lg:mx-0 lg:mb-0">
                <MountedPhoto
                  image={settings?.aboutImage}
                  fallback={PHOTOS.aboutPortrait}
                  eager
                  aspect={3 / 4}
                  tapes={["top"]}
                  sizes="(min-width: 1024px) 24rem, 90vw"
                />
                <SpecimenLabel
                  className="relative z-10 -mt-6 ml-6 px-4 pb-1"
                  title={`Dyt. ${PROFILE.name}`}
                  rows={[
                    { term: "Bölüm", value: PROFILE.degree },
                    { term: "Mezuniyet", value: `${PROFILE.graduation}, Acıbadem Üniversitesi` },
                    { term: "Konum", value: `${contact.location}; online` },
                  ]}
                />
              </div>
            }
          >
            <div className="prose-folio text-lg">
              {settings?.aboutIntro?.length ? (
                <PortableText value={settings.aboutIntro} />
              ) : (
                PROFILE.summary.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)} className="mb-5">
                    {paragraph}
                  </p>
                ))
              )}
            </div>

            <h2 className="mt-16 mb-6 font-display text-headline">Deneyim</h2>
            <ol className="border-t-2 border-ink">
              {PROFILE.experience.map((item) => (
                <li
                  key={item.period}
                  className="grid gap-x-8 gap-y-2 border-b border-rule py-7 md:grid-cols-[11rem_1fr]"
                >
                  <p className="tabular text-sm text-ink-soft">{item.period}</p>
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{item.role}</h3>
                    <p className="mt-1 text-ink-soft">{item.place}</p>
                    <ul className="mt-4 list-disc space-y-1.5 pl-5 marker:text-bronze">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mt-16 mb-6 font-display text-headline">Eğitim ve yetkinlikler</h2>
            <div className="mt-10 mb-14 grid grid-cols-2 items-start gap-5 sm:gap-8">
              <figure>
                <MountedPhoto
                  image={null}
                  fallback={PHOTOS.graduation}
                  aspect={4 / 5}
                  tapes={["top-left"]}
                  sizes="(min-width: 1024px) 22rem, 45vw"
                />
                <figcaption className="mt-3 text-sm text-ink-soft">Mezuniyet, Temmuz 2025</figcaption>
              </figure>
              <figure className="mt-12">
                <MountedPhoto
                  image={null}
                  fallback={PHOTOS.event}
                  aspect={4 / 5}
                  tapes={["top-right"]}
                  sizes="(min-width: 1024px) 22rem, 45vw"
                />
                <figcaption className="mt-3 text-sm text-ink-soft">
                  Acıbadem Üniversitesi&apos;nde bir beslenme etkinliği
                </figcaption>
              </figure>
            </div>
            <dl className="border-t-2 border-ink">
              {[
                { term: "Lisans", value: `${PROFILE.school}, ${PROFILE.degree}, 2020–2025` },
                { term: "Yetkinlikler", value: PROFILE.skills.join(" · ") },
                { term: "Diller", value: PROFILE.languages.join(", ") },
                { term: "İlgi alanları", value: PROFILE.interests },
              ].map((row) => (
                <div key={row.term} className="grid gap-x-8 gap-y-1 border-b border-rule py-5 md:grid-cols-[11rem_1fr]">
                  <dt className="text-sm text-ink-soft">{row.term}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
          </Railed>
        </Container>
      </Folio>

      <ClosingCta title="Tanışmak için bir mesaj yeter." />
    </>
  );
}
