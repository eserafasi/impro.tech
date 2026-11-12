import { ImageResponse } from "next/og";
import { defaultLocale, getContent, isLocale } from "@/content/site";

export const alt = "im-pro.tech";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs literal colours: these mirror the light tokens in globals.css.
const C = {
  paper: "#d9c9ad",
  ink: "#2b2017",
  ink2: "#3f3226",
  door: "#23468f",
  doorLine: "#8aa3d8",
  doorInk: "#f4eee2",
};

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const t = getContent(isLocale(lang) ? lang : defaultLocale);
  const features = t.stack.supabaseFeatures.slice(0, 6);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.paper, padding: 64, gap: 56 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flex: 7 }}>
          <div style={{ fontSize: 96, fontWeight: 700, color: C.ink, lineHeight: 1 }}>{t.hero.brand}</div>
          <div style={{ fontSize: 32, color: C.ink2, marginTop: 36, lineHeight: 1.35 }}>{t.hero.tagline}</div>
        </div>
        <div
          style={{
            flex: 5,
            display: "flex",
            flexWrap: "wrap",
            alignContent: "flex-start",
            gap: 14,
            background: C.door,
            padding: 28,
            border: `2px solid ${C.doorLine}`,
          }}
        >
          <div style={{ width: "100%", color: C.doorLine, fontSize: 22, marginBottom: 6 }}>{t.stack.supabaseLabel}</div>
          {features.map((f) => (
            <div
              key={f}
              style={{
                width: 190,
                height: 118,
                display: "flex",
                alignItems: "flex-end",
                padding: 16,
                border: `2px solid ${C.doorLine}`,
                color: C.doorInk,
                fontSize: 26,
              }}
            >
              {f}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
