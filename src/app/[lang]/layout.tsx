import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import "./site.css";
import { getContent, isLocale, locales } from "@/content/site";
import { alternates, htmlLang, siteUrl } from "@/lib/i18n";
import { alegreya, alegreyaSans } from "@/fonts/b";
import { jetbrains } from "@/fonts/code";
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
    title: { default: t.meta.title, template: "%s — im-pro.tech" },
    description: t.meta.description,
    alternates: alternates(lang, "/"),
    openGraph: {
      type: "website",
      siteName: "im-pro.tech",
      locale: lang === "es" ? "es_CO" : "en_US",
      alternateLocale: lang === "es" ? ["en_US"] : ["es_CO"],
      title: t.meta.title,
      description: t.meta.description,
      url: alternates(lang, "/").canonical,
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#d9c9ad" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1a3a" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html
      lang={htmlLang[lang]}
      className={`${alegreya.variable} ${alegreyaSans.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
