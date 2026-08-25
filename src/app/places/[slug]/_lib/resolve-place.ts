import { notFound } from "next/navigation";

import { getPlaceById, type Place } from "@/data/places";

export async function resolvePlace(
  params: Promise<{ slug: string }>,
): Promise<Place> {
  const { slug } = await params;
  const place = getPlaceById(slug);

  if (!place) {
    notFound();
  }

  return place;
}
