import { ClipboardCheck } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";

export function AssignmentPanel({ content }: { content: string }) {
  if (!content) return null;
  return (
    <section className="assignment-panel" aria-labelledby="assignment-title">
      <div className="panel-heading">
        <div className="panel-heading__icon">
          <ClipboardCheck aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Desk assignment</p>
          <h2 id="assignment-title">Think like an analyst</h2>
        </div>
      </div>
      <MarkdownRenderer content={content} compact />
    </section>
  );
}
