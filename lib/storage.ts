export const STORAGE_KEYS = {
  completedLessons: "wsa.completed-lessons",
  currentLesson: "wsa.current-lesson",
  notes: "wsa.notebook-entries",
  theme: "wsa.theme",
} as const;

export type NotebookEntry = {
  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;
  courseTitle: string;
  text: string;
  savedAt: string;
};

export function readCompletedLessons(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.completedLessons) ?? "[]");
  } catch {
    return [];
  }
}

export function readNotebookEntries(): Record<string, NotebookEntry> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) ?? "{}");
  } catch {
    return {};
  }
}
