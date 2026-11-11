import { Copy } from "@/components/shared/Todo";
import { SqlCode } from "@/components/shared/SqlCode";
import type { SectionProps } from "./types";

export function CaseIncident({ t }: SectionProps) {
  const inc = t.incident;
  return (
    <section className="incident door-section" aria-labelledby="incident-title">
      <div className="container">
        <div className="incident-head">
          <h2 id="incident-title" className="h2 tech">
            {inc.title}
          </h2>
          <p className="hold">
            <span className="num">{inc.duration}</span>
            <span className="visually-hidden"> </span>
            <span>{inc.durationLabel}</span>
          </p>
        </div>

        <ol className="panels">
          {inc.steps.map((step) => (
            <li key={step.id} className={`panel ${step.id === "did" ? "panel-wide" : ""}`}>
              <h3 className="h3 tech">{step.label}</h3>
              <Copy as="p" value={step.body} todoLabel={t.todoLabel} />
              {step.note && <p className="panel-note">{step.note}</p>}
              {step.id === "did" && (
                <figure className="well well-figure">
                  <figcaption>
                    <span className="well-tag">{inc.sql.label}</span>
                    <span>{inc.sql.caption}</span>
                  </figcaption>
                  <SqlCode code={inc.sql.code} className="sql" />
                </figure>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
