import { Compass, Lightbulb } from "lucide-react";
import { MarkdownRenderer } from "./markdown-renderer";
import { findIcon } from "@/lib/icons";

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
  const TitleIcon = findIcon(content) ?? Lightbulb;
  return (
    <aside className="context-card mental-model">
      <div className="context-card__title">
        <TitleIcon aria-hidden="true" />
        <span>Mental model</span>
      </div>
      <MarkdownRenderer content={content} compact />
    </aside>
  );
}
