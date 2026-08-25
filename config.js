/* ============================================================================
   Thisai IAS Academy — Site configuration
   ----------------------------------------------------------------------------
   EDIT THIS FILE BEFORE GOING LIVE. Every value below is a placeholder or a
   swappable setting. Nothing here is fabricated marketing — real numbers must
   be filled in by the academy (see README "Before you go live").

   This is a plain global object (no build step). It is read by js/main.js and
   used to populate the page + wire the forms.
   ========================================================================== */

window.THISAI_CONFIG = {

  /* --------------------------------------------------------------------------
     1. CONTACT / WHATSAPP
     WHATSAPP_NUMBER: full international format, digits only, NO "+".
     e.g. India mobile 98765 43210  ->  "919876543210"
     Leave the XXX placeholder in and the buttons still render, but they will
     not open a real chat until you set a real number.
     -------------------------------------------------------------------------- */
  WHATSAPP_NUMBER: "9100000000000",              // {{WHATSAPP_NUMBER}}  [confirm]
  PHONE_DISPLAY:   "+91 00000 00000",            // {{PHONE_NUMBER}}     [confirm]
  EMAIL:           "tnpsc@thisai.pro",           // confirmed in content doc

  // Pre-filled WhatsApp messages (URL-encoded automatically in main.js).
  WHATSAPP_MSG_FLOATING: "Hi, I want to know more about the Scholarship Test.",
  WHATSAPP_MSG_LEADMAGNET:
    "Hi! Please send me the free TNPSC Group 4 2024 solved question paper (Tamil).",

  /* --------------------------------------------------------------------------
     2. FORM SUBMISSION ENDPOINT
     Simplest no-backend option: Formspree (https://formspree.io).
     1. Create a free form, copy its endpoint (looks like https://formspree.io/f/abcdxyz)
     2. Paste it below. Both forms POST here as JSON with a `_form` field so you
        can tell Scholarship-Test submissions apart from Lead-Magnet ones.
     HOW TO SWAP FOR SOMETHING ELSE (Google Sheets / serverless / your own API):
       See js/main.js -> submitForm(). It is one fetch() call. Point it at any
       endpoint that accepts a POST. A ready-to-paste Google Apps Script
       alternative is documented in README ("Option B: Google Sheets").
     If left as the placeholder below, forms run in DEMO MODE: they validate,
     show the success state, and log the payload to the console — but send
     nothing. Safe for previewing; replace before launch.
     -------------------------------------------------------------------------- */
  FORM_ENDPOINT: "https://formspree.io/f/REPLACE_ME",   // {{FORM_ENDPOINT}} [confirm]

  /* --------------------------------------------------------------------------
     3. LEAD-MAGNET DELIVERY LINK
     The free Group 4 2024 solved paper is delivered as an auto-sent link (so we
     capture the contact first) — NOT a live download. Put the hosted PDF /
     Google Drive link here. It is shown in the success state AND can be
     auto-sent via your form tool's autoresponder / WhatsApp automation.
     -------------------------------------------------------------------------- */
  LEAD_MAGNET_LINK: "https://thisai.pro/REPLACE_ME/group4-2024-solved-tamil.pdf", // [confirm]

  /* --------------------------------------------------------------------------
     4. SCHOLARSHIP TEST DETAILS  (all [confirm] — do not invent)
     -------------------------------------------------------------------------- */
  TEST_DATE_ISO:  "2026-09-15T09:30:00+05:30",   // used by the countdown timer
  BATCH1_DATE_ISO:"2026-09-25T00:00:00+05:30",

  /* --------------------------------------------------------------------------
     5. SEATS REMAINING (optional, honest scarcity only)
     Set to a real integer that the academy actually updates by hand.
     Leave as null to HIDE the seats indicator entirely — we never show fake
     scarcity. Only turn this on when someone owns keeping it accurate.
     -------------------------------------------------------------------------- */
  SEATS_REMAINING: null,                          // e.g. 12  (or null to hide)

  /* --------------------------------------------------------------------------
     6. ANALYTICS (optional)
     Put a GA4 Measurement ID (e.g. "G-XXXXXXX") to enable gtag + form events.
     Leave empty to disable analytics (events then log to console only).
     Events fired: "scholarship_register" and "leadmagnet_signup".
     -------------------------------------------------------------------------- */
  GA4_MEASUREMENT_ID: "",

  /* --------------------------------------------------------------------------
     7. GOOGLE MAPS
     Default embed uses a keyless query embed for the address below. To pin the
     exact building, replace MAPS_EMBED_SRC with the "Embed a map" iframe src
     from Google Maps (Share -> Embed a map -> copy the src="...").
     -------------------------------------------------------------------------- */
  MAPS_QUERY: "Thisai IAS Academy, Sakthi Road, Near Erode Bus Stand, Erode 638001",
  MAPS_EMBED_SRC: "" // leave empty to auto-build a keyless embed from MAPS_QUERY
};
