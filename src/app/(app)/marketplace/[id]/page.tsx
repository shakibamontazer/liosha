import { MarketProfile } from "@/components/market/market-view";

const PROFILES = ["atelier", "cafe", "atelier-live", "motion", "nut", "excel", "diet"];

export function generateStaticParams() {
  return PROFILES.map((id) => ({ id }));
}

export default async function MarketProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <MarketProfile id={id} />;
}
