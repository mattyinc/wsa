import { MarkdownRenderer } from "./markdown-renderer";

type ComparisonSection = {
  title: string;
  body: string;
};

type ComparisonItem =
  | {
      type: "comparison";
      sections: ComparisonSection[];
    }
  | {
      type: "prose" | "prompt";
      body: string;
    };

export type ComparisonContent = {
  items: ComparisonItem[];
};

const comparisonPromptPattern =
  /^(After .+?:|During\b|If you\b|Should\b|Who\b|Would\b|Which\b|There is\b)/im;

function makeComparisonContent({
  intro,
  sections,
  prompt,
}: {
  intro?: string;
  sections: ComparisonSection[];
  prompt?: string;
}): ComparisonContent {
  const items: ComparisonItem[] = [];

  if (intro) items.push({ type: "prose", body: intro });
  items.push({ type: "comparison", sections });
  if (prompt) items.push({ type: "prompt", body: prompt });

  return { items };
}

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

  return makeComparisonContent({ intro, sections, prompt });
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

  return makeComparisonContent({ intro, sections, prompt });
}

function splitOptionBody(markdown: string) {
  const blocks = markdown.trim().split(/\n{2,}/);

  return {
    body: blocks[0]?.trim() ?? "",
    after: blocks.slice(1).join("\n\n").trim(),
  };
}

function parseOptionComparison(markdown: string): ComparisonContent | null {
  const labels = [...markdown.matchAll(/^(Option\s+[A-Z])\s*$/gim)].map((match) => ({
    title: match[1].trim(),
    index: match.index ?? 0,
    end: (match.index ?? 0) + match[0].length,
  }));

  if (labels.length < 2 || labels.length % 2 !== 0) return null;

  const items: ComparisonItem[] = [];
  const intro = markdown.slice(0, labels[0].index).trim();
  if (intro) items.push({ type: "prose", body: intro });

  for (let index = 0; index < labels.length; index += 2) {
    const first = labels[index];
    const second = labels[index + 1];
    const nextGroup = labels[index + 2];
    if (!first || !second) return null;

    const firstBody = splitOptionBody(markdown.slice(first.end, second.index));
    const secondBody = splitOptionBody(markdown.slice(second.end, nextGroup?.index));

    if (!firstBody.body || !secondBody.body) return null;

    items.push({
      type: "comparison",
      sections: [
        { title: first.title, body: firstBody.body },
        { title: second.title, body: secondBody.body },
      ],
    });

    const after = [firstBody.after, secondBody.after].filter(Boolean).join("\n\n").trim();
    if (after) {
      items.push({
        type: nextGroup ? "prose" : "prompt",
        body: after,
      });
    }
  }

  return { items };
}

export function parseComparisonSections(
  markdown: string,
  options: { exactSectionCount?: number } = {},
): ComparisonContent | null {
  const comparison =
    parseSubheadings(markdown) ?? parseOptionComparison(markdown) ?? parseBareLabelComparison(markdown);

  if (
    !comparison ||
    (options.exactSectionCount &&
      comparison.items.some(
        (item) => item.type === "comparison" && item.sections.length !== options.exactSectionCount,
      ))
  ) {
    return null;
  }

  return comparison;
}

export function ComparisonLayout({ comparison }: { comparison: ComparisonContent }) {
  return (
    <>
      {comparison.items.map((item, index) => {
        if (item.type === "comparison") {
          return (
            <div className="comparison-grid" key={`${item.type}-${index}`}>
              {item.sections.map((section) => (
                <section className="comparison-card" key={section.title}>
                  <h3>{section.title}</h3>
                  <MarkdownRenderer content={section.body} compact />
                </section>
              ))}
            </div>
          );
        }

        return (
          <div
            className={item.type === "prompt" ? "comparison-prompt" : "comparison-copy"}
            key={`${item.type}-${index}`}
          >
            <MarkdownRenderer content={item.body} compact editorial />
          </div>
        );
      })}
    </>
  );
}
