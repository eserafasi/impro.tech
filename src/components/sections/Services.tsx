import { Figure } from "@/components/shared/Figure";
import { SqlCode } from "@/components/shared/SqlCode";
import { TicketStub } from "@/components/shared/TicketStub";
import type { SectionProps } from "./types";

/** Sticky diptych: the stage stays pinned while the three services scroll past. */
export function Services({ t }: SectionProps) {
  const s = t.services;
  return (
    <section id="work" className="services section" aria-labelledby="services-title">
      <div className="container diptych">
        <div className="pane-sticky">
          <h2 id="services-title" className="h2">
            {s.title}
          </h2>
          <Figure t={t} id="stage777" sizes="(min-width: 60rem) 40vw, 100vw" className="services-photo" />
        </div>
        <ol className="pane-scroll">
          {s.items.map((item) => (
            <li key={item.id} className="service">
              <h3 className="h3-display">{item.title}</h3>
              <p className="service-body">{item.body}</p>
              <figure className="service-artifact">
                {item.sample === "qr" ? (
                  <TicketStub label={t.ui.illustrative} />
                ) : (
                  <div className="well">
                    <span className="well-tag">{t.ui.illustrative}</span>
                    <SqlCode code={item.sample} className="sql" />
                  </div>
                )}
                <figcaption className="service-caption">{item.artifact}</figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
