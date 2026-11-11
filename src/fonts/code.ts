import { JetBrains_Mono } from "next/font/google";

/** Code only. Not preloaded: below the fold. */
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
});
