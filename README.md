# Thisai IAS Academy — Website

A fast, mobile-first, **bilingual (English / Tamil)** marketing + lead-gen site for
**Thisai IAS Academy**, Erode — TNPSC Group 1/2/4 coaching, a Group 4 test series, and
free UPSC mentorship.

**Live programs & key dates**
- **Batch 1** — TNPSC Group 1, 2 & 4 combined course — **starts Nov 2, 2026**
- **Group 4 Test Series** — **starts Oct 20, 2026**
- **Free UPSC Civil Services mentorship** — merit-based, guided by UPSC interview-stage candidates

**Conversion goals:** register interest (Batch 1 / Test Series / UPSC) and capture leads
with the free Group 4 2024 solved paper.

---

## Stack & pages

Plain **static HTML + CSS + vanilla JS**, no build step — tuned for Lighthouse-mobile on
mid-range Android over Tier-2 data. Three pages share one stylesheet and one set of scripts:

```
index.html        # home: hero, programs, diagnostics, guarantee, register + lead-magnet, FAQ, contact
courses.html      # Courses & Test Series (combined course, Group 4 test series, UPSC mentorship)
blog.html         # Blog, Articles & Current Affairs (category filter + sample/template posts)

config.js         # EDIT THIS — dates, WhatsApp, form endpoint, seats, analytics, maps
css/styles.css    # brand design system (navy #0d2f6b + brass gold, Newsreader headings)
js/i18n.js        # English/Tamil dictionary + engine (data-i18n), persists choice
js/auth.js        # sign in / sign up modal (front-end demo — swap in a real backend)
js/main.js        # countdown, announcement rotator, mobile menu, forms, analytics
assets/           # logo-horizontal.png, logo-badge.webp, favicons, og-image.png
vercel.json       # forces a no-build static deploy
```

---

## Run locally

Static — serve over http:// (not file://) so the countdown and Google Map work:

```bash
python3 -m http.server 8080      # then open http://localhost:8080
# or: npx serve .
```

## Deploy (Netlify / Vercel — no build step)

Publish directory = repo root. `vercel.json` already forces a static deploy (this repo
previously failed with a leftover `vue-cli-service build` command). On Vercel set
**Framework Preset = Other** and leave Build Command empty; on Netlify set build command
to none. After deploying, update the absolute URLs in each page's `<head>`
(`og:image`, `og:url`, `canonical`) to your real domain.

---

## ✅ Features built

- **Brand applied** — official torch wordmark (`assets/logo-horizontal.png`) in header,
  footer and auth modal; circular seal as favicon + hero watermark; exact brand palette
  (navy `#0d2f6b`, brass gold `#b8861f`/`#d9ae4a`) and Newsreader serif headings.
- **Announcement bar** — auto-rotating, with all three launches (reduced-motion safe).
- **Sign in / Sign up** — accessible modal from every page's header, tabbed, with client
  validation and a signed-in header pill + sign-out. See **Auth backend** below.
- **Full Tamil version** — real EN⇄தமிழ் toggle (top-right), translating all pages; choice
  is remembered. Tamil renders in Noto Sans Tamil. Extend by adding keys to `js/i18n.js`.
- **Server-time-safe countdown** to Nov 2, 2026 (anchors to the origin `Date` header,
  falls back to device clock).
- **Two forms** — "Register interest" (name, phone, interest, status) and the lighter
  lead-magnet (name + WhatsApp). Client validation, single-`fetch` submit, success states.
- **Courses & Test Series page** and **Blog/Articles/Current Affairs page** (with working
  category filter and clearly-labelled sample posts — no fabricated news).
- **Floating WhatsApp**, lazy-loaded Google Map, SEO (single H1 per page, meta, structured
  data), OG/Twitter cards, GA4 event stubs, honest seats indicator (hidden by default).

---

## Auth backend (IMPORTANT before launch)

`js/auth.js` is a **front-end demo**: it validates input and remembers a session in the
browser's `localStorage`, but provides **no real security** (no server, no password storage).
Replace the two functions marked `TODO: real backend` with a real provider — both have free
tiers and need no server:

- **Firebase Authentication** — `createUserWithEmailAndPassword` / `signInWithEmailAndPassword`
- **Supabase Auth** — `supabase.auth.signUp` / `signInWithPassword`

Keep the `setSession(...)` / `renderAuthState()` UI calls; only swap the network part.

## Admin & roles (blog writing / publishing)

Emails in `config.js → SUPER_ADMINS` get a **writing/publishing toolbar on
`blog.html`** when signed in with that email. Currently:
`thisaiiasofficial@gmail.com` (super admin + blog author).

- **Save as local draft** — previews the post at the top of the grid (this
  browser only).
- **Generate publish HTML** — outputs a ready-to-paste `<article>` block. To
  publish for everyone on this static site, paste it into `blog.html` (inside
  `<div class="blog-grid">`) and deploy — or copy/download it.

⚠️ This role gate is **front-end convenience, not security** (anyone editing the
JS could show the toolbar, and "publishing" still goes through your deploy).
For a real multi-author CMS with enforced roles, pair the auth backend above
with server-side rules: **Firebase** custom claims (`admin: true`) + Firestore/
Storage security rules, or **Supabase** a `profiles.role` column + Row-Level-
Security policies. Store posts in that database and render them on `blog.html`.

---

## Group 4 pages & funnel

- **`group4.html`** — "Target Group 4 Exam" (in the main menu). The full 13-section
  preparation-system page (at-a-glance, syllabus, method, daily routine, what-you-get,
  journey timeline, personas, why-Thisai), with a **countdown to the Jan 10, 2027 exam**
  and two lead magnets: the **Free Group 4 Diagnostic Test** and the **Free Prep Kit**
  (name + WhatsApp). Built as the lead magnet for classes & the test series.
- **`group4-ad.html`** — a distraction-light **ad landing page** (`noindex`) for paid
  campaigns: problem→solution, what-you-get, Free Kit form, Free Diagnostic Test, batch
  offer, final CTA. Funnel: Free Kit (cold) → Diagnostic Test (interested) → Counsellor
  (high-intent) → Batch.
- **Diagnostic test** (`js/group4-quiz.js`): 15-minute timer, instant readiness %, per-
  section strength/weakness, then lead capture. **The question bank is editable sample
  content** (aptitude is self-checking; a few well-established GS/Tamil facts) — replace
  it with your own vetted 25-question bank before launch. Ad links can auto-open it with
  `group4.html#test`.
- Exam date / vacancies (`Jan 10, 2027` · `6,574`) live in `config.js` (`G4_EXAM_ISO`,
  `G4_VACANCIES`) and the page copy — **verify against the official TNPSC notification.**

## Before you go live — fill these in

**In `config.js`:**
| Key | What to set |
|---|---|
| `WHATSAPP_NUMBER` | Real number, digits only, no `+` (e.g. `919876543210`). |
| `PHONE_DISPLAY` | Public phone number shown on the page. |
| `FORM_ENDPOINT` | Formspree endpoint (or Sheets/serverless). Until set, forms run in **demo mode** (validate + success, send nothing). |
| `LEAD_MAGNET_LINK` | Hosted link to the free Group 4 2024 solved paper. |
| `COUNTDOWN_ISO` / `TEST_SERIES_ISO` / `BATCH1_DATE_ISO` | Confirm dates (Nov 2 / Oct 20). |
| `SEATS_REMAINING` | A real integer someone maintains, or `null` to hide it (never fake scarcity). |
| `GA4_MEASUREMENT_ID` | GA4 id to enable analytics, or empty. |
| `MAPS_EMBED_SRC` | Paste the Google Maps "Embed a map" src to pin the exact building. |

**Confirmed & set:** official phone `+91 93455 12955`, WhatsApp `919345512955`,
email `thisaiiasofficial@gmail.com`, registration deadline **Oct 15, 2026**, and
scholarship tiers **90% / 60% / 30%**.

**Still-open on-page `{{TOKENS}}`** (search `{{` across the HTML) — [confirm] items shown
as visible dashed chips so they can't be missed; do **not** invent them:
`{{SEAT_CAP}}`, `{{BATCH_FEE}}`, `{{TEST_SERIES_FEE}}`, `{{GUARANTEE_ATTENDANCE_PCT}}`,
`{{GUARANTEE_COMPLETION_PCT}}`, `{{GUARANTEE_WEEKS}}`, `{{GUARANTEE_REFUND_TERMS}}`.

**Other:** the Progress Guarantee is **pending legal review** (flagged on-page). The
social image `assets/og-image.png` (1200×630) is generated from `assets/og-image.svg` —
re-export if you change it, and point `og:image` at its absolute URL.

---

## Forms

Both forms POST JSON via one `fetch()` in `js/main.js → submitForm()`. A `_form` field
distinguishes submissions. Options: **Formspree** (paste endpoint in config), **Google
Sheets via Apps Script**, or **any serverless function**. Lead-magnet delivery captures the
contact first, then auto-sends the link (via the form tool's autoresponder); the success
state also surfaces `config.LEAD_MAGNET_LINK` as a fallback.

## Compliance notes

Mentors are described only as "serving Group 1, Group 2, Group 4 and IFoS officers" — no
individual names/ranks/postings. No fabricated testimonials, student counts or reviews; the
blog's sample posts are clearly labelled placeholders. The guarantee headline always shows
its conditions in the same section.
