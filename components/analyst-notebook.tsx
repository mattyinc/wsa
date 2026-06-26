"use client";

import { Check, NotebookPen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { readNotebookEntries, STORAGE_KEYS } from "@/lib/storage";

export function AnalystNotebook({
  lessonId,
  lessonSlug,
  lessonTitle,
  courseTitle,
}: {
  lessonId: string;
  lessonSlug: string;
  lessonTitle: string;
  courseTitle: string;
}) {
  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState("");
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const entry = readNotebookEntries()[lessonId];
    setText(entry?.text ?? "");
    setSavedAt(entry?.savedAt ?? "");
  }, [lessonId]);

  function saveNote(value = text) {
    const entries = readNotebookEntries();
    const timestamp = new Date().toISOString();
    entries[lessonId] = {
      lessonId,
      lessonSlug,
      lessonTitle,
      courseTitle,
      text: value,
      savedAt: timestamp,
    };
    localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(entries));
    setSavedAt(timestamp);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  function updateText(value: string) {
    setText(value);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => saveNote(value), 900);
  }

  return (
    <section className="notebook-panel" aria-labelledby="notebook-title">
      <div className="panel-heading">
        <div className="panel-heading__icon">
          <NotebookPen aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Your private workspace</p>
          <h2 id="notebook-title">Analyst Notebook</h2>
        </div>
      </div>
      <p>
        Capture your reasoning in your own words. Notes are saved only in this browser.
      </p>
      <label htmlFor={`notebook-${lessonId}`}>Notes for this lesson</label>
      <textarea
        id={`notebook-${lessonId}`}
        value={text}
        onChange={(event) => updateText(event.target.value)}
        placeholder="What changed in how you see money? What remains unclear?"
      />
      <div className="notebook-panel__footer">
        <span aria-live="polite">
          {saved ? (
            <>
              <Check aria-hidden="true" /> Saved
            </>
          ) : savedAt ? (
            `Last saved ${new Date(savedAt).toLocaleString()}`
          ) : (
            "Begin writing to save"
          )}
        </span>
        <button type="button" className="button button--secondary" onClick={() => saveNote()}>
          Save note
        </button>
      </div>
    </section>
  );
}
