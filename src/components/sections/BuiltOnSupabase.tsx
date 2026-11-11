import { Suspense } from "react";
import { Copy } from "@/components/shared/Todo";
import { LiveCounter } from "@/components/shared/LiveCounter";
import { getTicketsThisMonth, hasSupabase, supabaseAnonKey, supabaseUrl } from "@/lib/stats";
import { htmlLang } from "@/lib/i18n";
import type { SectionProps } from "./types";

export function BuiltOnSupabase({ t, lang }: SectionProps) {
  const s = t.stack;
  return (
    <section className="stack door-section" aria-labelledby="stack-title">
      <div className="container">
        <div className="section-head">
          <h2 id="stack-title" className="h2 tech">
            {s.title}
          </h2>
          <p className="intro">{s.lede}</p>
        </div>

        <div className="stack-grid">
          <div className="panel stack-counter">
            <Suspense fallback={<CounterShell t={t} lang={lang} />}>
              <Counter t={t} lang={lang} />
            </Suspense>
            <p className="counter-label">{s.counter.label}</p>
          </div>

          <div className="panel stack-tools">
            <ul className="tool-list">
              {s.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h3 className="h3 tech">{s.ai.title}</h3>
            <ul className="tool-list tool-list-inline">
              {s.ai.tools.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
            <p>{s.ai.body}</p>
          </div>

          <div className="panel">
            <h3 className="h3 tech">{s.cycle.title}</h3>
            <p>{s.cycle.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Streams in after the static shell: the only dynamic read on the page. */
async function Counter({ t, lang }: SectionProps) {
  const c = t.stack.counter;
  const stat = await getTicketsThisMonth(c.fallbackValue);
  return (
    <LiveCounter
      initial={stat.value}
      enabled={hasSupabase && stat.source === "supabase"}
      url={supabaseUrl}
      anonKey={supabaseAnonKey}
      labels={{ live: c.live, connecting: c.connecting, polling: c.polling, fallback: c.fallback }}
      empty={<Copy value={c.fallbackTodo} todoLabel={t.todoLabel} as="p" />}
      locale={htmlLang[lang]}
    />
  );
}

function CounterShell({ t, lang }: SectionProps) {
  const c = t.stack.counter;
  return (
    <div className="counter">
      {c.fallbackValue === null ? (
        <Copy value={c.fallbackTodo} todoLabel={t.todoLabel} as="p" />
      ) : (
        <p className="counter-value num">{c.fallbackValue.toLocaleString(htmlLang[lang])}</p>
      )}
      <p className="counter-status">{c.connecting}</p>
    </div>
  );
}
