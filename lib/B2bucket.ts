import {
  S3Client,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const bucketName = process.env.BUCKET;
const region = process.env.REGION;

const s3 = new S3Client({
  region: region,
  endpoint: `https://s3.${region}.backblazeb2.com`,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID!,
    secretAccessKey: process.env.B2_APP_KEY!,
  },
});

export async function listAllKeys(bucket: string): Promise<string[]> {
  const keys: string[] = [];
  let token: string | undefined;

  do {
    const res = await s3.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        ContinuationToken: token,
      }),
    );
    for (const obj of res.Contents ?? []) {
      if (obj.Key) keys.push(obj.Key);
    }
    token = res.IsTruncated ? res.NextContinuationToken : undefined;
  } while (token);

  return keys;
}

// Signed URLs expire after 1 hour — suitable for SSR, not static export.
export async function listPhotos(expiresIn = 3600): Promise<string[]> {
  const keys = await listAllKeys(bucketName!);
  return Promise.all(
    keys.map((key) =>
      getSignedUrl(s3, new GetObjectCommand({ Bucket: bucketName!, Key: key }), { expiresIn })
    )
  );
}
