# Portfolio content and update guide

This repository is the public source for Shaher Wahid Rushdi's architecture and landscape portfolio.

## Source of truth

- `data/portfolio.ts` is the canonical professional-data file.
- `public/images/` contains approved public images.
- `public/Shaher-Wahid-Rushdi-CV.pdf` is the recruiter-facing CV.
- `docs/Shaher-Wahid-Rushdi-CV-source.docx` is the editable CV source.
- `public/Shaher-Wahid-Rushdi-Selected-Portfolio.pdf` is the 12-page recruiter portfolio (under 5 MB).
- `scripts/build-portfolio.py` regenerates that PDF from the canonical data and approved public assets.
- `scripts/create-portfolio-film.py` authors the silent, chaptered 180-second master with nine project introductions, radial contribution diagrams, evidence and a curated Behance section, then calls `scripts/retime-portfolio-film.py` to publish the complete film at 2× in exactly 90 seconds. All 4,320 original encoded frames are preserved without re-encoding, at 48 fps. The personal introduction and close play for 1.5 seconds each. The master, original timing and provenance stay in `assets/review-sources/portfolio-film-master/`; rerun the retiming script to reproduce the 90-second film, or use `--capture-master` only after rebuilding the full 180-second authored edit. Behance source covers stay in `assets/review-sources/behance/`; only the generated film is served. The two Behance manifests record the full reviewed inventory and available source images.
- `/portfolio-data.json` exposes the current public portfolio data in machine-readable form.

Update the canonical data first. Pages and project routes read from that file automatically.

## Positioning rules

- Primary direction: Architect and Landscape Architect working in technical-office delivery.
- BIM is a supporting delivery skill. Do not present BIM coordination as the primary professional identity.
- Use specific verbs such as developed, produced, reviewed, delivered, refined, verified, and supported.
- Never invent project values, areas, counts, approval rates, savings, or other outcomes.
- Keep job titles, employers, dates, and project roles aligned with the approved CV.

## Confidential project rule

`security-aviation-leadership-building` is a military command project. Its public case study is text-only and limited to Shaher's role, a general delivery workflow, and non-sensitive deliverable types.

- Do not publish project imagery, drawings, model files, plans, technical elevations, site photographs, room data, security information, restricted stakeholders, or technical quantities.
- Do not add imagery without Shaher's explicit approval for that exact public use.
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

## Selected work and evidence

- `projectCollections` in `data/portfolio.ts` defines the user-approved presentation hierarchy: King Abdullah International Gardens (owner Riyadh Municipality; contractor Zaid Al-Hussein), Housing Projects Parks (Marsa Khuzam, AlUla, and the 11 Housing Parks package), NHC Jeddah projects (Sedayem and Jeddah Park), Security Aviation, and selected architectural work. Grouping does not replace each case study's owner, consultant or contractor. Keep the grouped project directory, case-study context, film introductions and chapter navigation aligned.
- Film introductions use labelled radial contribution diagrams with connected workstream cards, not quantitative pie charts. All nine scope introductions retain their verified role and deliverables. Keep the complete 52-scene edit, all 23 KAIG drawing excerpts, the model and 19 approved Behance shots, in a silent 90-second published film.
- Keep project roles visible on cards.
- `data/review-film-selection.json` keeps Shaher’s explicit film exclusions. Do not restore the 19 removed Behance shots when regenerating the film. The chaptered edit shows all 23 KAIG drawing excerpts across ten scenes, each playing for 1.5 seconds in the published film (3 seconds in the authored master). `data/portfolio-film-storyboard.json` defines project workstreams and authored timing; `data/portfolio-film-timeline.json` contains the retimed 90-second player, caption and navigation timing. Contribution diagrams map responsibilities; they are not measured percentages.
- `/quick-review` is the recruiter-facing chaptered film route. Keep its metrics and project claims traceable to `data/portfolio.ts`; do not add standalone claims there.
- `ProjectAtlas` switches between dark country overviews of Saudi Arabia (Riyadh, Jeddah, AlUla) and Egypt (Cairo). Cairo contains Blue Development and the separate Niqat Project. Country outlines use Natural Earth 1:110m public-domain data; the Egypt projection and city marker are recorded in `data/project-atlas-geography.json`. Markers denote cities rather than exact project sites. Counts derive from project records. Region assignments and external Google Maps project-location links come only from each project record. Do not expose restricted sites.
- `niqat-project` is the second Cairo project, separate from Blue Development. Its GLB and three model views come from Shaher's supplied `Niqat project.ifc`; `scripts/convert-niqat-ifc.py` records source provenance under `assets/review-sources/`. Reuse the shared viewer with the project's `modelSrc`; never hardcode Blue Development's file or label for another project. Publish geometry and appearance only, with no original IFC, element GUIDs, property sets or room metadata. No specific LOD, formal job title, project owner or delivery claims have been confirmed for the new project.
- Project rows open their full case studies. Show only the project-specific public images and drawings already approved and cataloged; do not borrow another project's visuals to fill gaps.
- Capability cards and the quick-review evidence browser use each capability's `evidence` list. Every skill claim must link to a real project and a verified contribution statement.
- `TechnicalProofViewer` is the interactive evidence surface used on the homepage and KAIG case study. Its studies come from `workSamples` through `getTechnicalProofStudies`.
- Keep drawing stages distinct from wider built-project context. A context image must be labeled as context and must not imply a direct one-to-one constructed result unless Shaher has verified that relationship.
- `workSamples` pairs approved gallery images with the technical focus, contribution, and documented output. Do not turn these descriptions into unverified approval, savings, or performance claims.
- Keep all 23 KAIG drawing samples and the 8 context images available; curated studies come first.
- Jeddah Park is a descriptive title for the user-confirmed 78,000 m² park. A formal project name and specific project dates have not been supplied. The owner, consultant, and role match the user's Jeddah streetscape scope.
- `/digital-practice` presents SHAHER TOOLS as selected workflow development, not as a replacement for Shaher's architecture and landscape practice.
- SHAHER TOOLS may describe the verified inputs, intended workflow logic, and outputs of Gypsum Board Designer, Apartment View Splitter, and Raised Access Floor. A recorded demo, production-readiness claim, personal contribution breakdown, download, or quantitative result requires Shaher's evidence and approval first.
- Never use client Revit models, project drawings, or restricted data to demonstrate SHAHER TOOLS publicly.
- Marsa Khuzam is a Riyadh project. Keep its project record and atlas assignment under Riyadh.
- Further architectural BIM samples and the missing Housing Parks / Jeddah project visuals require suitable approved source material. Never use another project's imagery as evidence.
- Keep freelance visualization outside the public project directory and career timeline unless Shaher explicitly requests its return.
- After CV or portfolio PDF edits, render and visually review every page, and verify the PDF links before publishing.

## Free GitHub Pages publication

- `npm run build:github-pages` exports the approved portfolio to `out/`, with `/Shaher-portfolio` as its repository path. The isolated source under ignored `work/` adapts public asset paths and metadata; the original Sites build remains usable.
- `.github/workflows/github-pages.yml` builds, checks and publishes the free site. Settings → Pages must use **GitHub Actions** as its publishing source.
- `data/github-pages-assets.json` pins public media by size and SHA-256. The recovery script fetches only missing or outdated approved media from the public Site and verifies it. The workflow commits it so future builds are independent. Refresh this manifest after intentional media changes. Never add original IFC files or private material.
- Run `npm run test:github-pages` after export to check project routes, asset paths, maps, film and public models.
