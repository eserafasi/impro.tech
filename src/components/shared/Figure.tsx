import Image from "next/image";
import type { MediaKey, SiteContent } from "@/content/site";
import { media } from "@/content/media";

type Props = {
  t: SiteContent;
  id: MediaKey;
  sizes: string;
  className?: string;
  /** Show the caption under the picture. */
  caption?: boolean;
  /** Only for the hero image. */
  eager?: boolean;
};

/** A photo or a site capture, framed, with its caption from site.ts. */
export function Figure({ t, id, sizes, className, caption = true, eager = false }: Props) {
  const m = media[id];
  const text = t.media[id];
  return (
    <figure className={`frame frame-${m.kind} ${className ?? ""}`} data-kind={m.kind}>
      <Image
        src={m.src}
        alt={text.alt}
        sizes={sizes}
        placeholder={eager ? "empty" : "blur"}
        style={m.position ? { objectPosition: m.position } : undefined}
        {...(eager ? { preload: true, fetchPriority: "high" as const } : {})}
      />
      {caption && <figcaption>{text.caption}</figcaption>}
    </figure>
  );
}
