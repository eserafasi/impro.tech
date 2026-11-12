import { Figure } from "@/components/shared/Figure";
import type { SectionProps } from "./types";

/**
 * Poster hero: a stage photo seen through an añil doorway in the sandstone
 * wall. On load the two door leaves slide apart (CSS only, once); with reduced
 * motion, or without CSS animation support, the door is simply open.
 */
export function Hero({ t }: SectionProps) {
  const h = t.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="doorway">
        <Figure t={t} id="maestroBows" sizes="100vw" eager caption={false} className="hero-photo" />
        <div className="leaf leaf-start" aria-hidden="true" />
        <div className="leaf leaf-end" aria-hidden="true" />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-content">
          <h1 id="hero-title" className="display">
            {h.brand}
          </h1>
          <p className="lead">{h.tagline}</p>
          <div className="actions">
            <a className="btn btn-primary" href="#work">
              {h.ctaWork}
            </a>
            <a className="btn btn-ghost" href="#contact">
              {h.ctaContact}
            </a>
          </div>
          <p className="founded">{h.founded}</p>
          <p className="where">
            <span>{h.place}</span>
            <span className="num">{h.timezone}</span>
          </p>
        </div>
        <p className="hero-caption">{t.media.maestroBows.caption}</p>
      </div>
    </section>
  );
}
