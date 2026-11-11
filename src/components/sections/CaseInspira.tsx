import { Copy } from "@/components/shared/Todo";
import type { SectionProps } from "./types";

export function CaseInspira({ t }: SectionProps) {
  const c = t.caseInspira;
  const [lead, ...rest] = c.facts;
  return (
    <section className="inspira section" aria-labelledby="inspira-title">
      <div className="container inspira-grid">
        <div className="inspira-text">
          <h2 id="inspira-title" className="h2">
            {c.title}
          </h2>
          <p className="intro">{c.lede}</p>
          <p className="inspira-figure">
            <span className="inspira-value num">{lead.value}</span>
            <span className="inspira-label">{lead.label}</span>
          </p>
          <dl className="inspira-facts">
            {rest.map((f) => (
              <div key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
          </dl>
          <p className="inspira-learned">{c.learned}</p>
        </div>
        <div data-slot="inspira-screens" className="slot-tall">
          <p>
            {t.ui.screenshotSlot}
            <br />
            <Copy value={c.screenshots} todoLabel={t.todoLabel} />
          </p>
        </div>
      </div>
    </section>
  );
}
