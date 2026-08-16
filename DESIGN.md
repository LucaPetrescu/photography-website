---
name: Luca Petrescu Photography
description: A monochrome, editorial photography portfolio built like a contact sheet — hairline rules, serif headlines, mono frame numbers, and the photographs supplying the only color in the room.
colors:
  ink-black: "#111111"
  accent-hover: "#000000"
  paper-white: "#ffffff"
  surface-muted: "#f5f5f5"
  accent-subtle: "#f0f0f0"
  hairline-grey: "#888888"
  hairline-border: "#e8e8e8"
  muted-forest: "#2d6a4f"
  muted-clay: "#b23a2e"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "2rem"
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    typography: "{typography.label}"
    rounded: "0"
    height: "48px"
    padding: "0 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-form-submit:
    backgroundColor: "{colors.ink-black}"
    textColor: "{colors.paper-white}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    height: "44px"
    padding: "0 24px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-black}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  input-text:
    backgroundColor: "{colors.paper-white}"
    textColor: "{colors.ink-black}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
    height: "44px"
---

# Design System: Luca Petrescu Photography

## Overview

**Creative North Star: "The Contact Sheet"**

This is a portfolio that behaves like a darkroom proof sheet, not a marketing site wearing photographs. Every surface is quiet and restrained on purpose: negative space, hairline rules, and a strict grayscale palette exist only to get out of the way of the photography, which is the entire argument. Where the system does speak in its own voice, it borrows the vocabulary of the contact sheet itself — oversized faint frame numbers, mono-spaced technical labels, thin dividers instead of boxed cards.

Confirmed rejection: no stock photography, no illustration, no placeholder people, anywhere. The only imagery this system ever shows is real work from `public/assets`.

**Key Characteristics:**
- Monochrome ink-on-white palette; the photography supplies all the color
- Hairline (1px) rules do all structural separation — no boxed cards, no shadow at rest
- Serif display type (Fraunces) for anything that titles, a quiet sans (Inter) for anything read, mono (Geist Mono) for anything counted or measured
- A recurring oversized, faint index-number motif (01, 02, 03) lifted straight from contact-sheet frame numbering
- Deliberate, tactile controls — visible press states and firm contrast on anything interactive, even though the palette never leaves grayscale
- Real photography only, never stock or illustrated imagery

## Colors

Strictly monochrome: one ink color carries every role from body text to primary accent to focus ring. Two muted, desaturated colors exist solely for system feedback and appear nowhere else.

### Primary
- **Ink Black** (#111111): the only hue in the system. Body text, headings, the sole accent color, primary buttons, active nav state, focus outlines. On hover/press it deepens to **Accent Hover** (#000000) — pure black — rather than shifting hue.

### Neutral
- **Paper White** (#ffffff): page background and surface color.
- **Soft Surface** (#f5f5f5): subtle section backgrounds where paper white needs a whisper of separation (e.g. image placeholders before load).
- **Accent Subtle** (#f0f0f0): the wash behind notice/success panels — an ink tint, not a colored one.
- **Hairline Grey** (#888888): secondary/muted text — captions, metadata, inactive nav links.
- **Hairline Border** (#e8e8e8): every divider, every border, everywhere. This one value does the entire system's structural separation.
- **Muted Forest** (#2d6a4f): success feedback only (form success icon/border tint).
- **Muted Clay** (#b23a2e): error feedback only (form error text/border/focus ring).

### Named Rules
**The One Ink Rule.** There is exactly one hue in this system: near-black. Primary, accent, text, and focus rings all share the identical value. Contrast comes from value and space, never from a second hue. Muted Forest and Muted Clay are the only two moments any color appears, and only in their exact semantic role — never as a background flood, never decoratively.

## Typography

**Display Font:** Fraunces (serif, optical-size axis), with Georgia/serif fallback
**Body Font:** Inter, with system sans-serif fallback
**Label/Mono Font:** Geist Mono, with ui-monospace fallback

**Character:** A high-contrast serif for anything that titles a page or section, paired against a quiet, workmanlike sans for everything read — the same pairing a fine-art print run and its accompanying documentation would use.

### Hierarchy
- **Display** (600, `clamp(2.5rem, 5vw, 4rem)`, line-height 1.05, letter-spacing −0.02em): page-level h1s — "The kit.", "What I can shoot for you."
- **Headline** (600, 2rem, line-height 1.15, letter-spacing −0.015em): section-level h1s on secondary pages.
- **Title** (600, 1.5rem, line-height 1.25, letter-spacing −0.01em): h2s within a page — gear category headers, card titles.
- **Body** (400, 1rem, line-height 1.65): running copy. A larger 1.0625rem/1.7 variant carries intro paragraphs and lead-ins; a smaller 0.875rem/1.5 variant carries secondary copy and captions. Prose max-width is 68ch.
- **Label** (500, 0.75rem, letter-spacing 0.1em, uppercase): the eyebrow above every page heading ("Gallery", "Services", "Contact") and small UI labels.
- **Mono** (400, 0.8125rem, line-height 1.5): anything that counts or measures — the lightbox frame counter ("03 / 12"), gear spec key/value rows, photo metadata.

### Named Rules
**The Contact Sheet Rule.** Mono type is reserved for anything that counts or measures. Serif is reserved for anything that titles. Sans is reserved for anything meant to be read start to finish. No role ever borrows another's job.

## Layout

Content lives in a `max-w-7xl` container with responsive gutters (`px-5` → `md:px-8` → `xl:px-16`); the header and footer alone span a slightly wider 1440px band. The header is a fixed, 56px-tall solid white bar with a single hairline bottom border — it never goes transparent or floats over content.

The gallery and homepage photo wall use a masonry layout built on native CSS `columns` (2 on mobile, 3–4 on larger screens, 12px gutters) rather than a fixed grid, so photographs keep their natural aspect ratio instead of being cropped to a uniform tile. Section rhythm is generous and consistent: `pt-12` above a heading block, `pb-16` to `pb-24` below the content that follows. Cards and list items stagger in on scroll with a per-item delay, never all at once.

## Elevation & Depth

Flat by default. Nothing at rest — a card, a button, a nav bar — carries a shadow; separation between regions comes entirely from hairline borders and whitespace. Shadow is reserved for things that are genuinely floating above the page: the lightbox image, the mobile navigation drawer, the focus-visible skip-link. Two shadow steps exist for that purpose:

### Shadow Vocabulary
- **Ambient** (`box-shadow: 0 1px 2px rgba(0,0,0,0.04)`): the barest lift, used behind the skip-link when it appears on focus.
- **Floating** (`box-shadow: 0 24px 60px -12px rgba(0,0,0,0.25)`): the lightbox's full-size image and the mobile drawer — anything that sits in its own layer above the page.

### Named Rules
**The Grounded-by-Default Rule.** If it's part of the page, it's flat. If it's floating above the page (an overlay, a drawer, a lightbox), it gets a shadow. There is no in-between state.

## Shapes

Two coexisting form languages, applied by role rather than by feel:

- **The Sharp Frame Rule.** Photography and every primary, nav-level call-to-action ("Contact", "Get in touch") stay perfectly square — zero radius. The grid is the ornament; it doesn't need rounding to feel considered.
- Rounding is reserved for **in-context interactive controls**: form inputs and the in-form submit button use an 8px radius (`rounded-md`), notice/success panels use 12px (`rounded-lg`), and fully circular affordances (icon buttons, the success checkmark badge, lightbox nav/close buttons) use a full radius.
- **The Hairline Rule.** A single 1px `hairline-border` (#e8e8e8) line does all structural separation — between header and content, between list rows, between sections. There are no boxed cards with their own background at rest.

## Components

Controls are deliberate and tactile, not decorative: visible hover/press feedback, a firm focus ring, and real state changes — even though the palette never leaves grayscale.

### Buttons
Two distinct primary treatments exist by context, and the difference is intentional, not an inconsistency to resolve:
- **Nav-level primary** (`button-primary`): Ink Black background, white text, **zero radius** (the Sharp Frame Rule), 48px tall. Used for the site's top-level calls to action — "Contact" in the mobile drawer, "Get in touch" on Services. Hover deepens to `accent-hover` (#000000).
- **Form-submit primary** (`button-form-submit`): identical Ink Black/white pairing, but **8px radius** — because it lives inside a form alongside rounded inputs, not in the global chrome. Press gives a 1px translate-down; disabled drops to 55% opacity.
- **Ghost/secondary** (`button-ghost`): transparent background, Ink Black text, hairline border, 8px radius. Hover darkens the border to full ink. Used for de-emphasized actions ("Back to the gallery").

### Inputs / Fields
- **Style:** white background, hairline border, 8px radius, 44px minimum height.
- **Focus:** border shifts to Ink Black and a soft 3px ink-tinted glow appears (`color-mix` at 18% opacity) — no color change, just intensity.
- **Error:** border and focus glow switch to Muted Clay; an inline message with an alert icon appears below the field.

### Navigation
- **Desktop header:** fixed, 56px, solid white, hairline bottom border. Links are Hairline Grey by default, Ink Black when active or hovered — no underline, no pill background.
- **Mobile:** a full-height slide-in drawer (Radix Dialog) from the right, with a large-type link list and a full-width, zero-radius black CTA pinned at the bottom.
- **Lightbox controls:** circular (full radius), semi-transparent black icon buttons with a hairline white border — the one place in the system where controls sit directly on top of imagery rather than on the paper-white page.

### Signature Component: The Index Number
Gear and Service list items lead with an oversized numeral (01, 02, 03) set in Display-weight Fraunces, colored at the Hairline Border tint so it reads as a watermark rather than content. It's the contact-sheet's frame numbering made literal, and it's the single most recognizable device in the system — use it for any sequential list of offerings, never for a list with no inherent order.

## Do's and Don'ts

### Do:
- **Do** use the oversized faint index-number motif for any sequential list of offerings (services, gear, future project lists).
- **Do** let a single hairline border (`hairline-border`, 1px) do the section-separation work instead of card backgrounds or shadows.
- **Do** give every interactive control a felt, tactile response — hover darken, press translate, visible focus ring — even though the palette stays grayscale. Restraint in color is not permission to be inert.
- **Do** reserve mono type strictly for things that count or measure (frame counters, spec values, metadata).

### Don't:
- **Don't** introduce a second hue as a persistent UI color. Muted Forest and Muted Clay are reserved for their exact semantic moment only.
- **Don't** add a shadow to anything at rest. Shadow means "this is floating above the page" — reserve it for overlays, drawers, and the lightbox.
- **Don't** round the corners of a nav-level primary CTA. That treatment is reserved for in-form controls only (The Sharp Frame Rule).
- **Don't** use stock photography, illustration, or placeholder people anywhere. Only real photographs from `public/assets`.
