---
name: Dyt. Elif Sude Özkan
description: Herbaryum Föyü. Every photograph and fact mounted like a herbarium specimen on a deep-green genus folder.
colors:
  folder: "#204b38"
  folder-deep: "#193d2d"
  olive: "#2c321f"
  paper: "#f6f3ec"
  sheet: "#fffdf8"
  ink: "#202b24"
  ink-soft: "#4a564d"
  sage: "#c9d5c8"
  bronze: "#aa9574"
  bronze-ink: "#7a6545"
  linen: "#e6dcc7"
  route: "#4d79b5"
  paper-shade: "#ebe6da"
  destructive: "#a3392b"
typography:
  display:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.6rem, 1.15rem + 4.3vw, 4.75rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' auto"
  title:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.35rem + 2.8vw, 3.75rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "clamp(2rem, 1.35rem + 2.6vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  entry:
    fontFamily: "Bodoni Moda, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  lead:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Manrope, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.43
    fontFeature: "'tnum' 1"
rounded:
  sheet: "0px"
  sm: "0.075rem"
  lg: "0.125rem"
  stamp: "9999px"
spacing:
  gutter: "16px"
  gutter-sm: "32px"
  gutter-lg: "48px"
  rail: "40px"
  rail-xl: "56px"
  section: "80px"
  section-lg: "112px"
  container: "1344px"
components:
  button-primary:
    backgroundColor: "{colors.folder}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "0 24px"
  button-primary-on-folder:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.folder}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "0 24px"
  button-primary-lg:
    backgroundColor: "{colors.folder}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    height: "56px"
    padding: "0 28px"
  button-outline:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "0 24px"
  input:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "0 14px"
  specimen-sheet:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sheet}"
    padding: "16px"
  specimen-label:
    backgroundColor: "{colors.sheet}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  floating-whatsapp:
    backgroundColor: "{colors.folder}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    size: "56px"
---

# Design System: Dyt. Elif Sude Özkan

## Overview

**Creative North Star: "Herbaryum Föyü"**

The site is a herbarium folio. Whole regions are fields of genus-folder green or dark olive; on them, cream sheets are mounted flat, photographs are held by strips of linen tape, and every verified fact sits on a printed determination label of thin ink rules and small tabular sans. The interface recedes so the photograph and the person lead; what remains of it is drawn the way an archivist would draw it: rules, labels, stamps, tape.

Depth is physical but flat. A sheet overlaps a folder, tape overlaps a sheet, and that overlap is the only elevation the world knows. Sections do not fade into each other; they change by a hard, full-width colour cut. Structure hangs on one off-centre mounting rail, a hairline about 42% from the left on large screens, so headings sit to its left and their content to its right all the way down the page.

The type is a high-contrast didone (Bodoni Moda, optical sizing on) against a calm grotesk (Manrope). Motion is sparse and archival: a sheet settles in, tape presses on, a thin blue line crosses the top edge during navigation. Navigation state is drawn as rule weight, never as colour.

**Key Characteristics:**
- Committed green: folder and olive fields carry roughly 40% of any page.
- Cream sheets, linen tape, ruled labels; no cards, no shadows, no gradients.
- One off-centre rail (11fr / 15fr) shared by every section.
- Didone display at weight 400, grotesk text, tabular figures on every label.
- Near-square corners everywhere except the circular accession stamp.
- Blue exists only as the route-progress line.

## Colors

A deep, botanical palette: two dark greens that own regions, two creams that carry content, ink for text, and bronze kept to ornament.

### Primary
- **Genus Folder Green** (folder): the dominant field. Hero, page intros, header, closing CTA, mobile menu and gallery band are all folder surfaces. On paper it is the primary button fill, the focus ring, the selection colour and the link colour in prose.
- **Deep Folder** (folder-deep): the pressed, darker reading of the folder for contrast within a green field.

### Secondary
- **Herbarium Olive** (olive): the second field. Used for the about band on the home page and the footer, so the page closes on a different material from the one it opened on.

### Tertiary
- **Pressed Bronze** (bronze): decoration only. The accession stamp ring and the monogram's accent dots (`--logo-accent`). Never text.
- **Bronze Ink** (bronze-ink): the text-safe bronze, for the rare case bronze must be read.
- **Route Blue** (route): the 3px route-progress line at the top edge during internal navigation. Nowhere else.

### Neutral
- **Folio Paper** (paper): the default page surface and the surface of every paper band; also the matte inside an empty photo frame.
- **Mounting Sheet** (sheet): the brighter cream of a mounted sheet, labels, inputs, dialogs and popovers. Sheet on paper or sheet on folder is how a mount reads.
- **Specimen Ink** (ink): all text on paper and sheet; the heavy 2px top rule of labels and ledgers.
- **Faded Ink** (ink-soft): secondary text, label terms, meta lines and leads on paper.
- **Pressed Sage** (sage): the soft text colour on folder and olive (leads, footer headings, meta).
- **Archival Linen** (linen): the tape. Applied at 86% with a faint woven texture.
- **Paper Shade** (paper-shade): secondary and muted fills on paper (secondary button, hover fills).
- **Rules**: never a fixed grey. On paper a rule is ink at 18% (inputs at 32%); on folder and olive it is paper at 22–24% (inputs at 40%).

### Named Rules
**The Re-pointing Rule.** Colour is never assigned per component. A region declares a surface (paper, folder or olive) and the semantic tokens (surface, on-surface, on-surface-soft, rule, primary, ring) re-point beneath it, so buttons, rules, focus rings and text adapt without a single conditional class. On folder, the primary button inverts to paper with folder text.

**The One Blue Line Rule.** Route blue appears only in the route-progress bar. It is not a link colour, not an accent, not a state.

**The Bronze Is Ornament Rule.** Bronze marks the stamp and the monogram dots. Any readable bronze uses bronze-ink.

## Typography

**Display Font:** Bodoni Moda, optical sizing axis on (with Georgia, serif)
**Body Font:** Manrope (with ui-sans-serif, system-ui)

**Character:** A didone with hairline contrast that reads like the printed title of a plate, set against a quiet, round grotesk that reads like a label typed beneath it. Display never goes bold; the contrast does the work. Both fonts load latin-ext for full Turkish coverage.

### Hierarchy
- **Display** (400, clamp 2.6rem–4.75rem, 1.02, -0.02em): the one hero line of a page and short page-intro titles.
- **Title** (400, clamp 2.25rem–3.75rem, 1.06, -0.015em): page-intro titles that come from the CMS and may run long (posts, services).
- **Headline** (400, clamp 2rem–3.5rem, 1.08, -0.015em): section headings, left of the rail.
- **Entry** (400, 1.5rem → 1.875rem from sm, tight leading): ledger entry titles, mobile menu items, label titles (1.25rem).
- **Body** (400, 1.0625rem, 1.625): running text; editorial prose at 1.75 leading and 68ch max.
- **Lead** (400, 1.125rem → 1.25rem, relaxed): the paragraph right of the rail in intros and the closing CTA, in on-surface-soft, max 42rem.
- **Label** (500 for values, 400 for terms, 0.875rem, tabular figures): specimen labels, meta lines, footer headings (600). Sentence case, no tracking.

### Named Rules
**The Plate Title Rule.** Every heading is Bodoni Moda at weight 400 with balanced wrapping. Hierarchy comes from size and position against the rail, never from weight.

**The Tabular Label Rule.** Dates, phone numbers, years and every label row use tabular figures.

## Layout

One container for the whole site (max 1344px, side gutters 16px / 32px from sm / 48px from lg) so the rail lines up from header to footer. Inside it, the **Railed** grid splits content 11fr / 15fr from lg: the aside (headings, wordmark) on the left with 40px (56px at xl) of right padding, the main column on the right behind a hairline left border in the surface's rule colour with matching left padding. Below lg the grid collapses to one column and the rail disappears; the aside simply stacks above its content with 24–32px between.

Sections are full-width Folio bands that alternate materials with hard cuts: folder hero, paper, olive, paper, folder gallery, paper, folder closing CTA, olive footer. Section rhythm is 80px vertical (112px from lg); page intros are shorter (48/56px, 80px from lg). The phone hero shows headline and actions first with the taped sheet directly below, both within the first two screens.

Ledgers and labels carry the density: rows of 28px (36px from lg) vertical padding in ledgers, 8–10px in labels with a 6.5rem term column. Lead and prose measures are capped (42rem lead, 68ch prose).

### Named Rules
**The Mounting Rail Rule.** Every section with a heading hangs on the same 11fr / 15fr rail. Headings live left of the hairline; their content lives right of it.

**The Hard Cut Rule.** Sections change material at a straight full-width edge. No fades, no overlapping wave dividers, no gradient transitions.

## Elevation & Depth

The system is flat. There are no box-shadows and no gradients on any surface; shadcn's default shadows are explicitly removed on the sheet menu and gallery dialog. Depth is conveyed only by overlap of flat materials: a sheet sits on a folder, tape crosses the sheet's corner at an angle and extends past its edge, the empty-plate stamp is pressed into paper. Hover depth is replaced by dimming: in the gallery, hovering or focusing one sheet drops the others to 60% opacity.

### Named Rules
**The Flat Overlap Rule.** If something needs to read as raised, overlap it on a different material. Never add a shadow.

## Shapes

Near-square everywhere. Interactive controls (buttons, inputs, the floating WhatsApp button) take a barely-there 1.2px corner, the radius of a trimmed sheet rather than a pill. Sheets, labels, dialogs and the mobile menu are fully square. The one round form is the herbarium accession stamp: a 2px bronze ring with an inner outline inset 8px, holding the monogram, used as the empty state of every photo frame. Tape strips are 24px tall, 80–96px long, rotated ±28–32° at corners or -2° centred on top.

Rules are the main line work: a 2px ink (or on-surface) rule opens every label and ledger; 1px rules at 15–18% separate rows.

## Components

### Buttons
Calm, sized for touch, cut square like card stock.
- **Shape:** near-square (1.2px radius), 1px transparent border.
- **Primary:** surface primary fill. Folder with paper text on paper; paper with folder (or olive) text on green fields. Default 48px tall with 24px sides at 15px text; sm 44px; lg 56px with 28px sides at 16px; icon 44px square.
- **Hover / Focus:** fill steps to 88% on hover over 200ms (colour properties only); pressed state translates 1px down; focus is a 2px outline in the ring colour offset 3px. Disabled at 55% opacity.
- **Outline:** transparent with a current-colour border at 45% that goes solid on hover with a 6% tint. The secondary action beside a primary (appointment request beside WhatsApp).
- **Link:** text with a 40%-opacity underline offset 0.3em that goes solid on hover; tertiary actions such as Instagram.

### Inputs / Fields
- **Style:** sheet fill, ink text, 1px rule border at 32% ink, 1.2px radius, 48px tall, 14px horizontal padding, 16px text (no zoom on iOS).
- **Focus:** border turns to the ring colour with a soft 3px ring at 50%.
- **Error / Disabled:** destructive border and 20% destructive ring; disabled at 50% opacity.

### Navigation
- **Header:** a folder surface, 72px tall (80px from lg), closed by a hairline rule. Wordmark left, nav centre (from lg), a small primary "Randevu talebi" button and the menu trigger right.
- **Desktop links:** 15px Manrope at 85% on-surface. Hover draws a 1px rule from the left under the word (300ms expo-out). The current page holds a 2px rule. Rule weight, not colour, marks state.
- **Mobile:** a full-width right-side sheet on folder, no shadow. Items are 30px Bodoni Moda in 56px rows separated by rules; the current page gets a 2px underline. The two actions sit at the foot as lg buttons.
- **Route progress:** a 3px route-blue line fixed to the top edge, scaling across on internal navigation (scaleX to 0.9 over 8s, then completes in 180ms and fades). Reduced motion shows it without travel.

### Mounted Photo (signature)
A sheet with 12px (16px from sm) of margin, two linen tapes at the top corners by default, and a paper-matted frame at a fixed aspect. Source priority: the Sanity upload, the client's own local photo, then the bronze accession stamp on paper. Never placeholder text, never another person's photo.

### Specimen Label (signature)
The printed determination label: 2px ink rule on top, a Bodoni title row, then a two-column definition list (6.5rem term column in ink-soft, value in medium weight) with hairlines between rows and tabular figures. Carries verified facts only.

### Ledger (signature)
A register of entries for services, posts and announcements: 2px on-surface rule on top, hairline between rows, the whole row is one link. Optional thumbnail column (5rem, 7rem from sm), meta line in on-surface-soft, Bodoni title that underlines on hover, and a thin 1.25-stroke arrow that nudges up-right on hover (300ms expo-out).

### Closing CTA
The same close on every page: a folder band on the rail with a headline left and, right, a lead plus WhatsApp (primary, lg), appointment request (outline, lg) and Instagram (link).

### Floating WhatsApp
A 56px folder square with a 1px paper ring, fixed bottom-right. It steps aside (fades and drops 12px) whenever a page's own WhatsApp action or the footer is in view, so it never doubles a visible action.

### Motion
One authored entrance: the hero sheet settles from a 12px offset at 85% opacity over 900ms, then its tapes press on (scale from 1.08, 520ms, 420ms and 500ms delays). All easing is expo-out (cubic-bezier(0.16, 1, 0.3, 1)); no bounce. Only transform and opacity animate, and everything respects reduced motion.

## Do's and Don'ts

### Do:
- **Do** declare a surface on every full-width band and let the semantic tokens re-point beneath it.
- **Do** hang headings left of the 11fr / 15fr rail and content right of it, inside the shared 1344px container.
- **Do** mount photographs on a sheet with linen tape, and use the bronze stamp as the designed empty state.
- **Do** present verified facts as a specimen label or ledger: 2px top rule, hairline rows, tabular figures.
- **Do** mark navigation state with rule weight (1px hover, 2px current).
- **Do** keep every touch target at 44px or more (buttons 44/48/56px, footer links 44px rows, menu rows 56px).
- **Do** animate only transform and opacity with the expo-out curve, and keep a reduced-motion path.

### Don't:
- **Don't** add box-shadows, drop shadows or gradients to any surface; depth is flat overlap only.
- **Don't** fade or blend between sections; change material with a hard full-width cut.
- **Don't** use route blue anywhere except the route-progress line.
- **Don't** set bronze as readable text; use bronze-ink.
- **Don't** set Bodoni Moda bold; hierarchy is size and position.
- **Don't** round controls beyond the near-square corner or use pills; the only circle is the accession stamp.
- **Don't** fill an empty photo frame with placeholder text, stock imagery or someone else's photo.
