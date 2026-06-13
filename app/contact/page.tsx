import type { Metadata } from "next";
import { Mail, AtSign, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Luca Petrescu about commissions, fine-art prints, and editorial assignments.",
};

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <Container>
        <div className="grid gap-12 pb-20 pt-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <aside>
            <p className="text-eyebrow font-medium uppercase tracking-[0.14em] text-accent">
              Contact
            </p>
            <h1 className="mt-2 font-display text-display font-semibold">
              Let&rsquo;s make something.
            </h1>
            <p className="mt-4 max-w-[42ch] text-body-lg text-muted">
              Commissions, prints, editorial assignments, or just to say hello —
              tell me a little about what you have in mind and I&rsquo;ll reply
              within a couple of days.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-3 text-muted">
                <Mail
                  size={18}
                  strokeWidth={1.75}
                  className="flex-none text-accent"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-text transition-colors hover:text-accent"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <AtSign
                  size={18}
                  strokeWidth={1.75}
                  className="flex-none text-accent"
                  aria-hidden="true"
                />
                <a
                  href={siteConfig.socials.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text transition-colors hover:text-accent"
                >
                  {siteConfig.socials.instagram.label}
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted">
                <MapPin
                  size={18}
                  strokeWidth={1.75}
                  className="flex-none text-accent"
                  aria-hidden="true"
                />
                <span>{siteConfig.location} · shooting worldwide</span>
              </div>
            </div>
          </aside>

          <div>
            <ContactForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
