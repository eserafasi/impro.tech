import type { SectionProps } from "./types";

export function Hero({ t }: SectionProps) {
  const h = t.hero;
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div className="hero-text">
          <h1 id="hero-title" className="display">
            <span>{h.name}</span>
            <span className="visually-hidden">, </span>
            <span className="display-brand">{h.brand}</span>
          </h1>
          <p className="lead">{h.tagline}</p>
          <div className="actions">
            <a className="btn btn-primary" href="#work">
              {h.ctaWork}
            </a>
            <a className="btn btn-secondary" href="#contact">
              {h.ctaContact}
            </a>
          </div>
          <p className="where">
            <span>{h.place}</span>
            <span className="num">{h.timezone}</span>
          </p>
        </div>

        {/* The door: its panels are the real Supabase feature list from site.ts */}
        <div className="door" role="group" aria-labelledby="door-title">
          <p id="door-title" className="door-title">
            {t.stack.supabaseLabel}
          </p>
          <ul className="door-panels">
            {t.stack.supabaseFeatures.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
