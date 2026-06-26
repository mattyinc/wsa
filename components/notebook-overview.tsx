"use client";

import { BookOpen, NotebookPen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  type NotebookEntry,
  readNotebookEntries,
  STORAGE_KEYS,
} from "@/lib/storage";

export function NotebookOverview() {
  const [entries, setEntries] = useState<NotebookEntry[]>([]);

  useEffect(() => {
    setEntries(
      Object.values(readNotebookEntries()).sort((a, b) =>
        b.savedAt.localeCompare(a.savedAt),
      ),
    );
  }, []);

  function deleteEntry(lessonId: string) {
    const stored = readNotebookEntries();
    delete stored[lessonId];
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(stored));
    setEntries((current) => current.filter((entry) => entry.lessonId !== lessonId));
  }

  if (!entries.length) {
    return (
      <section className="notebook-empty">
        <NotebookPen aria-hidden="true" />
        <h2>Your notebook is ready.</h2>
        <p>
          Notes you write during lessons will collect here. Begin with the first lesson and put the
          ideas into your own words.
        </p>
        <Link className="button button--primary" href="/courses/course-01">
          Open the first course
        </Link>
      </section>
    );
  }

  return (
    <section className="notebook-entries" aria-label="Saved notebook entries">
      {entries.map((entry) => (
        <article key={entry.lessonId}>
          <header>
            <div>
              <p className="eyebrow">{entry.courseTitle}</p>
              <h2>{entry.lessonTitle}</h2>
            </div>
            <button
              type="button"
              className="icon-button"
              onClick={() => deleteEntry(entry.lessonId)}
              aria-label={`Delete note for ${entry.lessonTitle}`}
            >
              <Trash2 aria-hidden="true" />
            </button>
          </header>
          <p className="notebook-entries__text">{entry.text || "No written note yet."}</p>
          <footer>
            <span>Saved {new Date(entry.savedAt).toLocaleString()}</span>
            <Link
              href={
                entry.lessonSlug
                  ? `/courses/course-01/lessons/${entry.lessonSlug}`
                  : "/courses/course-01"
              }
            >
              <BookOpen aria-hidden="true" /> Lesson reference: {entry.lessonId}
            </Link>
          </footer>
        </article>
      ))}
    </section>
  );
}
