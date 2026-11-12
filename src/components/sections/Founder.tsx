import type { SectionProps } from "./types";

export function Founder({ t }: SectionProps) {
  const f = t.founder;
  return (
    <section className="founder section band" aria-labelledby="founder-title">
      <div className="container founder-grid">
        <div>
          <h2 id="founder-title" className="h2">
            {f.title}
          </h2>
          <p className="founder-name">{f.name}</p>
          <ul className="founder-lines">
            {f.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <a className="founder-link" href={f.link.href} rel="noopener me">
            {f.link.label}
          </a>
        </div>
        <blockquote className="founder-quote">
          <p>{f.quote}</p>
        </blockquote>
      </div>
    </section>
  );
}
