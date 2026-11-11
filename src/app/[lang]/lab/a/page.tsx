import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content/site";
import { alternates } from "@/lib/i18n";
import { piazzolla, shantell } from "@/fonts/a";
import { jetbrains } from "@/fonts/code";
import { LabHeader } from "@/components/lab/LabHeader";
import { PromptBookClients, PromptBookHero, PromptBookIncident } from "@/components/lab/a/PromptBook";
import "./a.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/lab/a">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getContent(lang).lab.a,
    robots: { index: false, follow: false },
    alternates: alternates(lang, "/lab/a"),
  };
}

export default async function LabA({ params }: PageProps<"/[lang]/lab/a">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <div className={`dir-a ${piazzolla.variable} ${shantell.variable} ${jetbrains.variable}`}>
      <LabHeader t={t} lang={lang} direction="a" />
      <main id="main" tabIndex={-1}>
        <PromptBookHero t={t} lang={lang} />
        <PromptBookIncident t={t} lang={lang} />
        <PromptBookClients t={t} lang={lang} />
      </main>
    </div>
  );
}
