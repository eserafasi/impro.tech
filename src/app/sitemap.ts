import type { MetadataRoute } from "next";
import { locales } from "@/content/site";
import { localePath, siteUrl } from "@/lib/i18n";

const paths = ["/", "/cv"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localePath(locale, path)}`,
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${siteUrl}${localePath(l, path)}`])),
      },
    })),
  );
}
