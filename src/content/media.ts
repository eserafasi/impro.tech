import type { StaticImageData } from "next/image";
import type { MediaKey } from "./site";

import maestroBows from "@/assets/photos/cocoloco-maestro-bows.jpg";
import maestroRafa from "@/assets/photos/cocoloco-maestro-rafa.jpg";
import maestroAudience from "@/assets/photos/cocoloco-maestro-audience.jpg";
import maestroCast from "@/assets/photos/cocoloco-maestro-cast.jpg";
import reunionCast from "@/assets/photos/cocoloco-reunion-cast.jpg";
import reunionRafa from "@/assets/photos/cocoloco-reunion-rafa.jpg";
import reunionAudience from "@/assets/photos/cocoloco-reunion-audience.jpg";
import stage777 from "@/assets/photos/777-stage-green.jpg";
import rafaNata777 from "@/assets/photos/777-rafa-nata.jpg";
import audience777 from "@/assets/photos/777-audience.jpg";
import site777 from "@/assets/work/777-desk.jpg";
import siteInspira from "@/assets/work/inspira-desk.jpg";
import siteInspiraMobile from "@/assets/work/inspira-mob.jpg";
import siteOpenImpro from "@/assets/work/openimpro-desk.jpg";
import siteOmi from "@/assets/work/omi-desk.jpg";

/**
 * Images by key. Alt text and captions live in site.ts (per language).
 * Photos: the owner's own, credited in site.ts `media.credits`.
 * Site captures: screenshots of the live sites im-pro.tech built (Nov 2026).
 */
export const media: Record<MediaKey, { src: StaticImageData; kind: "photo" | "product"; position?: string }> = {
  maestroBows: { src: maestroBows, kind: "photo", position: "70% 40%" },
  maestroRafa: { src: maestroRafa, kind: "photo", position: "30% 40%" },
  maestroAudience: { src: maestroAudience, kind: "photo" },
  maestroCast: { src: maestroCast, kind: "photo" },
  reunionCast: { src: reunionCast, kind: "photo" },
  reunionRafa: { src: reunionRafa, kind: "photo" },
  reunionAudience: { src: reunionAudience, kind: "photo" },
  stage777: { src: stage777, kind: "photo", position: "40% 50%" },
  rafaNata777: { src: rafaNata777, kind: "photo" },
  audience777: { src: audience777, kind: "photo" },
  site777: { src: site777, kind: "product", position: "50% 0%" },
  siteInspira: { src: siteInspira, kind: "product", position: "50% 0%" },
  siteInspiraMobile: { src: siteInspiraMobile, kind: "product", position: "50% 0%" },
  siteOpenImpro: { src: siteOpenImpro, kind: "product", position: "50% 0%" },
  siteOmi: { src: siteOmi, kind: "product", position: "50% 0%" },
};
