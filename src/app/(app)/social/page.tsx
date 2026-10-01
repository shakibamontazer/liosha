import { Suspense } from "react";
import { SocialHub } from "@/components/social/social-view";

export default function SocialPage() {
  return (
    <Suspense fallback={null}>
      <SocialHub />
    </Suspense>
  );
}
