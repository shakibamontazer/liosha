import { Suspense } from "react";
import { Wizard } from "@/components/business/wizard";

export default function BusinessPage() {
  return (
    <Suspense fallback={null}>
      <Wizard />
    </Suspense>
  );
}
