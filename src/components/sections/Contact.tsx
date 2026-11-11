import { isTodo } from "@/content/site";
import { Copy } from "@/components/shared/Todo";
import type { SectionProps } from "./types";

export function Contact({ t }: SectionProps) {
  const c = t.contact;
  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <div className="container">
        <h2 id="contact-title" className="h2 tech">
          {c.title}
        </h2>
        <p className="intro">{c.lede}</p>
        <p className="contact-email">
          <span className="visually-hidden">{c.emailLabel}: </span>
          {isTodo(c.email) ? (
            <Copy value={c.email} todoLabel={t.todoLabel} />
          ) : (
            <a href={`mailto:${c.email}`}>{c.email}</a>
          )}
        </p>
        <ul className="contact-links">
          {c.links.map((l) => (
            <li key={l.href}>
              <a href={l.href} rel="noopener me">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="footer-line">{t.ui.footer}</p>
      </div>
    </footer>
  );
}
