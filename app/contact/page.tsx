import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/lib/siteConfig";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Luca Petrescu about private sessions, events, or a personalized shoot.",
};

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: MapPin,
    label: "Location",
    value: `${siteConfig.location} · shooting worldwide`,
    href: undefined,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Container>
        <div className="grid gap-12 pb-20 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <aside>
            <p className="text-[0.75rem] uppercase tracking-[0.15em] text-muted">
              Contact
            </p>
            <h1 className="mt-4 font-display text-h1 font-normal">
              Let&rsquo;s make something.
            </h1>
            <p className="mt-4 max-w-[42ch] text-body-lg text-muted">
              Private sessions, events, or something personalized &mdash; tell
              me a little about what you have in mind and I&rsquo;ll reply
              within a couple of days.
            </p>

            <h2 className="mt-10 font-display text-h3 font-normal">
              Contact Information
            </h2>
            <div className="mt-6 grid gap-6">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                const content = (
                  <>
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-surface-muted text-muted">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.75rem] uppercase tracking-[0.15em] text-muted">
                        {method.label}
                      </span>
                      <span className="mt-0.5 block text-body text-text">
                        {method.value}
                      </span>
                    </span>
                  </>
                );

                if (!method.href) {
                  return (
                    <div key={method.label} className="flex items-center gap-4">
                      {content}
                    </div>
                  );
                }

                return (
                  <a
                    key={method.label}
                    href={method.href}
                    className="group flex items-center gap-4"
                  >
                    <span className="flex h-10 w-10 flex-none items-center justify-center rounded-md bg-surface-muted text-muted transition-colors group-hover:text-text">
                      <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[0.75rem] uppercase tracking-[0.15em] text-muted">
                        {method.label}
                      </span>
                      <span className="mt-0.5 block text-body text-text transition-colors group-hover:text-muted">
                        {method.value}
                      </span>
                    </span>
                  </a>
                );
              })}
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
