import Image from "next/image";

import type { PlaceId } from "@/data/places";

import mascotFront from "../../../CHA-CHA)Design System/assets/mascot-front.png";
import faceCheer from "../../../CHA-CHA)Design System/assets/face-cheer.png";
import poseCheering from "../../../CHA-CHA)Design System/assets/pose-cheering.png";
import poseRunning from "../../../CHA-CHA)Design System/assets/pose-running.png";
import poseStudying from "../../../CHA-CHA)Design System/assets/pose-studying.png";
import poseTogether from "../../../CHA-CHA)Design System/assets/pose-together.png";

const MASCOT_SOURCES = {
  "cheer-face": faceCheer,
  cheering: poseCheering,
  front: mascotFront,
  running: poseRunning,
  studying: poseStudying,
  together: poseTogether,
} as const;

export type ChachaMascotVariant = keyof typeof MASCOT_SOURCES;

const PLACE_MASCOT_VARIANTS: Record<PlaceId, ChachaMascotVariant> = {
  "industry-center": "cheering",
  "language-center": "running",
  library: "studying",
};

type ChachaMascotProps = Readonly<{
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  variant: ChachaMascotVariant;
}>;

/** Uses only the untouched official artwork extracted from the supplied CHA-CHA sheet. */
export function ChachaMascot({
  alt = "",
  className,
  priority = false,
  sizes,
  variant,
}: ChachaMascotProps) {
  return (
    <Image
      alt={alt}
      className={className}
      priority={priority}
      sizes={sizes}
      src={MASCOT_SOURCES[variant]}
    />
  );
}

export function mascotVariantForPlace(placeId: PlaceId): ChachaMascotVariant {
  return PLACE_MASCOT_VARIANTS[placeId];
}
