import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function ProjectsCategoryRedirect({ params }: Props) {
  const { category } = await params;
  redirect(`/gallery/${category}`);
}
