/* ============================================================================
   Thisai IAS Academy — Current Affairs (current-affairs.html)
   Reads published entries from Supabase (public key, read-only) and renders
   them date-wise and bilingually. Re-renders on language change. No writes
   happen here — new entries are added by the automated daily job.
   ========================================================================== */
(function () {
  "use strict";
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var CFG = window.THISAI_CONFIG || {};
  var PAGE = 40;
  var offset = 0, items = [], done = false, loading = false;

  function lang() { return (window.ThisaiI18n && window.ThisaiI18n.getLang && window.ThisaiI18n.getLang()) || "en"; }
  function configured() { return !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY); }
  function restBase() { return String(CFG.SUPABASE_URL || "").replace(/\/+$/, "") + "/rest/v1/current_affairs"; }

  function esc(s) { return (s == null ? "" : String(s)).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function paras(txt) {
    return String(txt || "").split(/\n{1,}/).map(function (p) { return p.trim(); }).filter(Boolean)
      .map(function (p) { return "<p>" + esc(p) + "</p>"; }).join("");
  }
  function pick(it, base) { var l = lang(); var v = (l === "ta") ? it[base + "_ta"] : it[base + "_en"]; return (v && String(v).trim()) ? v : (it[base + "_en"] || it[base + "_ta"] || ""); }
  function fmtDate(d) {
    var dt = new Date((d || "") + "T00:00:00"); if (isNaN(dt)) return esc(d || "");
    return dt.toLocaleDateString(lang() === "ta" ? "ta-IN" : "en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  function render() {
    var list = $("[data-ca-list]"); if (!list) return;
    list.innerHTML = "";
    var lastDate = null;
    items.forEach(function (it) {
      if (it.ca_date !== lastDate) {
        lastDate = it.ca_date;
        var h = document.createElement("h2"); h.className = "ca-date"; h.textContent = fmtDate(it.ca_date);
        list.appendChild(h);
      }
      var card = document.createElement("article"); card.className = "ca-item";
      var cat = pick(it, "category") || it.category || "";
      card.innerHTML =
        (cat ? "<span class='ca-cat'>" + esc(cat) + "</span>" : "") +
        "<h3>" + esc(pick(it, "title")) + "</h3>" +
        "<div class='ca-body'>" + paras(pick(it, "body")) + "</div>" +
        (it.source || it.source_url
          ? "<p class='ca-src'>" + (lang() === "ta" ? "ஆதாரம்: " : "Source: ") +
            (it.source_url ? "<a href='" + esc(it.source_url) + "' target='_blank' rel='noopener'>" + esc(it.source || it.source_url) + "</a>" : esc(it.source)) +
            "</p>"
          : "");
      list.appendChild(card);
    });
    var empty = $("[data-ca-empty]"); if (empty) empty.hidden = items.length !== 0;
    var more = $("[data-ca-more]"); if (more) more.hidden = done || items.length === 0;
  }

  function load() {
    if (loading || done) return;
    var list = $("[data-ca-list]"); if (!list) return;
    if (!configured()) { var e = $("[data-ca-empty]"); if (e) { e.hidden = false; } return; }
    loading = true;
    var status = $("[data-ca-status]"); if (status) status.hidden = false;
    var url = restBase() + "?select=*&order=ca_date.desc,created_at.desc&limit=" + PAGE + "&offset=" + offset;
    fetch(url, { headers: { "apikey": CFG.SUPABASE_ANON_KEY, "Authorization": "Bearer " + CFG.SUPABASE_ANON_KEY } })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (data) {
        data = Array.isArray(data) ? data : [];
        items = items.concat(data);
        offset += data.length;
        if (data.length < PAGE) done = true;
        loading = false;
        if (status) status.hidden = true;
        render();
      })
      .catch(function () {
        loading = false; done = true;
        if (status) status.hidden = true;
        var e = $("[data-ca-empty]"); if (e) e.hidden = items.length !== 0;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!$("[data-ca-list]")) return;
    load();
    var more = $("[data-ca-more]"); if (more) more.addEventListener("click", load);
    document.addEventListener("thisai:langchange", render);
  });
})();
