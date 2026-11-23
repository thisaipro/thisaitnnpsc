/* ============================================================================
   Thisai IAS Academy — Current Affairs (current-affairs.html)
   Reads entries from the committed data file data/current-affairs.json and
   renders them date-wise and bilingually. Re-renders on language change.
   The file is updated by the automated daily job (which commits to Git);
   Vercel redeploys and the new entries appear. No database or keys needed.
   ========================================================================== */
(function () {
  "use strict";
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var SHOW = 40;        // how many render initially / per "load more"
  var all = [], shown = 0;

  function lang() { return (window.ThisaiI18n && window.ThisaiI18n.getLang && window.ThisaiI18n.getLang()) || "en"; }
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
    var slice = all.slice(0, shown), lastDate = null;
    slice.forEach(function (it) {
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
    var empty = $("[data-ca-empty]"); if (empty) empty.hidden = all.length !== 0;
    var more = $("[data-ca-more]"); if (more) more.hidden = shown >= all.length;
  }

  function sortDesc(a, b) {
    if (a.ca_date !== b.ca_date) return (a.ca_date < b.ca_date) ? 1 : -1;
    return (Number(b.id) || 0) - (Number(a.id) || 0);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var list = $("[data-ca-list]"); if (!list) return;
    var status = $("[data-ca-status]"); if (status) status.hidden = false;
    fetch("data/current-affairs.json?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (data) {
        all = (Array.isArray(data) ? data : []).slice().sort(sortDesc);
        shown = Math.min(SHOW, all.length);
        if (status) status.hidden = true;
        render();
      })
      .catch(function () {
        if (status) status.hidden = true;
        var e = $("[data-ca-empty]"); if (e) e.hidden = false;
      });

    var more = $("[data-ca-more]"); if (more) more.addEventListener("click", function () { shown = Math.min(shown + SHOW, all.length); render(); });
    document.addEventListener("thisai:langchange", render);
  });
})();
