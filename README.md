# Config-Driven Portfolio

A fast, responsive, single-page developer portfolio built with **pure HTML, CSS, and vanilla JavaScript** — no frameworks, no build step, no dependencies. **The entire site renders from one config file** ([`config.js`](config.js)), so you can make it yours in a few minutes without touching any "real" code.

![Built with HTML, CSS & JavaScript](https://img.shields.io/badge/built%20with-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-ff5a2c) ![No build step](https://img.shields.io/badge/build%20step-none-success) ![License: MIT](https://img.shields.io/badge/license-MIT-blue)

---

## ✨ What you get

- **Config-driven** — all content (text, projects, experience, links, theme, photos) lives in a single [`config.js`](config.js). The rest of the code never needs touching.
- **Zero dependencies** — no npm, no bundler. Open `index.html` and it runs.
- **Dark / light mode** with the visitor's choice remembered across visits.
- **Motion & polish** — scroll-reveal animations, count-up stats, a parallax photo flip, magnetic project cards, an animated mesh + grain background, and a custom cursor glow.
- **Responsive** — mobile menu, reflowing grids, and large-monitor breakpoints. Project images appear as a side panel on laptops/monitors and collapse away on phones.
- **Accessible** — semantic HTML, inline SVG icons (no emoji as UI), keyboard-friendly, AA contrast, and full `prefers-reduced-motion` support.

---

## 🗂 Project structure

```
├── index.html      → minimal shell that loads the rest (rarely edited)
├── config.js       → ALL content + theme  ← THE ONLY FILE YOU EDIT
├── styles.css      → styling and theme tokens (edit only to restyle)
├── app.js          → renders the page from config.js + drives animations (don't edit)
├── LICENSE         → MIT license
└── assets/
    ├── favicon.svg            → logo shown in the browser tab (placeholder included)
    ├── README.txt             → notes on the asset files
    ├── projects/              → optional per-project images
    ├── profile.jpg            → main photo            (add your own)
    ├── profile2.jpg           → second photo          (add your own)
    └── resume.pdf             → résumé download       (add your own)
```

> The repo ships with only `favicon.svg`. The site runs fine without the photos (it shows your initials), but **add `resume.pdf`** or the "Download résumé" button will 404.

**You only edit `config.js`.** `app.js` reads it and builds every section of the page; `styles.css` only controls the look.

---

## 🚀 Quick start

1. **Download / clone** this repo.
2. Open [`config.js`](config.js) and replace the placeholder values (see the guide below).
3. Drop your own files into [`assets/`](assets/) — `profile.jpg`, `profile2.jpg`, `resume.pdf`.
4. Open `index.html` in your browser to preview. Done.

> Tip: for the résumé download and Google Fonts to work exactly as in production, serve the folder instead of opening the file directly:
>
> ```bash
> # from the project root, pick one:
> python -m http.server 5500          # → http://localhost:5500
> npx serve .                          # if you have Node installed
> ```

---

## 📝 How to make it your own (every field explained)

Everything below lives in [`config.js`](config.js). Edit a value → save → refresh the browser. No build, no restart.

### `theme` — the look, in one place
| Field | What it does |
|-------|--------------|
| `accent` | The signature color used across the whole site. Try `#4d7cff` (blue), `#c8ff4d` (lime), `#f5b54c` (gold). |
| `accentDeep` | A darker shade of the accent, used for hovers and gradients. |
| `defaultMode` | `"light"` or `"dark"` — what new visitors see first. |

### `meta` — your basics
Your `name`, `role`, browser `tabTitle`, `location`, `email`, `phone`, and the paths to your `photo`, second photo (`photoBack`), and `resume`. Set `available: true` to show an "available for work" pill, or `false` to hide it.

### `nav` — the top menu
A list of `{ label, target }`. Each `target` is the `#id` of a section. Remove an item to drop it from the menu.

### `hero` — the big opening
- `badge` — small pill above the headline.
- `headline` — an array of lines for the giant title. **Wrap a word in `*stars*` to color it with your accent**, e.g. `"that solves *real*"`.
- `intro` — your one- or two-sentence elevator pitch.
- `ctas` — the buttons. Set a button's `target` to `"__resume__"` to make it download your résumé; otherwise use a `#section` id.
- `stats` — the animated count-up numbers (`value` counts up, `suffix` is appended, e.g. `%` or `+`).
- `flipDrop` — how far (px) the hero photo glides down while flipping to the second photo. `0` = flip in place.

### `about` — your story
A `kicker`, a `heading`, an array of `paragraphs`, and a `signature` line.

### `stack` — your skills
A `kicker`, `heading`, a list of `groups` (each a titled list of `items`), and a `marquee` — the scrolling ribbon of words near the top of the section. Add or remove groups freely.

### `experience` — work + education
- `jobs[]` — copy a `{ }` block to add a job. Each has `role`, `company`, `period`, `location`, `summary`, a list of `points`, and an optional company `link` (leave `""` to hide).
- `education` — `school`, `degree`, `period`, `location`, `gpa`, and a `coursework` list. Delete the whole block if you don't want an education section.

### `projects` — your work
Copy a `{ }` block in `projects.items` to add a project. Each card has:
- `name`, `year`, `blurb` (short context line), and a `description`.
- `tags` — small labels shown on the card.
- `github` / `demo` — links. **Leave either as `""` to hide that button.**
- `image` — optional; e.g. `"assets/projects/my-project.jpg"`. Shown as a side panel on large screens only.

### `contact` & `socials`
- `contact` — `kicker`, `heading`, `text`, and your `email`.
- `socials[]` — your links. `type` controls the icon (`"github"`, `"linkedin"`, `"website"`, `"email"`). Use a `mailto:` URL for email. Remove any line you don't use.

### `footer`
A single `note` line — your sign-off.

---

## 🖼 Replacing the images & résumé

Put your files in [`assets/`](assets/) using the same names, or point `config.js` at different paths:

| File | Used by | Notes |
|------|---------|-------|
| `assets/profile.jpg` | `meta.photo` | Portrait, ~800×1000px looks best. Until it exists, the site shows your initials. |
| `assets/profile2.jpg` | `meta.photoBack` | Revealed when the hero photo flips on scroll. Same size/orientation. |
| `assets/resume.pdf` | `meta.resume` | What the "Download résumé" buttons link to. |
| `assets/projects/*` | `projects.items[].image` | Optional per-project images. |

> ⚠️ The sample images and `resume.pdf` in this repo are **placeholders** — swap them for your own before publishing.

---

## 🪧 Favicon (the logo in the browser tab)

The favicon is the small icon next to the page title in the browser tab. Unlike everything else, it's **not** in `config.js` — the browser reads it from the `<head>` of [`index.html`](index.html) before any JavaScript runs, so it's wired up there with these lines:

```html
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg" />
<!-- <link rel="icon" type="image/png" href="assets/favicon.png" /> -->
<!-- <link rel="apple-touch-icon" href="assets/favicon.png" /> -->
```

To change it, do **one** of these:

- **Edit the placeholder** — open [`assets/favicon.svg`](assets/favicon.svg) and change the `fill` color and the letter to your own. It's a tiny SVG (an accent-colored rounded square with an initial).
- **Use your own image** — replace `assets/favicon.svg` with your own square SVG (sharpest at any size).
- **Add PNG / iOS support** — drop a 512×512 `assets/favicon.png` into `assets/` and **uncomment the two commented lines above** in `index.html`. For an `.ico`, add `<link rel="icon" href="assets/favicon.ico" />`.

> Browsers cache favicons aggressively. If a change doesn't show, hard-refresh with `Ctrl+Shift+R` or open the page in a private window. Tools like [favicon.io](https://favicon.io) or [realfavicongenerator.net](https://realfavicongenerator.net) convert any image into favicon files for free.

---

## 🎨 Restyling beyond the accent color

For most people, changing `theme.accent` / `theme.accentDeep` in `config.js` is enough. To go further, edit the **design tokens** at the top of [`styles.css`](styles.css) (colors, fonts, spacing). Fonts are loaded in [`index.html`](index.html) from Google Fonts — change the `<link>` there and the font-family tokens in `styles.css` to use different typefaces.

---

## 🌐 Deploying

It's a plain static site, so it works on any static host. Pick whichever you like:

- **GitHub Pages** — push this repo, then enable Pages in *Settings → Pages* (deploy from your branch). Files are served as-is.
- **Netlify / Vercel / Cloudflare Pages** — drag-and-drop the folder or connect the repo. No build command needed.
- **Any web server / shared hosting** — upload the files to your web root.

No build or environment configuration is required.

---

## 📄 License

Released under the [MIT License](LICENSE) — free to use the structure for your own portfolio. Please swap out the personal content (name, bio, photos, résumé, links) for your own.
