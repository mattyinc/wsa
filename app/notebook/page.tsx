import { NotebookOverview } from "@/components/notebook-overview";

export default function NotebookPage() {
  return (
    <main id="main-content" className="page-container notebook-page">
      <header className="page-heading">
        <p className="eyebrow">Analyst Notebook</p>
        <h1>Your thinking, over time.</h1>
        <p>
          Good analysts leave a trail of reasoning. Review what you noticed, what surprised you, and
          which questions still deserve work.
        </p>
      </header>
      <NotebookOverview />
    </main>
  );
}
