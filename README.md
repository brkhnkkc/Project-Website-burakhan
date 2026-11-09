# Burakhan Kokcu — Portfolio

Personal portfolio website: [burakhankokcu.com](https://burakhankokcu.com/)

Built with React, Vite, Tailwind CSS v4 and React Router, hosted on Netlify.

## Running locally

```bash
npm install
npm run dev      # start the dev server at http://localhost:5173
npm run build    # production build into dist/
npm run lint     # check the code with ESLint
```

## Where things live

| Path | What it is |
| --- | --- |
| `src/Pages/` | One file per page: `Home`, `ProjectsPage`, `PersonalPage`, `NotFound` |
| `src/components/` | Sections and shared pieces (navbar, lightbox, theme toggle, backgrounds) |
| `src/data/projects.js` | **All project content.** Edit this to add or change projects; both the home page cards and the Projects page read from it |
| `src/index.css` | Theme colours (light and dark) and custom utilities |
| `public/` | Static files served as-is: images, résumé, `robots.txt`, `sitemap.xml` |
| `public/_redirects` | Netlify rule that serves the app for every URL, so `/projects` and `/personal` work when opened directly |

## Adding images

Keep images small: export them as **WebP, about 1920px on the longest side** (usually 100–400 KB).
Full-resolution originals can go in `original-images/`, which is ignored by git and not published.
