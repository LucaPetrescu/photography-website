import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { listFolders, listPhotos } from "@/lib/B2Bucket";
import { Container } from "@/components/ui/Container";
import { B2PhotoWall } from "@/components/gallery/B2PhotoWall";

// Signed B2 URLs expire after 1hr — regenerate the page well before that.
export const revalidate = 1800;

type Props = {
  params: Promise<{ category: string }>;
};

function folderToLabel(folder: string): string {
  return folder
    .replace(/\/$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export async function generateStaticParams() {
  const folders = await listFolders();
  return folders.map((f: string) => ({ category: f.replace(/\/$/, "") }));
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
  const folders = await listFolders();
  const match = folders.find((f: string) => f.replace(/\/$/, "") === category);
  if (!match) notFound();

  const photos = await listPhotos(category);
  const label = folderToLabel(category);

  return (
    <main id="main" className="pt-14">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.1em] text-muted">
          Gallery
        </p>
        <h1 className="mt-4 font-display text-display font-semibold">
          {label}
        </h1>
        <p className="mt-2 text-[0.8125rem] text-muted">
          {photos.length}&nbsp;{photos.length === 1 ? "photograph" : "photographs"}
        </p>
      </Container>

      <div className="px-4 pb-16 pt-6 md:px-8">
        <B2PhotoWall photos={photos} />
      </div>
    </main>
  );
}
