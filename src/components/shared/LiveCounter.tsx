"use client";

import { useEffect, useRef, useState } from "react";

type Status = "connecting" | "live" | "polling" | "static";

type Props = {
  initial: number | null;
  /** false when env vars are missing or the server read failed: no client work at all. */
  enabled: boolean;
  url: string;
  anonKey: string;
  labels: { live: string; connecting: string; polling: string; fallback: string };
  /** Rendered when there is no number at all (the TODO from site.ts). */
  empty: React.ReactNode;
  /** BCP 47 locale for number formatting, so server and client agree. */
  locale: string;
};

const POLL_MS = 60_000;

/**
 * Shows the server-rendered count immediately, then, only when the counter
 * nears the viewport, lazy-loads supabase-js and listens on the private
 * Realtime Broadcast channel "site-stats". If Realtime fails, it polls the
 * aggregate view once a minute. Uses the anon key only.
 */
export function LiveCounter({ initial, enabled, url, anonKey, labels, empty, locale }: Props) {
  const [value, setValue] = useState(initial);
  const [status, setStatus] = useState<Status>(enabled ? "connecting" : "static");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    let poll: ReturnType<typeof setInterval> | undefined;

    const headers: HeadersInit = anonKey.startsWith("eyJ")
      ? { apikey: anonKey, Authorization: `Bearer ${anonKey}` }
      : { apikey: anonKey };

    const startPolling = () => {
      if (poll || cancelled) return;
      setStatus("polling");
      poll = setInterval(async () => {
        try {
          const res = await fetch(`${url}/rest/v1/site_stats?select=tickets_this_month`, { headers });
          if (!res.ok) return;
          const rows = (await res.json()) as { tickets_this_month: number | string }[];
          const n = Number(rows[0]?.tickets_this_month);
          if (Number.isFinite(n)) setValue(n);
        } catch {
          /* keep the last good number */
        }
      }, POLL_MS);
    };

    const connect = async () => {
      try {
        const { createClient } = await import("@supabase/supabase-js");
        if (cancelled) return;
        const supabase = createClient(url, anonKey, { auth: { persistSession: false } });
        await supabase.realtime.setAuth();
        const channel = supabase
          .channel("site-stats", { config: { private: true } })
          .on("broadcast", { event: "tickets_this_month" }, ({ payload }) => {
            const n = Number((payload as { tickets_this_month?: unknown }).tickets_this_month);
            if (Number.isFinite(n)) setValue(n);
          })
          .subscribe((s) => {
            if (cancelled) return;
            if (s === "SUBSCRIBED") setStatus("live");
            else if (s === "CHANNEL_ERROR" || s === "TIMED_OUT") {
              // Stop the socket's reconnect loop; polling takes over.
              void supabase.removeAllChannels();
              startPolling();
            }
          });
        cleanup = () => {
          void supabase.removeChannel(channel);
        };
      } catch {
        startPolling();
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          void connect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(ref.current);

    return () => {
      cancelled = true;
      io.disconnect();
      if (poll) clearInterval(poll);
      cleanup?.();
    };
  }, [enabled, url, anonKey]);

  const statusLabel = {
    live: labels.live,
    connecting: labels.connecting,
    polling: labels.polling,
    static: labels.fallback,
  }[status];

  return (
    <div ref={ref} className="counter">
      {value === null ? (
        empty
      ) : (
        <p className="counter-value num" aria-live="polite" aria-atomic="true">
          {value.toLocaleString(locale)}
        </p>
      )}
      <p className={`counter-status counter-${status}`}>
        {statusLabel}
      </p>
    </div>
  );
}
