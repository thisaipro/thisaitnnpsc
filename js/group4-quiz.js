/* ============================================================================
   Thisai IAS Academy — Group 4 Free Diagnostic Test
   ----------------------------------------------------------------------------
   A working self-assessment: 15-minute timer, instant readiness score, per-
   section strength/weakness, then a lead capture (name + WhatsApp) that is the
   page's primary conversion.

   >>> QUESTION BANK IS EDITABLE SAMPLE CONTENT <<<
   The questions below are starter samples (aptitude is self-checking; a few
   well-established GS/Tamil facts). REPLACE / EXPAND them with your own vetted
   TNPSC Group 4 question bank (aim for 25) before launch. Each item:
     { q, options:[4], answer:<index 0-3>, section:"Tamil"|"General Studies"|"Aptitude" }
   The test automatically uses however many questions are in BANK.
   ========================================================================== */
(function () {
  "use strict";

  var BANK = [
    // ---- Aptitude & Mental Ability (self-checking) ----
    { q: "What is 15% of 200?", options: ["20", "25", "30", "35"], answer: 2, section: "Aptitude" },
    { q: "Simplify: 12 + 8 × 2", options: ["40", "28", "32", "36"], answer: 1, section: "Aptitude" },
    { q: "Two numbers are in the ratio 3 : 5 and add up to 320. The larger number is:", options: ["120", "180", "200", "160"], answer: 2, section: "Aptitude" },
    { q: "The HCF of 12 and 18 is:", options: ["2", "3", "6", "9"], answer: 2, section: "Aptitude" },
    { q: "The LCM of 4 and 6 is:", options: ["10", "12", "24", "8"], answer: 1, section: "Aptitude" },
    { q: "A can finish a job in 10 days and B in 15 days. Together they finish it in:", options: ["5 days", "6 days", "12 days", "25 days"], answer: 1, section: "Aptitude" },
    { q: "Simple interest on ₹1,000 at 10% per year for 2 years is:", options: ["₹100", "₹200", "₹210", "₹2,000"], answer: 1, section: "Aptitude" },
    { q: "Area of a rectangle with length 8 and width 5 is:", options: ["13", "40", "26", "20"], answer: 1, section: "Aptitude" },
    { q: "Find the next term: 2, 4, 8, 16, ?", options: ["20", "24", "32", "30"], answer: 2, section: "Aptitude" },
    { q: "The perimeter of a square of side 6 cm is:", options: ["12 cm", "24 cm", "36 cm", "30 cm"], answer: 1, section: "Aptitude" },
    { q: "If 5 pens cost ₹60, the cost of 1 pen is:", options: ["₹10", "₹12", "₹15", "₹6"], answer: 1, section: "Aptitude" },
    { q: "The average of 10, 20 and 30 is:", options: ["15", "20", "25", "30"], answer: 1, section: "Aptitude" },
    { q: "What is 20% of 150?", options: ["20", "25", "30", "35"], answer: 2, section: "Aptitude" },
    { q: "7 × 8 = ?", options: ["54", "56", "63", "48"], answer: 1, section: "Aptitude" },
    { q: "Half of 90 is:", options: ["30", "45", "50", "60"], answer: 1, section: "Aptitude" },

    // ---- General Studies ----
    { q: "The capital of Tamil Nadu is:", options: ["Madurai", "Chennai", "Coimbatore", "Tiruchirappalli"], answer: 1, section: "General Studies" },
    { q: "The Indian Constitution came into effect on:", options: ["15 August 1947", "26 January 1950", "26 November 1949", "2 October 1950"], answer: 1, section: "General Studies" },
    { q: "The national animal of India is the:", options: ["Lion", "Elephant", "Royal Bengal Tiger", "Peacock"], answer: 2, section: "General Studies" },
    { q: "Which gas do plants absorb from the air for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2, section: "General Studies" },
    { q: "The largest state of India by area is:", options: ["Uttar Pradesh", "Rajasthan", "Madhya Pradesh", "Maharashtra"], answer: 1, section: "General Studies" },
    { q: "Who is known as the 'Father of the Nation' in India?", options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Sardar Patel", "Subhas Chandra Bose"], answer: 1, section: "General Studies" },

    // ---- Tamil ----
    { q: "“அகர முதல எழுத்தெல்லாம்...” எந்ந நூலின் த௄டக்க வரி?", options: ["நாலடியார்", "திருக்குறள்", "புறநானூறு", "கம்பராமாயணம்"], answer: 1, section: "Tamil" },
    { q: "திருக்குறள் எழுதியவர் யார்?", options: ["கம்பர்", "பாரதியார்", "திருவள்ளுவர்", "இளங்கோ அடிகள்"], answer: 2, section: "Tamil" },
    { q: "திருக்குறளில் மொத்த அதிகாரங்கள் எத்தனை?", options: ["100", "108", "133", "150"], answer: 2, section: "Tamil" },
    { q: "கீழ்கண்டவற்றுள் எது உயிர் எழுத்து?", options: ["க்", "ம்", "அ", "ப்"], answer: 2, section: "Tamil" }
  ];

  var TIME_SECONDS = 15 * 60;

  var state = { answers: [], idx: 0, remaining: TIME_SECONDS, timer: null, done: false };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var CFG = window.THISAI_CONFIG || {};

  var overlay, content, progEl, timerEl;

  function openQuiz() {
    overlay = $("#quiz"); if (!overlay) return;
    content = $("[data-quiz-content]", overlay);
    progEl = $("[data-quiz-prog]", overlay);
    timerEl = $("[data-quiz-timer]", overlay);
    state = { answers: new Array(BANK.length).fill(null), idx: 0, remaining: TIME_SECONDS, timer: null, done: false };
    overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    startTimer();
    renderQ();
  }
  function closeQuiz() {
    if (!overlay) return;
    if (state.timer) clearInterval(state.timer);
    overlay.classList.remove("open"); overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function startTimer() {
    tick();
    state.timer = setInterval(tick, 1000);
    function tick() {
      var m = Math.floor(state.remaining / 60), s = state.remaining % 60;
      if (timerEl) { timerEl.textContent = m + ":" + (s < 10 ? "0" : "") + s; timerEl.classList.toggle("warn", state.remaining <= 60); }
      if (state.remaining <= 0) { clearInterval(state.timer); if (!state.done) finish(); return; }
      state.remaining--;
    }
  }

  function renderQ() {
    var i = state.idx, item = BANK[i];
    progEl.style.width = ((i) / BANK.length * 100) + "%";
    var opts = item.options.map(function (o, k) {
      var sel = state.answers[i] === k ? " sel" : "";
      return '<button type="button" class="q-opt' + sel + '" data-opt="' + k + '"><span class="k">' + "ABCD"[k] + '</span><span>' + o + '</span></button>';
    }).join("");
    var isLast = i === BANK.length - 1;
    content.innerHTML =
      '<p class="q-count">Question ' + (i + 1) + ' of ' + BANK.length + ' <span class="q-sec">· ' + item.section + '</span></p>' +
      '<p class="q-text">' + item.q + '</p>' +
      '<div class="q-opts">' + opts + '</div>' +
      '<div class="quiz-nav">' +
        (i > 0 ? '<button type="button" class="btn btn-ghost" data-prev>← Previous</button>' : '') +
        '<span class="spacer"></span>' +
        (isLast ? '<button type="button" class="btn btn-gold" data-finish>Finish &amp; see my score</button>'
                : '<button type="button" class="btn btn-navy" data-next>Next →</button>') +
      '</div>' +
      '<p style="text-align:center;margin-top:16px"><button type="button" class="btn btn-ghost btn-sm" data-finish>Finish test now</button></p>';

    $$(".q-opt", content).forEach(function (b) {
      b.addEventListener("click", function () {
        state.answers[i] = parseInt(b.getAttribute("data-opt"), 10);
        $$(".q-opt", content).forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel");
      });
    });
    var prev = $("[data-prev]", content); if (prev) prev.addEventListener("click", function () { state.idx--; renderQ(); });
    var next = $("[data-next]", content); if (next) next.addEventListener("click", function () { state.idx++; renderQ(); });
    $$("[data-finish]", content).forEach(function (b) { b.addEventListener("click", finish); });
    content.parentElement.scrollTop = 0;
  }

  function finish() {
    if (state.done) return;
    state.done = true;
    if (state.timer) clearInterval(state.timer);
    progEl.style.width = "100%";

    var secs = {}, correctTotal = 0;
    BANK.forEach(function (item, i) {
      var s = item.section; secs[s] = secs[s] || { c: 0, t: 0 };
      secs[s].t++;
      if (state.answers[i] === item.answer) { secs[s].c++; correctTotal++; }
    });
    var pct = Math.round(correctTotal / BANK.length * 100);

    // strongest / weakest section by accuracy
    var best = null, worst = null;
    Object.keys(secs).forEach(function (s) {
      var acc = secs[s].c / secs[s].t;
      if (best === null || acc > best.acc) best = { s: s, acc: acc };
      if (worst === null || acc < worst.acc) worst = { s: s, acc: acc };
    });

    var tag = pct >= 75 ? { t: "Exam-ready zone", bg: "#eaf6ee", fg: "#1d7a46" }
            : pct >= 50 ? { t: "On track — close the gaps", bg: "#fff3d4", fg: "#7a5c12" }
                        : { t: "Needs a structured plan", bg: "#fdecea", fg: "#b4231e" };

    var C = 464.96, off = C * (1 - pct / 100);
    var barsHtml = Object.keys(secs).map(function (s) {
      var a = Math.round(secs[s].c / secs[s].t * 100);
      var col = a >= 75 ? "#1d7a46" : a >= 50 ? "#b8861f" : "#b4231e";
      return '<div class="sec-bar"><b>' + s + '<span>' + secs[s].c + '/' + secs[s].t + ' · ' + a + '%</span></b>' +
        '<div class="track"><div class="fill" style="width:0;background:' + col + '" data-w="' + a + '"></div></div></div>';
    }).join("");

    content.innerHTML =
      '<div class="result-head">' +
        '<p class="q-count">Your Group 4 readiness score</p>' +
        '<div class="meter"><svg width="170" height="170" viewBox="0 0 170 170">' +
          '<defs><linearGradient id="mg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e2b957"/><stop offset="100%" stop-color="#b8861f"/></linearGradient></defs>' +
          '<circle class="track" cx="85" cy="85" r="74"/>' +
          '<circle class="val" cx="85" cy="85" r="74" stroke-dasharray="' + C + '" stroke-dashoffset="' + C + '" data-off="' + off + '"/>' +
          '</svg><div class="pct"><b>' + pct + '%</b><span>Readiness</span></div></div>' +
        '<span class="readiness-tag" style="background:' + tag.bg + ';color:' + tag.fg + '">' + tag.t + '</span>' +
      '</div>' +
      '<div class="result-cards">' +
        '<div class="rc good"><b>Strong area</b>' + best.s + '</div>' +
        '<div class="rc weak"><b>Needs improvement</b>' + worst.s + '</div>' +
      '</div>' +
      '<div class="sec-bars">' + barsHtml + '</div>' +
      '<div class="result-lead">' +
        '<h3 style="margin:0 0 4px">Get your detailed analysis + free Group 4 kit</h3>' +
        '<p style="color:#35424f;margin:0 0 14px;font-size:.95rem">We’ll send a topic-wise breakdown, a 90-day study plan and the free preparation kit to your WhatsApp.</p>' +
        '<form id="quiz-lead" class="lead-form" novalidate>' +
          '<div class="field"><label for="ql-name">Full name</label><input id="ql-name" name="name" type="text" required minlength="2" placeholder="Your name" /><span class="field-error" data-error></span></div>' +
          '<div class="field"><label for="ql-phone">WhatsApp number</label><input id="ql-phone" name="phone" type="tel" inputmode="numeric" required placeholder="10-digit mobile number" /><span class="field-error" data-error></span></div>' +
          '<button type="submit" class="btn btn-gold btn-block">Send my analysis + free kit</button>' +
          '<div class="form-success" data-success hidden role="status" style="margin-top:14px">' +
            '<div class="success-tick" aria-hidden="true">✓</div><h4>On its way to your WhatsApp.</h4>' +
            '<p>Our team will send your detailed analysis and free kit shortly.</p>' +
          '</div>' +
        '</form>' +
        '<p style="text-align:center;margin:14px 0 0"><a class="btn btn-ghost btn-sm" data-wa="counsellor" href="#" target="_blank" rel="noopener">Talk to a counsellor</a> <button type="button" class="btn btn-ghost btn-sm" data-quiz-retake>Retake test</button></p>' +
      '</div>';

    // animate bars + ring
    setTimeout(function () {
      var ring = $(".meter .val", content); if (ring) ring.style.strokeDashoffset = ring.getAttribute("data-off");
      $$(".sec-bar .fill", content).forEach(function (f) { f.style.width = f.getAttribute("data-w") + "%"; });
    }, 80);

    // bind WhatsApp counsellor link (content is dynamic, so set it here)
    var waC = $('[data-wa="counsellor"]', content);
    if (waC) waC.href = "https://wa.me/" + (CFG.WHATSAPP_NUMBER || "").replace(/[^\d]/g, "") + "?text=" + encodeURIComponent(CFG.WHATSAPP_MSG_COUNSELLOR || "");
    var retake = $("[data-quiz-retake]", content); if (retake) retake.addEventListener("click", function () { closeQuiz(); openQuiz(); });
    wireLead($("#quiz-lead"), { score: pct, strong: best.s, weak: worst.s });

    if (window.gtag) window.gtag("event", "g4_diagnostic_complete", { score: pct });
    else console.log("[analytics] g4_diagnostic_complete", pct);
  }

  function wireLead(form, meta) {
    if (!form) return;
    var validPhone = function (v) { return /^[6-9]\d{9}$/.test((v || "").replace(/[^\d]/g, "").replace(/^(91|0)/, "")); };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      $$(".field", form).forEach(function (field) {
        var inp = $("input", field), v = (inp.value || "").trim(); var err = $("[data-error]", field);
        var bad = (inp.name === "name" && v.length < 2) || (inp.name === "phone" && !validPhone(v));
        field.classList.toggle("invalid", bad); if (err) err.textContent = bad ? "Please check this field" : "";
        if (bad) ok = false;
      });
      if (!ok) return;
      var data = { _form: "Group 4 Diagnostic Lead", score: meta.score, strong: meta.strong, weak: meta.weak };
      $$("input", form).forEach(function (i) { if (i.name) data[i.name] = i.value.trim(); });
      var btn = $('button[type="submit"]', form); btn.disabled = true; btn.textContent = "Sending…";
      var endpoint = CFG.FORM_ENDPOINT, demo = !endpoint || /REPLACE_ME/.test(endpoint);
      var done = function () {
        $$(".field, button[type=submit]", form).forEach(function (el) { el.style.display = "none"; });
        var ok = $("[data-success]", form); if (ok) ok.hidden = false;
        if (window.gtag) window.gtag("event", "g4_diagnostic_lead", { score: meta.score });
      };
      if (demo) { console.log("[form:DEMO] diagnostic lead", data); done(); return; }
      fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { if (r && r.ok === false) throw 0; done(); })
        .catch(function () { btn.disabled = false; btn.textContent = "Send my analysis + free kit"; alert("Something went wrong — please use the WhatsApp button."); });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    $$("[data-open-quiz]").forEach(function (b) { b.addEventListener("click", openQuiz); });
    var ov = $("#quiz"); if (ov) { var c = $("[data-quiz-close]", ov); if (c) c.addEventListener("click", closeQuiz); }
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { var o = $("#quiz"); if (o && o.classList.contains("open")) closeQuiz(); } });
    // auto-open from an ad link: group4.html#test
    if (location.hash === "#test" || location.hash === "#diagnostic-start") setTimeout(openQuiz, 400);
  });
})();
