/* ============================================================================
   Thisai IAS Academy — site configuration
   ----------------------------------------------------------------------------
   EDIT THIS FILE BEFORE GOING LIVE. Every value is a placeholder or a swappable
   setting. Read by js/main.js + js/auth.js. Plain global object, no build step.
   ========================================================================== */

window.THISAI_CONFIG = {

  /* --- 1. CONTACT / WHATSAPP (digits only, no "+") --- */
  WHATSAPP_NUMBER: "919345512955",               // official WhatsApp
  PHONE_DISPLAY:   "+91 93455 12955",            // official phone
  EMAIL:           "thisaiiasofficial@gmail.com",// official email
  WHATSAPP_MSG_FLOATING:  "Hi, I want to know more about Batch 1 and the Group 4 Test Series.",
  WHATSAPP_MSG_LEADMAGNET:"Hi! Please send me the free TNPSC Group 4 2024 solved question paper (Tamil).",
  WHATSAPP_MSG_COURSES:   "Hi, I'd like guidance on which Thisai program fits me.",
  WHATSAPP_MSG_CA:        "Hi, I'd like to join the Thisai current-affairs broadcast.",
  WHATSAPP_MSG_G4KIT:     "Hi, I want the FREE TNPSC Group 4 Preparation Kit (Syllabus + Study Plan + PYQs + Mock Test).",
  WHATSAPP_MSG_G4TEST:    "Hi, I took the Group 4 Diagnostic Test — please share my detailed analysis.",
  WHATSAPP_MSG_COUNSELLOR:"Hi, I'd like to talk to a Thisai counsellor about TNPSC Group 4.",

  /* --- 2a. SUPABASE (your own database — recommended) ---------------------
     When SUPABASE_URL + SUPABASE_ANON_KEY are both filled, EVERY form on the
     site (registration, Group 4 kit, test series, contact, popup, lead magnet,
     diagnostic quiz) saves as a row in your Supabase `registrations` table.
     The anon key is PUBLIC-SAFE to ship in the browser — it can only INSERT
     rows (never read/edit/delete) because of the Row-Level-Security policy you
     create (see supabase-setup.sql). View the list anytime in the Supabase
     dashboard → Table Editor, or on the protected students.html page.
     NEVER put the service_role / secret key in this file or anywhere in the
     repo — it bypasses all security. Setup steps: README "Supabase". */
  SUPABASE_URL:      "",   // e.g. https://abcdefgh.supabase.co   (Project Settings → API → Project URL)
  SUPABASE_ANON_KEY: "",   // the "anon public" key               (Project Settings → API → Project API keys → anon public)
  SUPABASE_TABLE:    "registrations",

  /* --- 2b. FORM SUBMISSION ENDPOINT (fallback: Formspree / Sheets) ---------
     Used ONLY when Supabase above is not configured. Until this is set (still
     contains REPLACE_ME) AND Supabase is empty, forms run in DEMO MODE:
     validate + show success, send nothing. See js/main.js submitForm(). */
  FORM_ENDPOINT: "https://formspree.io/f/REPLACE_ME", // {{FORM_ENDPOINT}} [confirm]

  /* --- 3. LEAD-MAGNET LINK (hosted PDF, auto-sent after capture) --- */
  LEAD_MAGNET_LINK: "https://thisai.pro/REPLACE_ME/group4-2024-solved-tamil.pdf", // [confirm]

  /* --- 4. KEY DATES --- */
  COUNTDOWN_ISO:   "2026-11-02T09:00:00+05:30",  // home hero countdown = Batch 1 start
  TEST_SERIES_ISO: "2026-10-20T09:00:00+05:30",  // Group 4 Test Series
  BATCH1_DATE_ISO: "2026-11-02T00:00:00+05:30",  // Batch 1 (Group 1,2,4) course start
  G4_EXAM_ISO:     "2027-01-10T10:00:00+05:30",  // TNPSC Group 4 exam (target) — Jan 10, 2027
  G4_VACANCIES:    "6,574",                      // announced vacancies (verify with TNPSC notification)

  /* --- 5. SEATS REMAINING (honest only; null hides it) --- */
  SEATS_REMAINING: null,                          // e.g. 12 (or null)

  /* --- 6. ANALYTICS (GA4 id like "G-XXXX", or empty to disable) --- */
  GA4_MEASUREMENT_ID: "",

  /* --- 7. GOOGLE MAPS --- */
  MAPS_QUERY: "Thisai IAS Academy, Sakthi Road, Near Erode Bus Stand, Erode 638001",
  MAPS_EMBED_SRC: "", // paste an "Embed a map" iframe src to pin the exact building

  /* --- 8. ADMIN / ROLES ---
     Emails listed here are treated as SUPER ADMINS and get the blog
     writing/publishing tools (on blog.html) when signed in with that email.
     NOTE: this is a FRONT-END role check for the demo auth. It is NOT security.
     For real access control, enforce roles on the backend:
       • Firebase: custom claims (admin:true) + Firestore/Storage rules
       • Supabase: a `profiles.role` column + Row-Level-Security policies
     See README "Admin & roles". */
  SUPER_ADMINS: ["thisaiiasofficial@gmail.com"],
  BLOG_AUTHORS: ["thisaiiasofficial@gmail.com"]
};
