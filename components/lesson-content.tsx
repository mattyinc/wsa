import {
  ApplicationBlock,
  CaseStudy,
  CoreLesson,
  DidYouKnow,
  ImportantNote,
  LookingAhead,
  MentalModelBlock,
  Question,
  Story,
  Summary,
  Think,
  WallStreetPerspective,
  Watchlist,
} from "./lesson-blocks";

type LessonSection = {
  title: string;
  body: string;
};

const primarySections = new Set([
  "subtitle",
  "big question",
  "opening story",
  "why this matters",
  "plain english explanation",
  "plain-english explanation",
  "mental model",
  "wall street perspective",
  "historical case study",
  "modern example",
  "common beginner mistakes",
  "analyst's notebook",
  "wall street minute",
  "looking ahead",
]);

const hiddenSections = new Set(["subtitle", "mental model", "wall street perspective", "analyst's notebook"]);

function normalizeTitle(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function trimMarkdown(value: string) {
  return value
    .replace(/^\s*-{3,}\s*/, "")
    .replace(/\s*-{3,}\s*$/, "")
    .trim();
}

function markdownToText(value: string) {
  return value
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`>#-]/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function getSection(sections: LessonSection[], title: string) {
  const normalizedTitle = normalizeTitle(title);
  return sections.find((section) => normalizeTitle(section.title) === normalizedTitle);
}

function getThinkPrompt(sections: LessonSection[]) {
  const question = getSection(sections, "Big Question");
  const cleaned = question ? markdownToText(question.body) : "";
  return cleaned
    ? `Before moving on, answer this in one sentence: ${cleaned}`
    : "Before moving on, pause and write the simplest version of the idea in your own words.";
}

function getSummaryTakeaways(sections: LessonSection[]) {
  return sections
    .filter((section) =>
      [
        "big question",
        "why this matters",
        "plain english explanation",
        "plain-english explanation",
        "the double coincidence of wants",
        "mental model",
        "wall street perspective",
        "common beginner mistakes",
      ].includes(normalizeTitle(section.title)),
    )
    .map((section) => markdownToText(section.body).split(/(?<=[.!?])\s+/)[0])
    .filter(Boolean);
}

function isPrimaryHeading(level: number, title: string) {
  return level === 1 || primarySections.has(normalizeTitle(title));
}

function getLessonSections(markdown: string): LessonSection[] {
  const headingPattern = /^(#{1,2})\s+(.+?)\s*$/gm;
  const headings = [...markdown.matchAll(headingPattern)]
    .map((match) => ({
      level: match[1].length,
      title: match[2],
      index: match.index ?? 0,
      end: (match.index ?? 0) + match[0].length,
    }))
    .filter((heading) => isPrimaryHeading(heading.level, heading.title));

  return headings
    .map((heading, index) => {
      const next = headings[index + 1];
      return {
        title: heading.title,
        body: trimMarkdown(markdown.slice(heading.end, next?.index).trim()),
      };
    })
    .filter((section) => section.body || !hiddenSections.has(normalizeTitle(section.title)));
}

export function LessonContent({ content }: { content: string }) {
  const sections = getLessonSections(content);
  const takeaways = getSummaryTakeaways(sections);
  let insertedThink = false;

  return (
    <div className="lesson-curriculum">
      {sections.map((section) => {
        const normalized = normalizeTitle(section.title);
        if (normalized === "subtitle" || normalized === "analyst's notebook") return null;

        const key = `${section.title}-${section.body.slice(0, 20)}`;
        if (normalized === "big question") {
          return <Question key={key}>{section.body}</Question>;
        }

        if (normalized === "opening story") {
          return <Story key={key} title={section.title}>{section.body}</Story>;
        }

        if (normalized === "why this matters") {
          return <ImportantNote key={key} title={section.title}>{section.body}</ImportantNote>;
        }

        if (normalized === "plain english explanation" || normalized === "plain-english explanation") {
          insertedThink = true;
          return (
            <div key={key} className="lesson-sequence">
              <CoreLesson title={section.title}>{section.body}</CoreLesson>
              <Think prompt={getThinkPrompt(sections)} />
            </div>
          );
        }

        if (normalized === "the double coincidence of wants") {
          return <CoreLesson key={key} title={section.title}>{section.body}</CoreLesson>;
        }

        if (normalized === "mental model") {
          return <MentalModelBlock key={key} title={section.title}>{section.body}</MentalModelBlock>;
        }

        if (normalized === "wall street perspective") {
          return <WallStreetPerspective key={key}>{section.body}</WallStreetPerspective>;
        }

        if (normalized === "historical case study") {
          return <CaseStudy key={key} title={section.title}>{section.body}</CaseStudy>;
        }

        if (normalized === "modern example") {
          return <ApplicationBlock key={key} title={section.title}>{section.body}</ApplicationBlock>;
        }

        if (normalized === "common beginner mistakes") {
          return <Watchlist key={key} title={section.title}>{section.body}</Watchlist>;
        }

        if (normalized === "wall street minute") {
          return <DidYouKnow key={key}>{section.body}</DidYouKnow>;
        }

        if (normalized === "looking ahead") {
          return (
            <div key={key} className="lesson-sequence">
              {!insertedThink ? <Think prompt={getThinkPrompt(sections)} /> : null}
              <LookingAhead>{section.body}</LookingAhead>
              <Summary takeaways={takeaways} />
            </div>
          );
        }

        if (hiddenSections.has(normalized)) return null;

        return <CoreLesson key={key} title={section.title}>{section.body}</CoreLesson>;
      })}
    </div>
  );
}
