# Wall Street Academy

Wall Street Academy is a white-first financial education app built as a premium reading and apprenticeship experience.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Markdown with frontmatter
- LocalStorage for progress, theme, and notebook entries

## Content

Markdown is the source of truth:

- `/curriculum` contains course blueprints and lessons.
- `/docs` contains product and editorial pages.

Course and lesson routes are derived from these files. Curriculum content should not be placed directly in React components.

## Checks

```bash
npm run lint
npm run build
```
