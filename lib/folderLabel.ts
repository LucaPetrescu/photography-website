/**
 * Pure string formatting, deliberately kept out of `lib/localImages.ts` so
 * client components can import it without pulling in that module's
 * node:fs/node:path/probe-image-size dependencies into the browser bundle.
 */

/** "people" -> "People", "studio-jobs" -> "Studio Jobs" */
export function folderToLabel(folder: string): string {
  return folder
    .replace(/\/$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
