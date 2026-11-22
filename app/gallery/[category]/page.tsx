import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listFolders, listPhotos, folderToLabel } from "@/lib/localImages";
import { shuffled } from "@/lib/shuffle";
import { Container } from "@/components/ui/Container";
import { PhotoWall } from "@/components/gallery/PhotoWall";

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return listFolders().map((folder) => ({ category: folder }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const label = folderToLabel(category);
  return {
    title: label,
    description: `${label} photography by Luca Petrescu.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const folders = listFolders();
  if (!folders.includes(category)) notFound();

  // Shuffled once at build time: the order is fixed per deploy, which is fine
  // because adding photos already requires one.
  const photos = shuffled(await listPhotos(category));
  const label = folderToLabel(category);

  return (
    <main id="main" className="pt-16">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.15em] text-muted">
          Gallery
        </p>
        <h1 className="mt-4 font-display text-h1 font-normal">{label}</h1>
        <p className="mt-2 text-[0.8125rem] text-muted">
          {photos.length}&nbsp;
          {photos.length === 1 ? "photograph" : "photographs"}
        </p>
      </Container>

      <div className="px-4 pb-16 pt-6 md:px-8">
        <PhotoWall photos={photos} />
      </div>
    </main>
  );
}
