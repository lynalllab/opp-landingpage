# Open Psychiatry Project — Website

Jekyll site for the Open Psychiatry Project, deployed via GitHub Pages.

---

## Editing page content

All section text lives in **`index.md`**. Open it and find the section you want to edit — each section has a comment block like `<!-- ═══ ABOUT ═══ -->` to help you navigate.

- Edit the heading, paragraphs, and callout text directly in the HTML within `index.md`.
- **Do not** remove the `{% include ... %}` tags — they pull in the Get Involved pitch, feature cards, and partner grid from separate files.

Site-wide data (project name, contact email, footer links, funding note) is in **`_data/site.yml`**.

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

> **Note:** the "What it asks" summary in `_includes/get-involved-section.html` describes the Qualtrics question set from the outside. If the survey's questions change, re-check those four lines and the "about 5 minutes" estimate against the live form.
