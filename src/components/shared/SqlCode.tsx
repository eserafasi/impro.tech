import type { ReactNode } from "react";

/**
 * Tiny server-side SQL highlighter: zero client JS. Good enough for one
 * illustrative snippet; not a general parser.
 */
const KEYWORDS = new Set(
  "with as select from where and group by order limit over sum count round rank interval now desc asc".split(" "),
);

export function SqlCode({ code, className }: { code: string; className?: string }) {
  const lines = code.split("\n");
  return (
    <pre className={className} tabIndex={0}>
      <code>
        {lines.map((line, i) => (
          <span className="sql-line" key={i}>
            {highlight(line)}
            {"\n"}
          </span>
        ))}
      </code>
    </pre>
  );
}

function highlight(line: string): ReactNode[] {
  const commentAt = line.indexOf("--");
  const body = commentAt >= 0 ? line.slice(0, commentAt) : line;
  const comment = commentAt >= 0 ? line.slice(commentAt) : "";
  const out: ReactNode[] = [];
  const re = /('[^']*'|\b\d+(?:\.\d+)?\b|\b[a-z_]+\b|[^'\w]+)/gi;
  let m: RegExpExecArray | null;
  let k = 0;
  while ((m = re.exec(body))) {
    const t = m[0];
    if (t.startsWith("'")) out.push(<span className="sql-str" key={k++}>{t}</span>);
    else if (/^\d/.test(t)) out.push(<span className="sql-num" key={k++}>{t}</span>);
    else if (KEYWORDS.has(t.toLowerCase())) out.push(<span className="sql-kw" key={k++}>{t}</span>);
    else out.push(t);
  }
  if (comment) out.push(<span className="sql-comment" key={k++}>{comment}</span>);
  return out;
}
