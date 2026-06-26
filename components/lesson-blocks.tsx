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
  const comparison = parseComparisonSections(children, { exactSectionCount: 2 });

  return (
    <BlockShell
      className={`lesson-block--core ${comparison ? "lesson-block--comparison" : ""}`}
      icon={<ScrollText aria-hidden="true" />}
      label="Core lesson"
      showKicker={false}
      title={title}
    >
      {comparison ? (
        <ComparisonLayout comparison={comparison} />
      ) : (
        <MarkdownRenderer content={children} compact editorial />
      )}
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

type ComparisonContent = {
  intro: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
  prompt: string;
};

const comparisonPromptPattern =
  /^(After .+?:|During\b|If you\b|Should\b|Who\b|Would\b|Which\b|There is\b)/im;

function parseSubheadings(markdown: string) {
  const headings = [...markdown.matchAll(/^###\s+(.+?)\s*$/gm)].map((match) => ({
    title: match[1].trim(),
    index: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }));

  if (headings.length < 2) return null;

  const intro = markdown.slice(0, headings[0].index).trim();
  let prompt = "";
  const sections = headings.map((heading, index) => {
    const next = headings[index + 1];
    let body = markdown.slice(heading.end, next?.index).trim();

    if (!next) {
      const promptMatch = comparisonPromptPattern.exec(body);
      if (promptMatch) {
        prompt = body.slice(promptMatch.index).trim();
        body = body.slice(0, promptMatch.index).trim();
      }
    }

    return {
      title: heading.title,
      body,
    };
  });

  return { intro, sections, prompt };
}

function parseBareLabelComparison(markdown: string) {
  const labelPattern = /^(Country\s+[A-Z])\s*$/gim;
  const labels = [...markdown.matchAll(labelPattern)].map((match) => ({
    title: match[1].trim(),
    index: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }));

  if (labels.length < 2) return null;

  const intro = markdown.slice(0, labels[0].index).trim();
  let prompt = "";
  const sections = labels.map((label, index) => {
    const next = labels[index + 1];
    let body = markdown.slice(label.end, next?.index).trim();

    if (!next) {
      const promptMatch = comparisonPromptPattern.exec(body);
      if (promptMatch) {
        prompt = body.slice(promptMatch.index).trim();
        body = body.slice(0, promptMatch.index).trim();
      }
    }

    return {
      title: label.title,
      body,
    };
  });

  return { intro, sections, prompt };
}

function parseComparisonSections(
  markdown: string,
  options: { exactSectionCount?: number } = {},
): ComparisonContent | null {
  const comparison = parseSubheadings(markdown) ?? parseBareLabelComparison(markdown);

  if (
    !comparison ||
    (options.exactSectionCount && comparison.sections.length !== options.exactSectionCount)
  ) {
    return null;
  }

  return comparison;
}

function ComparisonLayout({ comparison }: { comparison: ComparisonContent }) {
  return (
    <>
      {comparison.intro ? <MarkdownRenderer content={comparison.intro} compact editorial /> : null}
      <div className="comparison-grid">
        {comparison.sections.map((section) => (
          <section className="comparison-card" key={section.title}>
            <h3>{section.title}</h3>
            <MarkdownRenderer content={section.body} compact />
          </section>
        ))}
      </div>
      {comparison.prompt ? (
        <div className="comparison-prompt">
          <MarkdownRenderer content={comparison.prompt} compact editorial />
        </div>
      ) : null}
    </>
  );
}

export function ChallengeExercise({ children, title }: { children: string; title: string }) {
  const comparison = parseComparisonSections(children);

  return (
    <BlockShell
      className="lesson-block--challenge"
      icon={<ListChecks aria-hidden="true" />}
      label="Challenge"
      showKicker={false}
      title={title}
    >
      {comparison ? (
        <ComparisonLayout comparison={comparison} />
      ) : (
        <MarkdownRenderer content={children} compact editorial />
      )}
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
