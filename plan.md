# Portfolio Improvement Plan

## Priority order

### 1. Hamburger menu (mobile)
**Why:** On small screens the nav currently stacks vertically and dominates the viewport.
**Plan:**
- Add ☰ / ✕ toggle button in the header (visible only on mobile)
- Nav slides down when open, closes on link click or outside tap
- CSS: `nav` hidden by default on mobile, `.nav-open` class reveals it
- JS: toggle class on `<header>`, close on nav link click

**Files:** `index.html`, `css/main.css`, `js/main.js`

---

### 2. Active nav highlight (scroll spy)
**Why:** No visual indication of current section while scrolling — disorienting on mobile.
**Plan:**
- `IntersectionObserver` watches each `<section>`
- When a section is ≥40% visible, add `.active` class to matching nav `<a>`
- CSS: `.active` gets accent colour underline

**Files:** `js/main.js`, `css/main.css`

---

### 3. Back-to-top button
**Why:** Long single-page portfolio with no way to jump back without scrolling.
**Plan:**
- Fixed button, bottom-right corner, hidden until user scrolls past first section
- Smooth scrolls to top on click
- Fades in/out

**Files:** `index.html`, `css/main.css`, `js/main.js`

---

### 4. Remove remaining dead CSS
- `.main-item.theme-transition` — class never applied in JS
- `perspective: 1500px` and `transform-style: preserve-3d` on `.content-container` — no 3D effect exists

**Files:** `css/main.css`

---

### 5. JSON caching (sessionStorage)
**Why:** `content-loader.js` re-fetches all JSON on every page load.
**Plan:** Before `fetch()`, check `sessionStorage` for the file. On success, write to `sessionStorage`. Zero network requests on repeat visits within the session.

**Files:** `js/content-loader.js`

---

### 6. Image lazy loading
**Why:** Logos inside tab panels load even if the tab is never opened.
**Plan:** Add `loading="lazy"` to images rendered inside `.content-container` in `content-loader.js`.

**Files:** `js/content-loader.js`
