# Portfolio content and update guide

This repository is the public source for Shaher Wahid Rushdi's architecture and landscape portfolio.

## Source of truth

- `data/portfolio.ts` is the canonical professional-data file.
- `public/images/` contains approved public images.
- `public/Shaher-Waheed-Roshdy-CV.pdf` is the recruiter-facing CV.
- `docs/Shaher-Waheed-Roshdy-CV-source.docx` is the editable CV source.
- `/portfolio-data.json` exposes the current public portfolio data in machine-readable form.

Update the canonical data first. Pages and project routes read from that file automatically.

## Positioning rules

- Primary direction: Architect and Landscape Architect working in technical-office delivery.
- BIM is a supporting delivery skill. Do not present BIM coordination as the primary professional identity.
- Use specific verbs such as developed, produced, reviewed, delivered, refined, verified, and supported.
- Never invent project values, areas, counts, approval rates, savings, or other outcomes.
- Keep job titles, employers, dates, and project roles aligned with the approved CV.

## Confidential project rule

`security-aviation-leadership-building` is a military command project. Shaher has explicitly approved the public use of the project name and the single exterior 3D visualization already stored in its image folder.

- The approved exterior visualization may be used on the homepage cover, project card, and case-study page.
- Do not publish drawings, model files, plans, technical elevations, site photographs, room data, security information, restricted stakeholders, or technical quantities.
- Do not add further imagery without Shaher's explicit approval.
- Keep the project marked `Confidential / Selected scope`; public copy may describe Shaher's role, general workflow, and non-sensitive deliverable types only.

## Adding or editing a project

1. Edit the matching record in `data/portfolio.ts`.
2. Add only approved images under `public/images/<project-name>/`.
3. Write a concise summary, overview, role summary, responsibilities, deliverables, and tools.
4. Add `metrics` only when verified by Shaher or his approved CV.
5. Run the project build before committing.
6. Commit to `main`. The public Site must then be published from the same revision.

## CV synchronization

When the CV changes, review these fields for matching updates:

- portfolio headline and summary;
- experience dates and titles;
- project role summaries and metrics;
- professional registration;
- downloadable PDF and editable source.

Do not replace the CV with an unverified draft.
