import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key || !/\.(jpe?g|png|webp|avif|gif)$/i.test(key)) {
    return new NextResponse("Invalid key", { status: 400 });
  }

  const region = process.env.REGION!;
  const bucket = process.env.BUCKET!;

  const s3 = new S3Client({
    region,
    endpoint: `https://s3.${region}.backblazeb2.com`,
    credentials: {
      accessKeyId: process.env.B2_KEY_ID!,
      secretAccessKey: process.env.B2_APP_KEY!,
    },
  });

  const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }));
  const stream = res.Body as ReadableStream;

  return new NextResponse(stream, {
    headers: {
      "Content-Type": res.ContentType ?? "image/jpeg",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate=3600",
    },
  });
}
