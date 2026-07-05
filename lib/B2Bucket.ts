import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

function getS3(): {
  client: S3Client;
  bucket: string;
  region: string;
} {
  const region = process.env.REGION;
  const bucket = process.env.BUCKET;

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

// Bucket must be set to public-read in the B2 dashboard for these URLs to resolve.
function toPublicUrls(keys: string[], bucket: string, region: string) {
  return keys.map(
    (key) => `https://s3.${region}.backblazeb2.com/${bucket}/${key}`,
  );
}

export async function listPhotos(folder: string): Promise<string[]> {
  const { keys, bucket, region } = await listKeys(`${folder}/`);
  return toPublicUrls(keys, bucket, region);
}

export async function listAllPhotos(): Promise<string[]> {
  const folders = await listFolders();
  const keyGroups = await Promise.all(folders.map((f) => listKeys(f)));
  const { bucket, region } = keyGroups[0] ?? getS3();
  return toPublicUrls(
    keyGroups.flatMap((g) => g.keys),
    bucket,
    region,
  );
}
