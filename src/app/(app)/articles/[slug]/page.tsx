import { ArticleView } from "@/components/pages/info-view";
import { ARTICLES } from "@/lib/catalog";

export function generateStaticParams() {
  return ARTICLES.map((item) => ({ slug: item.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ArticleView slug={slug} />;
}
