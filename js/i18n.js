/* ============================================================================
   i18n stub — English / Tamil toggle
   ----------------------------------------------------------------------------
   Tamil copy is NOT finalised yet. This file ships the toggle mechanism and the
   English strings, with the Tamil dictionary intentionally left as a stub so a
   translator can drop strings in later WITHOUT touching HTML or JS.

   HOW IT WORKS
   - Any element with data-i18n="key" gets its text from STRINGS[lang][key].
   - If a Tamil string is missing, it falls back to English (so the page never
     breaks) and we surface a small "Tamil coming soon" toast the first time.

   TO FINISH TAMIL LATER
   - Fill in STRINGS.ta with the same keys as STRINGS.en.
   - Add data-i18n="key" to any additional elements you want translated.
   - Delete the TA_INCOMPLETE flag once the Tamil pass is complete.
   ========================================================================== */

window.THISAI_I18N = {
  TA_INCOMPLETE: true, // set to false once Tamil copy is finalised

  STRINGS: {
    en: {
      hero_title: "Erode, your TNPSC officer starts here.",
      hero_sub:
        "No more travelling to Coimbatore or Chennai for serious TNPSC coaching. Thisai IAS Academy brings AI-powered diagnostics, mentorship from serving government officers, and a combined Group 1, 2 & 4 program right here on Sakthi Road — with a promise: you progress, or you get your money back."
    },

    // Tamil — STUB. Drop finalised translations in here (same keys as `en`).
    ta: {
      // hero_title: "…",
      // hero_sub: "…"
    }
  }
};
