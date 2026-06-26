import {
  Banana,
  Bird,
  Bitcoin,
  Building2,
  Car,
  Clock,
  Coins,
  DollarSign,
  Egg,
  Factory,
  Fish,
  Footprints,
  Gem,
  Globe,
  Handshake,
  Home,
  Landmark,
  Percent,
  Scale,
  Shirt,
  TrendingUp,
  Users,
  Wheat,
  Wrench,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import type { Components } from "react-markdown";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const baseComponents: Components = {
  a: ({ children, ...props }) => (
    <a {...props} target="_blank" rel="noreferrer">
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote>
      <span aria-hidden="true">{'“'}</span>
      <div>{children}</div>
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="prose-table" role="region" aria-label="Data table" tabIndex={0}>
      <table>{children}</table>
    </div>
  ),
};

// ---------------------------------------------------------------------------
// Smart list icon detection
// ---------------------------------------------------------------------------

type IconEntry = [RegExp, LucideIcon];

const ICON_MAP: IconEntry[] = [
  // Crypto & digital
  [/\b(bitcoin|crypto|cryptocurrency|blockchain|digital currency)\b/i, Bitcoin],
  [/\b(electricity|energy|power|kilowatt|watt|solar|renewable)\b/i, Zap],
  // Money & finance
  [/\b(u\.?s\.? dollar|dollar bill|greenback)\b/i, DollarSign],
  [/\b(money|cash|dollars?|currency|banknotes?|payments?|pay|purchasing power|fiat)\b/i, DollarSign],
  [/\bcoins?\b/i, Coins],
  [/\b(banks?|banking|loans?|credits?|borrow(?:ing)?|deposits?|mortgage|lend(?:ing)?)\b/i, Building2],
  [/\b(government|taxes?|policy|fiscal|regulation|central bank|federal reserve|fed)\b/i, Landmark],
  [/\binterest(?: rates?)?\b/i, Percent],
  [/\b(inflation|deflation|price level|cpi)\b/i, TrendingUp],
  [/\b(gold|silver|metals?|commodit(?:y|ies)|gems?|jewels?|precious)\b/i, Gem],
  // Food & agriculture
  [/\b(fish(?:ing|es)?|seafood|salmon|tuna|cod)\b/i, Fish],
  [/\b(chickens?|hens?|poultry|roosters?|birds?|ducks?|geese|goose|fowl)\b/i, Bird],
  [/\b(bananas?)\b/i, Banana],
  [/\beggs?\b/i, Egg],
  [/\b(wheat|rice|grains?|bread|flour|crops?|harvest|cereal)\b/i, Wheat],
  // Goods & clothing
  [/\b(shoes?|boots?|footwear|sandals?)\b/i, Footprints],
  [/\b(clothes?|clothing|shirts?|fabric|textiles?|garments?)\b/i, Shirt],
  // Property & transport
  [/\b(houses?|homes?|property|real estate|housing|rent|apartments?|dwelling)\b/i, Home],
  [/\b(cars?|vehicles?|trucks?|automobiles?|transport)\b/i, Car],
  [/\b(global|international|world|foreign|cross-border|trade routes?)\b/i, Globe],
  // Production
  [/\b(factor(?:y|ies)|manufactur(?:e|ing)|production|industr(?:y|ial)|plants?)\b/i, Factory],
  [/\b(tools?|equipment|machinery|repairs?)\b/i, Wrench],
  // People & agreements
  [/\b(agrees?|agreed|agreement|deals?|handshake|contracts?|trades?|exchanges?|barter)\b/i, Handshake],
  [/\b(workers?|employees?|labou?r|wages?|salar(?:y|ies)|people|persons?|consumers?)\b/i, Users],
  // Time & balance
  [/\b(times?|hours?|days?|years?|duration|period|clock)\b/i, Clock],
  [/\b(balance|fairness?|equalit(?:y|ies)|weights?|scales?)\b/i, Scale],
];

function getTextContent(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (node && typeof node === "object" && "props" in (node as object)) {
    return getTextContent((node as React.ReactElement).props.children);
  }
  return "";
}

function findIcon(text: string): LucideIcon | null {
  for (const [pattern, Icon] of ICON_MAP) {
    if (pattern.test(text)) return Icon;
  }
  return null;
}

function SmartLi({ children }: { children: ReactNode }) {
  const text = getTextContent(children);
  const Icon = findIcon(text);
  return (
    <li>
      <span className="list-item-icon" aria-hidden="true">
        {Icon ? <Icon /> : <span className="list-item-diamond" />}
      </span>
      {children}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Markdown utilities
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function MarkdownRenderer({
  content,
  compact = false,
  editorial = false,
  iconLists = false,
}: {
  content: string;
  compact?: boolean;
  editorial?: boolean;
  iconLists?: boolean;
}) {
  const renderedContent = editorial ? editorializeMarkdown(content) : content;
  const className = [
    "prose",
    compact ? "prose--compact" : "",
    editorial ? "prose--editorial" : "",
    iconLists ? "prose--icon-lists" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const components: Components = iconLists
    ? { ...baseComponents, li: ({ children }) => <SmartLi>{children}</SmartLi> }
    : baseComponents;

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {renderedContent}
      </ReactMarkdown>
    </div>
  );
}
