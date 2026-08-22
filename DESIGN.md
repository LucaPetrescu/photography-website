---
name: Luca Petrescu Photography
description: A minimal editorial photography portfolio with light and dark modes — elegant serif headlines, generous whitespace, and full-bleed imagery that commands attention. The photographs are the only argument; everything else steps back.
themes:
  dark:
    bg: "#0a0a0a"
    surface: "#141414"
    surface-elevated: "#1a1a1a"
    text: "#ffffff"
    text-soft: "#f5f5f5"
    text-muted: "#888888"
    text-subtle: "#666666"
    border: "#2a2a2a"
    border-subtle: "#333333"
    index-number: "#333333"
  light:
    bg: "#ffffff"
    surface: "#fafafa"
    surface-elevated: "#f5f5f5"
    text: "#0a0a0a"
    text-soft: "#1a1a1a"
    text-muted: "#666666"
    text-subtle: "#888888"
    border: "#e5e5e5"
    border-subtle: "#d4d4d4"
    index-number: "#e5e5e5"
colors:
  success-muted: "#22c55e"
  error-muted: "#ef4444"
typography:
  display:
    fontFamily: "Space Grotesk, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 8vw, 7rem)"
    fontWeight: 300
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Space Grotesk, -apple-system, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Space Grotesk, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 400
    lineHeight: 1.25
  body:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 300
    lineHeight: 1.7
  caption:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    color: "{colors.muted-gray}"
  label:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.15em"
  logo:
    fontFamily: "Inter, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.2em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    color: "{colors.muted-gray}"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "9999px"
components:
  button-primary:
    backgroundColor: "var(--text)"
    textColor: "var(--bg)"
    typography: "{typography.label}"
    rounded: "{rounded.sm}"
    height: "48px"
    padding: "0 32px"
  button-primary-hover:
    backgroundColor: "var(--text-soft)"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "var(--text)"
    typography: "{typography.body}"
    border: "1px solid var(--border-subtle)"
    rounded: "{rounded.sm}"
    padding: "12px 24px"
  button-ghost-hover:
    borderColor: "var(--text)"
  link-arrow:
    textColor: "var(--text)"
    typography: "{typography.body}"
    decoration: "none"
  link-arrow-hover:
    textDecoration: "underline"
    textUnderlineOffset: "4px"
  input-text:
    backgroundColor: "var(--surface-elevated)"
    textColor: "var(--text)"
    typography: "{typography.body}"
    border: "1px solid var(--border)"
    rounded: "{rounded.sm}"
    padding: "14px 16px"
    height: "48px"
  input-text-focus:
    borderColor: "var(--text-muted)"
---

# Design System: Luca Petrescu Photography

## Overview

**Creative North Star: "The Dark Gallery"**

This portfolio exists as a digital gallery space — a near-black void where photographs float luminous and untouched. The design philosophy borrows from museum exhibition spaces: walls recede into darkness, lighting is invisible, and the work commands complete attention. Unlike a light-mode portfolio that competes with the imagery, this system creates a theater where every photograph becomes a projected image in a darkened room.

**Reference:** hobby-photographer-template.lovable.app — an editorial photography portfolio with dark aesthetics, elegant serif typography, and full-bleed imagery.

**Key Characteristics:**

- Near-black canvas (`#0a0a0a`) that makes photographs luminous by contrast
- Technical, geometric sans-serif (Space Grotesk) for all display typography
- Clean, light-weight sans-serif (Inter 300) for body text
- Full-bleed, edge-to-edge imagery with no visible frames or borders
- Generous negative space — sections breathe, content never crowds
- Minimal navigation chrome; the site disappears behind the work
- Single-page feel with smooth scroll and subtle fade-in animations

## Colors & Theming

The site supports both **light** and **dark** modes. Each theme provides the same semantic tokens with inverted values, ensuring photographs remain the focal point in either mode.

### Theme Tokens

| Token | Dark Mode | Light Mode |
|-------|-----------|------------|
| `--bg` | `#0a0a0a` | `#ffffff` |
| `--surface` | `#141414` | `#fafafa` |
| `--surface-elevated` | `#1a1a1a` | `#f5f5f5` |
| `--text` | `#ffffff` | `#0a0a0a` |
| `--text-soft` | `#f5f5f5` | `#1a1a1a` |
| `--text-muted` | `#888888` | `#666666` |
| `--text-subtle` | `#666666` | `#888888` |
| `--border` | `#2a2a2a` | `#e5e5e5` |
| `--border-subtle` | `#333333` | `#d4d4d4` |
| `--index-number` | `#333333` | `#e5e5e5` |

### Feedback Colors (Shared)

- **Success Muted** (`#22c55e`): form success states only.
- **Error Muted** (`#ef4444`): form error states only.

### Theme Switching

The header includes a sun/moon toggle icon (☀/🌙) to switch between modes. Theme preference is:
1. Stored in `localStorage` as `theme: 'light' | 'dark'`
2. Falls back to system preference via `prefers-color-scheme`
3. Defaults to dark mode if no preference

**CSS implementation:**
```css
:root {
  color-scheme: dark light;
}

:root, [data-theme="dark"] {
  --bg: #0a0a0a;
  --surface: #141414;
  --text: #ffffff;
  /* ... other dark tokens */
}

[data-theme="light"] {
  --bg: #ffffff;
  --surface: #fafafa;
  --text: #0a0a0a;
  /* ... other light tokens */
}
```

### Named Rules

**The Consistent Canvas Rule.** In dark mode, the background is void-black; in light mode, it's pure white. No alternating bands or mixed sections within a single theme.

**The Two-Tone Rule.** Text is either primary (`--text`) or muted (`--text-muted`). Hierarchy comes from weight, size, and spacing — never from adding more color variants.

## Typography

**Display Font:** Space Grotesk (geometric sans-serif), with system sans fallback
**Body Font:** Inter (sans-serif, weight 300–400), with system sans fallback

**Character:** The typography pairing is technical and minimal — Space Grotesk is a geometric sans-serif with clean straight lines, sharp terminals, and mechanical precision. Its proportional spacing and open apertures create excellent readability at large sizes while feeling modern and editorial. Paired with Inter for body copy, the system is cohesive yet hierarchical. Display type uses light weight (300–400), never bold — confidence comes from scale, not weight.

**Google Fonts import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');
```

### Hierarchy

- **Display** (300, `clamp(3rem, 8vw, 7rem)`, line-height 0.95, tracking −0.02em): the photographer's name in the hero. Massive, elegant, breathing. Uses Space Grotesk Light for refined, thin strokes.
- **Headline** (400, `clamp(2rem, 4vw, 3.5rem)`, line-height 1.1): page and section titles — "Featured Projects", "About", "Get in Touch", "Portfolio". Uses Space Grotesk Regular.
- **Title** (400, 1.5rem, line-height 1.25): project titles on hover, card headings. Uses Space Grotesk Regular.
- **Body** (300, 1rem, line-height 1.7): running copy. The light weight keeps it from competing with imagery.
- **Caption** (400, 0.875rem, line-height 1.5, muted-gray): image captions, metadata, dates.
- **Label** (400, 0.75rem, tracking 0.15em, uppercase): navigation links, eyebrows, category tags.
- **Logo** (500, 0.875rem, tracking 0.2em, uppercase): the site wordmark — always uppercase, generously tracked.
- **Mono** (400, 0.8125rem, line-height 1.5, muted-gray): anything that counts or measures — gear specs, frame counters ("03 / 12"), price/duration info, photo metadata.

### Named Rules

**The Light Touch Rule.** Display and headline type never exceed font-weight 400. Boldness comes from size and space, not from weight. This keeps the typography feeling elegant rather than aggressive.

**The Eyebrow Rule.** Every page title has an eyebrow label above it (e.g., "Editorial & Commercial Photographer" above the name, "A selection of recent work" below "Featured Projects"). This secondary line is always caption-style muted gray.

**The Mono Rule.** Mono type is reserved for anything that counts or measures — frame counters, gear specs, price/duration values. Serif is reserved for anything that titles. Sans is reserved for anything meant to be read. No role borrows another's job.

## Layout

### Container

Content lives in a centered container with a `max-w-6xl` (1152px) width and responsive padding (`px-6` → `md:px-12` → `xl:px-20`). Edge-to-edge imagery breaks out of this container to span the full viewport width.

### Header

Fixed position, full-width, 64px tall. Logo (uppercase wordmark) left-aligned, navigation links right-aligned. Background is transparent by default, transitioning to `--surface` on scroll.

- **Logo style:** uppercase, Inter 500, letter-spacing 0.2em, `--text` color
- **Nav links:** uppercase label style (0.75rem, tracking 0.15em), `--text-muted` default, `--text` on hover/active
- **Active indicator:** `--text` color only — no underline, no background pill
- **Scroll behavior:** background fades to `--surface` with subtle `--border` bottom
- **Theme toggle:** sun icon (☀) in dark mode, moon icon (🌙) in light mode. Positioned after nav links.

```
[ LUCA PETRESCU ]                    [ Home  Portfolio  About  Contact  ☀ ]
```

### Hero

Full-viewport height (100vh), vertically centered content. The photographer's name in Display type, a subtitle/tagline below in caption style, and a scroll indicator at the bottom. Background is either a full-bleed photograph with dark overlay or the void-black canvas.

### Centered Text Block (Homepage)

Between hero and featured projects, a centered text section introduces the photographer's work. Headline-size title ("About My Work"), body copy below (max-width 680px, centered), and an arrow link at the bottom ("Learn More About Me →"). No background change — sits on the void.

### Featured Projects (Homepage)

A 2-column grid of full-bleed project thumbnails. Images span edge-to-edge with a minimal gap (2-4px) between them. No borders, no visible grid lines — the gap itself creates separation. On hover, a dark gradient overlay fades in from the bottom with the project title and category.

```
┌──────────────────────┬──────────────────────┐
│                      │                      │
│   [Image - Badlands] │   [Image - Urban]    │
│                      │        ┌─────────────┤
│                      │        │ Urban Port. │
│                      │        │ Portraits   │
└──────────────────────┴────────┴─────────────┘
```

### Portfolio Grid

A 3-column masonry-style grid (2 columns on tablet, 1 on mobile). Images maintain their natural aspect ratio. Minimal gap (8–12px) between items. On hover: subtle scale-up (1.02) and the same gradient + title overlay.

### About Page

**Hero area:** Full-width section with centered Headline-size title ("About") and eyebrow subtitle ("Photographer & Visual Storyteller"). Generous vertical padding (120px+).

**Bio section:** Split layout below:
- **Left (40%):** Large portrait image, natural aspect ratio, no border
- **Right (60%):** Name as Title (Space Grotesk, 2rem), subtitle in Caption style ("Editorial & Commercial Photographer"), then body copy paragraphs

**Credentials mentioned in bio:** Client names (Vogue, NYT, National Geographic), awards, years of experience. Written conversationally, not as a list.

### Contact Page

Split layout: contact form on the left, contact information on the right. The form includes name, email, project type dropdown, and message textarea. Contact info shows email, phone, and location with simple icons.

### Gear Page ("The Kit")

The gear page showcases equipment with the signature index-number motif, adapted for dark mode.

**Hero area:**
- Eyebrow: "Gear I Use" in label style, muted-gray
- Headline: "The kit." in Headline size (Space Grotesk)
- Intro copy explaining the philosophy (light, weather-sealed setup)

**Camera Annotation Card:**
- Large hero image of the primary camera body
- Annotation callouts pointing to key features
- Dark surface background (`surface-dark`) with subtle border

**Gear Sections:**
Each gear category (Bodies, Lenses, Accessories) displays as:
- Category header with oversized index number (01, 02, 03)
- Index numbers: Display-weight Space Grotesk, `--index-number` color (appears as watermark)
- List of items with name, specs in mono/caption style
- Subtle top border separating each section

**Disclaimer block:**
- Border container with note about no affiliate links
- `surface-elevated` background, subtle border

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  01                        [Camera Body Image]  │
│  ── Bodies                                      │
│                                                 │
│  Nikon D750                                     │
│  Full-frame · 24.3 MP · Weather-sealed          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Services Page ("What I Can Shoot For You")

The services page uses the same index-number motif for service offerings.

**Hero area:**
- Eyebrow: "Services" in label style, muted-gray
- Headline: "What I can shoot for you." in Headline size
- Intro copy: "Three ways to work together — pick the one that fits"

**Service Cards:**
Each service displays with:
- Oversized index number (01, 02, 03) in `border-subtle` color
- Service name in Title style (Space Grotesk)
- Description in body style
- Price/duration info in mono style
- Optional bullet points for what's included
- Subtle top border separating each service

**CTA Section:**
- Top border divider
- Body copy: "Ready to book, or still deciding?"
- Primary button: "Get in touch →" (white background, void-black text)

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  01                                             │
│  ── Private Sessions                            │
│                                                 │
│  One-on-one portrait or lifestyle shoots        │
│  tailored to your vision.                       │
│                                                 │
│  From €350 · 2-3 hours                          │
│                                                 │
└─────────────────────────────────────────────────┘
```

### Footer

Minimal, 64px tall, centered on the void-black background.

- **Left:** Copyright text in caption style, muted-gray ("© 2026 Luca Petrescu. All rights reserved.")
- **Right:** Social icons (Instagram, Behance, LinkedIn) as 20x20 muted-gray icons, 16px gap between them, pure white on hover
- **Divider:** subtle top border (`border-subtle`) spanning the content width
- **Vertical spacing:** 32px padding top and bottom

## Elevation & Depth

### Philosophy

The page is a void. Nothing floats above it except intentional overlays (lightbox, mobile menu). Depth comes from luminance contrast (bright imagery on dark canvas), not from shadows.

### Shadows

Shadows are used sparingly:

- **None at rest.** Cards, buttons, and surfaces have no shadow by default.
- **Subtle lift** (`box-shadow: 0 4px 20px rgba(0,0,0,0.4)`): mobile drawer, dropdowns.
- **Deep float** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5)`): lightbox overlay.

### Named Rules

**The Grounded-by-Default Rule.** If it's on the page, it sits flat on the void. If it's floating above the page (overlay, drawer, lightbox), it gets a shadow. There is no ambient shadow on cards or buttons.

## Animation & Motion

### Scroll Animations

Content fades in and slides up slightly as it enters the viewport. Stagger animation for grid items (each item delayed by 50–100ms from the previous).

- Opacity: 0 → 1
- Transform: translateY(20px) → translateY(0)
- Duration: 600ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

### Hover States

- **Images:** scale(1.02) over 500ms with ease-out
- **Links/Buttons:** opacity shift or underline appearance over 200ms
- **Project overlays:** opacity 0 → 1 for the gradient and text

### Page Transitions

Smooth scroll between sections. Optional: fade transition between pages if using client-side navigation.

## Components

### Navigation

- **Desktop:** fixed header with transparent background (→ surface-dark on scroll). Links in label style, muted gray by default, pure white on hover/active. Current page indicated by white color, no underline.
- **Mobile:** hamburger icon opens a full-height drawer from the right. Links stack vertically in large type.

### Buttons

- **Primary** (`button-primary`): white background, void-black text, minimal radius (4px), generous padding. Used for main CTAs. On hover: slight opacity reduction to soft-white.
- **Ghost** (`button-ghost`): transparent background, white text, subtle border. On hover: border brightens to white.

### Links

- **Arrow Link** (`link-arrow`): text link followed by a → arrow. No underline at rest. On hover: underline appears with 4px offset. Used for "View All Projects →", "Learn More About Me →".
- **Inline Link:** underlined by default, pure white, hover reduces opacity slightly.

### Form Inputs

- **Text Input:** dark elevated background (`surface-elevated`), subtle border (`border-dark`), white text. On focus: border shifts to muted gray. Placeholder in subtle-gray.
- **Textarea:** same styling, min-height 120px.
- **Select/Dropdown:** custom styled to match inputs, with chevron icon.
- **Labels:** caption style, muted-gray, positioned above input with 8px gap.
- **Form layout:** "Send a Message" headline above, body copy explaining response time ("Fill out the form below and I'll get back to you within 24-48 hours. Currently booking for Q2 2025.").

### Project Cards (Hover Overlay)

On the portfolio grid and featured projects, each image has an invisible overlay that appears on hover:

```css
.project-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
  opacity: 0;
  transition: opacity 400ms ease;
}
.project-card:hover .project-overlay {
  opacity: 1;
}
```

**Overlay content positioning:**
- Title in Title style (Space Grotesk, 1.5rem), pure white
- Category + year in Caption style (Inter, 0.875rem), muted-gray
- Positioned bottom-left with 24px padding
- Category format: "Portraits · 2024"

### Contact Info Block

"Contact Information" headline with intro copy. Each contact method displays as icon + label + value:

- **Icon container:** 40x40px rounded square with `surface-elevated` background, icon centered in muted-gray
- **Label:** caption style, muted-gray (e.g., "Email", "Phone", "Location")
- **Value:** body style, pure white (e.g., "hello@lucapetrescu.com", "+1 (555) 123-4567", "Barcelona, Spain")
- **Spacing:** 24px vertical gap between items

```
┌────┐
│ ✉  │  Email
└────┘  hello@lucapetrescu.com

┌────┐
│ ☎  │  Phone
└────┘  +1 (555) 123-4567

┌────┐
│ 📍 │  Location
└────┘  Barcelona, Spain
```

### Signature Component: The Index Number

Gear and Service list items lead with an oversized numeral (01, 02, 03) — the contact-sheet's frame numbering made literal.

**Styling:**
- Font: Space Grotesk, Display size (`clamp(3rem, 8vw, 5rem)`)
- Weight: 300 (light weight, never bold)
- Color: `--index-number` token — reads as a watermark, not primary content
- Position: left-aligned, with the section title inline or below
- Letter-spacing: -0.02em for tight numeral pairs

**Usage:**
- Use for any **sequential list** of offerings: services, gear categories, project series
- Never use for unordered lists or navigation
- The number anchors the eye; content flows to the right or below

```
01
── Private Sessions

02
── Event Coverage

03
── Commercial Work
```

**Theme adaptation:** The `--index-number` token automatically adjusts:
- Dark mode: `#333333` (light watermark on dark)
- Light mode: `#e5e5e5` (dark watermark on light)

Both maintain the same visual weight — visible but recessive.

## Do's and Don'ts

### Do:

- **Do** let photographs bleed edge-to-edge whenever possible. The grid is invisible; the work fills the space.
- **Do** keep typography light-weight (400 max for display). Elegance, not aggression.
- **Do** use generous whitespace between sections. Each section should breathe.
- **Do** apply hover overlays with gradient + title on all portfolio imagery.
- **Do** maintain the void-black background throughout. No light sections.
- **Do** use the arrow link pattern ("View All Projects →") for secondary navigation.
- **Do** use the oversized faint index-number motif for any sequential list of offerings (services, gear, future project lists).
- **Do** give every interactive control a felt, tactile response — hover darken, press translate, visible focus ring.

### Don't:

- **Don't** add visible borders or frames around photographs. The image edge is the frame.
- **Don't** use mono type for anything except counting/measuring (specs, prices, counters).
- **Don't** use bold (600+) weights for display type. Keep it light.
- **Don't** introduce colored accents. This is a pure monochrome system — white, gray, black.
- **Don't** add shadows to resting elements. Shadow means floating.
- **Don't** use card backgrounds or elevated surfaces for project thumbnails. Images sit directly on the void.
- **Don't** crowd sections. If it feels tight, add more space.

## Reference Screenshots

The following screenshots from hobby-photographer-template.lovable.app inform this design system:

1. **Hero:** Full-viewport with photographer portrait, large serif name centered, tagline below, scroll indicator
2. **About My Work:** Centered text section on void background
3. **Featured Projects:** 2-column edge-to-edge image grid with hover overlays
4. **Project Grid:** Continued 2-column layout, "View All Projects →" link
5. **Portfolio Page:** 3-column masonry grid, page title with eyebrow
6. **Portfolio Grid Detail:** Various aspect ratios, minimal gaps
7. **About Page:** Split layout, portrait left, bio right, elegant serif title
8. **Contact Page:** Split layout, form left, contact info right

These screenshots are stored in the project's Design Files for reference.
