import type { Locale, SiteContent } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { Copy } from "@/components/shared/Todo";
import { SqlCode } from "@/components/shared/SqlCode";

type Props = { t: SiteContent; lang: Locale };

/** A margin note: real text, announced as an aside. */
function Note({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <aside className={`a-note ${className ?? ""}`}>
      <p>{children}</p>
    </aside>
  );
}

export function PromptBookHero({ t, lang }: Props) {
  const h = t.hero;
  return (
    <section className="a-hero container" aria-labelledby="hero-title">
      <div className="a-row">
        <div className="a-main">
          <h1 id="hero-title" className="a-display">
            <span className="a-display-name">{h.name}</span>
            <span className="visually-hidden">, </span>
            <span className="a-display-brand">{h.brand}</span>
          </h1>
          <p className="a-lead">{h.tagline}</p>
          <div className="a-actions">
            <a className="a-btn a-btn-primary" href="#work">
              {h.ctaWork}
            </a>
            <a className="a-btn a-btn-secondary" href={localePath(lang, "/cv")}>
              {h.ctaCv}
            </a>
          </div>
        </div>
        <div className="a-margin">
          <Note className="a-note-hero">{h.note}</Note>
          <p className="a-where">
            <span>{h.place}</span>
            <span className="num">{h.timezone}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export function PromptBookIncident({ t }: Props) {
  const inc = t.incident;
  return (
    <section id="work" className="a-section a-incident container" aria-labelledby="incident-title">
      <div className="a-row">
        <h2 id="incident-title" className="a-main a-h2 a-cue">
          {inc.title}
        </h2>
        <p className="a-margin a-hold">
          <span className="a-hold-value num">{inc.duration}</span>
          <span className="visually-hidden"> </span>
          <span className="a-hold-label">{inc.durationLabel}</span>
        </p>
      </div>

      <ol className="a-steps">
        {inc.steps.map((step) => (
          <li key={step.id} className="a-row a-step">
            <div className="a-main">
              <h3 className="a-h3">{step.label}</h3>
              <Copy as="p" value={step.body} todoLabel={t.todoLabel} />
              {step.id === "did" && (
                <figure className="a-plate">
                  <figcaption>
                    <span className="a-plate-tag">{inc.sql.label}</span>
                    <span>{inc.sql.caption}</span>
                  </figcaption>
                  <SqlCode code={inc.sql.code} className="a-sql" />
                </figure>
              )}
            </div>
            {step.note && (
              <div className="a-margin">
                <Note>{step.note}</Note>
              </div>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}

export function PromptBookClients({ t }: Props) {
  const c = t.clients;
  return (
    <section className="a-section a-clients container" aria-labelledby="clients-title">
      <div className="a-row">
        <div className="a-main">
          <h2 id="clients-title" className="a-h2 a-cue a-cue-note">
            {c.title}
          </h2>
          <p className="a-intro">{c.intro}</p>
        </div>
      </div>

      <ul className="a-cast">
        {c.items.map((client) => (
          <li key={client.id} className="a-row a-cast-row">
            <div className="a-main a-cast-line">
              <span className="a-cast-mark" aria-hidden="true">
                {initials(client.name)}
              </span>
              <div className="a-cast-who">
                <h3 className="a-cast-name">{client.name}</h3>
                <p className="a-cast-kind">
                  <span>{client.kind}</span>
                  {client.place && <span>{client.place}</span>}
                </p>
                {client.urlLabel ? (
                  <a className="a-cast-url" href={client.url} rel="noopener">
                    {client.urlLabel}
                  </a>
                ) : (
                  <Copy value={client.url} todoLabel={t.todoLabel} className="a-cast-url" />
                )}
              </div>
              <span className="a-cast-leader" aria-hidden="true" />
              <p className="a-cast-role">{client.role}</p>
            </div>
            {client.note && (
              <div className="a-margin">
                <Note>{client.note}</Note>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="a-row">
        <div className="a-main" data-slot="clients-photo">
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

function initials(name: string) {
  const words = name.split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w[0] ?? ""));
  if (words.length === 1) return words[0].slice(0, 3);
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}
