import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content/site";
import { alternates } from "@/lib/i18n";
import { alegreya, alegreyaSans } from "@/fonts/b";
import { jetbrains } from "@/fonts/code";
import { LabHeader } from "@/components/lab/LabHeader";
import { DoorClients, DoorHero, DoorIncident } from "@/components/lab/b/Door";
import "./b.css";

export async function generateMetadata({ params }: PageProps<"/[lang]/lab/b">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: getContent(lang).lab.b,
    robots: { index: false, follow: false },
    alternates: alternates(lang, "/lab/b"),
  };
}

export default async function LabB({ params }: PageProps<"/[lang]/lab/b">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <div className={`dir-b ${alegreya.variable} ${alegreyaSans.variable} ${jetbrains.variable}`}>
      <LabHeader t={t} lang={lang} direction="b" />
      <main id="main" tabIndex={-1}>
        <DoorHero t={t} lang={lang} />
        <DoorIncident t={t} lang={lang} />
        <DoorClients t={t} lang={lang} />
      </main>
    </div>
  );
}
