import { ArrowRight, Clock3 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { ProgressIndicator } from "@/components/progress-indicator";
import { getCourse } from "@/lib/content";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = getCourse();
  if (courseId !== course.slug) notFound();

  return (
    <main id="main-content" className="page-container course-detail">
      <header className="course-hero">
        <div>
          <p className="eyebrow">Course 01 · Apprentice</p>
          <h1>{course.title}</h1>
          <p>{course.subtitle}</p>
        </div>
        <ProgressIndicator totalCount={course.lessons.length} />
      </header>

      <section className="course-introduction">
        <div>
          <p className="eyebrow">Why this course comes first</p>
          <MarkdownRenderer content={course.purpose} compact />
        </div>
        <dl>
          <div>
            <dt>Lessons</dt>
            <dd>{course.lessons.length}</dd>
          </div>
          <div>
            <dt>Level</dt>
            <dd>Apprentice</dd>
          </div>
          <div>
            <dt>Format</dt>
            <dd>Read · Reflect · Apply</dd>
          </div>
        </dl>
      </section>

      <section className="syllabus">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Syllabus</p>
            <h2>Ten lessons in sequence</h2>
          </div>
        </div>
        <ol>
          {course.lessons.map((lesson) => (
            <li key={lesson.lessonId} className={lesson.available ? "" : "is-planned"}>
              <span>{String(lesson.number).padStart(2, "0")}</span>
              <div>
                <h3>{lesson.title}</h3>
                <p>{lesson.description}</p>
              </div>
              {lesson.available ? (
                <Link
                  href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                  aria-label={`Open ${lesson.title}`}
                >
                  <span>{lesson.readingTime}</span>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ) : (
                <span className="planned-label">
                  <Clock3 aria-hidden="true" /> Planned
                </span>
              )}
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
