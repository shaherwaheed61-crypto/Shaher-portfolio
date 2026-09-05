# Shaher Waheed Portfolio

Portfolio website for Shaher Waheed Roshdy — Architect & Landscape Architect.

- Public site: <https://shaher-waheed-portfolio.shaherwaheed61.chatgpt.site>
- Machine-readable portfolio data: <https://shaher-waheed-portfolio.shaherwaheed61.chatgpt.site/portfolio-data.json>
- Agent editing rules: `PORTFOLIO_GUIDE.md`

## Content structure

- `data/portfolio.ts` contains the professional profile, capabilities, experience, credentials, and every project record.
- `PORTFOLIO_GUIDE.md`, `AGENTS.md`, and `CLAUDE.md` explain the safe update workflow for AI agents.
- `docs/` contains the editable CV source, while `public/Shaher-Waheed-Roshdy-CV.pdf` is the public download.
- `public/images/` contains all project, profile, and certificate images.
- `app/` contains the public pages and project-detail route.
- `components/` contains reusable navigation, cards, filters, and interactions.

To add a project, follow `PORTFOLIO_GUIDE.md`, add one verified record to the `projects` array in `data/portfolio.ts`, place approved images under `public/images/`, and commit the changes to GitHub.

## Pages

- `/` — home and featured work
- `/projects` — searchable, filterable project directory
- `/projects/[slug]` — data-driven project case studies
- `/profile` — biography, experience, education, and skills
- `/credentials` — professional certificates
- `/contact` — direct contact channels
- `/portfolio-data.json` — machine-readable public portfolio data
