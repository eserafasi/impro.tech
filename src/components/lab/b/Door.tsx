import type { Locale, SiteContent } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { Copy } from "@/components/shared/Todo";
import { SqlCode } from "@/components/shared/SqlCode";

type Props = { t: SiteContent; lang: Locale };

export function DoorHero({ t, lang }: Props) {
  const h = t.hero;
  return (
    <section className="b-hero" aria-labelledby="hero-title">
      <div className="container b-hero-grid">
        <div className="b-hero-text">
          <h1 id="hero-title" className="b-display">
            <span>{h.name}</span>
            <span className="visually-hidden">, </span>
            <span className="b-display-brand">{h.brand}</span>
          </h1>
          <p className="b-lead">{h.tagline}</p>
          <div className="b-actions">
            <a className="b-btn b-btn-primary" href="#work">
              {h.ctaWork}
            </a>
            <a className="b-btn b-btn-secondary" href={localePath(lang, "/cv")}>
              {h.ctaCv}
            </a>
          </div>
          <p className="b-where">
            <span>{h.place}</span>
            <span className="num">{h.timezone}</span>
          </p>
        </div>

        {/* The door: its panels are the real Supabase feature list */}
        <div className="b-door" role="group" aria-labelledby="door-title">
          <p id="door-title" className="b-door-title">
            {t.stack.supabaseLabel}
          </p>
          <ul className="b-door-panels">
            {t.stack.supabaseFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function DoorIncident({ t }: Props) {
  const inc = t.incident;
  const did = inc.steps.findIndex((s) => s.id === "did");
  return (
    <section id="work" className="b-incident" aria-labelledby="incident-title">
      <div className="container">
        <div className="b-incident-head">
          <h2 id="incident-title" className="b-h2 b-tech">
            {inc.title}
          </h2>
          <p className="b-hold">
            <span className="num">{inc.duration}</span>
            <span className="visually-hidden"> </span>
            <span>{inc.durationLabel}</span>
          </p>
        </div>

        <ol className="b-panels">
          {inc.steps.map((step, i) => (
            <li key={step.id} className={`b-panel ${i === did ? "b-panel-wide" : ""}`}>
              <h3 className="b-h3">{step.label}</h3>
              <Copy as="p" value={step.body} todoLabel={t.todoLabel} />
              {step.note && <p className="b-panel-note">{step.note}</p>}
              {i === did && (
                <figure className="b-well">
                  <figcaption>
                    <span className="b-well-tag">{inc.sql.label}</span>
                    <span>{inc.sql.caption}</span>
                  </figcaption>
                  <SqlCode code={inc.sql.code} className="b-sql" />
                </figure>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DoorClients({ t }: Props) {
  const c = t.clients;
  return (
    <section className="b-clients" aria-labelledby="clients-title">
      <div className="container">
        <div className="b-clients-head">
          <h2 id="clients-title" className="b-h2">
            {c.title}
          </h2>
          <p className="b-intro">{c.intro}</p>
        </div>

        <ul className="b-list">
          {c.items.map((client) => (
            <li key={client.id} className="b-item">
              <div className="b-item-name">
                <h3>{client.name}</h3>
                {client.note && <p className="b-item-note">{client.note}</p>}
              </div>
              <p className="b-item-kind">
                <span>{client.kind}</span>
                {client.place && <span>{client.place}</span>}
              </p>
              <div className="b-item-role">
                <p>{client.role}</p>
                {client.urlLabel ? (
                  <a href={client.url} rel="noopener">
                    {client.urlLabel}
                  </a>
                ) : (
                  <Copy value={client.url} todoLabel={t.todoLabel} />
                )}
              </div>
            </li>
          ))}
        </ul>

        <div data-slot="clients-photo" className="b-slot">
          <p>
            {t.lab.photoSlot}
            <br />
            <Copy value={t.lab.photoTodo} todoLabel={t.todoLabel} />
          </p>
        </div>
      </div>
    </section>
  );
}
