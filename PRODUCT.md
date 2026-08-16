# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences share this portfolio:

- **Prospective clients** deciding whether to book Luca for a private session, an event, or a custom shoot — they browse the gallery and Services page, then reach out via the contact form.
- **Industry peers and press** evaluating the work itself (craft, range, credibility) rather than booking anything.

## Product Purpose

A photography portfolio and booking-inquiry site for Luca Petrescu. It showcases work across private sessions, events, and personalized/custom shoots, and converts visitor interest into a direct email inquiry. Success is a qualified contact-form submission (job request) or an Instagram follow/DM.

## Positioning

Versatility with a direct, personal relationship: one photographer covering private sessions, events, and bespoke offers, with no studio or agency layer between the client and Luca. The claim a nearby single-category specialist (e.g. a wedding-only or headshot-only studio) can't truthfully make is that range plus a direct line to the photographer.

## Operating Context

- Visitors browse the gallery, organized by shoot-type collections (currently: `events`, `people`, `places`, `studio` — each a folder under `public/assets` that becomes its own gallery page).
- The Services page presents three offer types: Private Session, Events, Personalized Offer.
- Booking starts through the Contact form only — no online scheduling or payment tool is integrated. Submitting the form sends Luca a job-request notification email and sends the client an automatic confirmation email (via Brevo).
- Coordination past the initial inquiry (pricing, scheduling, logistics) happens off-site over email/phone.

## Capabilities and Constraints

- Built on Next.js (App Router) with images served locally from `public/assets` — no CMS, no external image host.
- Contact form validation and email delivery run server-side (Zod + Brevo transactional email).
- No pricing is published on the site (undecided — do not invent figures).
- No testimonials, case studies, or press mentions exist yet (see Evidence on Hand).
- Coverage area, rates, and turnaround times beyond what's already written in site copy are unconfirmed — do not add new claims about them.

## Brand Commitments

- Name: Luca Petrescu. Brand: "Luca Petrescu Photography."
- Based in Bucharest, Romania. Contact: lucapetrescufotograf@gmail.com, +40725189163. (Note: `lib/siteConfig.ts` currently has stale placeholder values — "Pacific Northwest, USA" / hello@lucapetrescu.com — that don't match these confirmed facts; flagging for a future content fix, not changed here.)
- Instagram: @luca.petrescu.
- "No affiliate links" policy is explicit, existing site copy (Gear page): no affiliate trackers or referral codes, ever.

## Evidence on Hand

- Real photographs under `public/assets/{events,people,places,studio}` (~78 images total) — the only imagery to use; do not fabricate stock photography or placeholder people.
- No testimonials, client quotes, press coverage, or case studies exist. Do not invent any.
- No pricing sheet or package pricing exists. Do not invent figures.

## Product Principles

1. Direct, one-on-one relationship — every touchpoint should read as "you're talking to Luca," not a studio or agency.
2. Versatility over narrow specialization — private sessions, events, and custom offers are equally first-class, not one flagship service with two afterthoughts.
3. The portfolio has to work for both audiences at once: credible enough for peers/press, clear enough to convert a prospective client.
4. No fabricated trust signals — pricing, testimonials, and proof stay absent until real ones exist, rather than being invented to look complete.
5. The contact form is the single conversion path — design and copy should drive toward it rather than toward external booking tools that don't exist yet.
