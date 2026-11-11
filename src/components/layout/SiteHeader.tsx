import Link from "next/link";
import type { Locale, SiteContent } from "@/content/site";
import { localePath, otherLocale } from "@/lib/i18n";
import { ThemeToggle } from "@/components/shared/ThemeToggle";

type Props = {
  t: SiteContent;
  lang: Locale;
  /** Locale-free path of the current page, so the language link keeps your place. */
  path: string;
  /** On the home page "Work" and "Contact" are in-page anchors. */
  home?: boolean;
};

export function SiteHeader({ t, lang, path, home = false }: Props) {
  const other = otherLocale(lang);
  const anchor = (id: string) => (home ? `#${id}` : `${localePath(lang, "/")}#${id}`);

  return (
    <>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <header className="site-header">
        <div className="container">
          <Link href={localePath(lang, "/")} className="wordmark">
            {t.hero.brand}
          </Link>
          <nav aria-label={t.nav.home}>
            <ul>
              <li>
                <a href={anchor("work")}>{t.nav.work}</a>
              </li>
              <li>
                <Link href={localePath(lang, "/cv")}>{t.nav.cv}</Link>
              </li>
              <li>
                <a href={anchor("contact")}>{t.nav.contact}</a>
              </li>
              <li>
                <Link href={localePath(other, path)} hrefLang={other} lang={other}>
                  {t.nav.otherLanguage}
                </Link>
              </li>
              <li>
                <ThemeToggle labels={t.nav.theme} className="theme-toggle" />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
