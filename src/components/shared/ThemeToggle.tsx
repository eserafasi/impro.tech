"use client";

import { useSyncExternalStore } from "react";

type Mode = "system" | "light" | "dark";
const order: Mode[] = ["system", "light", "dark"];

type Props = {
  labels: { label: string; light: string; dark: string; system: string };
  className?: string;
};

const listeners = new Set<() => void>();

function read(): Mode {
  const t = document.documentElement.dataset.theme;
  return t === "light" || t === "dark" ? t : "system";
}

function write(mode: Mode) {
  const root = document.documentElement;
  if (mode === "system") delete root.dataset.theme;
  else root.dataset.theme = mode;
  try {
    if (mode === "system") localStorage.removeItem("theme");
    else localStorage.setItem("theme", mode);
  } catch {
    /* storage blocked: the choice still applies for this visit */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function ThemeToggle({ labels, className }: Props) {
  const mode = useSyncExternalStore(subscribe, read, () => "system" as Mode);
  const next = order[(order.indexOf(mode) + 1) % order.length];

  return (
    <button
      type="button"
      className={className}
      onClick={() => write(next)}
      aria-label={`${labels.label}: ${labels[mode]}`}
    >
      <ThemeIcon mode={mode} />
      <span>{labels[mode]}</span>
    </button>
  );
}

function ThemeIcon({ mode }: { mode: Mode }) {
  const common = {
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
  } as const;
  if (mode === "light")
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="8" cy="8" r="3" />
        <path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1 1M11.6 11.6l1 1M3.4 12.6l1-1M11.6 4.4l1-1" />
      </svg>
    );
  if (mode === "dark")
    return (
      <svg {...common} aria-hidden="true">
        <path d="M13 9.5A5.5 5.5 0 0 1 6.5 3a5.5 5.5 0 1 0 6.5 6.5Z" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden="true">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 2.5v11" />
      <path d="M8 2.5a5.5 5.5 0 0 1 0 11Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
