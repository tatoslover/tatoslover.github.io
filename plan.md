# Portfolio Improvement Plan

## Completed

- [x] Hamburger menu (mobile) — slides down, animates to ✕, closes on outside tap
- [x] Active nav highlight (scroll spy) — IntersectionObserver highlights current section
- [x] Back-to-top button — fades in after first section, smooth scrolls
- [x] Remove dead CSS — perspective/transform-style, theme-transition
- [x] JSON caching (sessionStorage) — skips network on repeat visits
- [x] Image lazy loading — defers off-screen logos inside tab panels
- [x] Mobile tab buttons — stacked vertically instead of horizontal scroll
- [x] Scroll-in animations — IntersectionObserver, respects prefers-reduced-motion
- [x] Open Graph / Twitter Card meta tags
- [x] Skill icons — Devicon CDN, icon classes in skills.json

---

## Content

### Automating Transcription project
**Why:** Currently has a `#` placeholder for liveDemo and "Coming Soon" for documents — looks unfinished.
**Options:**
- Add a GitHub source code link if the repo is public
- Replace `liveDemo: "#"` with `""` to hide the button until content is ready
- Add a write-up PDF or link when available

**Files:** `content/projects.json`

---

## Up next

### 1. Skip-to-content link (accessibility)
**Why:** Standard keyboard accessibility practice.
**Plan:**
- Visually hidden `<a href="#home">Skip to content</a>` at top of `<body>`
- Becomes visible on keyboard focus
- ~5 lines of CSS

**Files:** `index.html`, `css/main.css`

---

### 2. Focus trap in hamburger (accessibility)
**Why:** Tab key currently escapes the open mobile nav into the page behind it.
**Plan:**
- When nav is open, constrain `Tab`/`Shift+Tab` to nav links and close button
- Release trap on close

**Files:** `js/main.js`

---

### 3. Preload profile image
**Why:** Reduces flash of empty profile circle on load.
**Plan:**
- Add `<link rel="preload" as="image" href="assets/logos/profile.png">` to `<head>`

**Files:** `index.html`

---

### 4. Custom 404 page
**Why:** GitHub Pages shows a generic 404. A branded page that links home is more professional.
**Plan:**
- Create `404.html` matching site styles with a message and link back

**Files:** `404.html` (new)

---

### 5. Structured data (JSON-LD)
**Why:** Person schema helps Google surface the portfolio in rich results.
**Plan:**
- Add a `<script type="application/ld+json">` block to `<head>` with name, job title, links

**Files:** `index.html`
