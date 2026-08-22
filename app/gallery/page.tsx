import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listFolders, listPhotos, folderToLabel } from "@/lib/localImages";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photography gallery by Luca Petrescu — private sessions, events, and personalized work, based in Bucharest, Romania.",
};

export default async function GalleryPage() {
  const folders = listFolders();
  const photosByFolder = await Promise.all(
    folders.map((folder) => listPhotos(folder)),
  );

  const series = folders
    .map((folder, i) => ({
      slug: folder,
      label: folderToLabel(folder),
      cover: photosByFolder[i][0],
      count: photosByFolder[i].length,
    }))
    .filter((s) => s.cover);

  return (
    <main id="main" className="pt-16">
      <Container className="pb-4 pt-12">
        <p className="text-[0.75rem] uppercase tracking-[0.15em] text-muted">
          Gallery
        </p>
        <h1 className="mt-4 font-display text-h1 font-normal">
          The work, by series.
        </h1>
      </Container>

      <Container className="pb-16 pt-8 md:pb-24">
        <ul className="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
          {series.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={i * 60}>
              <Link
                href={`/gallery/${s.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden"
                aria-label={`View ${s.label} — ${s.count} photograph${s.count === 1 ? "" : "s"}`}
              >
                <Image
                  src={s.cover.url}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100"
                />
                <div className="absolute bottom-6 left-6 opacity-0 transition-opacity duration-[400ms] group-hover:opacity-100">
                  <h2 className="font-display text-h3 font-normal text-white">
                    {s.label}
                  </h2>
                  <p className="mt-1 text-[0.875rem] text-muted">
                    {s.count}&nbsp;
                    {s.count === 1 ? "photograph" : "photographs"}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </main>
  );
}
