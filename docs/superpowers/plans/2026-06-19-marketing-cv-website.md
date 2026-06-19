# Marketing CV Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an elegant, bilingual (DE/EN) one-page CV website for Malin Svoboda and deploy it to GitHub Pages.

**Architecture:** Static site, no build step — `index.html` (semantic markup, both-language copy held inline via `data-de`/`data-en` attributes), `style.css` (editorial styling), `script.js` (language toggle with `localStorage` persistence), `assets/malin.jpg` (portrait from the source `.docx`). The existing placeholder `index.html` is replaced.

**Tech Stack:** Plain HTML5 + CSS3 + vanilla JS. Google Fonts (Cormorant Garamond / Inter) with system fallback. GitHub Pages hosting.

## Global Constraints

- **Visual style:** classic & elegant / editorial — serif display headings, generous whitespace, ivory background (~`#F7F3EC`), ink text (~`#2A2622`), one muted terracotta accent (~`#9B4A3C`). Final hex tuned for contrast (WCAG AA body text).
- **Bilingual:** every visible string exists in both DE and EN; toggle swaps all of them and persists across reloads.
- **Contact shown:** email (`malin.svoboda@gmail.com`) + "Berlin" only. Never render street address or phone.
- **Content fidelity:** use the cleaned/corrected copy from the spec verbatim (Cambridge Certificate, Marlborough Girls' College, Auslandsjahr, Malen & Zeichnen, etc.). German grades (2,9 / 2,1) kept as-is in both languages.
- **Responsive:** must look polished on desktop and mobile (≥320px).
- Source spec: `docs/superpowers/specs/2026-06-19-marketing-cv-website-design.md`.

## File Structure

- `index.html` — page structure + bilingual content (replaces placeholder).
- `style.css` — all styling.
- `script.js` — language toggle.
- `assets/malin.jpg` — portrait image.

Implementation uses the **frontend-design** skill for the visual craft (Task 2).

---

### Task 1: Page skeleton + content + photo asset

**Files:**
- Create: `assets/malin.jpg` (copy from `/tmp/docx_extract/word/media/image1.jpeg`)
- Modify: `index.html` (replace placeholder entirely)

**Interfaces:**
- Produces: a `data-de`/`data-en` attribute convention on every text node that differs by language — e.g. `<span data-de="Schülerin" data-en="Student">Schülerin</span>`. Task 3's toggle reads these attributes. A `#lang-toggle` button and `<html lang="de">` are present for Task 3 to manipulate.

- [ ] **Step 1: Copy the portrait into the repo**

```bash
mkdir -p assets
cp /tmp/docx_extract/word/media/image1.jpeg assets/malin.jpg
```

- [ ] **Step 2: Write `index.html`** with semantic sections (header, profile, education timeline, skills, interests, footer). Every translatable string carries `data-de` and `data-en`; default visible text is German. Include `<link>` to `style.css`, `<script defer src="script.js">`, the Google Fonts links, the `#lang-toggle` button, and `<img src="assets/malin.jpg" alt="Malin Dorothea Svoboda">`. Use the exact content from the spec's Content section (both languages). No street address, no phone.

- [ ] **Step 3: Verify content renders**

Run: `open index.html` (macOS) — or open in a browser.
Expected: all sections visible with German text, photo loads, no address/phone anywhere on the page. Unstyled is fine at this stage.

- [ ] **Step 4: Commit**

```bash
git add index.html assets/malin.jpg
git commit -m "Build bilingual CV page structure and content"
```

---

### Task 2: Editorial styling

**Files:**
- Create: `style.css`
- Modify: `index.html` (only if class hooks need adding)

**Interfaces:**
- Consumes: the markup/sections from Task 1.
- Produces: a finished editorial look matching the Global Constraints palette and type. Adds a `.timeline` treatment for education and a styled `#lang-toggle`.

- [ ] **Step 1: Invoke the frontend-design skill** for the visual craft, then write `style.css`: CSS custom properties for palette, Cormorant Garamond for headings + Inter/system for body, single centered column (max-width ~760px), hairline dividers, a vertical timeline for Education, refined photo treatment (subtle rounded frame), styled language toggle. Mobile-first responsive; verify ≥320px reflow. Ensure WCAG AA contrast for body text.

- [ ] **Step 2: Verify the design**

Run: open `index.html` in a browser; resize from desktop down to ~320px.
Expected: elegant editorial layout, palette matches, timeline reads cleanly, photo framed tastefully, nothing overflows or overlaps on mobile.

- [ ] **Step 3: Commit**

```bash
git add style.css index.html
git commit -m "Add editorial styling"
```

---

### Task 3: Bilingual toggle

**Files:**
- Create: `script.js`
- Modify: `index.html` (only if the toggle button needs id/markup tweaks)

**Interfaces:**
- Consumes: `data-de`/`data-en` nodes, `#lang-toggle` button, and `<html lang>` from Task 1.
- Produces: `setLang(lang)` behavior — swaps every `[data-de][data-en]` node's `textContent` to the chosen language, updates `<html lang>`, updates the toggle label, and saves choice to `localStorage` under key `cv-lang`. On load, reads saved choice (default `de`).

- [ ] **Step 1: Write `script.js`**

```javascript
const KEY = "cv-lang";
function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-de][data-en]").forEach((el) => {
    el.textContent = el.dataset[lang];
  });
  const btn = document.getElementById("lang-toggle");
  if (btn) btn.textContent = lang === "de" ? "EN" : "DE";
  localStorage.setItem(KEY, lang);
}
document.addEventListener("DOMContentLoaded", () => {
  setLang(localStorage.getItem(KEY) || "de");
  document.getElementById("lang-toggle").addEventListener("click", () => {
    setLang(document.documentElement.lang === "de" ? "en" : "de");
  });
});
```

- [ ] **Step 2: Verify the toggle**

Run: open `index.html`, click the toggle.
Expected: all copy switches DE↔EN (tagline, profile, education, skills, interests, footer); the button label flips; reloading the page keeps the last-chosen language.

- [ ] **Step 3: Commit**

```bash
git add script.js index.html
git commit -m "Add DE/EN language toggle with persistence"
```

---

### Task 4: Final review pass

**Files:** none (review only; fix inline in the relevant file if issues found)

- [ ] **Step 1: Spec checklist**

Verify against `docs/superpowers/specs/2026-06-19-marketing-cv-website-design.md`:
- Both languages complete, no leftover English in DE view or vice versa.
- Spelling matches the corrected spec copy.
- Only email + Berlin shown; no address/phone in HTML source (`grep -i "Sakrower\|2105622" index.html` returns nothing).
- Responsive at 320px / tablet / desktop.
- Photo loads from `assets/malin.jpg`.

- [ ] **Step 2: Commit any fixes**

```bash
git add -A && git commit -m "Final content and polish pass"
```

---

### Task 5: Deploy to GitHub Pages

**Files:** none (repo settings + push)

**Interfaces:**
- Consumes: committed site on `main`.
- Produces: a live URL `https://malinsvoboda.github.io/CV/`.

- [ ] **Step 1: Confirm with the user** before any public push (page becomes publicly visible with photo + email).

- [ ] **Step 2: Push to `main`**

```bash
git push origin main
```

- [ ] **Step 3: Enable Pages** (serve `main` / root) via the GitHub UI or:

```bash
gh api -X POST repos/MalinSvoboda/CV/pages -f "source[branch]=main" -f "source[path]=/" 2>/dev/null || echo "Enable via repo Settings > Pages if API auth lacks scope"
```

- [ ] **Step 4: Verify the live site**

Run: open `https://malinsvoboda.github.io/CV/` after Pages builds (~1 min).
Expected: site loads, toggle works, photo + styling intact.

---

## Self-Review Notes

- **Spec coverage:** header/profile/education/skills/interests/footer → Task 1; visual direction → Task 2; bilingual toggle + persistence → Task 3; contact-minimization & content fidelity → Tasks 1 & 4; deployment → Task 5. All spec sections covered.
- **Placeholder scan:** no TBD/TODO; toggle code is complete; CSS craft delegated to frontend-design with explicit constraints (palette/type/layout specified).
- **Type consistency:** `data-de`/`data-en` + `#lang-toggle` + `cv-lang` localStorage key used consistently across Tasks 1 and 3.
