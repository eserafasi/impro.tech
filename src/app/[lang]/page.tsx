import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Clients } from "@/components/sections/Clients";
import { CaseInspira } from "@/components/sections/CaseInspira";
import { CaseIncident } from "@/components/sections/CaseIncident";
import { OpenImpro } from "@/components/sections/OpenImpro";
import { BuiltOnSupabase } from "@/components/sections/BuiltOnSupabase";
import { Timeline } from "@/components/sections/Timeline";
import { BeyondCode } from "@/components/sections/BeyondCode";
import { Contact } from "@/components/sections/Contact";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);
  const props = { t, lang };

  return (
    <>
      <SiteHeader t={t} lang={lang} path="/" home />
      <main id="main" tabIndex={-1}>
        <Hero {...props} />
        <Services {...props} />
        <Clients {...props} />
        <CaseInspira {...props} />
        <CaseIncident {...props} />
        <OpenImpro {...props} />
        <BuiltOnSupabase {...props} />
        <Timeline {...props} />
        <BeyondCode {...props} />
      </main>
      <Contact {...props} />
    </>
  );
}
