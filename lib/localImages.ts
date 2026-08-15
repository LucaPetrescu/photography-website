import fs from "node:fs";
import path from "node:path";
import probe from "probe-image-size";

const ASSETS_ROOT = path.join(process.cwd(), "public", "assets");
const IMAGE_EXTENSION_PATTERN = /\.(jpe?g|png|webp|avif|gif)$/i;

// EXIF orientations 5-8 are rotated 90°/270° — browsers auto-rotate on
// display, so the rendered aspect ratio has width/height swapped.
const ROTATED_ORIENTATIONS = new Set([5, 6, 7, 8]);
const FALLBACK_ASPECT = { width: 3, height: 2 };

export type Photo = {
  url: string;
  width: number;
  height: number;
};

/** Collection folders under public/assets — each one is a gallery category. */
export function listFolders(): string[] {
  return fs
    .readdirSync(ASSETS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function listImageFiles(folder: string): string[] {
  return fs
    .readdirSync(path.join(ASSETS_ROOT, folder))
    .filter((file) => IMAGE_EXTENSION_PATTERN.test(file))
    .sort();
}

function toPhoto(folder: string, file: string): Photo {
  const url = `/assets/${folder}/${file}`;

  try {
    const info = probe.sync(fs.readFileSync(path.join(ASSETS_ROOT, folder, file)));
    if (!info) return { url, ...FALLBACK_ASPECT };
    const rotated = ROTATED_ORIENTATIONS.has(info.orientation ?? 1);
    return {
      url,
      width: rotated ? info.height : info.width,
      height: rotated ? info.width : info.height,
    };
  } catch {
    return { url, ...FALLBACK_ASPECT };
  }
}

export async function listPhotos(folder: string): Promise<Photo[]> {
  return listImageFiles(folder).map((file) => toPhoto(folder, file));
}

export async function listAllPhotos(): Promise<Photo[]> {
  return listFolders().flatMap((folder) =>
    listImageFiles(folder).map((file) => toPhoto(folder, file)),
  );
}

/** "people" -> "People", "studio-jobs" -> "Studio Jobs" */
export function folderToLabel(folder: string): string {
  return folder
    .replace(/\/$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
