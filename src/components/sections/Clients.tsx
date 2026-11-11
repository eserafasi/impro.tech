import Image from "next/image";
import { Copy } from "@/components/shared/Todo";
import type { SectionProps } from "./types";

export function Clients({ t }: SectionProps) {
  const c = t.clients;
  return (
    <section className="clients section band" aria-labelledby="clients-title">
      <div className="container">
        <div className="section-head">
          <h2 id="clients-title" className="h2">
            {c.title}
          </h2>
          <p className="intro">{c.intro}</p>
        </div>

        <ul className="client-list">
          {c.items.map((client) => (
            <li key={client.id} className="client">
              <div className="client-name">
                {client.logo ? (
                  <h3>
                    <Image src={client.logo} alt={client.name} width={160} height={48} className="client-logo" />
                  </h3>
                ) : (
                  <h3>{client.name}</h3>
                )}
                {client.note && <p className="client-note">{client.note}</p>}
              </div>
              <p className="client-kind">
                <span>{client.kind}</span>
                {client.place && <span>{client.place}</span>}
              </p>
              <div className="client-role">
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

        <div data-slot="clients-photo" className="slot-wide">
          <p>
            {t.ui.photoSlot}
            <br />
            <Copy value={t.ui.photoTodo} todoLabel={t.todoLabel} />
          </p>
        </div>
      </div>
    </section>
  );
}
