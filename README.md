# Open Psychiatry Project — Website

Jekyll site for the Open Psychiatry Project, deployed via GitHub Pages.

---

## Editing page content

**No page text is written directly into the HTML files.** Every heading, paragraph, button label, and list item lives in a YAML file under **`_data/`**. The page templates (`index.html`, the other `*.html` pages, `_includes/`) just lay out structure and pull the words in from there — so to change what a page *says*, you only ever need to edit a `_data/*.yml` file, never the HTML.

Each YAML file has a comment block at the top explaining its fields. Find the page below, open the listed file(s), and edit the plain text.

| Page | Content file(s) |
|---|---|
| Home (`/`) — hero, about, "built for everyone" cards | `_data/home.yml` |
| Home — "How It Works" feature cards | `_data/features.yml` |
| Home — partner logos | `_data/partners.yml` |
| Get involved (`/get-involved/`) — page copy, register section, FAQ labels | `_data/get_involved_page.yml` |
| Get involved — the task timeline (years / title / subtitle / what you will do) | `_data/projects.yml` |
| Get involved — the FAQ questions and answers | `_data/faqs.yml` |
| Get involved — the 3-project breakdown inside "What would I do?" | `_data/faq_projects.yml` |
| Get involved — register card: "What it asks" steps and "How we look after it" points | `_data/get_involved.yml` |
| Parked FAQs for the future `/good-experience/` page (not shown yet) | `_data/good_experience_faqs.yml` |
| Team (`/team/`) — intro | `_data/team_page.yml` |
| Team — Research team and Co-production team lists | `_data/team.yml` |
| Glossary (`/glossary/`) — header, search box, empty-state text | `_data/glossary_page.yml` |
| Glossary — the terms themselves | `_data/glossary.yml` |
| For Industry (`/industry/`) | `_data/industry.yml` |
| Find Out More (`/more/`) | `_data/findout_more.yml` |
| Thank You page (after the form submits) | `_data/thank_you.yml` |
| Site navigation bar (labels and links) | `_data/nav.yml` |
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

## PR preview links

Every pull request gets its own preview build, published by `.github/workflows/pr-preview.yml` to the `gh-pages` branch under `pr-preview/pr-<number>/`. The workflow comments the link on the PR and removes the preview when the PR is closed or merged:

```
https://lynalllab.github.io/opp-landingpage/pr-preview/pr-<number>/
```

`main` is published to the root of the same `gh-pages` branch by `.github/workflows/deploy.yml`, which keeps the `pr-preview/` folder intact.

**One-time setup (repo admin):** Settings → Pages → *Build and deployment* → Source: **Deploy from a branch** → branch **`gh-pages`**, folder **/ (root)**. Until that switch is made, the workflows run but Pages keeps serving `main` through the built-in Jekyll build, so previews are not reachable.

---

## The "Register your interest" form

The interest form is hosted externally on Qualtrics — this site does not own or style it. The URL lives in one place, **`_data/site.yml`** (`qualtrics_form_url`).

There is a single route to the form: the "For patients, carers and public" nav item → `/get-involved/` → the "Register your interest" section (what the form asks and how details are handled, copy in `_data/get_involved_page.yml` and `_data/get_involved.yml`) → the green "Open the form" button → the Qualtrics form in a new tab. There are no other register prompts on the site.

To point the site at a different form, update `qualtrics_form_url` in `_data/site.yml` — nothing else needs to change.

> **Note:** the "What it asks" summary in `_data/get_involved.yml` describes the Qualtrics question set from the outside. If the survey's questions change, re-check that list and the "about 5 minutes" estimate against the live form.

The old `/faqs/` page redirects to `/get-involved/`.
