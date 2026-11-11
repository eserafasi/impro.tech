import Link from "next/link";
import type { Locale, SiteContent } from "@/content/site";
import { localePath, otherLocale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

type Props = {
  t: SiteContent;
  lang: Locale;
  direction: "a" | "b";
  /** Prefix for the direction's own class names, e.g. "a" -> "a-header". */
};

export function LabHeader({ t, lang, direction }: Props) {
  const other = direction === "a" ? "b" : "a";
  const path = `/lab/${direction}`;
  const p = direction;

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <div className={`${p}-labbar`}>
        <div className="container">
          <p>
            <span>{direction === "a" ? t.lab.a : t.lab.b}</span>
            <Link href={localePath(lang, `/lab/${other}`)}>
              {t.lab.compare} {other === "a" ? t.lab.a : t.lab.b}
            </Link>
          </p>
        </div>
      </div>
      <header className={`${p}-header`}>
        <div className="container">
          <Link href={localePath(lang, path)} className={`${p}-wordmark`}>
            {t.hero.brand}
          </Link>
          <nav aria-label="Main">
            <ul>
              <li>
                <a href="#work">{t.nav.work}</a>
              </li>
              <li>
                <a href={localePath(lang, "/cv")}>{t.nav.cv}</a>
              </li>
              <li>
                <Link
                  href={localePath(otherLocale(lang), path)}
                  hrefLang={otherLocale(lang)}
                  lang={otherLocale(lang)}
                >
                  {t.nav.otherLanguage}
                </Link>
              </li>
              <li>
                <ThemeToggle labels={t.nav.theme} className={`${p}-theme`} />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
