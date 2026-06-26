import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Course, DocumentContent, Lesson } from "./types";

const root = process.cwd();
const curriculumDirectory = path.join(root, "curriculum");
const docsDirectory = path.join(root, "docs");

function cleanTitle(value: string) {
  return value.replace(/^#+\s*/, "").trim();
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getSection(markdown: string, heading: string) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = new RegExp(`^#\\s+${escaped}\\s*$`, "im").exec(markdown);
  if (!match) return "";

  const start = match.index + match[0].length;
  const remainder = markdown.slice(start);
  const nextHeading = remainder.search(/^#\s+/m);
  return (nextHeading >= 0 ? remainder.slice(0, nextHeading) : remainder).trim();
}

function removeFirstHeading(markdown: string) {
  return markdown.replace(/^#\s+.+(?:\r?\n)+/, "").trim();
}

function parseBlueprintLessons(markdown: string, courseId: string): Lesson[] {
  const lessonsSection = getSection(markdown, "Lessons");
  const blocks = lessonsSection.split(/^##\s+Lesson\s+/gm).slice(1);

  return blocks.map((block) => {
    const lines = block
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
    const number = Number.parseInt(lines[0], 10);
    const title = cleanTitle(lines[1] ?? `Lesson ${number}`);
    const description = lines.slice(2).join(" ");
    const slug = `lesson-${String(number).padStart(2, "0")}-${slugify(title)}`;
    const lessonId = `${courseId}-L${String(number).padStart(2, "0")}`;

    return {
      slug,
      number,
      title,
      description,
      lessonId,
      status: "Planned",
      available: false,
    };
  });
}

function loadAvailableLessons(courseSlug: string): Map<number, Lesson> {
  const directory = path.join(curriculumDirectory, courseSlug);
  const lessons = new Map<number, Lesson>();

  if (!fs.existsSync(directory)) return lessons;

  for (const filename of fs.readdirSync(directory).filter((file) => file.endsWith(".md"))) {
    const raw = fs.readFileSync(path.join(directory, filename), "utf8");
    const parsed = matter(raw);
    const numberMatch = filename.match(/lesson-(\d+)/);
    const number = Number(numberMatch?.[1] ?? 0);
    const content = removeFirstHeading(parsed.content);
    const assignmentHeading = /^#\s+Analyst's Notebook\s*$/im;
    const assignmentIndex = content.search(assignmentHeading);
    const mainContent =
      assignmentIndex >= 0 ? content.slice(0, assignmentIndex).trim() : content;
    const assignmentContent =
      assignmentIndex >= 0
        ? content
            .slice(assignmentIndex)
            .replace(assignmentHeading, "")
            .trim()
        : "";

    lessons.set(number, {
      slug: filename.replace(/\.md$/, ""),
      number,
      title: String(parsed.data.title),
      description: "",
      lessonId: String(parsed.data.lesson_id),
      status: String(parsed.data.status ?? "Draft"),
      readingTime: String(parsed.data.estimated_reading_time ?? ""),
      content,
      mainContent,
      assignmentContent,
      mentalModel: getSection(parsed.content, "Mental Model"),
      mentorNote: getSection(parsed.content, "Wall Street Perspective"),
      available: true,
    });
  }

  return lessons;
}

export function getCourse(): Course {
  const raw = fs.readFileSync(path.join(curriculumDirectory, "COURSE-01-BLUEPRINT.md"), "utf8");
  const parsed = matter(raw);
  const courseId = String(parsed.data.course_id);
  const titleMatch = parsed.content.match(/^#\s+How Money Moves\s*$/m);
  const subtitleMatch = parsed.content.match(
    /^##\s+Understanding the Invisible System That Runs the Modern World\s*$/m,
  );
  const plannedLessons = parseBlueprintLessons(parsed.content, courseId);
  const availableLessons = loadAvailableLessons("course-01");

  return {
    slug: "course-01",
    courseId,
    title: titleMatch ? cleanTitle(titleMatch[0]) : "How Money Moves",
    subtitle: subtitleMatch ? cleanTitle(subtitleMatch[0]) : "",
    purpose: getSection(parsed.content, "Purpose"),
    status: String(parsed.data.status ?? "Draft"),
    lessons: plannedLessons.map((lesson) => ({
      ...lesson,
      ...(availableLessons.get(lesson.number) ?? {}),
      description: lesson.description,
    })),
  };
}

export function getLesson(lessonSlug: string) {
  return getCourse().lessons.find((lesson) => lesson.slug === lessonSlug);
}

export function getDocument(name: "home" | "about"): DocumentContent {
  const raw = fs.readFileSync(path.join(docsDirectory, `${name}.md`), "utf8");
  const parsed = matter(raw);
  return {
    title: String(parsed.data.title),
    eyebrow: parsed.data.eyebrow ? String(parsed.data.eyebrow) : undefined,
    motto: parsed.data.motto ? String(parsed.data.motto) : undefined,
    description: parsed.data.description ? String(parsed.data.description) : undefined,
    content: parsed.content,
  };
}
