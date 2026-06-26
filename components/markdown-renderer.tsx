import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components: Components = {
  a: ({ children, ...props }) => (
    <a {...props} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote>
      <span aria-hidden="true">“</span>
      <div>{children}</div>
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="prose-table" role="region" aria-label="Data table" tabIndex={0}>
      <table>{children}</table>
    </div>
  ),
};

function isMarkdownTableBlock(block: string) {
  const lines = block
    .trim()
    .split(/\r?\n/)
    .map((line) => line.trim());

  return (
    lines.length >= 2 &&
    lines[0].includes("|") &&
    /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(lines[1])
  );
}

function isPlainParagraphBlock(block: string) {
  const trimmed = block.trim();
  return (
    trimmed.length > 0 &&
    !isMarkdownTableBlock(trimmed) &&
    !/^(#{1,6}\s|[-*+]\s|\d+\.\s|>\s|```|---+$)/.test(trimmed)
  );
}

function editorializeMarkdown(markdown: string) {
  const blocks = markdown.trim().split(/\n{2,}/);
  const output: string[] = [];
  let paragraph: string[] = [];
  let paragraphLength = 0;

  function flushParagraph() {
    if (!paragraph.length) return;
    output.push(paragraph.join(" "));
    paragraph = [];
    paragraphLength = 0;
  }

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    if (!isPlainParagraphBlock(trimmed)) {
      flushParagraph();
      output.push(trimmed);
      continue;
    }

    const shouldStartNew =
      paragraphLength > 0 &&
      (paragraphLength + trimmed.length > 520 ||
        paragraph.length >= 4 ||
        paragraph[paragraph.length - 1]?.endsWith(":"));

    if (shouldStartNew) flushParagraph();

    paragraph.push(trimmed.replace(/\s*\n\s*/g, " "));
    paragraphLength += trimmed.length;

    if (trimmed.endsWith(":")) flushParagraph();
  }

  flushParagraph();
  return output.join("\n\n");
}

export function MarkdownRenderer({
  content,
  compact = false,
  editorial = false,
}: {
  content: string;
  compact?: boolean;
  editorial?: boolean;
}) {
  const renderedContent = editorial ? editorializeMarkdown(content) : content;
  const className = [
    "prose",
    compact ? "prose--compact" : "",
    editorial ? "prose--editorial" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {renderedContent}
      </ReactMarkdown>
    </div>
  );
}
