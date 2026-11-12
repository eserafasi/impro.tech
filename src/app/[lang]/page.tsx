import { notFound } from "next/navigation";
import { getContent, isLocale } from "@/content/site";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Clients } from "@/components/sections/Clients";
import { CaseInspira } from "@/components/sections/CaseInspira";
import { OpenImpro } from "@/components/sections/OpenImpro";
import { BuiltOnSupabase } from "@/components/sections/BuiltOnSupabase";
import { Founder } from "@/components/sections/Founder";
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
        <OpenImpro {...props} />
        <BuiltOnSupabase {...props} />
        <Founder {...props} />
      </main>
      <Contact {...props} />
    </>
  );
}
