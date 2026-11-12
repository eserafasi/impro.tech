import { Figure } from "@/components/shared/Figure";
import type { SectionProps } from "./types";

/** Split: the live planet graph beside what Open Impro is and where it stands. */
export function OpenImpro({ t }: SectionProps) {
  const o = t.openImpro;
  return (
    <section className="openimpro section band" aria-labelledby="openimpro-title">
      <div className="container openimpro-grid">
        <Figure t={t} id="siteOpenImpro" sizes="(min-width: 60rem) 58vw, 100vw" className="openimpro-shot" />
        <div className="openimpro-text">
          <h2 id="openimpro-title" className="h2">
            {o.title}
          </h2>
          <p className="intro">{o.lede}</p>
          <ul className="pillars">
            {o.pillars.map((p) => (
              <li key={p.title}>
                <h3 className="h3">{p.title}</h3>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
          <p className="openimpro-today">{o.today}</p>
          <p className="openimpro-repo">
            {o.repoStatus}{" "}
            <a href={o.repoLink.href} rel="noopener">
              {o.repoLink.label}
            </a>
          </p>
          <a className="btn btn-primary" href={o.siteLink.href} rel="noopener">
            {o.siteLink.label}
          </a>
        </div>
      </div>
    </section>
  );
}
