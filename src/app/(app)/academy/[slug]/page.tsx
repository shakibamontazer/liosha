"use client";

import { useParams } from "next/navigation";
import { CourseView } from "@/components/academy/academy-view";

export default function CoursePage() {
  const params = useParams<{ slug: string }>();
  return <CourseView slug={params.slug} />;
}
