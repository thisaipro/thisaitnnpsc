/* ============================================================================
   Thisai IAS Academy — behaviour
   Vanilla JS, no dependencies. Handles: config binding, WhatsApp/phone/map links,
   server-time-safe countdown, form validation + submission, success states,
   diagnostic scroll reveal, language toggle, analytics events, seats indicator.
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.THISAI_CONFIG || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- Analytics
     Fires GA4 event if a Measurement ID is configured; otherwise logs to console
     so conversion tracking is easy to verify locally. */
  function loadGA() {
    var id = CFG.GA4_MEASUREMENT_ID;
    if (!id) return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", id);
  }
  function track(event, params) {
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params || {});
    } else {
      // Fallback: no GA configured. Useful during setup / testing.
      console.log("[analytics]", event, params || {});
    }
  }

  /* -------------------------------------------------- WhatsApp / phone / maps */
  function waLink(msg) {
    var num = (CFG.WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(msg || "");
  }
  function bindStaticLinks() {
    // Floating WhatsApp button
    var floatBtn = $("[data-wa-floating]");
    if (floatBtn) floatBtn.href = waLink(CFG.WHATSAPP_MSG_FLOATING);

    // Phone links + display
    $$("[data-phone-display]").forEach(function (el) { el.textContent = CFG.PHONE_DISPLAY || el.textContent; });
    $$("[data-phone-link]").forEach(function (el) {
      var tel = (CFG.PHONE_DISPLAY || "").replace(/[^\d+]/g, "");
      el.href = "tel:" + tel;
    });

    // Directions button
    var dir = $("[data-directions]");
    if (dir) dir.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(CFG.MAPS_QUERY || "Erode");

    // Map iframe (lazy — only assign src, iframe already loading="lazy")
    var map = $("[data-map]");
    if (map) {
      map.src = CFG.MAPS_EMBED_SRC
        ? CFG.MAPS_EMBED_SRC
        : "https://www.google.com/maps?q=" + encodeURIComponent(CFG.MAPS_QUERY || "Erode") + "&output=embed";
    }

    // Footer year
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------------------------------------------- Seats remaining (honest only)
     Shows ONLY if config provides a real integer. Never fabricate scarcity. */
  function bindSeats() {
    var el = $("[data-seats]");
    if (!el) return;
    var n = CFG.SEATS_REMAINING;
    if (typeof n === "number" && n >= 0) {
      el.textContent = " · " + n + " seats remaining";
      el.hidden = false;
    }
  }

  /* --------------------------------------------------- Server-time-safe clock
     Client clocks are often wrong (or deliberately changed). We anchor the
     countdown to the SERVER's time by reading the Date response header from a
     HEAD request to our own origin, then track elapsed time with a monotonic
     performance.now() offset. Falls back to the client clock if the header is
     unavailable (e.g. opened via file://). */
  var serverOffsetMs = 0;      // serverNow - clientNow
  var timeVerified = false;

  function syncServerTime() {
    return fetch(window.location.href, { method: "HEAD", cache: "no-store" })
      .then(function (res) {
        var dateHeader = res.headers.get("date");
        if (!dateHeader) throw new Error("no date header");
        var serverNow = new Date(dateHeader).getTime();
        if (isNaN(serverNow)) throw new Error("bad date header");
        serverOffsetMs = serverNow - Date.now();
        timeVerified = true;
      })
      .catch(function () {
        serverOffsetMs = 0; // fall back to client clock
        timeVerified = false;
      });
  }
  function now() { return Date.now() + serverOffsetMs; }

  /* ------------------------------------------------------------- Countdown */
  function initCountdown() {
    var root = $("#countdown");
    if (!root) return;
    var target = new Date(CFG.TEST_DATE_ISO || "2026-09-15T09:30:00+05:30").getTime();
    var out = {
      days: $('[data-cd="days"]', root),
      hours: $('[data-cd="hours"]', root),
      mins: $('[data-cd="mins"]', root),
      secs: $('[data-cd="secs"]', root)
    };
    var srcNote = $("[data-cd-src]", root);

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function render() {
      var diff = target - now();
      if (diff <= 0) {
        out.days.textContent = out.hours.textContent = out.mins.textContent = out.secs.textContent = "00";
        srcNote.textContent = "The Scholarship Test window has begun.";
        return;
      }
      var s = Math.floor(diff / 1000);
      out.days.textContent  = String(Math.floor(s / 86400));
      out.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      out.mins.textContent  = pad(Math.floor((s % 3600) / 60));
      out.secs.textContent  = pad(s % 60);
      srcNote.textContent = timeVerified
        ? "Counting down to Sept 15, 2026 · verified server time"
        : "Counting down to Sept 15, 2026";
    }

    render();
    syncServerTime().then(render);
    setInterval(render, 1000);
  }

  /* ---------------------------------------------------------- Form handling */
  function showError(field, msg) {
    field.classList.add("invalid");
    var e = $("[data-error]", field);
    if (e) e.textContent = msg;
  }
  function clearError(field) {
    field.classList.remove("invalid");
    var e = $("[data-error]", field);
    if (e) e.textContent = "";
  }
  // Indian mobile: 10 digits starting 6-9, tolerant of +91 / 0 prefixes & spaces.
  function validPhone(raw) {
    var d = (raw || "").replace(/[^\d]/g, "").replace(/^(91|0)/, "");
    return /^[6-9]\d{9}$/.test(d);
  }
  function validateField(input) {
    var field = input.closest(".field");
    var val = (input.value || "").trim();
    if (input.hasAttribute("required") && !val) { showError(field, "This field is required."); return false; }
    if (input.name === "name" && val.length < 2) { showError(field, "Please enter your name."); return false; }
    if (input.name === "phone" && !validPhone(val)) { showError(field, "Enter a valid 10-digit mobile number."); return false; }
    clearError(field);
    return true;
  }

  /* Submit handler. DEMO MODE (no real endpoint) validates + shows success and
     logs the payload. Swap FORM_ENDPOINT in config.js to go live. To use a
     different backend, replace the fetch() below — it's a single POST. */
  function submitForm(form, payload) {
    var endpoint = CFG.FORM_ENDPOINT;
    var demo = !endpoint || /REPLACE_ME/.test(endpoint);
    if (demo) {
      console.log("[form:DEMO] would POST", payload, "→ set FORM_ENDPOINT in config.js to send for real");
      return Promise.resolve({ ok: true, demo: true });
    }
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify(payload)
    });
  }

  function initForm(formId, opts) {
    var form = $("#" + formId);
    if (!form) return;
    var inputs = $$("input[required], select[required]", form);
    var submitBtn = $('button[type="submit"]', form);
    var successEl = $("[data-success]", form);

    // Inline validation as the user fixes fields
    inputs.forEach(function (inp) {
      inp.addEventListener("blur", function () { validateField(inp); });
      inp.addEventListener("input", function () {
        if (inp.closest(".field").classList.contains("invalid")) validateField(inp);
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      inputs.forEach(function (inp) { if (!validateField(inp)) ok = false; });
      if (!ok) {
        var firstBad = $(".field.invalid input, .field.invalid select", form);
        if (firstBad) firstBad.focus();
        return;
      }

      // Build payload
      var data = {};
      $$("input, select", form).forEach(function (inp) { if (inp.name) data[inp.name] = inp.value.trim(); });
      data.page = "thisai-landing";
      data.submitted_at = new Date().toISOString();

      submitBtn.disabled = true;
      var originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";

      submitForm(form, data)
        .then(function (res) {
          if (res && res.ok === false) throw new Error("submit failed");
          // Analytics conversion event
          track(opts.event, { target_group: data.target_group || "", current_status: data.current_status || "" });
          // Reveal success state; hide the fields
          $$(".field, .form-micro, button[type=submit]", form).forEach(function (el) { el.classList.add("is-hidden"); });
          if (successEl) successEl.hidden = false;
          if (opts.onSuccess) opts.onSuccess(successEl, data);
        })
        .catch(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
          alert("Something went wrong sending your details. Please try the WhatsApp button, or try again.");
        });
    });
  }

  /* --------------------------------------------- Diagnostic scroll reveal */
  function initDiagReveal() {
    var layers = $$(".diag-layer");
    if (!layers.length) return;
    if (!("IntersectionObserver" in window)) { layers.forEach(function (l) { l.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.25 });
    layers.forEach(function (l) { io.observe(l); });
  }

  /* ------------------------------------------------------ Language toggle */
  function initLangToggle() {
    var i18n = window.THISAI_I18N;
    if (!i18n) return;
    var btns = $$(".lang-btn");
    var toast = $("[data-toast]");
    var toastTimer;

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.hidden = true; }, 3200);
    }

    function apply(lang) {
      document.documentElement.lang = lang === "ta" ? "ta" : "en";
      $$("[data-i18n]").forEach(function (el) {
        var key = el.getAttribute("data-i18n");
        var dict = i18n.STRINGS[lang] || {};
        var fallback = i18n.STRINGS.en[key];
        el.textContent = (dict[key] != null && dict[key] !== "") ? dict[key] : fallback;
      });
      btns.forEach(function (b) {
        var active = b.getAttribute("data-lang") === lang;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
    }

    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var lang = b.getAttribute("data-lang");
        apply(lang);
        if (lang === "ta" && i18n.TA_INCOMPLETE) {
          showToast("தமிழ் பதிப்பு விரைவில் — Tamil version coming soon.");
        }
      });
    });
  }

  /* ---------------------------------------------------------------- Init */
  document.addEventListener("DOMContentLoaded", function () {
    loadGA();
    bindStaticLinks();
    bindSeats();
    initCountdown();
    initDiagReveal();
    initLangToggle();

    initForm("form-scholarship", {
      event: "scholarship_register"
    });

    initForm("form-leadmagnet", {
      event: "leadmagnet_signup",
      onSuccess: function (successEl) {
        // Surface the lead-magnet link in the success state (delivery is also
        // auto-sent via WhatsApp/email autoresponder configured on the endpoint).
        var link = $("[data-leadmagnet-link]", successEl);
        if (link && CFG.LEAD_MAGNET_LINK && !/REPLACE_ME/.test(CFG.LEAD_MAGNET_LINK)) {
          link.href = CFG.LEAD_MAGNET_LINK;
          link.hidden = false;
        }
      }
    });
  });
})();
