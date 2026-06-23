import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProjectCategories,
  getCategoryFromSlug,
  getImagesByCategory,
} from "@/lib/gallery";
import { Container } from "@/components/ui/Container";
import { PhotoWallClient } from "@/components/gallery/PhotoWallClient";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return getProjectCategories().map((p) => ({ category: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: slug } = await params;
  const cat = getCategoryFromSlug(slug);
  if (!cat) return {};
  return {
    title: cat,
    description: `${cat} photography by Luca Petrescu.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category: slug } = await params;
  const cat = getCategoryFromSlug(slug);
  if (!cat) notFound();

  const images = getImagesByCategory(cat);

  return (
    <main id="main" className="pt-14">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Gallery
        </p>
        <h1 className="mt-4 font-display text-display font-semibold">{cat}</h1>
        <p className="mt-2 text-[0.8125rem] text-muted">
          {images.length}&nbsp;
          {images.length === 1 ? "photograph" : "photographs"}
        </p>
      </Container>

      <div className="px-4 pb-16 pt-6 md:px-8">
        <PhotoWallClient images={images} />
      </div>
    </main>
  );
}
