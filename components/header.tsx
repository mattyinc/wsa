import { BookOpen, Menu } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <Link href="/" className="brand" aria-label="Wall Street Academy home">
          <span className="brand__mark" aria-hidden="true">
            <BookOpen />
          </span>
          <span>
            <strong>Wall Street Academy</strong>
            <small>First Understand. Then Invest.</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <Link href="/courses">Academy</Link>
          <Link href="/notebook">Notebook</Link>
          <Link href="/about">About</Link>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <details className="mobile-menu">
            <summary className="icon-button" aria-label="Open navigation">
              <Menu aria-hidden="true" />
            </summary>
            <nav aria-label="Mobile navigation">
              <Link href="/courses">Academy</Link>
              <Link href="/notebook">Notebook</Link>
              <Link href="/about">About</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
