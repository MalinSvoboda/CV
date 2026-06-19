# Marketing CV Website — Design Spec

**Date:** 2026-06-19
**For:** Malin Dorothea Svoboda
**Goal:** Turn the source CV (`Lebenslauf.docx`) into a professional, elegant one-page CV website aimed at marketing roles, deployed live via GitHub Pages.

## Decisions (confirmed with user)

- **Language:** Bilingual — German and English, with a DE/EN toggle.
- **Contact shown:** Email + city ("Berlin") only. No street address, no phone (public page; subject is young).
- **Visual style:** Classic & elegant / editorial — serif display headings, generous whitespace, muted warm palette.
- **Photo:** Included (standard on German CVs); trivially removable.
- **Hosting:** GitHub Pages on the existing repo `MalinSvoboda/CV` (remote `origin` already set). Final push to be confirmed with user before publishing.

## Technical Approach

Static site, no build step:

- `index.html` — semantic markup, both-language text held inline (DE + EN), toggled via JS.
- `style.css` — all styling.
- `script.js` — language toggle (swaps `[data-lang]` content; remembers choice in `localStorage`).
- `assets/malin.jpg` — portrait copied from the source document.

Chosen over a static-site generator (overkill for one page, adds a build step) and a single inline-everything HTML file (less maintainable). The three-file approach is the simplest thing that hosts cleanly on GitHub Pages and stays hand-editable.

The existing placeholder `index.html` ("Coming soon") is replaced.

## Page Structure (single vertical scroll)

1. **Header** — Name, tagline, portrait, DE/EN toggle, email link.
2. **Profile** — short intro paragraph (authored copy below).
3. **Education** — vertical timeline.
4. **Skills** — Languages + IT.
5. **Interests** — Painting & drawing · Literature · Baking.
6. **Footer** — email · Berlin.

## Visual Direction

- **Palette:** ivory/cream background (~`#F7F3EC`), deep ink text (~`#2A2622`), one muted warm accent — terracotta/burgundy (~`#9B4A3C`). Final hex values tuned during build.
- **Type:** serif display for headings (Cormorant Garamond or Playfair Display via Google Fonts), clean sans for body (Inter or system stack). Web-font links with a system fallback.
- **Layout:** centered single column, max width ~720–820px, fine hairline dividers, generous line-height. Fully responsive; photo and timeline reflow gracefully on mobile.
- **Toggle:** small DE/EN control in the header; remembers the last choice.

## Content (cleaned + translated)

Spelling fixed from the source: Cambridge Certificate, Marlborough Girls' College, Auslandsjahr, Weitere Kurse, Malen & Zeichnen, IT-Kenntnisse.

### Name
Malin Dorothea Svoboda

### Tagline
- DE: *Schülerin · kreativ, sprachbegabt, marketinginteressiert*
- EN: *Student · creative, multilingual, drawn to marketing*

### Profile (authored — user to review)
- DE: *Aufgeschlossene Schülerin mit einem Gespür für Sprache, Gestaltung und Kommunikation. Durch ein Auslandsjahr in Neuseeland international geprägt und mit Freude am kreativen Arbeiten – von der Malerei bis zum geschriebenen Wort. Auf der Suche nach einem Einstieg im Marketing.*
- EN: *An open-minded student with a feel for language, design, and communication. Shaped by an exchange year in New Zealand and driven by creative work — from painting to the written word. Looking for a first step into marketing.*

### Education
| Period | German | English |
|---|---|---|
| Sept. 2013 – Juli 2018 | Grundschule am Ritterfeld — Abschlussnote 6. Klasse: 2,9 | Ritterfeld Primary School — final grade (Year 6): 2.9 |
| seit Sept. 2018 | Hans-Carossa-Gymnasium — derzeit 12. Klasse; Durchschnitt 11. Klasse: 2,1; Leistungskurse Englisch & Geschichte; Cambridge Certificate Course | Hans-Carossa-Gymnasium — currently Year 12; Year 11 average: 2.1; advanced courses English & History; Cambridge Certificate course |
| Juli 2024 – Juli 2025 | Auslandsjahr — Marlborough Girls' College, Neuseeland | Exchange year — Marlborough Girls' College, New Zealand |

### Skills
**Languages**
- DE: Deutsch – Muttersprache · Englisch – sehr gut
- EN: German – native · English – very good

**IT**
- DE: MS Office (Word, PowerPoint) · MS Teams · Scratch (Förderkurs für Hochbegabte)
- EN: MS Office (Word, PowerPoint) · MS Teams · Scratch (gifted-students program)

### Interests
- DE: Malen & Zeichnen · Literatur · Backen
- EN: Painting & drawing · Literature · Baking

### Contact
- malin.svoboda@gmail.com · Berlin

## Deployment

1. Replace placeholder, add assets, commit on `main`.
2. Enable GitHub Pages (serve `main` / root) on `MalinSvoboda/CV` — confirm with user before the public push.
3. Resulting URL: `https://malinsvoboda.github.io/CV/`.

## Out of Scope (YAGNI)

- No backend, contact form, or analytics.
- No CMS / framework.
- No PDF export (the original .docx remains the printable version).

## Success Criteria

- Opens locally and on GitHub Pages, looks polished on desktop and mobile.
- DE/EN toggle swaps all visible copy and persists.
- Only email + "Berlin" shown as contact.
- No spelling errors; content matches the cleaned CV.
