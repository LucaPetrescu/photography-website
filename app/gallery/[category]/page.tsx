import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listPhotos, type B2Folder } from "@/lib/B2bucket";
import { Container } from "@/components/ui/Container";
import { B2PhotoWall } from "@/components/gallery/B2PhotoWall";

const B2_FOLDERS: Record<string, { label: string; folder: B2Folder }> = {
  people: { label: "People", folder: "people" },
  studio: { label: "Studio", folder: "studio" },
};

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return Object.keys(B2_FOLDERS).map((category) => ({ category }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const series = B2_FOLDERS[category];
  if (!series) return {};
  return {
    title: series.label,
    description: `${series.label} photography by Luca Petrescu.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const series = B2_FOLDERS[category];
  if (!series) notFound();

  const urls = await listPhotos(series.folder);

  return (
    <main id="main" className="pt-14">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Gallery
        </p>
        <h1 className="mt-4 font-display text-display font-semibold">
          {series.label}
        </h1>
        <p className="mt-2 text-[0.8125rem] text-muted">
          {urls.length}&nbsp;{urls.length === 1 ? "photograph" : "photographs"}
        </p>
      </Container>

      <div className="px-4 pb-16 pt-6 md:px-8">
        <B2PhotoWall urls={urls} />
      </div>
    </main>
  );
}
