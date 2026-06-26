# Wall Street Academy - Codex Instructions

## Project Identity

Wall Street Academy (WSA) is a serious learning platform for financial education.

The application exists to help students learn.

This is not a generic AI startup site.
This is not a flashy trading platform.
This is not a course marketplace.

It should feel like a premium reading and apprenticeship experience.

Think:

- calm
- clean
- editorial
- thoughtful
- serious
- readable
- practical

The user is here to learn finance, not admire code.

---

## Most Important Rule

Markdown is the source of truth.

Do not hardcode curriculum content inside React components.

Render course, lesson, documentation, and assignment content from Markdown or MDX files.

The app must adapt to the content.

The content should not be rewritten to fit the app.

---

## Required Stack

Use:

- Next.js
- TypeScript
- Tailwind CSS
- Markdown or MDX rendering
- LocalStorage for first version progress tracking
- LocalStorage for Analyst Notebook notes
- No database for MVP
- No authentication for MVP

Keep the MVP simple.

---

## Visual Direction

Default theme must be white/light.

Include a dark mode switch.

Light mode should feel like:

- premium learning platform
- clear reading environment
- soft white background
- warm ivory content areas
- charcoal text
- muted gold accent
- subtle borders
- comfortable spacing

Dark mode should feel like:

- dark reading room
- deep charcoal background
- soft off-white text
- restrained gold accent
- no harsh pure black unless necessary

Avoid:

- generic AI gradients
- neon finance colors
- stock photos
- overused dashboard cards
- glassmorphism overload
- emoji-heavy UI
- crypto-style visuals
- hype language

---

## Product Priority

The lesson reader is the product.

Build the lesson page first and make it excellent.

The lesson page should support:

- left course navigation
- main reading column
- right contextual sidebar
- progress display
- theme toggle
- Analyst Notebook area
- assignment prompt area
- previous/next lesson navigation

---

## Content Rules

Do not shorten lesson content.

Do not summarize Markdown unless explicitly asked.

Do not invent finance content unless implementing placeholders.

If content is missing, use elegant placeholders and clearly mark them as placeholders.

---

## Component Philosophy

Build reusable components:

- AppShell
- Header
- ThemeToggle
- CourseSidebar
- LessonReader
- MarkdownRenderer
- MentorNote
- MentalModelCard
- AnalystNotebook
- AssignmentPanel
- ProgressIndicator
- CourseCard
- EmptyState

Keep UI components clean and readable.

---

## Accessibility

Use semantic HTML.

Use readable font sizes.

Respect keyboard navigation.

Ensure light and dark themes have good contrast.

---

## Implementation Approach

Start with the MVP.

Do not over-engineer.

Do not add authentication, payments, dashboards, AI chat, or database until requested.

Build a beautiful static learning experience first.
