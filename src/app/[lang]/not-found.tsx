import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import { defaultLocale, getContent, isLocale } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { SiteHeader } from "@/components/layout/SiteHeader";

export default async function NotFound() {
  const raw = await rootLang();
  const lang = isLocale(raw) ? raw : defaultLocale;
  const t = getContent(lang);

  return (
    <>
      <SiteHeader t={t} lang={lang} path="/" />
      <main id="main" tabIndex={-1} className="notfound">
        <div className="container">
          <h1 className="h2">{t.notFound.title}</h1>
          <p className="intro">{t.notFound.body}</p>
          <Link className="btn btn-primary" href={localePath(lang, "/")}>
            {t.notFound.back}
          </Link>
        </div>
      </main>
    </>
  );
}
