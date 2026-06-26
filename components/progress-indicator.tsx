"use client";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readCompletedLessons, STORAGE_KEYS } from "@/lib/storage";

export function ProgressIndicator({
  lessonId,
  completedCount,
  totalCount,
  nextHref,
}: {
  lessonId?: string;
  completedCount?: number;
  totalCount: number;
  nextHref?: string;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState<string[]>([]);

  useEffect(() => {
    setCompleted(readCompletedLessons());
  }, []);

  const isComplete = lessonId ? completed.includes(lessonId) : false;
  const count = completedCount ?? completed.length;
  const percent = Math.round((Math.min(count, totalCount) / totalCount) * 100);

  function toggleCompleted() {
    if (!lessonId) return;
    const next = isComplete ? completed : [...completed, lessonId];
    setCompleted(next);
    localStorage.setItem(STORAGE_KEYS.completedLessons, JSON.stringify(next));

    if (nextHref) {
      router.push(nextHref);
    }
  }

  return (
    <div className="progress">
      <div className="progress__label">
        <span>Course progress</span>
        <strong>
          {count} of {totalCount}
        </strong>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
      {lessonId ? (
        <button
          type="button"
          className={isComplete ? "completion-button is-complete" : "completion-button"}
          onClick={toggleCompleted}
        >
          <span>
            {isComplete
              ? nextHref
                ? "Continue"
                : "Lesson complete"
              : nextHref
                ? "Complete & continue"
                : "Mark lesson complete"}
          </span>
          <Check aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
