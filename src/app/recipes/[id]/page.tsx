import { DINNER_SCHEDULE, DINNER_SECTIONS } from "@/lib/dinnerData";
import { DinnerDetailClient } from "@/components/DinnerDetailClient";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DinnerDetailPage({ params }: Props) {
  const { id } = await params;
  const dinner = DINNER_SCHEDULE.find((d) => d.slug === id);
  if (!dinner) notFound();

  return <DinnerDetailClient dinner={dinner} sections={DINNER_SECTIONS} />;
}
