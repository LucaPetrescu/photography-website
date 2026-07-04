import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import probe from "probe-image-size";

const SIGNED_URL_TTL_SECONDS = 3600;

// EXIF orientations 5-8 are rotated 90°/270° — browsers auto-rotate on
// display, so the rendered aspect ratio has width/height swapped.
const ROTATED_ORIENTATIONS = new Set([5, 6, 7, 8]);

export type Photo = {
  url: string;
  width: number;
  height: number;
};

const FALLBACK_ASPECT = { width: 3, height: 2 };

function getS3(): {
  client: S3Client;
  bucket: string;
  region: string;
} {
  const region = process.env.REGION;
  const bucket = process.env.BUCKET;

  console.log("Region: ", region);

  if (!region) throw new Error("Missing env var: REGION");
  if (!bucket) throw new Error("Missing env var: BUCKET");

  return {
    client: new S3Client({
      region,
      endpoint: `https://s3.${region}.backblazeb2.com`,
      credentials: {
        accessKeyId: process.env.B2_KEY_ID!,
        secretAccessKey: process.env.B2_APP_KEY!,
      },
    }),
    bucket,
    region,
  };
}

export async function listFolders(): Promise<string[]> {
  const { client, bucket } = getS3();
  const res = await client.send(
    new ListObjectsV2Command({ Bucket: bucket, Delimiter: "/" }),
  );
  return (res.CommonPrefixes ?? [])
    .map((p: { Prefix?: string }) => p.Prefix)
    .filter(Boolean) as string[];
}

async function listKeys(
  prefix?: string,
): Promise<{ keys: string[]; bucket: string; region: string }> {
  const { client, bucket, region } = getS3();
  const keys: string[] = [];
  let token: string | undefined;

  do {
    const res = await client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        Prefix: prefix,
        ContinuationToken: token,
      }),
    );
    for (const obj of res.Contents ?? []) {
      if (obj.Key && /\.(jpe?g|png|webp|avif|gif)$/i.test(obj.Key)) {
        keys.push(obj.Key);
      }
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);

  return { keys, bucket, region };
}

// Bucket stays private — each key gets a short-lived signed URL the browser
// fetches directly from B2, bypassing our server for the image bytes.
// Dimensions are probed via a partial read (just the header) so next/image
// can reserve correct layout space without downloading the full photo.
async function toPhotos(keys: string[], bucket: string): Promise<Photo[]> {
  const { client } = getS3();
  return Promise.all(
    keys.map(async (key) => {
      const url = await getSignedUrl(
        client,
        new GetObjectCommand({ Bucket: bucket, Key: key }),
        { expiresIn: SIGNED_URL_TTL_SECONDS },
      );

      try {
        const info = await probe(url);
        const rotated = ROTATED_ORIENTATIONS.has(info.orientation ?? 1);
        return {
          url,
          width: rotated ? info.height : info.width,
          height: rotated ? info.width : info.height,
        };
      } catch {
        return { url, ...FALLBACK_ASPECT };
      }
    }),
  );
}

export async function listPhotos(folder: string): Promise<Photo[]> {
  const { keys, bucket } = await listKeys(`${folder}/`);
  return toPhotos(keys, bucket);
}

export async function listAllPhotos(): Promise<Photo[]> {
  const folders = await listFolders();
  const keyGroups = await Promise.all(folders.map((f) => listKeys(f)));
  const { bucket } = keyGroups[0] ?? getS3();
  return toPhotos(
    keyGroups.flatMap((g) => g.keys),
    bucket,
  );
}
