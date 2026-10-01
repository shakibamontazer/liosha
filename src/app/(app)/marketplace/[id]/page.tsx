"use client";

import { useParams } from "next/navigation";
import { MarketProfile } from "@/components/market/market-view";

export default function MarketProfilePage() {
  const params = useParams<{ id: string }>();
  return <MarketProfile id={params.id} />;
}
