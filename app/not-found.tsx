import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <p className="eyebrow">Page not found</p>
      <h1>This page is not in the reading list.</h1>
      <p>The lesson may still be planned, or the address may have changed.</p>
      <Link className="button button--primary" href="/courses">
        Return to the academy
      </Link>
    </main>
  );
}
