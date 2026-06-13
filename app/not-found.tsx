import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="pt-[72px]">
      <Container className="flex min-h-[60vh] flex-col items-start justify-center py-24">
        <p className="text-eyebrow font-medium uppercase tracking-[0.14em] text-accent">
          404
        </p>
        <h1 className="mt-2 max-w-[18ch] font-display text-display font-semibold">
          This frame doesn&rsquo;t exist.
        </h1>
        <p className="mt-4 max-w-[46ch] text-body-lg text-muted">
          The page you were looking for has moved or never existed. Let&rsquo;s
          get you back to the work.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" variant="primary">
            Back home
          </Button>
          <Button href="/gallery" variant="ghost">
            View the gallery
          </Button>
        </div>
      </Container>
    </div>
  );
}
