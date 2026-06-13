# Image assets

These are **committed placeholder images** so every page renders in development
and `next/image` static imports resolve (static imports require real raster
files with intrinsic dimensions, which also gives `placeholder="blur"` for free).

Filenames are **stable** — to publish a real photo, replace the file in place
with the same name and aspect ratio. No code changes are needed.

Regenerate all placeholders with:

```bash
node scripts/generate-placeholders.mjs
```

## Conventions

| Folder      | Purpose                | Aspect ratio | Dimensions  |
| ----------- | ---------------------- | ------------ | ----------- |
| `hero/`     | Home hero (LCP)        | ~16:10 wide  | 2400 × 1500 |
| `about/`    | About portrait         | 4:5 portrait | 1200 × 1500 |
| `gallery/`  | Gallery tiles          | 4:5 portrait | 1200 × 1500 |
| `gear/`     | Gear product shots     | 3:2          | 1200 × 800  |
| `og/`       | Open Graph fallback    | 1.91:1       | 1200 × 630  |

## Adding a gallery image

1. Drop a 4:5 JPEG into `gallery/` (e.g. `gallery/new-frame.jpg`).
2. Add one entry to `lib/gallery.ts` importing that file.

## Swapping a gear image

Replace the matching file in `gear/` (filenames are referenced from
`lib/gear.ts`): `nikon-d750.jpg`, `tamron-24-70.jpg`, `tamron-70-200.jpg`,
`nikkor-50mm.jpg`.
