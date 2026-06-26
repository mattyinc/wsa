import { ArrowRight, BarChart3, BookOpenCheck, Landmark, Scale } from "lucide-react";
import Link from "next/link";
import { CourseCard } from "@/components/course-card";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { getCourse, getDocument } from "@/lib/content";

const levels = [
  { name: "Apprentice", detail: "Money, markets, and first principles", icon: Landmark, active: true },
  { name: "Analyst", detail: "Businesses, accounting, and valuation", icon: BarChart3 },
  { name: "Senior Analyst", detail: "Research, judgment, and risk", icon: BookOpenCheck },
  { name: "Portfolio Manager", detail: "Capital allocation and portfolios", icon: Scale },
];

export default function HomePage() {
  const home = getDocument("home");
  const course = getCourse();

  return (
    <main id="main-content">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">A practical education in capital markets</p>
          <h1>{home.motto}</h1>
          <p className="hero__lede">{home.description}</p>
          <div className="hero__actions">
            <Link className="button button--primary" href="/courses/course-01">
              Start learning <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button--quiet" href="/about">
              Read our philosophy
            </Link>
          </div>
        </div>
        <div className="hero__folio" aria-label="Academy approach">
          <div className="hero__folio-header">
            <span>WSA</span>
            <span>Apprenticeship notes · 01</span>
          </div>
          <blockquote>
            “The first duty of an investor is not to predict. It is to understand.”
          </blockquote>
          <div className="hero__folio-rule" />
          <dl>
            <div>
              <dt>Begin with</dt>
              <dd>First principles</dd>
            </div>
            <div>
              <dt>Practice</dt>
              <dd>Clear reasoning</dd>
            </div>
            <div>
              <dt>Build toward</dt>
              <dd>Independent judgment</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section section--split">
        <div>
          <p className="eyebrow">The curriculum</p>
          <h2>A path from first principles to portfolio judgment.</h2>
        </div>
        <p>
          WSA is sequenced deliberately. Each level earns the next by building a more complete
          picture of how capital moves, how businesses create value, and how uncertainty should be
          handled.
        </p>
      </section>

      <section className="level-grid" aria-label="Academy levels">
        {levels.map(({ name, detail, icon: Icon, active }, index) => (
          <article className={active ? "level-card is-active" : "level-card"} key={name}>
            <div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <Icon aria-hidden="true" />
            </div>
            <h3>{name}</h3>
            <p>{detail}</p>
            <small>{active ? "Now enrolling" : "Planned"}</small>
          </article>
        ))}
      </section>

      <section className="featured-course">
        <div className="featured-course__intro">
          <p className="eyebrow">Begin here</p>
          <h2>Before investing, understand money itself.</h2>
          <p>
            The first course examines the invisible system underneath every stock, bond, bank, and
            market decision.
          </p>
        </div>
        <CourseCard course={course} />
      </section>

      <section className="philosophy-band">
        <MarkdownRenderer content={home.content} />
        <Link className="text-link" href="/about">
          Why WSA teaches this way <ArrowRight aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
