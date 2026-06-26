"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { STORAGE_KEYS } from "@/lib/storage";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEYS.theme, next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggleTheme}
      aria-label={mounted && dark ? "Switch to light mode" : "Switch to dark mode"}
      title={mounted && dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {mounted && dark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
