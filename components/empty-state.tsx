import { Clock3 } from "lucide-react";

export function EmptyState({
  title = "Lesson content coming soon.",
  description = "This part of the academy is planned and will open as the curriculum develops.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="empty-state">
      <Clock3 aria-hidden="true" />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
