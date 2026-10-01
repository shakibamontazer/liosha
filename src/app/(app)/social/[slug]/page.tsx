"use client";

import { useParams } from "next/navigation";
import { PlatformView } from "@/components/social/social-view";

export default function PlatformPage() {
  const params = useParams<{ slug: string }>();
  return <PlatformView slug={params.slug} />;
}
