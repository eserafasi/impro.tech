import { Figure } from "@/components/shared/Figure";
import type { SectionProps } from "./types";

/** Showcase: the real festival ticketing site on desktop and phone, then its facts. */
export function CaseInspira({ t }: SectionProps) {
  const c = t.caseInspira;
  return (
    <section className="inspira section" aria-labelledby="inspira-title">
      <div className="container">
        <div className="section-head split-head">
          <h2 id="inspira-title" className="h2">
            {c.title}
          </h2>
          <p className="intro">{c.lede}</p>
        </div>
        <div className="showcase">
          <Figure t={t} id="siteInspira" sizes="(min-width: 60rem) 66vw, 100vw" className="showcase-main" />
          <Figure t={t} id="siteInspiraMobile" sizes="(min-width: 60rem) 22vw, 50vw" className="showcase-phone" />
        </div>
        <dl className="figures">
          {c.facts.map((f) => (
            <div key={f.label}>
              <dt className="num">{f.value}</dt>
              <dd>{f.label}</dd>
            </div>
          ))}
        </dl>
        <p className="inspira-learned">{c.learned}</p>
      </div>
    </section>
  );
}
