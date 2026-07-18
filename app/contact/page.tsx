import type { Metadata } from "next";
import { Mail, AtSign, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Luca Petrescu for personal photoshoots or event photography.",
};

export default function ContactPage() {
  return (
    <div className="pt-14">
      <Container>
        <div className="grid gap-12 pb-20 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <aside>
            <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
              Contact
            </p>
            <h1 className="mt-4 font-display text-display font-semibold">
              Let&rsquo;s connect.
            </h1>
            <p className="mt-4 max-w-[42ch] text-body-lg text-muted">
              Thinking about a personal shoot, or need someone behind the camera
              for your event? Drop me a line below or fill in the contact form.
            </p>

            <div className="mt-8 grid gap-4">
              <div className="flex items-center gap-3">
                <Mail
                  size={16}
                  strokeWidth={1.5}
                  className="flex-none text-muted"
                  aria-hidden="true"
                />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[0.875rem] text-text transition-colors hover:text-muted"
                >
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <AtSign
                  size={16}
                  strokeWidth={1.5}
                  className="flex-none text-muted"
                  aria-hidden="true"
                />
                <a
                  href={siteConfig.socials.instagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.875rem] text-text transition-colors hover:text-muted"
                >
                  {siteConfig.socials.instagram.label}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone
                  size={16}
                  strokeWidth={1.5}
                  className="flex-none text-muted"
                  aria-hidden="true"
                />
                <span className="text-[0.875rem] text-muted">
                  {siteConfig.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin
                  size={16}
                  strokeWidth={1.5}
                  className="flex-none text-muted"
                  aria-hidden="true"
                />
                <span className="text-[0.875rem] text-muted">
                  {siteConfig.location} &middot; shooting in Europe
                </span>
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
