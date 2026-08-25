# Thisai IAS Academy — Landing Site

A single-page, mobile-first marketing site for **Thisai IAS Academy** — a TNPSC
Group 1 / 2 / 4 combined coaching academy launching in Erode, Tamil Nadu.

**Primary conversion goal:** Scholarship Test registrations (test date **Sept 15, 2026**).
**Secondary goal:** lead-magnet capture (free Group 4 2024 solved paper) to follow up
with visitors not yet ready to register.

---

## Stack

Plain **static HTML + CSS + vanilla JS** — no framework, no build step. Chosen so the
page stays tiny and fast on mid-range Android phones over Tier-2 mobile data (Lighthouse
mobile target 90+). Deploys as flat files anywhere.

```
index.html        # the whole page
config.js         # EDIT THIS — all swappable values (numbers, endpoint, phone, seats)
css/styles.css    # styles (civil-service navy + brass gold + diagnostic teal)
js/main.js        # countdown, forms, validation, WhatsApp, analytics, reveal
js/i18n.js        # EN/Tamil toggle stub (Tamil strings to be dropped in later)
assets/           # favicon.svg, og-image.svg + exported og-image.png (1200x630)
```

---

## Run locally

It's static, so any static server works. From the project root:

```bash
# Python (no install)
python3 -m http.server 8080
# then open http://localhost:8080

# …or Node
npx serve .
```

> Open it over **http://**, not by double-clicking the file. Two features need a real
> origin: the **server-time-safe countdown** (reads the `Date` response header) and the
> **Google Maps embed**. They degrade gracefully otherwise (countdown falls back to the
> device clock; map shows a placeholder).

---

## Deploy (Netlify or Vercel — both free for this size)

There is **no build step**. Publish directory = the repo root.

- **Netlify:** drag the folder onto app.netlify.com, or connect the repo (build command:
  _none_; publish directory: `/`).
- **Vercel:** `vercel` from the project root, or import the repo as a static project
  (framework preset: **Other**).

After deploying, update the absolute URLs in `index.html` (`og:image`, `og:url`,
`canonical`) to your real domain so social previews and SEO resolve correctly.

---

## ⚠️ Before you go live — fill these in

Everything below ships as an obvious placeholder. Copy-level unknowns render **on the
page** as dashed gold tokens like `{{SCHOLARSHIP_TIER_1}}` so they can't be missed;
functional values live in **`config.js`**.

### 1. Edit `config.js`
| Key | What to set |
|---|---|
| `WHATSAPP_NUMBER` | Real WhatsApp number, digits only, no `+` (e.g. `919876543210`). Powers the floating button + all WhatsApp CTAs. |
| `PHONE_DISPLAY` | Public phone number as shown on the page. |
| `FORM_ENDPOINT` | Your Formspree endpoint (or other — see **Forms** below). Until set, forms run in **demo mode** (validate + show success, send nothing). |
| `LEAD_MAGNET_LINK` | Hosted link to the free Group 4 2024 solved paper PDF. |
| `TEST_DATE_ISO` | Confirm the Scholarship Test date/time (drives the countdown). |
| `SEATS_REMAINING` | A **real** integer someone maintains, or leave `null` to hide it. Never fake scarcity. |
| `GA4_MEASUREMENT_ID` | GA4 ID (`G-XXXX`) to enable analytics, or leave empty. |
| `MAPS_EMBED_SRC` | Paste the exact "Embed a map" iframe `src` from Google Maps to pin the building; else it auto-builds a keyless embed from the address. |

### 2. Replace the on-page copy tokens (search `{{` in `index.html`)
These are **[confirm] items from the content doc** — do **not** invent them:
`{{SCHOLARSHIP_TIER_1}}` · `{{SCHOLARSHIP_TIER_2}}` · `{{SCHOLARSHIP_TIER_3}}` ·
`{{SEAT_CAP}}` · `{{TEST_PATTERN}}` · `{{REGISTRATION_DEADLINE}}` · `{{BATCH_FEE}}` ·
`{{GUARANTEE_ATTENDANCE_PCT}}` · `{{GUARANTEE_COMPLETION_PCT}}` · `{{GUARANTEE_WEEKS}}` ·
`{{GUARANTEE_REFUND_TERMS}}`

> The **Progress Guarantee** headline and its conditions are intentionally in the same
> section — keep them together. The guarantee copy is **pending legal review** (flagged
> on-page); don't publish undefined refund terms.

### 3. Social preview image
`assets/og-image.png` (1200×630) is generated from `assets/og-image.svg`. It's a solid
starting design — swap in a final branded PNG if you have one, and make sure the
`og:image` meta points at its **absolute** URL on your domain (WhatsApp/Instagram need a
raster image at an absolute URL).

---

## Forms

Both forms do client-side validation (name + Indian mobile number), submit as JSON, and
show a success state. The submit is a **single `fetch()`** in `js/main.js → submitForm()`.

**Option A — Formspree (simplest, no backend):**
1. Create a free form at [formspree.io](https://formspree.io).
2. Put its endpoint in `config.js → FORM_ENDPOINT`.
3. Both forms post to it; a `_form` field distinguishes *Scholarship Test Registration*
   from *Lead Magnet* submissions. Configure Formspree's autoresponder to send the
   lead-magnet link.

**Option B — Google Sheets (via Apps Script):**
1. In a Google Sheet: **Extensions → Apps Script**, paste:
   ```js
   function doPost(e){
     var data = JSON.parse(e.postData.contents);
     var sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Leads');
     sh.appendRow([new Date(), data._form, data.name, data.phone, data.target_group||'', data.current_status||'']);
     return ContentService.createTextOutput(JSON.stringify({ok:true})).setMimeType(ContentService.MimeType.JSON);
   }
   ```
2. **Deploy → New deployment → Web app**, access "Anyone", copy the `/exec` URL.
3. Put that URL in `config.js → FORM_ENDPOINT`.

**Option C — your own serverless function** (Vercel/Netlify function, Cloudflare Worker):
point `FORM_ENDPOINT` at any URL that accepts a `POST` with a JSON body.

**Delivery of the lead magnet:** we capture the contact first, then auto-send the paper
link (via the form tool's autoresponder / a WhatsApp automation). The success state also
surfaces the link from `config.LEAD_MAGNET_LINK` as a fallback.

---

## What's built

**Must-haves**
- Hero with Erode-local hook, primary CTA, and a **server-time-safe countdown** (anchors
  to the origin's `Date` header, tracks with a monotonic offset, falls back to the device
  clock).
- **Scholarship Test form** — 4 fields only (name, phone/WhatsApp, target group, current
  status) + WhatsApp-slot microcopy + success state.
- **Lead-magnet form** — name + WhatsApp only; link delivered after capture, not a live
  download.
- All content-doc sections in order: Hero → Erode-local → Why Thisai → The Program → AI
  Diagnostic Engine (4-layer visual with scroll reveal) → Mentorship → Doubt-Clearing →
  Personalised Plan → Progress Guarantee (with conditions) → Scholarship Test + form →
  Batch 1 → FAQ → Contact + Google Map.
- Floating WhatsApp button (pre-filled message), visible at all scroll positions.
- Mobile-first, responsive; largest asset (map iframe) is lazy-loaded so it never blocks
  first paint.
- Client validation + working submit handler + visible success states on both forms.
- On-page SEO: single H1, semantic HTML, meta title/description targeting "TNPSC coaching
  Erode", `EducationalOrganization` structured data, image alt text / `aria` labels.
- **No fabricated** testimonials, student counts, or reviews. The social-proof slot is a
  commented-out `TODO` placeholder for real Batch 1 results.

**Nice-to-haves**
- EN/Tamil language **toggle** (mechanism + English strings shipped; Tamil dictionary is a
  clearly-marked stub in `js/i18n.js` — fill `STRINGS.ta` to finish).
- **FAQ accordion** (native `<details>`).
- **Seats remaining** — honest only: shows solely when `config.SEATS_REMAINING` is a real
  number; hidden by default.
- **Analytics** — GA4 events `scholarship_register` and `leadmagnet_signup` when a
  Measurement ID is set (logs to console otherwise, so you can verify locally).
- **Open Graph / Twitter** cards for WhatsApp/Instagram shares.

---

## Design direction

**Civil-service navy + brass gold, with a diagnostic-teal data accent.** Deep institutional
navy and warm brass signal a serious government-exam institution (not ed-tech SaaS); teal
is reserved for the AI Diagnostic Engine so the differentiator reads as its own
"instrument." Type: **Fraunces** (serif display, institutional authority) over **Public
Sans** (clean, civic, highly legible on small screens). All colours are CSS variables at
the top of `css/styles.css`.

## Accessibility & performance notes

- Single `<h1>`, logical heading order, `aria-live` on the countdown and form success,
  visible focus rings, `prefers-reduced-motion` disables the reveal animation.
- No web-font blocking beyond two families (preconnected, `display=swap`, few weights).
- No JS dependencies; ~one small stylesheet and one small script.
