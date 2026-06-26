import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getDocument } from "@/lib/content";

export default function AboutPage() {
  const about = getDocument("about");
  return (
    <main id="main-content" className="page-container editorial-page">
      <header>
        <p className="eyebrow">{about.eyebrow}</p>
        <h1>{about.title}</h1>
      </header>
      <MarkdownRenderer content={about.content} />
    </main>
  );
}
