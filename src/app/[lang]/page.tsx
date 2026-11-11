import type { Metadata } from "next";
import Link from "next/link";
import { getContent, isLocale } from "@/content/site";
import { localePath } from "@/lib/i18n";
import { piazzolla } from "@/fonts/a";
import { notFound } from "next/navigation";

// Temporary index while the two directions are being compared.
// Replaced by the full single-page site once a direction is chosen.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getContent(lang);

  return (
    <main className={`dir-a ${piazzolla.variable} container`} style={{ paddingBlock: "var(--space-3xl)" }}>
      <h1 style={{ fontSize: "var(--text-section)" }}>
        {t.hero.name} <span aria-hidden="true">—</span> {t.hero.brand}
      </h1>
      <ul style={{ marginTop: "var(--space-xl)", display: "grid", gap: "var(--space-md)", fontSize: "var(--text-lg)" }}>
        <li>
          <Link href={localePath(lang, "/lab/a")}>{t.lab.a}</Link>
        </li>
        <li>
          <Link href={localePath(lang, "/lab/b")}>{t.lab.b}</Link>
        </li>
      </ul>
    </main>
  );
}
