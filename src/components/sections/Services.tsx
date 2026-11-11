import { SqlCode } from "@/components/shared/SqlCode";
import { TicketStub } from "@/components/shared/TicketStub";
import type { SectionProps } from "./types";

export function Services({ t }: SectionProps) {
  const s = t.services;
  return (
    <section id="work" className="services section" aria-labelledby="services-title">
      <div className="container">
        <h2 id="services-title" className="h2">
          {s.title}
        </h2>
        <ul className="services-list">
          {s.items.map((item) => (
            <li key={item.id} className="service">
              <div className="service-text">
                <h3 className="h3">{item.title}</h3>
                <p>{item.body}</p>
              </div>
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
        </ul>
      </div>
    </section>
  );
}
