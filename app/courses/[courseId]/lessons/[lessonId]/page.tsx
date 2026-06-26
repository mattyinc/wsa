import { ArrowLeft, ArrowRight, Clock3, Menu } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnalystNotebook } from "@/components/analyst-notebook";
import { AssignmentPanel } from "@/components/assignment-panel";
import { CourseSidebar } from "@/components/course-sidebar";
import { MentalModelCard, MentorNote } from "@/components/context-cards";
import { LessonContent } from "@/components/lesson-content";
import { ProgressIndicator } from "@/components/progress-indicator";
import { getCourse } from "@/lib/content";

export default async function LessonPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>;
}) {
  const { courseId, lessonId } = await params;
  const course = getCourse();
  if (courseId !== course.slug) notFound();
  const lessonIndex = course.lessons.findIndex((item) => item.slug === lessonId);
  const lesson = course.lessons[lessonIndex];
  if (!lesson?.available || !lesson.mainContent) notFound();

  const previous = course.lessons.slice(0, lessonIndex).reverse().find((item) => item.available);
  const next = course.lessons.slice(lessonIndex + 1).find((item) => item.available);
  const nextHref = next
    ? `/courses/${course.slug}/lessons/${next.slug}`
    : `/courses/${course.slug}`;

  return (
    <main id="main-content" className="lesson-shell">
      <aside className="lesson-shell__left">
        <CourseSidebar course={course} activeLessonId={lesson.lessonId} />
      </aside>

      <details className="mobile-course-nav">
        <summary>
          <Menu aria-hidden="true" />
          Course contents
          <span>
            {lesson.number} / {course.lessons.length}
          </span>
        </summary>
        <CourseSidebar course={course} activeLessonId={lesson.lessonId} />
      </details>

      <article className="lesson-reader">
        <header className="lesson-header">
          <div className="lesson-header__meta">
            <Link href={`/courses/${course.slug}`}>{course.title}</Link>
            <span>Lesson {String(lesson.number).padStart(2, "0")}</span>
            {lesson.readingTime ? (
              <span>
                <Clock3 aria-hidden="true" /> {lesson.readingTime}
              </span>
            ) : null}
          </div>
          <h1>{lesson.title}</h1>
          <p>{lesson.subtitle ?? course.subtitle}</p>
        </header>

        <LessonContent content={lesson.mainContent} />

        <div className="lesson-mobile-progress">
          <ProgressIndicator
            lessonId={lesson.lessonId}
            totalCount={course.lessons.length}
            nextHref={nextHref}
            lessons={course.lessons}
          />
        </div>

        <div className="lesson-mobile-context">
          <MentalModelCard content={lesson.mentalModel ?? ""} />
          <MentorNote content={lesson.mentorNote ?? ""} />
        </div>

        <AssignmentPanel content={lesson.assignmentContent ?? ""} />
        <AnalystNotebook
          lessonId={lesson.lessonId}
          lessonSlug={lesson.slug}
          lessonTitle={lesson.title}
          courseTitle={course.title}
        />

        <nav className="lesson-pagination" aria-label="Lesson navigation">
          {previous ? (
            <Link href={`/courses/${course.slug}/lessons/${previous.slug}`}>
              <ArrowLeft aria-hidden="true" />
              <span>
                <small>Previous lesson</small>
                {previous.title}
              </span>
            </Link>
          ) : (
            <Link href={`/courses/${course.slug}`}>
              <ArrowLeft aria-hidden="true" />
              <span>
                <small>Back to</small>
                Course overview
              </span>
            </Link>
          )}
          {next ? (
            <Link href={`/courses/${course.slug}/lessons/${next.slug}`} className="is-next">
              <span>
                <small>Next lesson</small>
                {next.title}
              </span>
              <ArrowRight aria-hidden="true" />
            </Link>
          ) : (
            <span className="lesson-pagination__planned">
              <span>
                <small>Next lesson</small>
                {course.lessons[lessonIndex + 1]?.title ?? "More coming soon"}
              </span>
              <Clock3 aria-hidden="true" />
            </span>
          )}
        </nav>
      </article>

      <aside className="lesson-shell__right">
        <ProgressIndicator
          lessonId={lesson.lessonId}
          totalCount={course.lessons.length}
          nextHref={nextHref}
          lessons={course.lessons}
        />
        <MentalModelCard content={lesson.mentalModel ?? ""} />
        <MentorNote content={lesson.mentorNote ?? ""} />
      </aside>
    </main>
  );
}
