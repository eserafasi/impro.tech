import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { getContent, isLocale, locales } from "@/content/site";
import { alternates, htmlLang, siteUrl } from "@/lib/i18n";
import { ThemeScript } from "@/components/shared/ThemeScript";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getContent(lang);
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.meta.title, template: `%s — im-pro.tech` },
    description: t.meta.description,
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      siteName: "im-pro.tech",
      locale: lang === "es" ? "es_CO" : "en_US",
      title: t.meta.title,
      description: t.meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1eee9" },
    { media: "(prefers-color-scheme: dark)", color: "#1b1917" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
