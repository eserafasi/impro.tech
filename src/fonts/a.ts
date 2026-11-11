import { Piazzolla, Shantell_Sans } from "next/font/google";

// Direction A — the prompt book. next/font self-hosts these at build time
// (no runtime request to Google) with metric-matched fallbacks (no CLS).
// "latin" already covers Spanish (á, é, í, ó, ú, ñ, ¿, ¡).

export const piazzolla = Piazzolla({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-piazzolla",
  display: "swap",
});

/** Margin notes only. Not preloaded: never the LCP element. */
export const shantell = Shantell_Sans({
  subsets: ["latin"],
  axes: ["INFM", "BNCE"],
  variable: "--font-shantell",
  display: "swap",
  preload: false,
});
