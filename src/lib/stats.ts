import "server-only";

export type TicketStat =
  | { source: "supabase"; value: number }
  | { source: "fallback"; value: number | null };

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

/** Headers for the Data API with the public anon / publishable key only. */
export function anonHeaders(key: string): HeadersInit {
  // Legacy anon keys are JWTs and also go in Authorization; new
  // sb_publishable_ keys must only be sent as `apikey`.
  return key.startsWith("eyJ") ? { apikey: key, Authorization: `Bearer ${key}` } : { apikey: key };
}

/**
 * Reads public.site_stats (aggregate-only view). Never throws: any failure,
 * or missing env vars, returns the static fallback from site.ts.
 */
export async function getTicketsThisMonth(fallback: number | null): Promise<TicketStat> {
  if (!hasSupabase) return { source: "fallback", value: fallback };
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/site_stats?select=tickets_this_month`, {
      headers: anonHeaders(supabaseAnonKey),
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return { source: "fallback", value: fallback };
    const rows = (await res.json()) as { tickets_this_month: number | string }[];
    const value = Number(rows[0]?.tickets_this_month);
    return Number.isFinite(value) ? { source: "supabase", value } : { source: "fallback", value: fallback };
  } catch {
    return { source: "fallback", value: fallback };
  }
}
