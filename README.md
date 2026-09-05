# Shaher Waheed Portfolio

Portfolio website for Shaher Waheed Roshdy — Architect & Landscape Architect.

## Content structure

- `data/portfolio.ts` contains the professional profile, capabilities, experience, credentials, and every project record.
- `public/images/` contains all project, profile, and certificate images.
- `app/` contains the public pages and project-detail route.
- `components/` contains reusable navigation, cards, filters, and interactions.

To add a project, add one record to the `projects` array in `data/portfolio.ts`, place its images under `public/images/`, and commit the changes to GitHub.

## Pages

- `/` — home and featured work
- `/projects` — searchable, filterable project directory
- `/projects/[slug]` — data-driven project case studies
- `/profile` — biography, experience, education, and skills
- `/credentials` — professional certificates
- `/contact` — direct contact channels
