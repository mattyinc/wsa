import type { ReactNode } from "react";
import { Header } from "./header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <Header />
      {children}
      <footer className="site-footer">
        <div>
          <strong>Wall Street Academy</strong>
          <span>Build judgment before taking risk.</span>
        </div>
        <p>Progress and notes stay privately in this browser.</p>
      </footer>
    </div>
  );
}
