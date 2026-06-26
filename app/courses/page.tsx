import { ArrowRight, NotebookPen } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { getCourse } from "@/lib/content";

const planned = [
  ["Analyst", "Reading the Business", "Financial statements, economics, and valuation."],
  ["Senior Analyst", "Building an Investment Case", "Research, variants, catalysts, and risk."],
  ["Portfolio Manager", "Allocating Capital", "Position sizing, correlation, and portfolio design."],
  ["Chief Investment Officer", "Thinking in Systems", "Mandates, regimes, and institutional judgment."],
];

export default function CoursesPage() {
  const course = getCourse();

  return (
    <main id="main-content" className="page-container">
      <header className="page-heading">
        <p className="eyebrow">Your academy</p>
        <h1>Build judgment in the right order.</h1>
        <p>
          Move from the mechanics of money to the responsibility of allocating capital. Your
          progress is stored privately on this device.
        </p>
      </header>

      <section className="dashboard-grid">
        <div className="dashboard-main">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Current level</p>
              <h2>Apprentice</h2>
            </div>
            <span className="status-pill">In progress</span>
          </div>
          <CourseCard course={course} />
        </div>
        <aside className="notebook-shortcut">
          <NotebookPen aria-hidden="true" />
          <p className="eyebrow">Analyst Notebook</p>
          <h2>Your thinking, collected.</h2>
          <p>Return to notes from every lesson and see how your understanding develops.</p>
          <Link href="/notebook" className="text-link">
            Open notebook <ArrowRight aria-hidden="true" />
          </Link>
        </aside>
      </section>

      <section className="planned-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The road ahead</p>
            <h2>Future levels</h2>
          </div>
        </div>
        <div className="planned-grid">
          {planned.map(([level, title, description], index) => (
            <article key={level}>
              <span>{String(index + 2).padStart(2, "0")}</span>
              <small>{level}</small>
              <h3>{title}</h3>
              <p>{description}</p>
              <em>Planned</em>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
