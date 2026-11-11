import { Alegreya, Alegreya_Sans } from "next/font/google";

// Direction B — the Barichara door.

export const alegreya = Alegreya({
  subsets: ["latin"],
  variable: "--font-alegreya",
  display: "swap",
});

export const alegreyaSans = Alegreya_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-alegreya-sans",
  display: "swap",
});
