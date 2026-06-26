"use client";

import { ArrowRight, BookOpenText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCourseCompletedCount, getNextUnlockedLesson } from "@/lib/progress";
import { readCompletedLessons } from "@/lib/storage";
import type { Course } from "@/lib/types";

export function CourseCard({ course }: { course: Course }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  useEffect(() => setCompletedLessons(readCompletedLessons()), []);

  const completed = getCourseCompletedCount(course.lessons, completedLessons);
  const nextLesson = getNextUnlockedLesson(course.lessons, completedLessons);
  const firstLesson = nextLesson ?? course.lessons.find((lesson) => lesson.available);
  const progress = Math.round((completed / course.lessons.length) * 100);

  return (
    <article className="course-card">
      <div className="course-card__topline">
        <span>Course 01</span>
        <span>{course.lessons.length} lessons</span>
      </div>
      <div className="course-card__icon">
        <BookOpenText aria-hidden="true" />
      </div>
      <h3>{course.title}</h3>
      <p>{course.subtitle}</p>
      <div className="course-card__progress">
        <div>
          <span>Your progress</span>
          <strong>{progress}%</strong>
        </div>
        <span className="course-card__track">
          <i style={{ width: `${progress}%` }} />
        </span>
      </div>
      <Link
        className="text-link"
        href={
          firstLesson
            ? `/courses/${course.slug}/lessons/${firstLesson.slug}`
            : `/courses/${course.slug}`
        }
      >
        {completed ? "Continue course" : "Begin course"} <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}
