import { Check, LockKeyhole } from "lucide-react";
import Link from "next/link";
import type { Course } from "@/lib/types";

export function CourseSidebar({
  course,
  activeLessonId,
}: {
  course: Course;
  activeLessonId?: string;
}) {
  return (
    <nav className="course-sidebar" aria-label={`${course.title} lessons`}>
      <p className="eyebrow">Course 01</p>
      <h2>{course.title}</h2>
      <ol>
        {course.lessons.map((lesson) => {
          const active = lesson.lessonId === activeLessonId;
          return (
            <li key={lesson.lessonId}>
              {lesson.available ? (
                <Link
                  href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                  className={active ? "lesson-link is-active" : "lesson-link"}
                  aria-current={active ? "page" : undefined}
                >
                  <span className="lesson-link__number">
                    {active ? <Check aria-hidden="true" /> : String(lesson.number).padStart(2, "0")}
                  </span>
                  <span>{lesson.title}</span>
                </Link>
              ) : (
                <span className="lesson-link is-locked">
                  <span className="lesson-link__number">
                    <LockKeyhole aria-hidden="true" />
                  </span>
                  <span>{lesson.title}</span>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
