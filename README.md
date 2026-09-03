# Open Psychiatry Project — Website

Jekyll site for the Open Psychiatry Project, deployed via GitHub Pages.

---

## Editing page content

**No page text is written directly into the HTML files.** Every heading, paragraph, button label, and list item lives in a YAML file under **`_data/`**. The page templates (`index.html`, the other `*.html` pages, `_includes/`) just lay out structure and pull the words in from there — so to change what a page *says*, you only ever need to edit a `_data/*.yml` file, never the HTML.

Each YAML file has a comment block at the top explaining its fields. Find the page below, open the listed file(s), and edit the plain text.

| Page | Content file(s) |
|---|---|
| Home (`/`) — hero, about, "built for everyone" cards, timeline heading | `_data/home.yml` |
| Home — "How It Works" feature cards | `_data/features.yml` |
| Home — partner logos | `_data/partners.yml` |
| Home — project timeline entries | `_data/projects.yml` |
| Home — "Get involved" register pitch | `_data/get_involved.yml` |
| Team (`/team/`) — intro + lived-experience callout | `_data/team_page.yml` |
| Team — the people grid | `_data/team.yml` |
| Glossary (`/glossary/`) — header, search box, empty-state text | `_data/glossary_page.yml` |
| Glossary — the terms themselves | `_data/glossary.yml` |
| FAQs (`/faqs/`) — header, sidebar, "what would I do" labels | `_data/faqs_page.yml` |
| FAQs — the questions and answers | `_data/faqs.yml` |
| FAQs — the 3-project breakdown inside "What would I do?" | `_data/faq_projects.yml` |
| For Industry (`/industry/`) | `_data/industry.yml` |
| Find Out More (`/more/`) | `_data/findout_more.yml` |
| Thank You page (after the form submits) | `_data/thank_you.yml` |
| Site navigation bar (labels and links) | `_data/nav.yml` |
| End-of-page "Register your interest" banner (every page but Home) | `_data/register_band.yml` |
| Register-interest popup/modal | `_data/register_modal.yml` |
| Booking-call popup/modal (Industry page) | `_data/booking_modal.yml` |
| Site name, contact email, footer, funding note, form/booking URLs | `_data/site.yml` |

If you can't find a piece of text in any of these files, it's most likely a small structural label (an icon's accessibility description, for example) still in the template — search the relevant `.html` file for the exact words as a last resort.

---

## Adding or updating partner logos

1. Drop your logo image (PNG or SVG recommended) into **`assets/images/`**.
2. Open **`_data/partners.yml`**.
3. Find the partner entry and set `logo:` to the filename, e.g.:
   ```yaml
   - name: University of Cambridge
     url: https://www.cam.ac.uk
     logo: "cambridge.png"
   ```
4. Leave `logo: ""` to display the partner name as text instead of an image.

To add a new partner, copy any existing entry block and fill in `name`, `url`, and `logo`.

---

## Editing the "How It Works" feature cards

Open **`_data/features.yml`**. Each card has:
- `icon` — one of `molecule`, `shield`, or `people` (maps to an SVG in `_includes/features.html`)
- `heading` — the card title
- `description` — the card body text

---

## Running the site locally

**Prerequisites:** Ruby 3+ and Bundler (`gem install bundler`).

```bash
bundle install
bundle exec jekyll serve
```

The site will be available at `http://localhost:4000`. It rebuilds automatically when you save a file.

---

## Deploying to GitHub Pages

Push to the `main` branch. GitHub Pages detects the Jekyll source and builds it automatically — no extra steps needed.

> **Project repo note:** If your repo is at `github.com/org/repo-name` (not a `username.github.io` repo), set `baseurl: "/repo-name"` in `_config.yml` so asset paths resolve correctly.

---

## The "Register your interest" form

The interest form is hosted externally on Qualtrics — this site does not own or style it. The URL lives in one place, **`_data/site.yml`** (`qualtrics_form_url`); every "Register your interest" trigger on the site reads from it and opens it in a modal (see `_includes/register-modal.html` and `assets/js/register-modal.js`).

To point the site at a different form, update `qualtrics_form_url` in `_data/site.yml` — nothing else needs to change.

> **Note:** the "What it asks" summary in `_data/get_involved.yml` describes the Qualtrics question set from the outside. If the survey's questions change, re-check that list and the "about 5 minutes" estimate against the live form.
