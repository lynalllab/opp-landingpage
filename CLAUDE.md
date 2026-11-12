# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Install dependencies
bundle install

# Local dev server (auto-rebuilds on save, available at http://localhost:4000)
bundle exec jekyll serve

# Production build (output to _site/)
bundle exec jekyll build
```

No test suite. Verify changes with `bundle exec jekyll build` — a zero-exit build means no template/YAML/SCSS errors.

## Architecture

This is a Jekyll static site with **no theme** — all layouts and styles are built from scratch.

### Content vs. structure separation

**No page copy is hardcoded in HTML/Markdown templates — every string of visible text lives in a `_data/*.yml` file.** Templates (`index.html`, `*.html` pages, `_includes/`) only contain markup, Liquid loops, and references into `site.data`. When adding a new visible string, add a key to the relevant data file below rather than writing text directly into a template.

| Editable content | Location |
|---|---|
| Home page copy (hero, about, audience cards) | `_data/home.yml` |
| Feature cards ("How It Works") | `_data/features.yml` |
| Partner list and logos | `_data/partners.yml` |
| Get Involved page copy (`/get-involved/`: hero, pitch, ask, register section, task/FAQ labels, contact) | `_data/get_involved_page.yml` |
| Get Involved task timeline (years / title / subtitle / task) — also feeds the FAQ breakdown's "What you will do" | `_data/projects.yml` |
| Get Involved register card: "What it asks" steps + "How we look after it" points | `_data/get_involved.yml` |
| Booking modal copy (industry page) | `_data/booking_modal.yml` |
| Site nav labels/links | `_data/nav.yml` |
| Team page intro + placeholder label | `_data/team_page.yml` |
| Team lists (`research` and `coproduction` groups) | `_data/team.yml` |
| Glossary page chrome (header, search, empty state) | `_data/glossary_page.yml` |
| Glossary term list | `_data/glossary.yml` |
| Get Involved FAQ questions/answers (flat list of five) | `_data/faqs.yml` |
| FAQ "what would I do" project breakdown (only the PWLE column renders) | `_data/faq_projects.yml` |
| Parked FAQs for the unbuilt `/good-experience/` page | `_data/good_experience_faqs.yml` |
| Industry page copy | `_data/industry.yml` |
| Find Out More page copy | `_data/findout_more.yml` |
| Thank-you page copy | `_data/thank_you.yml` |
| Site name, contact, footer links/copy, Qualtrics form URL, booking URL | `_data/site.yml` |

Layout HTML lives in `_layouts/default.html` and `_includes/`. The SCSS lives in a single file: `assets/css/main.scss` (compiled by Jekyll; requires the empty `---` front matter at the top).

### Single-page structure

`index.html` is a single scrolling page with five anchor-linked sections: `#home`, `#about`, `#how-it-works`, `#partners`, `#audience`. `_includes/nav.html` (site-wide top nav, data in `_data/nav.yml`) links into these anchors from other pages.

### Register interest (external Qualtrics form)

The interest form is hosted externally on Qualtrics — this site doesn't own or style its questions. `_data/site.yml`'s `qualtrics_form_url` is the single source of truth for the URL. There is exactly **one** recruitment route and no other register prompts anywhere on the site: nav item "For patients, carers and public" (`muted: true` in `nav.yml`, rendered grey via `.nav-link--muted`) → `/get-involved/` (`get-involved.html`: two-column hero, recruitment ask, an inline "Register your interest" section listing what the form asks from `get_involved.yml › preview`, a task timeline from `projects.yml` with a scroll-in reveal in `assets/js/gi-timeline.js`, and a five-item FAQ accordion from `faqs.yml` + `faq_projects.yml`) → green "Open the form" button → Qualtrics in a new tab. `/faqs/` redirects to `/get-involved/`. The `/good-experience/` page linked from the get-involved page does not exist yet; its parked FAQ content is in `_data/good_experience_faqs.yml`. The industry page keeps its own booking modal (`_includes/booking-modal.html`).

### Diagonal section dividers

Sections alternate between `$white` and `$off-white` backgrounds. Transitions use CSS `clip-path` on `::before`/`::after` pseudo-elements — even transitions use `polygon(0 0, 100% 0, 100% 100%)`, odd transitions use `polygon(0 0, 100% 0, 0 100%)`. Sections with dividers have extra `padding-top` to compensate for the 95px overlay height.

### Color palette

All brand colors are defined as both CSS custom properties (`:root`) and SCSS variables at the top of `main.scss`. The SCSS variables are used throughout for calculations; the CSS custom properties are available for any vanilla CSS or JS that needs them.

### Deployment

Uses the `github-pages` gem to match GitHub Pages' build environment exactly. Push to `main` — GitHub Pages builds and deploys automatically.
