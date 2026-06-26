import type { Lesson } from "./types";

export function getCompletedLessonSet(lessonIds: string[]) {
  return new Set(lessonIds);
}

export function getCourseCompletedCount(lessons: Lesson[], lessonIds: string[]) {
  const completed = getCompletedLessonSet(lessonIds);
  return lessons.filter((lesson) => completed.has(lesson.lessonId)).length;
}

export function isLessonUnlocked(lessons: Lesson[], lesson: Lesson, lessonIds: string[]) {
  if (!lesson.available) return false;

  const completed = getCompletedLessonSet(lessonIds);
  const previousAvailableLessons = lessons.filter(
    (item) => item.available && item.number < lesson.number,
  );

  return previousAvailableLessons.every((item) => completed.has(item.lessonId));
}

export function getNextUnlockedLesson(lessons: Lesson[], lessonIds: string[]) {
  return lessons.find(
    (lesson) =>
      lesson.available &&
      !lessonIds.includes(lesson.lessonId) &&
      isLessonUnlocked(lessons, lesson, lessonIds),
  );
}
