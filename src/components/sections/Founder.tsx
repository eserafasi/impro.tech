import { Figure } from "@/components/shared/Figure";
import type { SectionProps } from "./types";

export function Founder({ t }: SectionProps) {
  const f = t.founder;
  return (
    <section className="founder section" aria-labelledby="founder-title">
      <div className="container founder-grid">
        <Figure t={t} id="maestroRafa" sizes="(min-width: 60rem) 40vw, 100vw" className="founder-photo" />
        <div className="founder-text">
          <h2 id="founder-title" className="h2">
            {f.title}
          </h2>
          <p className="founder-name">{f.name}</p>
          <ul className="founder-lines">
            {f.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <blockquote className="founder-quote">
            <p>{f.quote}</p>
          </blockquote>
          <a className="founder-link" href={f.link.href} rel="noopener me">
            {f.link.label}
          </a>
        </div>
      </div>
    </section>
  );
}
