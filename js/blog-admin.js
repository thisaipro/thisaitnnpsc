/* ============================================================================
   Thisai IAS Academy — blog admin (super-admin only)
   ----------------------------------------------------------------------------
   Shows a writing/publishing toolbar on blog.html ONLY when the signed-in user's
   email is listed in config.SUPER_ADMINS / BLOG_AUTHORS.

   What it does:
   • "Save as local draft"  → stores the post in localStorage and renders it at
     the top of the grid (visible to this admin, in this browser only — a preview).
   • "Generate publish HTML" → outputs a ready-to-paste <article> block. To
     publish for EVERYONE on this static site, paste that block into blog.html
     and commit/deploy (or wire a CMS/backend — see README).

   ⚠ This is a FRONT-END role gate for convenience, NOT security. A real
   super-admin/publishing system must enforce roles on the server (Firebase
   custom claims + Storage/Firestore rules, or Supabase RLS). See README.
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var DRAFTS_KEY = "thisai_blog_drafts";

  function getDrafts() { try { return JSON.parse(localStorage.getItem(DRAFTS_KEY) || "[]"); } catch (e) { return []; } }
  function saveDrafts(d) { try { localStorage.setItem(DRAFTS_KEY, JSON.stringify(d)); } catch (e) {} }
  function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]; }); }
  function catLabel(c) { return { ca: "Current Affairs", article: "Article", update: "Exam Update" }[c] || "Article"; }
  function catThumb(c) { return { ca: "CA", article: "A", update: "U" }[c] || "A"; }

  function articleHTML(p) {
    return '<article class="post" data-cat="' + esc(p.cat) + '">\n' +
      '  <div class="post-thumb" aria-hidden="true">' + catThumb(p.cat) + '</div>\n' +
      '  <div class="post-body">\n' +
      '    <span class="post-cat">' + esc(catLabel(p.cat)) + '</span>\n' +
      '    <h3>' + esc(p.title) + '</h3>\n' +
      '    <p>' + esc(p.excerpt) + '</p>\n' +
      '    <span class="post-date">' + esc(p.date || "") + '</span>\n' +
      '    <a href="' + (esc(p.url) || "#") + '" class="btn btn-ghost btn-sm" style="margin-top:10px;align-self:flex-start" data-i18n="bp.readmore">Read more →</a>\n' +
      '  </div>\n</article>';
  }

  function renderDrafts() {
    var grid = $(".blog-grid"); if (!grid) return;
    Array.prototype.slice.call(grid.querySelectorAll(".post.draft")).forEach(function (n) { n.remove(); });
    getDrafts().slice().reverse().forEach(function (p, idx) {
      var el = document.createElement("article");
      el.className = "post draft"; el.setAttribute("data-cat", p.cat);
      el.innerHTML =
        '<div class="post-thumb" aria-hidden="true">' + catThumb(p.cat) + '</div>' +
        '<div class="post-body">' +
        '<span class="post-cat">' + esc(catLabel(p.cat)) + ' · <span class="draft-flag">Local draft</span></span>' +
        '<h3>' + esc(p.title) + '</h3><p>' + esc(p.excerpt) + '</p>' +
        '<span class="post-date">' + esc(p.date || "") + '</span>' +
        '<button type="button" class="btn btn-ghost btn-sm" style="margin-top:10px;align-self:flex-start" data-del="' + (getDrafts().length - 1 - idx) + '">Delete draft</button>' +
        '</div>';
      grid.insertBefore(el, grid.firstChild);
      el.querySelector("[data-del]").addEventListener("click", function () {
        var d = getDrafts(); d.splice(parseInt(this.getAttribute("data-del"), 10), 1); saveDrafts(d); renderDrafts();
      });
    });
  }

  function mount() {
    var bar = $("#admin-bar"); if (!bar) return;
    var admin = window.ThisaiAuth && window.ThisaiAuth.isAdmin && window.ThisaiAuth.isAdmin();
    bar.classList.toggle("show", !!admin);
    var composer = $("#composer");
    if (!admin) { if (composer) composer.classList.remove("show"); return; }
    var who = window.ThisaiAuth.getUser();
    var whoEl = $(".admin-who", bar); if (whoEl) whoEl.textContent = "Signed in as " + (who && who.email || "") + " · Super Admin";
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderDrafts();
    mount();
    document.addEventListener("thisai:authchange", mount);

    var toggle = $("#admin-write"), composer = $("#composer");
    if (toggle) toggle.addEventListener("click", function () { if (composer) composer.classList.toggle("show"); });

    var form = $("#composer-form");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var p = {
          title: $("#c-title").value.trim(),
          cat: $("#c-cat").value,
          excerpt: $("#c-excerpt").value.trim(),
          date: $("#c-date").value.trim() || new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
          url: $("#c-url").value.trim()
        };
        if (!p.title || !p.excerpt) { alert("Title and excerpt are required."); return; }
        var action = (e.submitter && e.submitter.getAttribute("data-action")) || "draft";
        if (action === "html") {
          $("#composer-out").textContent = articleHTML(p);
          $("#composer-out-wrap").style.display = "block";
        } else {
          var d = getDrafts(); d.push(p); saveDrafts(d); renderDrafts();
          form.reset();
          alert("Saved as a local draft (visible in your browser). Use “Generate publish HTML” to publish for everyone.");
        }
      });
    }
    var copyBtn = $("#composer-copy");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      var txt = $("#composer-out").textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(function () { copyBtn.textContent = "Copied!"; setTimeout(function () { copyBtn.textContent = "Copy HTML"; }, 1500); });
    });
    var dlBtn = $("#composer-download");
    if (dlBtn) dlBtn.addEventListener("click", function () {
      var blob = new Blob([$("#composer-out").textContent], { type: "text/html" });
      var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "thisai-blog-post.html"; a.click();
    });
  });
})();
