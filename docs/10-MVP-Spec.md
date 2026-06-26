---
title: WSA MVP Spec
version: 0.1
status: Draft
---

# WSA MVP Specification

## Objective

Build the first usable version of Wall Street Academy.

The MVP should allow a student to:

- browse the academy
- open courses
- read lessons
- take notes
- track progress locally
- switch between light and dark mode

---

# Technical Requirements

Use:

- Next.js
- TypeScript
- Tailwind CSS
- Markdown or MDX renderer
- LocalStorage

No backend required.

---

# Content Loading

The app must read Markdown content from:

- `/docs`
- `/curriculum`

Do not hardcode lesson content.

Build a content utility that can:

- list Markdown files
- read frontmatter
- render Markdown
- provide previous/next lesson navigation

---

# Suggested Routes

```text
/
  Home

/courses
  Course dashboard

/courses/[courseId]
  Course detail page

/courses/[courseId]/lessons/[lessonId]
  Lesson reader

/notebook
  Analyst Notebook overview

/about
  WSA philosophy
```

---

# Home Page Requirements

Home page should include:

- WSA name
- motto: First Understand. Then Invest.
- short product description
- start learning button
- current first course card
- learning levels
- philosophy summary

---

# Course Dashboard Requirements

Show:

- Apprentice
- Analyst
- Senior Analyst
- Portfolio Manager
- Chief Investment Officer

Each level should display available or placeholder courses.

Course 1 should be active.

Other courses can be marked "Planned."

---

# Lesson Reader Requirements

Lesson reader must include:

- course title
- lesson title
- Markdown content
- course sidebar
- progress indicator
- theme toggle
- notebook area
- assignment panel
- previous/next navigation

---

# Progress Tracking

Use LocalStorage.

Track:

- completed lessons
- current lesson
- notes per lesson
- last opened lesson

No login required.

---

# Analyst Notebook

Use LocalStorage.

Notebook entries should be tied to lesson IDs.

Each note should support:

- free text
- saved timestamp
- lesson reference

---

# Empty States

If curriculum content is missing, show elegant placeholders.

Example:

"Lesson content coming soon."

Do not show broken pages.

---

# Definition of Done

The MVP is complete when:

- Markdown content renders correctly.
- The app has a polished light theme.
- Dark mode works.
- Course navigation works.
- Notes save locally.
- Progress saves locally.
- Layout is responsive.
- No curriculum content is hardcoded into React components.
