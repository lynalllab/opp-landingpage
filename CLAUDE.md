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

| Editable content | Location |
|---|---|
| All landing page text | `index.md` (HTML sections with comments) |
| Feature cards ("How It Works") | `_data/features.yml` |
| Partner list and logos | `_data/partners.yml` |
| Site name, contact, footer links | `_data/site.yml` |
| Form fields | `_includes/form.html` |

Layout HTML lives in `_layouts/default.html` and `_includes/`. The SCSS lives in a single file: `assets/css/main.scss` (compiled by Jekyll; requires the empty `---` front matter at the top).

### Single-page structure

`index.md` is a single scrolling page with five anchor-linked sections: `#home`, `#about`, `#how-it-works`, `#partners`, `#register`. There is no navigation bar. The only other page is `thank-you.md` (Formspree post-submit redirect).

### Diagonal section dividers

Sections alternate between `$white` and `$off-white` backgrounds. Transitions use CSS `clip-path` on `::before`/`::after` pseudo-elements — even transitions use `polygon(0 0, 100% 0, 100% 100%)`, odd transitions use `polygon(0 0, 100% 0, 0 100%)`. Sections with dividers have extra `padding-top` to compensate for the 95px overlay height.

### Color palette

All brand colors are defined as both CSS custom properties (`:root`) and SCSS variables at the top of `main.scss`. The SCSS variables are used throughout for calculations; the CSS custom properties are available for any vanilla CSS or JS that needs them.

### Deployment

Uses the `github-pages` gem to match GitHub Pages' build environment exactly. Push to `main` — GitHub Pages builds and deploys automatically. The Formspree form ID placeholder (`REPLACE_WITH_FORM_ID`) in `_includes/form.html` must be replaced before the form will work.
