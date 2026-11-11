import type { SectionProps } from "./types";

/**
 * Open Impro: the people side (community, the network graph) on tapia,
 * the technology side (ticketing, dashboards, the repo) in an añil door.
 */
export function OpenImpro({ t }: SectionProps) {
  const o = t.openImpro;
  const [ticketing, dashboards, network] = o.pillars;
  return (
    <section className="openimpro section band" aria-labelledby="openimpro-title">
      <div className="container">
        <div className="section-head">
          <h2 id="openimpro-title" className="h2">
            {o.title}
          </h2>
          <p className="intro">{o.lede}</p>
        </div>

        <div className="openimpro-grid">
          <div className="openimpro-people">
            <h3 className="h3">{network.title}</h3>
            <p>{network.body}</p>
            <p className="openimpro-today">{o.today}</p>
            <a className="openimpro-site" href={o.siteLink.href} rel="noopener">
              {o.siteLink.label}
            </a>
          </div>

          <div className="door openimpro-tech">
            <ul className="door-panels door-panels-text">
              {[ticketing, dashboards].map((p) => (
                <li key={p.title}>
                  <h3 className="h3 tech">{p.title}</h3>
                  <p>{p.body}</p>
                </li>
              ))}
            </ul>
            <p className="openimpro-repo">
              {o.repoStatus}{" "}
              <a href={o.repoLink.href} rel="noopener">
                {o.repoLink.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
