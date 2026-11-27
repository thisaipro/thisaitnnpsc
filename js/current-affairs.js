/* ============================================================================
   Thisai IAS Academy — Current Affairs (current-affairs.html)
   Month → Day drill-down, read from the committed data/current-affairs.json.
   Magic-UI-inspired vanilla components: bento month grid with number tickers,
   animated day accordion. Bilingual; re-renders on language change.
   Views via URL hash:  (none) = months · #YYYY-MM = a month's days ·
   #YYYY-MM-DD = that month with the day opened.
   ========================================================================== */
(function () {
  "use strict";
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var all = [], byMonth = {};

  function lang() { return (window.ThisaiI18n && window.ThisaiI18n.getLang && window.ThisaiI18n.getLang()) || "en"; }
  function t(k, fb) { var v = window.ThisaiI18n ? window.ThisaiI18n.t(k) : k; return (v && v !== k) ? v : fb; }
  function esc(s) { return (s == null ? "" : String(s)).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function paras(txt) {
    return String(txt || "").split(/\n{1,}/).map(function (p) { return p.trim(); }).filter(Boolean)
      .map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }
  function pick(it, base) { var l = lang(); var v = (l === "ta") ? it[base + "_ta"] : it[base + "_en"]; return (v && String(v).trim()) ? v : (it[base + "_en"] || it[base + "_ta"] || ""); }
  var MONTHS_EN = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var MONTHS_TA = ["ஜனவரி","பிப்ரவரி","மார்ச்","ஏப்ரல்","மே","ஜூன்","ஜூலை","ஆகஸ்ட்","செப்டம்பர்","அக்டோபர்","நவம்பர்","டிசம்பர்"];
  function monthName(m) { return (lang() === "ta" ? MONTHS_TA : MONTHS_EN)[m] || ""; }
  function fmtDay(d) {
    var dt = new Date((d || "") + "T00:00:00"); if (isNaN(dt)) return esc(d || "");
    return dt.toLocaleDateString(lang() === "ta" ? "ta-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  function group() {
    byMonth = {};
    all.forEach(function (e) {
      var ym = String(e.ca_date || "").slice(0, 7); if (!/^\d{4}-\d{2}$/.test(ym)) return;
      (byMonth[ym] = byMonth[ym] || []).push(e);
    });
  }
  function monthsDesc() { return Object.keys(byMonth).sort().reverse(); }
  function daysDesc(ym) {
    var map = {};
    byMonth[ym].forEach(function (e) { (map[e.ca_date] = map[e.ca_date] || []).push(e); });
    Object.keys(map).forEach(function (d) { map[d].sort(function (a, b) { return (Number(b.id) || 0) - (Number(a.id) || 0); }); });
    return { order: Object.keys(map).sort().reverse(), map: map };
  }

  /* ---- number ticker (count up on reveal) ---- */
  function tick(el, to) {
    if (!("IntersectionObserver" in window) || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) { el.textContent = to; return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        var start = null, dur = 700;
        function step(ts) { start = start || ts; var p = Math.min(1, (ts - start) / dur); el.textContent = Math.round(p * to); if (p < 1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    io.observe(el);
  }

  function entryHTML(it) {
    var cat = pick(it, "category") || it.category || "";
    return "<article class='ca-item'>" +
      (cat ? "<span class='ca-cat'>" + esc(cat) + "</span>" : "") +
      "<h3>" + esc(pick(it, "title")) + "</h3>" +
      "<div class='ca-body'>" + paras(pick(it, "body")) + "</div>" +
      (it.source || it.source_url
        ? "<p class='ca-src'>" + (lang() === "ta" ? "ஆதாரம்: " : "Source: ") +
          (it.source_url ? "<a href='" + esc(it.source_url) + "' target='_blank' rel='noopener'>" + esc(it.source || it.source_url) + "</a>" : esc(it.source)) +
          "</p>"
        : "") +
      "</article>";
  }

  /* ---- views ---- */
  function showCrumb(on, label) {
    var c = $("[data-ca-crumb]"); if (!c) return;
    c.hidden = !on;
    var now = $("[data-ca-crumb-now]"); if (now) now.textContent = on ? ("/ " + label) : "";
  }

  function renderMonths() {
    var root = $("[data-ca-root]"); if (!root) return;
    showCrumb(false, "");
    var ms = monthsDesc();
    if (!ms.length) { root.innerHTML = ""; var e = $("[data-ca-empty]"); if (e) e.hidden = false; return; }
    var e2 = $("[data-ca-empty]"); if (e2) e2.hidden = true;
    var grid = document.createElement("div"); grid.className = "ca-months";
    ms.forEach(function (ym) {
      var y = ym.slice(0, 4), m = parseInt(ym.slice(5, 7), 10) - 1, n = byMonth[ym].length;
      var card = document.createElement("button");
      card.type = "button"; card.className = "ca-month"; card.setAttribute("data-ym", ym);
      card.innerHTML =
        "<p class='m-name'>" + esc(monthName(m)) + " <span class='m-year'>" + esc(y) + "</span></p>" +
        "<div class='m-count'><span class='m-num' data-tick='" + n + "'>0</span>" +
        "<span class='m-lbl'>" + esc(t(n === 1 ? "ca.entry" : "ca.entries", n === 1 ? "update" : "updates")) + "</span></div>" +
        "<span class='m-go' aria-hidden='true'>→</span>";
      card.addEventListener("click", function () { location.hash = ym; });
      grid.appendChild(card);
    });
    root.innerHTML = ""; root.appendChild(grid);
    Array.prototype.forEach.call(grid.querySelectorAll("[data-tick]"), function (el) { tick(el, parseInt(el.getAttribute("data-tick"), 10)); });
  }

  function renderMonth(ym, openDay) {
    var root = $("[data-ca-root]"); if (!root) return;
    if (!byMonth[ym]) { location.hash = ""; return; }
    var y = ym.slice(0, 4), m = parseInt(ym.slice(5, 7), 10) - 1;
    showCrumb(true, monthName(m) + " " + y);
    var e = $("[data-ca-empty]"); if (e) e.hidden = true;
    var dd = daysDesc(ym), wrap = document.createElement("div");
    dd.order.forEach(function (date, i) {
      var items = dd.map[date], open = (openDay === date) || (!openDay && i === 0); // newest day open by default
      var day = document.createElement("div"); day.className = "ca-day" + (open ? " open" : "");
      day.innerHTML =
        "<button type='button' class='ca-day-head' aria-expanded='" + open + "'>" +
          "<span class='ca-day-date'>" + esc(fmtDay(date)) + "</span>" +
          "<span class='ca-day-right'><span class='ca-day-badge'>" + items.length + "</span><span class='ca-day-chev'>▸</span></span>" +
        "</button>" +
        "<div class='ca-day-panel'><div class='ca-day-panel-in'><div class='ca-day-body'>" +
          items.map(entryHTML).join("") +
        "</div></div></div>";
      var head = day.querySelector(".ca-day-head");
      head.addEventListener("click", function () {
        var nowOpen = day.classList.toggle("open");
        head.setAttribute("aria-expanded", nowOpen);
      });
      wrap.appendChild(day);
    });
    root.innerHTML = ""; root.appendChild(wrap);
  }

  function route() {
    var h = (location.hash || "").replace(/^#/, "");
    if (/^\d{4}-\d{2}-\d{2}$/.test(h)) { renderMonth(h.slice(0, 7), h); }
    else if (/^\d{4}-\d{2}$/.test(h)) { renderMonth(h, null); }
    else { renderMonths(); }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var root = $("[data-ca-root]"); if (!root) return;
    var status = $("[data-ca-status]"); if (status) status.hidden = false;
    var back = $("[data-ca-back]"); if (back) back.addEventListener("click", function () { location.hash = ""; });

    fetch("data/current-affairs.json?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (data) {
        all = (Array.isArray(data) ? data : []);
        group();
        if (status) status.hidden = true;
        route();
      })
      .catch(function () {
        if (status) status.hidden = true;
        var e = $("[data-ca-empty]"); if (e) e.hidden = false;
      });

    window.addEventListener("hashchange", route);
    document.addEventListener("thisai:langchange", route);
  });
})();
