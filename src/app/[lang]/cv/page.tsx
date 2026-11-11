import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent, isLocale, isTodo } from "@/content/site";
import { alternates, localePath } from "@/lib/i18n";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Copy } from "@/components/shared/Todo";
import "./cv.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/cv">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getContent(lang);
  return {
    title: t.meta.cvTitle,
    description: t.meta.cvDescription,
    alternates: alternates(lang, "/cv"),
  };
}

export default async function CvPage({ params }: PageProps<"/[lang]/cv">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);
  const cv = t.cv;
  const experience = t.timeline.entries.filter((e) => e.org !== cv.education.school);

  return (
    <>
      <SiteHeader t={t} lang={lang} path="/cv" />
      <main id="main" tabIndex={-1} className="cv">
        <article className="container cv-sheet">
          <header className="cv-head">
            <div>
              <h1 className="cv-name">{cv.title}</h1>
              <p className="cv-tagline">{t.hero.tagline}</p>
              <p className="where">
                <span>{t.hero.place}</span>
                <span className="num">{t.hero.timezone}</span>
              </p>
            </div>
            <a className="btn btn-primary cv-download" href={cv.pdfPath} download>
              {cv.download}
            </a>
          </header>

          <Copy as="p" value={cv.summary} todoLabel={t.todoLabel} className="cv-summary" />

          <section aria-labelledby="cv-now" className="cv-section">
            <h2 id="cv-now" className="cv-h2">
              {cv.sections.current}
            </h2>
            <CvEntry entry={cv.current} />
          </section>

          <section aria-labelledby="cv-exp" className="cv-section">
            <h2 id="cv-exp" className="cv-h2">
              {cv.sections.experience}
            </h2>
            {experience.map((e) => (
              <CvEntry key={e.org} entry={e} />
            ))}
          </section>

          <section aria-labelledby="cv-edu" className="cv-section">
            <h2 id="cv-edu" className="cv-h2">
              {cv.sections.education}
            </h2>
            <div className="cv-entry">
              <p className="cv-dates num">{cv.education.year}</p>
              <div>
                <h3 className="cv-org">{cv.education.school}</h3>
                <p className="cv-role">{cv.education.degree}</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="cv-skills" className="cv-section">
            <h2 id="cv-skills" className="cv-h2">
              {cv.sections.skills}
            </h2>
            <ul className="cv-tags">
              {[...t.stack.tools, ...t.stack.supabaseFeatures.map((f) => `Supabase ${f}`)].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <Copy as="p" value={cv.skills} todoLabel={t.todoLabel} className="cv-skills-todo" />
          </section>

          <section aria-labelledby="cv-contact" className="cv-section">
            <h2 id="cv-contact" className="cv-h2">
              {cv.sections.contact}
            </h2>
            <ul className="cv-contact">
              <li>
                {isTodo(t.contact.email) ? (
                  <Copy value={t.contact.email} todoLabel={t.todoLabel} />
                ) : (
                  <a href={`mailto:${t.contact.email}`}>{t.contact.email}</a>
                )}
              </li>
              <li>
                <a href="https://im-pro.tech">im-pro.tech</a>
              </li>
              <li>
                <a href={t.openImpro.repoLink.href}>{t.openImpro.repoLink.label}</a>
              </li>
            </ul>
          </section>

          <p className="cv-back">
            <Link href={localePath(lang, "/")}>{cv.back}</Link>
          </p>
        </article>
      </main>
    </>
  );
}

function CvEntry({ entry }: { entry: { org: string; dates: string; place?: string; role: string; points: string[] } }) {
  return (
    <div className="cv-entry">
      <p className="cv-dates num">{entry.dates}</p>
      <div>
        <h3 className="cv-org">{entry.org}</h3>
        <p className="cv-role">
          <span>{entry.role}</span>
          {entry.place && <span>{entry.place}</span>}
        </p>
        {entry.points.length > 0 && (
          <ul className="cv-points">
            {entry.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
