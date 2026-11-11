import type { SectionProps } from "./types";

export function BeyondCode({ t }: SectionProps) {
  const b = t.beyond;
  return (
    <section className="beyond section band" aria-labelledby="beyond-title">
      <div className="container beyond-grid">
        <div>
          <h2 id="beyond-title" className="h2">
            {b.title}
          </h2>
          <ul className="beyond-roles">
            {b.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
        <blockquote className="beyond-line">
          <p>{b.line}</p>
        </blockquote>
      </div>
    </section>
  );
}
