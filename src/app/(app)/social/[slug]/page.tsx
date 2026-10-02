import { PlatformView } from "@/components/social/social-view";
import { PLATFORMS } from "@/lib/catalog";

export function generateStaticParams() {
  return PLATFORMS.map((item) => ({ slug: item.slug }));
}

export default async function PlatformPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <PlatformView slug={slug} />;
}
