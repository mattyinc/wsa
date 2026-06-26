import { Compass, Lightbulb } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";

export function MentorNote({ content }: { content: string }) {
  if (!content) return null;
  return (
    <aside className="context-card mentor-note">
      <div className="context-card__title">
        <Compass aria-hidden="true" />
        <span>Mentor note</span>
      </div>
      <MarkdownRenderer content={content} compact />
    </aside>
  );
}

export function MentalModelCard({ content }: { content: string }) {
  if (!content) return null;
  return (
    <aside className="context-card mental-model">
      <div className="context-card__title">
        <Lightbulb aria-hidden="true" />
        <span>Mental model</span>
      </div>
      <MarkdownRenderer content={content} compact />
    </aside>
  );
}
