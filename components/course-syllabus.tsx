"use client";

import { ArrowRight, Clock3, LockKeyhole } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isLessonUnlocked } from "@/lib/progress";
import { readCompletedLessons } from "@/lib/storage";
import type { Course } from "@/lib/types";

export function CourseSyllabus({ course }: { course: Course }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    setCompletedLessons(readCompletedLessons());
  }, []);

  return (
    <ol>
      {course.lessons.map((lesson) => {
        const unlocked = isLessonUnlocked(course.lessons, lesson, completedLessons);

        return (
          <li key={lesson.lessonId} className={unlocked ? "" : "is-planned"}>
            <span>{String(lesson.number).padStart(2, "0")}</span>
            <div>
              <h3>{lesson.title}</h3>
              <p>{lesson.description}</p>
            </div>
            {unlocked ? (
              <Link
                href={`/courses/${course.slug}/lessons/${lesson.slug}`}
                aria-label={`Open ${lesson.title}`}
              >
                <span>{lesson.readingTime}</span>
                <ArrowRight aria-hidden="true" />
              </Link>
            ) : lesson.available ? (
              <span className="planned-label">
                <LockKeyhole aria-hidden="true" /> Locked
              </span>
            ) : (
              <span className="planned-label">
                <Clock3 aria-hidden="true" /> Planned
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
