# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Pinned by the project brief: monorepo `dytelif.web/` with `web/` (Next.js App Router, TypeScript, Tailwind CSS 4, shadcn/ui with an original theme, Lucide icons, React Hook Form + Zod, Sonner, Resend server-side, Vercel Analytics) and `studio/` (standalone Sanity Studio, project `vuzgi5tw`, dataset `production`). Package manager: pnpm. Web deploys to Vercel; Studio deploys separately to a `*.sanity.studio` host the client will choose.

## Users

- **Prospective clients** in Bursa (Nilüfer) and online across Türkiye: adults, mothers with children, older adults, and people with health conditions who want an individual, sustainable nutrition plan. They arrive from Instagram or search, mostly on a phone, and decide whether to message or request an appointment.
- **The dietitian herself** as the single content editor: she updates services, blog posts, gallery, announcements and product teasers in Sanity Studio without a developer.

## Product Purpose

The personal practice site of Dyt. Elif Sude Özkan. It introduces who she is and how she works, lists her real services, publishes her writing, and turns interest into a WhatsApp message or an appointment request (an email to her inbox; she replies manually, nothing is booked automatically). Success: a visitor understands her approach within seconds and reaches out without friction; she can publish content herself.

## Positioning

A young, scientifically trained dietitian (Acıbadem University, Nutrition and Dietetics, English-medium, graduated July 2025) whose approach is evidence-based, sustainable and individual rather than prescriptive diet lists. Face-to-face in Nilüfer/Bursa and online. Clinical exposure from internships at Acıbadem hospitals, Gaziosmanpaşa Training and Research Physical Therapy Hospital and a private dietitian clinic.

## Operating Context

- Consultation flow: pre-consultation with anamnesis and anthropometric measurements, interpretation of blood tests and body composition analysis, an individual plan, regular follow-up.
- Groups served: adults, mother and child, geriatrics; nutrition planning for disease states.
- Contact channels: WhatsApp +90 533 016 72 78, Instagram @bursadiyetisyenelifsudeozkan, email info.elifsudeozkan@gmail.com (also the form recipient).
- Appointment requests are requests, not bookings. A DoktorTakvimi profile may be linked later if a real URL is provided.

## Capabilities and Constraints

- Routes: home, about, services (list and detail), blog (list and detail), gallery, announcements, products (`/urunler`, "coming soon" only), contact, appointment request, branded 404. `/admin` and `/studio` must be plain 404s.
- Products: schema exists for future product teasers, but the public page stays "coming soon" until the editor deliberately switches it; never cart, price, stock, checkout.
- Forms collect only name, email/phone, service preference, short message and consent. No health history, diagnosis or weight. No form database.
- Content revalidates through a signed Sanity webhook; publishing never needs a Git push.
- Undecided: Studio hostname, Resend sender domain, X/Twitter URL, DoktorTakvimi URL, final legal/KVKK text, professional photography.

## Brand Commitments

- Name as shown: **Dyt. Elif Sude Özkan**. Domain target: dytelifsudeozkan.com.
- Mood pinned by the brief: refined, premium, editorial, photo-led; easy to contact.
- Palette direction from the brief: deep forest green, dark olive, warm off-white and cream, dark ink text, a small bronze/taupe accent; a thin flat blue line reserved only for the top route-progress bar.
- An original wordmark plus a monogram that works at 16 px; no stock leaf, heart or fork icons.
- Voice: Turkish, short, warm and precise; no hype, no guarantees, no invented testimonials.

## Evidence on Hand

- CV content (education, experience, skills, languages) supplied by the client; usable as verified facts on the about page. Private CV fields (birth year, marital status, reference contacts) are not published.
- No professional photography yet; portraits and gallery images will be uploaded to Sanity by the client. Until then, designed empty states, never another person's photos.
- No testimonials, client counts, results, prices or certifications beyond the CV. Do not fabricate any of them.

## Product Principles

1. Truth before polish: every fact on the page is something the client has confirmed.
2. The photograph and the person lead; interface recedes.
3. Reaching out is always one obvious step away, never pushy.
4. The editor owns the content; layouts must look intentional when a CMS list is empty or long.
5. Health data is not collected; privacy is part of the service.

## Accessibility & Inclusion

WCAG 2.2 AA: visible focus, keyboard-operable menu, forms and gallery, reduced-motion support, 44 px touch targets, no horizontal overflow at 320 px, full Turkish glyph coverage (İ ı Ş ş Ğ ğ Ö ö Ü ü Ç ç).
