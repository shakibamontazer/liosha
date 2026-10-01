"use client";

import { useParams } from "next/navigation";
import { ArticleView } from "@/components/pages/info-view";

export default function ArticlePage() {
  const params = useParams<{ slug: string }>();
  return <ArticleView slug={params.slug} />;
}
