import { CourseView } from "@/components/academy/academy-view";
import { COURSES } from "@/lib/catalog";

export function generateStaticParams() {
  return COURSES.map((item) => ({ slug: item.slug }));
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CourseView slug={slug} />;
}
