/* ============================================================================
   Thisai IAS Academy — Registered Students admin view (students.html)
   ----------------------------------------------------------------------------
   • Gates the UI behind the site's super-admin sign-in (front-end only).
   • Reads the `registrations` table from Supabase using a service_role key
     that the admin pastes at view time. The key is kept ONLY in this tab's
     sessionStorage (gone when the tab closes) and is sent only to Supabase.
     It is never written to the repo or to any third party.
   ========================================================================== */
(function () {
  "use strict";
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var CFG = window.THISAI_CONFIG || {};
  var SVC_KEY = "thisai_sb_service";   // sessionStorage only
  var rowsCache = [];

  function configured() { return !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY); }
  function restBase() { return String(CFG.SUPABASE_URL || "").replace(/\/+$/, "") + "/rest/v1/" + (CFG.SUPABASE_TABLE || "registrations"); }
  function isAdmin() { return !!(window.ThisaiAuth && window.ThisaiAuth.isAdmin()); }
  function signedIn() { return !!(window.ThisaiAuth && window.ThisaiAuth.getUser()); }

  function show(view) {
    $$("[data-view]").forEach(function (el) { el.hidden = el.getAttribute("data-view") !== view; });
  }
  function getSvc() { try { return sessionStorage.getItem(SVC_KEY) || ""; } catch (e) { return ""; } }
  function setSvc(v) { try { v ? sessionStorage.setItem(SVC_KEY, v) : sessionStorage.removeItem(SVC_KEY); } catch (e) {} }

  function esc(s) { return (s == null ? "" : String(s)).replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }
  function fmtDate(iso) {
    var d = new Date(iso); if (isNaN(d)) return esc(iso || "");
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
  }

  /* ---------- render ---------- */
  function render(rows) {
    var tbody = $("[data-rows]"), empty = $("[data-empty]"), stats = $("[data-stats]");
    tbody.innerHTML = "";
    if (!rows.length) { empty.hidden = false; }
    else {
      empty.hidden = true;
      rows.forEach(function (r, i) {
        var tr = document.createElement("tr");
        tr.innerHTML =
          "<td>" + (r.id != null ? esc(r.id) : (i + 1)) + "</td>" +
          "<td>" + fmtDate(r.created_at) + "</td>" +
          "<td><span class='pill-tag'>" + esc(r.form || "") + "</span></td>" +
          "<td>" + esc(r.name || "") + "</td>" +
          "<td>" + (r.phone ? "<a href='tel:" + esc(r.phone) + "'>" + esc(r.phone) + "</a>" : "") + "</td>" +
          "<td>" + (r.email ? "<a href='mailto:" + esc(r.email) + "'>" + esc(r.email) + "</a>" : "") + "</td>" +
          "<td>" + esc(r.program || "") + "</td>" +
          "<td>" + esc(r.status || "") + "</td>" +
          "<td>" + (r.score != null && r.score !== "" ? esc(r.score) + "%" : "") + "</td>" +
          "<td class='msg'>" + esc(r.message || "") + "</td>";
        tbody.appendChild(tr);
      });
    }
    // stats
    var total = rows.length, byForm = {};
    rows.forEach(function (r) { var k = r.form || "other"; byForm[k] = (byForm[k] || 0) + 1; });
    var html = "<div><div class='n'>" + total + "</div><div class='k'>Total</div></div>";
    Object.keys(byForm).sort(function (a, b) { return byForm[b] - byForm[a]; }).slice(0, 6).forEach(function (k) {
      html += "<div><div class='n'>" + byForm[k] + "</div><div class='k'>" + esc(k) + "</div></div>";
    });
    stats.innerHTML = html;
    $("[data-results]").hidden = false;
  }

  function applySearch() {
    var q = ($("[data-search]").value || "").trim().toLowerCase();
    if (!q) { render(rowsCache); return; }
    render(rowsCache.filter(function (r) {
      return ["form", "name", "phone", "email", "program", "status", "message"].some(function (k) {
        return String(r[k] || "").toLowerCase().indexOf(q) >= 0;
      });
    }));
  }

  /* ---------- fetch ---------- */
  function load(svc) {
    var msg = $("[data-key-msg]");
    msg.hidden = false; msg.className = "adm-msg"; msg.textContent = "Loading…";
    var url = restBase() + "?select=*&order=created_at.desc";
    return fetch(url, { headers: { "apikey": svc, "Authorization": "Bearer " + svc } })
      .then(function (r) {
        if (!r.ok) { return r.text().then(function (txt) { throw new Error("HTTP " + r.status + " — " + (txt || "check the service_role key and that supabase-setup.sql has been run")); }); }
        return r.json();
      })
      .then(function (data) {
        rowsCache = Array.isArray(data) ? data : [];
        setSvc(svc);
        msg.hidden = true;
        applySearch();
      })
      .catch(function (err) {
        msg.hidden = false; msg.className = "adm-msg err";
        msg.textContent = "Could not load: " + (err && err.message ? err.message : "unknown error");
        setSvc(""); // don't keep a bad key
      });
  }

  /* ---------- CSV ---------- */
  function exportCsv() {
    if (!rowsCache.length) return;
    var cols = ["id", "created_at", "form", "name", "phone", "email", "program", "status", "score", "message", "page"];
    var lines = [cols.join(",")];
    rowsCache.forEach(function (r) {
      lines.push(cols.map(function (c) {
        var v = r[c] == null ? "" : String(r[c]);
        return /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
      }).join(","));
    });
    var blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "thisai-registrations-" + new Date().toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1500);
  }

  /* ---------- gate ---------- */
  function route() {
    if (!signedIn()) { show("locked"); return; }
    if (!isAdmin()) { show("notadmin"); return; }
    if (!configured()) { show("unconfigured"); return; }
    show("ready");
    var svc = getSvc();
    var inp = $("#svc"); if (inp && svc) inp.value = svc;
    if (svc) load(svc); // resume within the same tab session
  }

  document.addEventListener("DOMContentLoaded", function () {
    route();
    document.addEventListener("thisai:authchange", route);

    var kf = $("[data-key-form]");
    if (kf) kf.addEventListener("submit", function (e) {
      e.preventDefault();
      var v = ($("#svc").value || "").trim();
      if (!v) return;
      load(v);
    });
    var s = $("[data-search]"); if (s) s.addEventListener("input", applySearch);
    var rf = $("[data-refresh]"); if (rf) rf.addEventListener("click", function () { var v = getSvc() || ($("#svc").value || "").trim(); if (v) load(v); });
    var ex = $("[data-export]"); if (ex) ex.addEventListener("click", exportCsv);
  });
})();
