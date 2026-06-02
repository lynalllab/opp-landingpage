# Open Psychiatry Project — Website

Jekyll site for the Open Psychiatry Project, deployed via GitHub Pages.

---

## Editing page content

All section text lives in **`index.md`**. Open it and find the section you want to edit — each section has a comment block like `<!-- ═══ ABOUT ═══ -->` to help you navigate.

- Edit the heading, paragraphs, and callout text directly in the HTML within `index.md`.
- **Do not** remove the `{% include ... %}` tags — they pull in the form, feature cards, and partner grid from separate files.

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

> **Project repo note:** If your repo is at `github.com/org/repo-name` (not a `username.github.io` repo), set `baseurl: "/repo-name"` in `_config.yml` so asset paths resolve correctly. Also update the `_next` redirect URL in `_includes/form.html` to the full absolute URL of the thank-you page (e.g. `https://org.github.io/repo-name/thank-you`).

---

## Activating the contact form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io) and create a new form. Copy the form ID from the endpoint URL (the part after `/f/`).
2. Open **`_includes/form.html`**.
3. Replace `REPLACE_WITH_FORM_ID` in the `action` attribute with your form ID:
   ```html
   <form action="https://formspree.io/f/abcde123" ...>
   ```
4. Update the `_next` hidden input value to the full URL of your thank-you page:
   ```html
   <input type="hidden" name="_next" value="https://your-site-url.github.io/thank-you">
   ```
