import type { MetadataRoute } from "next";
import { locales } from "@/content/site";
import { localePath, siteUrl } from "@/lib/i18n";

const paths = ["/"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      changeFrequency: "weekly" as const,
      priority: 1,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`])),
      },
    })),
  );
}
