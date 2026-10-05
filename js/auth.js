/* ============================================================================
   Thisai IAS Academy — authentication (sign in / sign up)
   ----------------------------------------------------------------------------
   This is a FRONT-END DEMO. It validates input, shows the signed-in UI state,
   and remembers the session in this browser's localStorage. It does NOT provide
   real security — no server, no real password storage.

   >>> BEFORE LAUNCH: connect a real auth backend. <<<
   The two functions marked `TODO: real backend` below are the only places to
   change. Recommended options (both have generous free tiers, no server to run):

   • Firebase Authentication (email/password or phone OTP)
       import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword }
       from "firebase/auth";
       - signUp(): createUserWithEmailAndPassword(auth, email, password)
       - signIn(): signInWithEmailAndPassword(auth, email, password)
   • Supabase Auth
       supabase.auth.signUp({ email, password })
       supabase.auth.signInWithPassword({ email, password })

   Replace the demo bodies, keep the UI calls (setSession / renderAuthState).
   Passwords are intentionally NOT written to localStorage here.
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var t = function (k) { return (window.ThisaiI18n ? window.ThisaiI18n.t(k) : k); };

  var USER_KEY = "thisai_user";
  var ACCT_KEY = "thisai_accounts"; // demo-only: {email: {name}} — no passwords

  function getUser() { try { return JSON.parse(localStorage.getItem(USER_KEY) || "null"); } catch (e) { return null; } }
  function setSession(user) { try { localStorage.setItem(USER_KEY, JSON.stringify(user)); } catch (e) {} renderAuthState(); }
  function clearSession() { try { localStorage.removeItem(USER_KEY); } catch (e) {} renderAuthState(); }
  function getAccounts() { try { return JSON.parse(localStorage.getItem(ACCT_KEY) || "{}"); } catch (e) { return {}; } }
  function saveAccount(email, name) { var a = getAccounts(); a[email.toLowerCase()] = { name: name }; try { localStorage.setItem(ACCT_KEY, JSON.stringify(a)); } catch (e) {} }

  function toast(msg) {
    var el = $("[data-toast]"); if (!el) { alert(msg); return; }
    el.textContent = msg; el.hidden = false;
    clearTimeout(el._t); el._t = setTimeout(function () { el.hidden = true; }, 3400);
  }
  function initials(name) { return (name || "U").trim().split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join("").toUpperCase(); }

  /* ---------- header signed-in / signed-out state ---------- */
  function renderAuthState() {
    var user = getUser();
    $$("[data-auth-slot]").forEach(function (slot) {
      slot.innerHTML = "";
      if (user) {
        var pill = document.createElement("div");
        pill.className = "user-pill";
        pill.innerHTML = '<span class="avatar">' + initials(user.name) + '</span><span class="hide-mobile">' +
          t("auth.hi") + ', ' + escapeHtml((user.name || "").split(" ")[0]) + '</span>' +
          '<button type="button" class="btn btn-ghost btn-sm" data-signout>' + t("auth.signout") + '</button>';
        slot.appendChild(pill);
        $("[data-signout]", pill).addEventListener("click", function () { clearSession(); toast(t("auth.outToast")); });
      } else {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "btn btn-ghost btn-sm";
        btn.setAttribute("data-open-auth", "signin");
        btn.textContent = t("btn.signin");
        btn.addEventListener("click", function () { open("signin"); });
        slot.appendChild(btn);
      }
    });
  }
  function escapeHtml(s) { return (s || "").replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); }

  /* ---------- modal ---------- */
  function open(tab) {
    var m = $("#auth-modal"); if (!m) return;
    m.classList.add("open");
    document.body.style.overflow = "hidden";
    switchTab(tab || "signin");
    var f = $(".auth-pane.active input", m); if (f) setTimeout(function () { f.focus(); }, 50);
  }
  function close() {
    var m = $("#auth-modal"); if (!m) return;
    m.classList.remove("open");
    document.body.style.overflow = "";
  }
  function switchTab(tab) {
    $$(".auth-tab").forEach(function (b) { b.classList.toggle("active", b.getAttribute("data-authtab") === tab); });
    $$(".auth-pane").forEach(function (p) { p.classList.toggle("active", p.getAttribute("data-authpane") === tab); });
  }

  /* ---------- validation ---------- */
  function showErr(field, msg) { field.classList.add("invalid"); var e = $("[data-error]", field); if (e) e.textContent = msg; }
  function clrErr(field) { field.classList.remove("invalid"); var e = $("[data-error]", field); if (e) e.textContent = ""; }
  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
  function validPhone(v) { return /^[6-9]\d{9}$/.test((v || "").replace(/[^\d]/g, "").replace(/^(91|0)/, "")); }
  function validEmailOrPhone(v) { return validEmail(v) || validPhone(v); }

  function validateForm(form) {
    var ok = true;
    $$(".field", form).forEach(function (field) {
      var inp = $("input", field); if (!inp) return;
      var v = (inp.value || "").trim();
      var name = inp.getAttribute("name");
      if (!v) { showErr(field, "Required"); ok = false; return; }
      if (name === "name" && v.length < 2) { showErr(field, "Enter your name"); ok = false; return; }
      if (name === "email" && !validEmail(v)) { showErr(field, "Enter a valid email"); ok = false; return; }
      if (name === "identifier" && !validEmailOrPhone(v)) { showErr(field, "Enter a valid email or mobile"); ok = false; return; }
      if (name === "phone" && !validPhone(v)) { showErr(field, "Enter a valid 10-digit mobile"); ok = false; return; }
      if (name === "password" && v.length < 6) { showErr(field, "At least 6 characters"); ok = false; return; }
      if (name === "password2") {
        var p1 = form.querySelector('input[name="password"]');
        if (p1 && v !== p1.value) { showErr(field, "Passwords don't match"); ok = false; return; }
      }
      clrErr(field);
    });
    return ok;
  }

  /* ---------- demo backend (REPLACE for production) ---------- */
  function doSignUp(data) {
    // TODO: real backend — call Firebase/Supabase createUser here and return a Promise.
    saveAccount(data.email, data.name);           // demo: remember name by email (no password)
    return Promise.resolve({ name: data.name, email: data.email });
  }
  function doSignIn(data) {
    // TODO: real backend — call Firebase/Supabase signIn here and return a Promise.
    var accts = getAccounts();
    var key = (data.identifier || "").toLowerCase();
    var known = accts[key];
    var name = known ? known.name : (validEmail(data.identifier) ? data.identifier.split("@")[0] : "Student");
    return Promise.resolve({ name: name, email: data.identifier });
  }

  function wireForm(formId, handler, okTab) {
    var form = $("#" + formId); if (!form) return;
    $$("input", form).forEach(function (inp) {
      inp.addEventListener("blur", function () { /* light touch; full validate on submit */ });
      inp.addEventListener("input", function () { var f = inp.closest(".field"); if (f && f.classList.contains("invalid")) clrErr(f); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validateForm(form)) { var bad = $(".field.invalid input", form); if (bad) bad.focus(); return; }
      var data = {}; $$("input", form).forEach(function (i) { if (i.name) data[i.name] = i.value.trim(); });
      var btn = $('button[type="submit"]', form); var lbl = btn.textContent; btn.disabled = true; btn.textContent = "…";
      handler(data).then(function (user) {
        setSession({ name: user.name, email: user.email });
        close();
        form.reset();
        btn.disabled = false; btn.textContent = lbl;
        if (window.gtag) window.gtag("event", okTab === "signup" ? "sign_up" : "login", {});
        toast(t("auth.welcomeToast").replace("{name}", (user.name || "").split(" ")[0]));
      }).catch(function () { btn.disabled = false; btn.textContent = lbl; toast("Something went wrong. Please try again."); });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderAuthState();

    // open triggers
    $$("[data-open-auth]").forEach(function (b) {
      b.addEventListener("click", function () { open(b.getAttribute("data-open-auth") || "signin"); });
    });
    // modal controls
    var m = $("#auth-modal");
    if (m) {
      $(".modal-scrim", m).addEventListener("click", close);
      $(".modal-close", m).addEventListener("click", close);
      $$(".auth-tab", m).forEach(function (b) { b.addEventListener("click", function () { switchTab(b.getAttribute("data-authtab")); }); });
      $$("[data-switch-tab]", m).forEach(function (b) { b.addEventListener("click", function () { switchTab(b.getAttribute("data-switch-tab")); }); });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
    }

    wireForm("form-signin", doSignIn, "signin");
    wireForm("form-signup", doSignUp, "signup");

    // re-render header text when language changes
    document.addEventListener("thisai:langchange", renderAuthState);
  });

  window.ThisaiAuth = { open: open, close: close, getUser: getUser, signOut: clearSession };
})();
