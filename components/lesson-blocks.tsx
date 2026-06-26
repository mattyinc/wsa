import {
  AlertTriangle,
  BookOpenText,
  Brain,
  BriefcaseBusiness,
  CircleHelp,
  Compass,
  Lightbulb,
  LineChart,
  ListChecks,
  Pause,
  Route,
  ScrollText,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";
import { MarkdownRenderer } from "./markdown-renderer";

function BlockShell({
  children,
  className,
  icon,
  label,
  showKicker = true,
  title,
}: {
  children: ReactNode;
  className: string;
  icon: ReactNode;
  label: string;
  showKicker?: boolean;
  title?: string;
}) {
  return (
    <section className={`lesson-block ${className}`}>
      {showKicker ? (
        <div className="lesson-block__kicker">
          {icon}
          <span>{label}</span>
        </div>
      ) : null}
      {title ? <h2>{title}</h2> : null}
      {children}
    </section>
  );
}

export function Question({ children }: { children: string }) {
  return (
    <section className="lesson-block lesson-block--question">
      <div className="lesson-block__kicker">
        <CircleHelp aria-hidden="true" />
        <span>Opening question</span>
      </div>
      <MarkdownRenderer content={children} compact editorial />
    </section>
  );
}

export function Story({ children, title }: { children: string; title: string }) {
  return (
    <BlockShell
      className="lesson-block--story"
      icon={<BookOpenText aria-hidden="true" />}
      label="Story"
      showKicker={false}
      title={title}
    >
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function ImportantNote({ children, title }: { children: string; title: string }) {
  return (
    <BlockShell
      className="lesson-block--important"
      icon={<Lightbulb aria-hidden="true" />}
      label="Important note"
      title={title}
    >
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function CoreLesson({ children, title }: { children: string; title: string }) {
  return (
    <BlockShell
      className="lesson-block--core"
      icon={<ScrollText aria-hidden="true" />}
      label="Core lesson"
      showKicker={false}
      title={title}
    >
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function Think({ prompt }: { prompt: string }) {
  return (
    <section className="lesson-block lesson-block--think">
      <div className="lesson-block__kicker">
        <Pause aria-hidden="true" />
        <span>Pause and think</span>
      </div>
      <p>{prompt}</p>
    </section>
  );
}

export function MentalModelBlock({ children, title }: { children: string; title: string }) {
  return (
    <BlockShell
      className="lesson-block--mental"
      icon={<Brain aria-hidden="true" />}
      label="Mental model"
      title={title}
    >
      <div className="mental-illustration" aria-hidden="true">
        <span />
        <i />
        <b />
      </div>
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function WallStreetPerspective({ children }: { children: string }) {
  return (
    <BlockShell
      className="lesson-block--wall-street"
      icon={<BriefcaseBusiness aria-hidden="true" />}
      label="Wall Street perspective"
      title="How professionals think"
    >
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function CaseStudy({ children, title }: { children: string; title: string }) {
  return (
    <BlockShell
      className="lesson-block--case"
      icon={<Compass aria-hidden="true" />}
      label="Case study"
      title={title}
    >
      <div className="case-study-layout">
        <div className="case-study-timeline" aria-hidden="true">
          <span>Observe</span>
          <span>Compare</span>
          <span>Conclude</span>
        </div>
        <MarkdownRenderer content={children} compact editorial />
      </div>
    </BlockShell>
  );
}

export function ApplicationBlock({ children, title }: { children: string; title: string }) {
  return (
    <BlockShell
      className="lesson-block--application"
      icon={<ListChecks aria-hidden="true" />}
      label="Apply it"
      showKicker={false}
      title={title}
    >
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function Watchlist({ children, title }: { children: string; title: string }) {
  return (
    <BlockShell
      className="lesson-block--watchlist"
      icon={<AlertTriangle aria-hidden="true" />}
      label="Watchlist"
      showKicker={false}
      title={title}
    >
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function DidYouKnow({ children }: { children: string }) {
  return (
    <details className="lesson-block lesson-block--fact">
      <summary>
        <span className="lesson-block__kicker">
          <Sparkles aria-hidden="true" />
          <span>Did you know?</span>
        </span>
        <strong>Open the Wall Street minute</strong>
      </summary>
      <MarkdownRenderer content={children} compact editorial />
    </details>
  );
}

export function LookingAhead({ children }: { children: string }) {
  return (
    <BlockShell
      className="lesson-block--ahead"
      icon={<Route aria-hidden="true" />}
      label="Looking ahead"
      showKicker={false}
      title="What this unlocks next"
    >
      <MarkdownRenderer content={children} compact editorial />
    </BlockShell>
  );
}

export function Summary({ takeaways }: { takeaways: string[] }) {
  if (!takeaways.length) return null;

  return (
    <section className="lesson-block lesson-block--summary">
      <div className="lesson-block__kicker">
        <LineChart aria-hidden="true" />
        <span>Summary</span>
      </div>
      <h2>Five ideas to keep</h2>
      <ol>
        {takeaways.slice(0, 5).map((takeaway) => (
          <li key={takeaway}>{takeaway}</li>
        ))}
      </ol>
    </section>
  );
}
