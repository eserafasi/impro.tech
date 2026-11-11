import { defaultLocale, locales, type Locale } from "@/content/site";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://im-pro.tech").replace(/\/$/, "");

/** Public path for a page in a locale. `path` is locale-free and starts with "/". */
export function localePath(locale: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path;
  if (locale === defaultLocale) return clean || "/";
  return `/${locale}${clean}`;
}

export const otherLocale = (locale: Locale): Locale => (locale === "en" ? "es" : "en");

/** hreflang alternates for the Metadata API. */
export function alternates(locale: Locale, path: string = "/") {
  const languages: Record<string, string> = {};
  for (const l of locales) languages[l] = `${siteUrl}${localePath(l, path)}`;
  languages["x-default"] = `${siteUrl}${localePath(defaultLocale, path)}`;
  return { canonical: `${siteUrl}${localePath(locale, path)}`, languages };
}

export const htmlLang: Record<Locale, string> = { en: "en", es: "es-CO" };
