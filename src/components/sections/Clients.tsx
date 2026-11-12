import Image from "next/image";
import { Copy } from "@/components/shared/Todo";
import { Figure } from "@/components/shared/Figure";
import type { SectionProps } from "./types";

/** A rail of the five clients, each card led by its live site or a stage photo. */
export function Clients({ t }: SectionProps) {
  const c = t.clients;
  return (
    <section className="clients section band" aria-labelledby="clients-title">
      <div className="container section-head split-head">
        <h2 id="clients-title" className="h2">
          {c.title}
        </h2>
        <p className="intro">{c.intro}</p>
      </div>

      <ul className="rail" tabIndex={0} aria-label={t.media.railLabel}>
        {c.items.map((client) => (
          <li key={client.id} className="card">
            {client.media ? (
              <Figure t={t} id={client.media} sizes="(min-width: 60rem) 26rem, 80vw" caption={false} className="card-media" />
            ) : (
              <div className="card-media card-door" aria-hidden="true">
                <span>{client.name}</span>
              </div>
            )}
            <div className="card-body">
              {client.logo ? (
                <h3>
                  <Image src={client.logo} alt={client.name} width={160} height={48} className="client-logo" />
                </h3>
              ) : (
                <h3 className="card-name">{client.name}</h3>
              )}
              <p className="card-kind">
                <span>{client.kind}</span>
                {client.place && <span>{client.place}</span>}
              </p>
              {client.note && <p className="card-note">{client.note}</p>}
              <p className="card-role">{client.role}</p>
              {client.urlLabel ? (
                <a className="card-link" href={client.url} rel="noopener">
                  {client.urlLabel}
                </a>
              ) : (
                <Copy value={client.url} todoLabel={t.todoLabel} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
