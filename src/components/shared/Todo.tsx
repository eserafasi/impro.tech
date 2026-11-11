import { isTodo } from "@/content/site";

/**
 * Renders copy, or a visible dashed placeholder when the copy is still a
 * "TODO:" in site.ts. Never hides a missing fact.
 */
export function Copy({
  value,
  todoLabel,
  as: Tag = "span",
  className,
}: {
  value: string;
  todoLabel: string;
  as?: "span" | "p" | "div";
  className?: string;
}) {
  if (!isTodo(value)) return <Tag className={className}>{value}</Tag>;
  return (
    <Tag className={`todo ${className ?? ""}`}>
      <strong className="todo-label">{todoLabel}</strong> {value.replace(/^\s*TODO:\s*/, "")}
    </Tag>
  );
}
