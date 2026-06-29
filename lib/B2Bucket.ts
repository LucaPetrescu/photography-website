import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

function getS3(): { client: S3Client; bucket: string | undefined } {
  const region = process.env.REGION;
  const bucket = process.env.BUCKET;

  try {
    if (!region) throw new Error("Missing env var: REGION");
    if (!bucket) throw new Error("Missing env var: BUCKET");
  } catch (error) {
    console.log(error);
  }

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

async function listKeys(prefix?: string): Promise<string[]> {
  const { client, bucket } = getS3();
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

  return keys;
}

function toProxyUrls(keys: string[]) {
  return keys.map((key) => `/api/photo?key=${encodeURIComponent(key)}`);
}

// Signed URLs expire after 1 hour — suitable for SSR, not static export.
export async function listPhotos(folder: string): Promise<string[]> {
  const keys = await listKeys(`${folder}/`);
  return toProxyUrls(keys);
}

export async function listAllPhotos(): Promise<string[]> {
  const folders = await listFolders();
  const keyGroups = await Promise.all(folders.map((f) => listKeys(f)));
  return toProxyUrls(keyGroups.flat());
}
