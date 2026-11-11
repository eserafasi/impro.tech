import type { SectionProps } from "./types";

export function Timeline({ t }: SectionProps) {
  const tl = t.timeline;
  return (
    <section className="timeline section" aria-labelledby="timeline-title">
      <div className="container">
        <h2 id="timeline-title" className="h2">
          {tl.title}
        </h2>
        <ol className="timeline-list">
          {tl.entries.map((e) => (
            <li key={e.org} className="timeline-entry">
              <p className="timeline-dates num">{e.dates}</p>
              <div>
                <h3 className="h3">{e.org}</h3>
                <p className="timeline-role">
                  <span>{e.role}</span>
                  {e.place && <span>{e.place}</span>}
                </p>
                {e.points.length > 0 && (
                  <ul className="timeline-points">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
