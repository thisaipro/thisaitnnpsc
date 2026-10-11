/* ============================================================================
   Thisai IAS Academy — behaviour (shared across all pages)
   config binding · server-time-safe countdown · announcement rotator ·
   mobile menu · diagnostic reveal · forms · analytics
   ========================================================================== */
(function () {
  "use strict";
  var CFG = window.THISAI_CONFIG || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var t  = function (k) { return (window.ThisaiI18n ? window.ThisaiI18n.t(k) : k); };

  /* ---------------- analytics ---------------- */
  function loadGA() {
    var id = CFG.GA4_MEASUREMENT_ID; if (!id) return;
    var s = document.createElement("script"); s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", id);
  }
  function track(ev, p) { if (typeof window.gtag === "function") window.gtag("event", ev, p || {}); else console.log("[analytics]", ev, p || {}); }

  /* ---------------- links (whatsapp / phone / map) ---------------- */
  function waLink(msg) { return "https://wa.me/" + (CFG.WHATSAPP_NUMBER || "").replace(/[^\d]/g, "") + "?text=" + encodeURIComponent(msg || ""); }
  function bindLinks() {
    var waMap = { floating: "WHATSAPP_MSG_FLOATING", leadmagnet: "WHATSAPP_MSG_LEADMAGNET", courses: "WHATSAPP_MSG_COURSES", ca: "WHATSAPP_MSG_CA", g4kit: "WHATSAPP_MSG_G4KIT", g4test: "WHATSAPP_MSG_G4TEST", counsellor: "WHATSAPP_MSG_COUNSELLOR" };
    $$("[data-wa]").forEach(function (el) { var key = el.getAttribute("data-wa"); el.href = waLink(CFG[waMap[key]] || CFG.WHATSAPP_MSG_FLOATING); });
    $$("[data-phone-display]").forEach(function (el) { el.textContent = CFG.PHONE_DISPLAY || el.textContent; });
    $$("[data-phone-link]").forEach(function (el) { el.href = "tel:" + (CFG.PHONE_DISPLAY || "").replace(/[^\d+]/g, ""); });
    $$("[data-directions]").forEach(function (el) { el.href = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(CFG.MAPS_QUERY || "Erode"); });
    var map = $("[data-map]"); if (map) map.src = CFG.MAPS_EMBED_SRC ? CFG.MAPS_EMBED_SRC : "https://www.google.com/maps?q=" + encodeURIComponent(CFG.MAPS_QUERY || "Erode") + "&output=embed";
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }
  function bindSeats() {
    var el = $("[data-seats]"); if (!el) return;
    var n = CFG.SEATS_REMAINING;
    if (typeof n === "number" && n >= 0) { el.textContent = " · " + n + " " + (window.ThisaiI18n && window.ThisaiI18n.getLang() === "ta" ? "இடங்கள் மீதம்" : "seats remaining"); el.hidden = false; }
  }

  /* ---------------- server-time-safe clock ---------------- */
  var serverOffsetMs = 0, timeVerified = false;
  function syncServerTime() {
    return fetch(window.location.href, { method: "HEAD", cache: "no-store" }).then(function (res) {
      var d = res.headers.get("date"); if (!d) throw 0;
      var sn = new Date(d).getTime(); if (isNaN(sn)) throw 0;
      serverOffsetMs = sn - Date.now(); timeVerified = true;
    }).catch(function () { serverOffsetMs = 0; timeVerified = false; });
  }
  function now() { return Date.now() + serverOffsetMs; }

  /* ---------------- countdown ---------------- */
  function initCountdown() {
    var root = $("#countdown"); if (!root) return;
    var customNote = root.getAttribute("data-note");
    var target = new Date(root.getAttribute("data-target") || CFG.COUNTDOWN_ISO || "2026-11-02T09:00:00+05:30").getTime();
    var out = { days: $('[data-cd="days"]', root), hours: $('[data-cd="hours"]', root), mins: $('[data-cd="mins"]', root), secs: $('[data-cd="secs"]', root) };
    var note = $("[data-cd-src]", root);
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function render() {
      var diff = target - now();
      if (diff <= 0) { out.days.textContent = out.hours.textContent = out.mins.textContent = out.secs.textContent = "00"; if (note) note.textContent = t("cd.began"); return; }
      var s = Math.floor(diff / 1000);
      out.days.textContent = String(Math.floor(s / 86400));
      out.hours.textContent = pad(Math.floor((s % 86400) / 3600));
      out.mins.textContent = pad(Math.floor((s % 3600) / 60));
      out.secs.textContent = pad(s % 60);
      if (note) note.textContent = customNote ? customNote : (timeVerified ? t("cd.verify") : t("cd.plain"));
    }
    render(); syncServerTime().then(render); setInterval(render, 1000);
  }

  /* ---------------- announcement rotator ---------------- */
  function initAnnc() {
    var items = $$(".annc-item"); if (items.length < 2) { if (items[0]) items[0].classList.add("on"); return; }
    var i = 0; items[0].classList.add("on");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return; // show first only; all remain readable via screen reader list
    setInterval(function () { items[i].classList.remove("on"); i = (i + 1) % items.length; items[i].classList.add("on"); }, 4200);
  }

  /* ---------------- mobile menu ---------------- */
  function initMenu() {
    var menu = $("#mobile-menu"), scrim = $("[data-scrim]");
    function openM() { if (menu) menu.classList.add("open"); if (scrim) scrim.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeM() { if (menu) menu.classList.remove("open"); if (scrim) scrim.classList.remove("open"); document.body.style.overflow = ""; }
    $$("[data-menu-open]").forEach(function (b) { b.addEventListener("click", openM); });
    $$("[data-menu-close]").forEach(function (b) { b.addEventListener("click", closeM); });
    if (scrim) scrim.addEventListener("click", closeM);
    if (menu) $$("a", menu).forEach(function (a) { a.addEventListener("click", closeM); });
  }

  /* ---------------- scroll reveal (general) ---------------- */
  function initReveal() {
    var sel = ".card, .course-card, .post, .prog-block, .diag-output, .guar-terms, .faq-item, .free-cta-card, .free-feats li, .tier-list li, .detail-list > div, .lead-magnet-copy, .form-card";
    var els = $$(sel).filter(function (el) { return !el.closest(".hero"); });
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) return; // no JS reveal → stay visible
    var counts = {};
    els.forEach(function (el) {
      el.classList.add("reveal");
      var pid = (el.parentElement && el.parentElement.className) || "x";
      counts[pid] = (counts[pid] || 0);
      el.style.setProperty("--d", (counts[pid] % 6) * 70 + "ms");
      counts[pid]++;
    });
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- preselect register interest ---------------- */
  function initPreselect() {
    $$("[data-preselect-interest]").forEach(function (el) {
      el.addEventListener("click", function () {
        var key = el.getAttribute("data-preselect-interest");
        var sel = $("#r-interest"); if (!sel) return;
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].getAttribute("data-i18n") === key) { sel.selectedIndex = i; break; }
        }
      });
    });
  }

  /* ---------------- diagnostic reveal ---------------- */
  function initDiag() {
    var layers = $$(".diag-layer"); if (!layers.length) return;
    if (!("IntersectionObserver" in window)) { layers.forEach(function (l) { l.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }); }, { threshold: 0.2 });
    layers.forEach(function (l) { io.observe(l); });
  }

  /* ---------------- forms ---------------- */
  function showError(field, msg) { field.classList.add("invalid"); var e = $("[data-error]", field); if (e) e.textContent = msg; }
  function clearError(field) { field.classList.remove("invalid"); var e = $("[data-error]", field); if (e) e.textContent = ""; }
  function validPhone(raw) { return /^[6-9]\d{9}$/.test((raw || "").replace(/[^\d]/g, "").replace(/^(91|0)/, "")); }
  function validateField(input) {
    var field = input.closest(".field"); var val = (input.value || "").trim();
    if (input.hasAttribute("required") && !val) { showError(field, t("f.err.required") || "Required"); return false; }
    if (input.name === "name" && val.length < 2) { showError(field, "Please enter your name"); return false; }
    if (input.name === "phone" && !validPhone(val)) { showError(field, "Enter a valid 10-digit mobile number"); return false; }
    if (input.name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) { showError(field, "Enter a valid email address"); return false; }
    clearError(field); return true;
  }
  function submitForm(payload) {
    var endpoint = CFG.FORM_ENDPOINT;
    if (!endpoint || /REPLACE_ME/.test(endpoint)) { console.log("[form:DEMO] would POST", payload); return Promise.resolve({ ok: true, demo: true }); }
    return fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(payload) });
  }
  function initForm(formId, opts) {
    var form = $("#" + formId); if (!form) return;
    var inputs = $$("input[required], select[required], textarea[required]", form);
    var btn = $('button[type="submit"]', form); var successEl = $("[data-success]", form);
    inputs.forEach(function (inp) {
      inp.addEventListener("blur", function () { validateField(inp); });
      inp.addEventListener("input", function () { if (inp.closest(".field").classList.contains("invalid")) validateField(inp); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true; inputs.forEach(function (inp) { if (!validateField(inp)) ok = false; });
      if (!ok) { var bad = $(".field.invalid input, .field.invalid select", form); if (bad) bad.focus(); return; }
      var data = {}; $$("input, select, textarea", form).forEach(function (i) { if (i.name) data[i.name] = i.value.trim(); });
      data.page = document.title; data.submitted_at = new Date().toISOString();
      btn.disabled = true; var lbl = btn.textContent; btn.textContent = "…";
      submitForm(data).then(function (res) {
        if (res && res.ok === false) throw 0;
        track(opts.event, { interest: data.interest || "", current_status: data.current_status || "" });
        $$(".field, .form-micro, button[type=submit]", form).forEach(function (el) { el.classList.add("is-hidden"); });
        if (successEl) successEl.hidden = false;
        if (opts.onSuccess) opts.onSuccess(successEl, data);
      }).catch(function () { btn.disabled = false; btn.textContent = lbl; alert("Something went wrong. Please try the WhatsApp button or try again."); });
    });
  }

  /* ---------------- free G4 test-series popup ---------------- */
  function initPopup() {
    var pop = $("#g4-popup"); if (!pop) return;
    var KEY = "thisai_g4popup_seen";
    function seen() { try { return sessionStorage.getItem(KEY) === "1"; } catch (e) { return false; } }
    function markSeen() { try { sessionStorage.setItem(KEY, "1"); } catch (e) {} }
    function openP() { pop.classList.add("open"); pop.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; markSeen(); track("g4_popup_view"); }
    function closeP() { pop.classList.remove("open"); pop.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }
    $$("[data-popup-close]", pop).forEach(function (b) { b.addEventListener("click", closeP); });
    $$("[data-open-g4popup]").forEach(function (b) { b.addEventListener("click", function (e) { e.preventDefault(); openP(); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && pop.classList.contains("open")) closeP(); });
    window.ThisaiPopup = { open: openP, close: closeP };
    if (!seen()) {
      var opened = false;
      var timer = setTimeout(function () { if (!opened) { opened = true; openP(); } }, 12000);
      var onScroll = function () {
        if (!opened && window.scrollY > document.documentElement.scrollHeight * 0.22) {
          opened = true; clearTimeout(timer); openP(); window.removeEventListener("scroll", onScroll);
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
    }
  }

  /* ---------------- blog filters ---------------- */
  function initBlogFilters() {
    var btns = $$(".filter-btn"); if (!btns.length) return;
    var posts = $$("[data-cat]"); var empty = $("[data-empty]");
    function apply(cat) {
      var shown = 0;
      posts.forEach(function (p) { var ok = cat === "all" || p.getAttribute("data-cat") === cat; p.style.display = ok ? "" : "none"; if (ok) shown++; });
      btns.forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-filter") === cat); });
      if (empty) empty.hidden = shown !== 0;
    }
    btns.forEach(function (b) { b.addEventListener("click", function () { apply(b.getAttribute("data-filter")); }); });
    apply("all");
  }

  /* ---------------- init ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    loadGA(); bindLinks(); bindSeats(); initCountdown(); initAnnc(); initMenu(); initDiag(); initReveal(); initPreselect(); initBlogFilters(); initPopup();
    initForm("form-register", { event: "batch_register" });
    initForm("form-g4kit", { event: "g4_kit_signup" });
    initForm("form-g4ts", { event: "g4_testseries_signup" });
    initForm("form-contact", { event: "contact_message" });
    initForm("form-g4popup", { event: "g4_testseries_signup", onSuccess: function () { setTimeout(function () { if (window.ThisaiPopup) window.ThisaiPopup.close(); }, 2600); } });
    initForm("form-leadmagnet", {
      event: "leadmagnet_signup",
      onSuccess: function (successEl) {
        var link = $("[data-leadmagnet-link]", successEl);
        if (link && CFG.LEAD_MAGNET_LINK && !/REPLACE_ME/.test(CFG.LEAD_MAGNET_LINK)) { link.href = CFG.LEAD_MAGNET_LINK; link.hidden = false; }
      }
    });
    document.addEventListener("thisai:langchange", function () { bindSeats(); });
  });
})();
