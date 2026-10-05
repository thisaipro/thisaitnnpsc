/* ============================================================================
   Thisai IAS Academy — i18n (English / Tamil)
   ----------------------------------------------------------------------------
   Real, working bilingual support. Elements opt in with:
     data-i18n="key"        -> textContent
     data-i18n-html="key"   -> innerHTML (for strings with <b>, <br> etc.)
     data-i18n-ph="key"     -> input/textarea placeholder
     data-i18n-aria="key"   -> aria-label
   Missing Tamil strings fall back to English, so the page never breaks.
   Choice is saved to localStorage and applied on every page.

   To extend: add the key to BOTH `en` and `ta` below, and tag the element.
   ========================================================================== */
(function () {
  "use strict";

  var STR = {
    en: {
      /* ---- chrome / nav ---- */
      "nav.home": "Home",
      "nav.courses": "Courses & Test Series",
      "nav.blog": "Blog & Current Affairs",
      "nav.why": "Why Thisai",
      "nav.contact": "Contact",
      "btn.register": "Register",
      "btn.signin": "Sign in",
      "btn.enroll": "Enroll now",
      "btn.menu": "Open menu",

      /* ---- announcements ---- */
      "annc.tag": "Latest",
      "annc.1": "<b>Batch 1</b> — TNPSC Group 1, 2 &amp; 4 combined course starts <b>Nov 2, 2026</b>",
      "annc.2": "New <b>Group 4 Test Series</b> begins <b>Oct 20, 2026</b> — register now",
      "annc.3": "<b>Free UPSC mentorship</b> for Erode's talented aspirants — guided by UPSC interview-stage candidates",

      /* ---- hero ---- */
      "hero.eyebrow": "TNPSC Group 1 · 2 · 4 — Combined Foundation · Erode",
      "hero.title": "Erode, your TNPSC officer starts here.",
      "hero.sub": "No more travelling to Coimbatore or Chennai for serious TNPSC coaching. Thisai IAS Academy brings AI-powered diagnostics, mentorship from serving government officers, and a combined Group 1, 2 &amp; 4 program right here on Sakthi Road — with a promise: you progress, or you get your money back.",
      "hero.cta1": "Reserve your Batch 1 seat",
      "hero.cta2": "Group 4 Test Series — Oct 20 →",
      "cd.label": "Batch 1 begins — November 2, 2026",
      "cd.days": "Days", "cd.hours": "Hrs", "cd.mins": "Min", "cd.secs": "Sec",
      "cd.verify": "Counting down to Nov 2, 2026 · verified server time",
      "cd.plain": "Counting down to Nov 2, 2026",
      "cd.began": "Batch 1 has begun — talk to us to join.",
      "heroCard.badge": "Up to 90% fee waiver",
      "heroCard.1": "<b>Oct 20, 2026</b> — Group 4 Test Series begins",
      "heroCard.2": "<b>Nov 2, 2026</b> — Batch 1 (Group 1, 2 &amp; 4) starts",
      "heroCard.3": "<b>Sakthi Road</b> — near Erode Bus Stand, walkable",
      "heroCard.4": "<b>Progress Guarantee</b> — follow the plan or get refunded*",
      "heroCard.foot": "*Conditions apply — see the Progress Guarantee below.",

      /* ---- programs strip ---- */
      "prog.eyebrow": "Now open",
      "prog.title": "Three ways to start with Thisai",
      "prog.1.flag": "Starts Nov 2",
      "prog.1.title": "TNPSC Group 1, 2 & 4 — Combined Course",
      "prog.1.desc": "One shared foundation for all three exams, with group-specific practice layered on top. Classroom, in-person in Erode.",
      "prog.2.flag": "Starts Oct 20",
      "prog.2.title": "Group 4 Test Series",
      "prog.2.desc": "Full-length and topic-wise tests on the real Group 4 pattern, with the AI diagnostic breakdown after every test.",
      "prog.3.flag": "Free · Merit-based",
      "prog.3.title": "UPSC Civil Services Mentorship",
      "prog.3.desc": "Free mentorship for Erode's talented aspirants, guided by candidates who have reached the UPSC interview stage — lifting our students toward the national stage.",
      "prog.more": "See full details →",

      /* ---- erode-local ---- */
      "local.eyebrow": "Built for Erode — not a branch, a beginning",
      "local.title": "Why should Erode's aspirants have to leave home to prepare seriously?",
      "local.p1": "Every year, talented students from Erode, Perundurai, Bhavani, Gobichettipalayam and the surrounding areas travel to Coimbatore or Chennai chasing “better” TNPSC coaching — losing hours in travel, paying for hostels, and studying away from family support at the exact time they need it most.",
      "local.p2": "Thisai IAS Academy exists to change that. We're building Erode's own serious, outcome-driven TNPSC ecosystem — right on Sakthi Road, near the Erode Bus Stand, walking distance for students across the town and easily reachable for those commuting in from nearby taluks.",
      "local.pt1": "Stay in Erode. Study with your family's support. Save on travel, hostel and mess costs.",
      "local.pt2": "Local mentors, local batchmates, local accountability — the kind that comes from studying alongside people you'll actually run into at the bus stand.",
      "local.pt3": "We're starting with Erode by design, not by limitation — Batch 1 is built to prove the model here first, with the people who deserve it most.",
      "local.cta": "If you're preparing for TNPSC in Erode, Perundurai, Bhavani or nearby — this is being built for you.",

      /* ---- why ---- */
      "why.eyebrow": "Why Thisai",
      "why.title": "What makes this different",
      "why.1.t": "AI Diagnostic Engine", "why.1.d": "Weekly tests that map your exact strengths and gaps — not just your score.",
      "why.2.t": "Serving-Officer Mentorship", "why.2.d": "Guided by people who've actually cleared Group 1, Group 2 and Group 4.",
      "why.3.t": "Small Batches", "why.3.d": "Real attention — not a lecture hall of 200.",
      "why.4.t": "Progress Guarantee", "why.4.d": "If you follow the plan and don't improve, we refund you.*",
      "why.body": "Most TNPSC coaching tells you <em>what</em> to study. Thisai tells you <em>why you're stuck</em> — down to the specific concept, the specific question type, the specific gap — and adjusts your plan every single week until exam day.",

      /* ---- program section ---- */
      "program.eyebrow": "The Program",
      "program.title": "One combined Group 1, 2 & 4 foundation",
      "program.lead": "TNPSC Group 1, Group 2 and Group 4 share close to <b>70% common ground</b> in General Studies. Instead of preparing separately for each, our combined program builds your foundation once — deeply — and then trains you specifically for whichever exam(s) you're targeting.",
      "program.c1.t": "What's covered",
      "program.c1.1": "Common Foundation: History, Geography, Indian Polity, Economy, Science & Environment, Aptitude & Mental Ability, Current Affairs, Tamil Language & Culture",
      "program.c1.2": "Group-specific layers: descriptive / Mains-style answer writing (Group 1), Group 2 paper-pattern drills, Group 4 speed & accuracy drills",
      "program.c1.3": "Weekly full-length + topic-wise tests mapped to each group's actual exam pattern",
      "program.c2.t": "Who this is for",
      "program.c2.1": "Aspirants who haven't decided which group to target yet and want a foundation that keeps every door open",
      "program.c2.2": "Aspirants preparing for more than one group in the same cycle",
      "program.c2.3": "Aspirants who want depth (Group 1/2) but also want Group 4 as a safety net",

      /* ---- diagnostic ---- */
      "diag.eyebrow": "The SWOT Engine",
      "diag.title": "We don't just score your test. We diagnose it.",
      "diag.lead": "Every test you take is broken down across four layers, so you know <em>exactly</em> what to fix. Most students who plateau aren't failing because they “didn't study enough” — they're stuck at one specific layer, in one specific topic. Our engine finds which one, and builds next week's plan around closing that gap.",
      "diag.4.t": "Conceptual Application", "diag.4.d": "Can you apply it to a new question you've never seen before?", "diag.4.tag": "Hardest to fake",
      "diag.3.t": "Conceptual Analysis", "diag.3.d": "Can you compare, connect and reason across topics?",
      "diag.2.t": "Conceptual Understanding", "diag.2.d": "Do you understand <em>why</em> it's true — not just <em>that</em> it's true?",
      "diag.1.t": "Memory Recall", "diag.1.d": "Do you know the fact, date or definition?", "diag.1.tag": "Foundation",
      "diag.out.t": "Every week, you receive:",
      "diag.out.1": "A subject-wise and topic-wise strength / weakness map",
      "diag.out.2": "A skill-layer breakdown — which of the 4 layers is weakest, per topic",
      "diag.out.3": "A ranked list of what to study next — not just “study more”",

      /* ---- mentorship ---- */
      "mentor.eyebrow": "Mentorship",
      "mentor.title": "Learn from people who've actually cleared it",
      "mentor.p1": "Your mentors aren't professional trainers reading from a textbook. They are <b>serving Group 1, Group 2, Group 4 and IFoS officers</b> who have personally cleared TNPSC — and now guide our students on a voluntary basis, because they remember what it took to get there.",
      "mentor.pull": "Real exam strategy. Real interview experience. Real answers to “what actually works” — not guesswork.",

      /* ---- support ---- */
      "support.title": "Weekly support built around your diagnostics",
      "support.1.eyebrow": "Weekly Doubt-Clearing",
      "support.1.t": "Sessions on exactly what your report flagged",
      "support.1.d": "Every week you sit down one-on-one (or in your small batch) with a mentor to go through exactly what your diagnostic report flagged — not a generic class covering random topics. If the AI says you're stuck on Modern History cause-effect reasoning, that's what the session covers.",
      "support.2.eyebrow": "Personalised Study Plan",
      "support.2.t": "Your next three things to do — never a guess",
      "support.2.d": "No two students get the same weekly plan. Yours is generated from your own diagnostic data and updated every week as gaps close and new ones surface. You always know your next three things to do; you never have to guess what to study tonight.",

      /* ---- guarantee ---- */
      "guar.eyebrow": "Our Promise",
      "guar.title": "We promise your progress. If you don't see it, you get your money back.",
      "guar.head": "The guarantee applies when a student:",
      "guar.1": "Attends at least {{GUARANTEE_ATTENDANCE_PCT}}% of scheduled classes and doubt-clearing sessions",
      "guar.2": "Completes at least {{GUARANTEE_COMPLETION_PCT}}% of assigned weekly tests",
      "guar.3": "Follows the personalised study plan issued each week",
      "guar.fine": "If, after {{GUARANTEE_WEEKS}} weeks under these conditions, a student's diagnostic score has <b>not improved over their baseline test score</b>, Thisai will refund {{GUARANTEE_REFUND_TERMS}}. Full terms are provided at enrollment.",
      "guar.legal": "⚠︎ Draft terms — pending legal review before publishing.",

      /* ---- register ---- */
      "reg.eyebrow": "Admissions — Batch 1 & Test Series",
      "reg.title": "Register your interest. We'll confirm your seat on WhatsApp.",
      "reg.lead": "Batch 1 (Group 1, 2 & 4) starts Nov 2, and the Group 4 Test Series begins Oct 20. Seats are capped, so early registration matters.",
      "reg.details": "Key dates",
      "reg.d.testseries": "Group 4 Test Series", "reg.d.testseries.v": "Starts October 20, 2026",
      "reg.d.batch": "Batch 1 course", "reg.d.batch.v": "Starts November 2, 2026",
      "reg.d.venue": "Venue", "reg.d.venue.v": "Thisai IAS Academy, Sakthi Road, Erode",
      "reg.d.deadline": "Deadline", "reg.d.deadline.v": "{{REGISTRATION_DEADLINE}}",
      "reg.tiers": "Scholarship tiers",
      "reg.tier1": "Top tier", "reg.tier2": "Next tier", "reg.tier3": "Next tier",
      "reg.seatcap": "Scholarship-eligible seats are capped at",
      "reg.form.title": "Register for Batch 1 / Test Series",
      "reg.form.intro": "Takes under a minute. We'll confirm your seat on WhatsApp.",
      "f.name": "Full name", "f.name.ph": "Your name",
      "f.phone": "Phone / WhatsApp number", "f.phone.ph": "10-digit mobile number",
      "f.interest": "I'm interested in",
      "f.interest.o0": "Choose one",
      "f.interest.batch": "Batch 1 — Combined course (Nov 2)",
      "f.interest.test": "Group 4 Test Series (Oct 20)",
      "f.interest.upsc": "Free UPSC mentorship",
      "f.interest.unsure": "Not sure yet",
      "f.group": "Target group", "f.group.o0": "Choose one",
      "f.group.unsure": "Not sure yet",
      "f.status": "Current status", "f.status.o0": "Choose one",
      "f.status.student": "Student", "f.status.working": "Working", "f.status.other": "Other",
      "reg.micro": "🔒 We'll confirm your seat on WhatsApp — that's the only reason we ask for your number. No spam.",
      "reg.submit": "Register now",
      "reg.success.t": "You're registered.",
      "reg.success.d": "We'll message you on WhatsApp to confirm your seat and share the next steps. Keep an eye on your messages.",

      /* ---- lead magnet ---- */
      "lead.eyebrow": "Free — no commitment needed",
      "lead.title": "Get the TNPSC Group 4 2024 solved paper — free",
      "lead.p": "100 Part-B General Studies questions from the 2024 Group 4 exam, solved <b>in Tamil, with explanations</b>. Not ready to register yet? Start here. We'll send the link straight to your WhatsApp.",
      "lead.1": "Real 2024 questions, worked answers",
      "lead.2": "Explanations in Tamil",
      "lead.3": "Sent to your WhatsApp — nothing to download here",
      "lead.submit": "Send me the free paper",
      "lead.micro": "We'll send the solved paper link to this WhatsApp number.",
      "lead.success.t": "On its way to your WhatsApp.",
      "lead.success.d": "Check your messages for the download link. If it doesn't arrive in a few minutes, tap the WhatsApp button and we'll send it manually.",
      "lead.openlink": "Open the paper now",

      /* ---- faq ---- */
      "faq.eyebrow": "FAQ",
      "faq.title": "Questions aspirants ask",
      "faq.q1": "Is this one combined course, or separate courses for each group?",
      "faq.a1": "It's one shared foundation covering the Group 1, 2 & 4 syllabus overlap, with group-specific practice layered on top based on which exam(s) you're targeting.",
      "faq.q2": "Do I need to have decided my target group before joining?",
      "faq.a2": "No — many students start with the combined foundation and choose their primary target as the exam calendar approaches.",
      "faq.q3": "Who is the free UPSC mentorship for?",
      "faq.a3": "It's a merit-based, free program for Erode's talented aspirants, guided by candidates who have reached the UPSC interview stage. It's our way of lifting local students toward the national civil-services stage.",
      "faq.q4": "Does this program fully cover Group 1 Mains?",
      "faq.a4": "The shared foundation covers the General Studies base thoroughly. Group 1 requires additional Mains-specific coaching as the exam approaches — we're upfront that the foundation program alone doesn't fully cover Group 1 Mains.",
      "faq.q5": "How does the refund guarantee actually work?",
      "faq.a5": "It applies when you meet the attendance, test-completion and study-plan conditions listed in the Progress Guarantee section above. Full terms are provided at enrollment.",

      /* ---- contact ---- */
      "contact.eyebrow": "Visit us in Erode",
      "contact.title": "Sakthi Road, near Erode Bus Stand",
      "contact.cta1": "Register now",
      "contact.directions": "Get directions",

      /* ---- footer ---- */
      "foot.note": "Erode's own serious, outcome-driven TNPSC academy — AI diagnostics, serving-officer mentorship, and a combined Group 1, 2 & 4 program on Sakthi Road.",
      "foot.explore": "Explore",
      "foot.programs": "Programs",
      "foot.rights": "© 2026 Thisai IAS Academy. All rights reserved.",
      "foot.prepare": "Prepare · Practice · Progress",

      /* ---- auth ---- */
      "auth.signin": "Sign in",
      "auth.signup": "Sign up",
      "auth.welcome": "Welcome back",
      "auth.create": "Create your account",
      "auth.email": "Email or phone", "auth.email.ph": "you@example.com or mobile",
      "auth.pass": "Password", "auth.pass.ph": "Your password",
      "auth.pass2": "Confirm password", "auth.pass2.ph": "Re-enter password",
      "auth.name": "Full name", "auth.name.ph": "Your name",
      "auth.phone": "WhatsApp number", "auth.phone.ph": "10-digit mobile number",
      "auth.emailf": "Email", "auth.emailf.ph": "you@example.com",
      "auth.signin.btn": "Sign in",
      "auth.signup.btn": "Create account",
      "auth.toSignup": "New to Thisai? Create an account",
      "auth.toSignin": "Already have an account? Sign in",
      "auth.note": "Demo accounts are stored only in this browser. Connect a real auth backend (Firebase / Supabase) before launch — see js/auth.js.",
      "auth.hi": "Hi",
      "auth.signout": "Sign out",
      "auth.welcomeToast": "Welcome, {name}! You're signed in.",
      "auth.outToast": "You've been signed out.",

      /* ---- courses page ---- */
      "cp.title": "Courses & Test Series",
      "cp.sub": "Everything Thisai is running right now for TNPSC and UPSC aspirants in Erode — the combined foundation course, the Group 4 test series, and free UPSC mentorship.",
      "cp.bc": "Courses & Test Series",
      "cp.c1.flag": "Admissions open · Starts Nov 2, 2026",
      "cp.c1.t": "TNPSC Group 1, 2 & 4 — Combined Foundation",
      "cp.c1.d": "One deep shared foundation for all three exams, with group-specific practice layered on top. Weekly AI diagnostics, serving-officer mentorship and personalised study plans.",
      "cp.c2.flag": "Starts Oct 20, 2026",
      "cp.c2.t": "Group 4 Test Series",
      "cp.c2.d": "Full-length and topic-wise tests on the real Group 4 pattern. Every test comes back with the 4-layer SWOT diagnostic and a ranked list of what to fix next.",
      "cp.c3.flag": "Free · Merit-based",
      "cp.c3.t": "UPSC Civil Services Mentorship",
      "cp.c3.d": "A free mentorship track for Erode's talented aspirants — guided by candidates who have reached the UPSC interview stage — to lift local students toward the national civil-services stage.",
      "cp.label.start": "Starts", "cp.label.format": "Format", "cp.label.duration": "Duration", "cp.label.fee": "Fee", "cp.label.eligibility": "Eligibility", "cp.label.pattern": "Pattern", "cp.label.frequency": "Frequency",
      "cp.c1.start": "November 2, 2026", "cp.c1.format": "Classroom, in-person · Erode", "cp.c1.duration": "1 year",
      "cp.c2.start": "October 20, 2026", "cp.c2.pattern": "Group 4 exam pattern", "cp.c2.frequency": "Weekly tests",
      "cp.c3.eligibility": "By merit / mentor selection", "cp.c3.format": "Mentor-led sessions",
      "cp.enroll": "Register interest",
      "cp.cta.title": "Not sure which one fits you?",
      "cp.cta.d": "Tell us where you are and we'll guide you to the right starting point on WhatsApp.",

      /* ---- blog page ---- */
      "bp.title": "Blog, Articles & Current Affairs",
      "bp.sub": "TNPSC and UPSC current affairs, exam strategy and study notes from the Thisai team — in English and Tamil. Fresh posts will appear here as Batch 1 gets underway.",
      "bp.bc": "Blog & Current Affairs",
      "bp.filter.all": "All",
      "bp.filter.ca": "Current Affairs",
      "bp.filter.article": "Articles",
      "bp.filter.update": "Exam Updates",
      "bp.readmore": "Read more →",
      "bp.sample": "These are sample/template posts showing the layout. Replace them with real articles — see blog.html for where to add posts. Nothing here is fabricated news; each is clearly a placeholder until the team publishes real content.",
      "bp.empty": "No posts in this category yet — check back soon.",
      "bp.cta.t": "Want current affairs on WhatsApp?",
      "bp.cta.d": "Join our broadcast for daily TNPSC/UPSC current affairs in Tamil and English."
    },

    /* ======================================================================
       TAMIL
       ====================================================================== */
    ta: {
      "nav.home": "முகப்பு",
      "nav.courses": "பாடநெறிகள் & தேர்வுத் தொடர்",
      "nav.blog": "வலைப்பதிவு & நடப்பு நிகழ்வுகள்",
      "nav.why": "ஏன் திசை",
      "nav.contact": "தொடர்பு",
      "btn.register": "பதிவு செய்க",
      "btn.signin": "உள்நுழைக",
      "btn.enroll": "இப்போதே சேருங்கள்",
      "btn.menu": "பட்டியலைத் திற",

      "annc.tag": "புதியவை",
      "annc.1": "<b>தொகுதி 1</b> — TNPSC குரூப் 1, 2 & 4 ஒருங்கிணைந்த பாடநெறி <b>நவ. 2, 2026</b> தொடங்குகிறது",
      "annc.2": "புதிய <b>குரூப் 4 தேர்வுத் தொடர்</b> <b>அக். 20, 2026</b> தொடங்குகிறது — இப்போதே பதிவு செய்யுங்கள்",
      "annc.3": "ஈரோட்டின் திறமையான மாணவர்களுக்கு <b>இலவச UPSC வழிகாட்டுதல்</b> — UPSC நேர்காணல் நிலை வேட்பாளர்களால்",

      "hero.eyebrow": "TNPSC குரூப் 1 · 2 · 4 — ஒருங்கிணைந்த அடித்தளம் · ஈரோடு",
      "hero.title": "ஈரோடு, உங்கள் TNPSC அதிகாரி இங்கே உருவாகிறார்.",
      "hero.sub": "தீவிரமான TNPSC பயிற்சிக்காக இனி கோயம்புத்தூர் அல்லது சென்னைக்குப் பயணிக்க வேண்டாம். செயற்கை நுண்ணறிவு சார்ந்த திறன் பகுப்பாய்வு, பணியிலுள்ள அரசு அதிகாரிகளின் வழிகாட்டுதல், மற்றும் குரூப் 1, 2 & 4 ஒருங்கிணைந்த பாடநெறி — அனைத்தையும் சக்தி சாலையில் திசை IAS அகாடமி வழங்குகிறது. ஒரு உறுதிமொழியுடன்: நீங்கள் முன்னேறுவீர்கள், இல்லையெனில் உங்கள் கட்டணம் திரும்பக் கிடைக்கும்.",
      "hero.cta1": "உங்கள் தொகுதி 1 இடத்தை முன்பதிவு செய்யுங்கள்",
      "hero.cta2": "குரூப் 4 தேர்வுத் தொடர் — அக். 20 →",
      "cd.label": "தொகுதி 1 தொடக்கம் — நவம்பர் 2, 2026",
      "cd.days": "நாட்கள்", "cd.hours": "மணி", "cd.mins": "நிமி", "cd.secs": "வினா",
      "cd.verify": "நவ. 2, 2026 நோக்கி எண்ணிக்கை · சரிபார்க்கப்பட்ட சேவையக நேரம்",
      "cd.plain": "நவ. 2, 2026 நோக்கி எண்ணிக்கை",
      "cd.began": "தொகுதி 1 தொடங்கிவிட்டது — சேர எங்களை தொடர்பு கொள்ளுங்கள்.",
      "heroCard.badge": "90% வரை கட்டணச் சலுகை",
      "heroCard.1": "<b>அக். 20, 2026</b> — குரூப் 4 தேர்வுத் தொடர் தொடக்கம்",
      "heroCard.2": "<b>நவ. 2, 2026</b> — தொகுதி 1 (குரூப் 1, 2 & 4) தொடக்கம்",
      "heroCard.3": "<b>சக்தி சாலை</b> — ஈரோடு பேருந்து நிலையம் அருகில், நடந்தே வரலாம்",
      "heroCard.4": "<b>முன்னேற்ற உத்தரவாதம்</b> — திட்டத்தைப் பின்பற்றுங்கள் அல்லது பணம் திரும்பப் பெறுங்கள்*",
      "heroCard.foot": "*நிபந்தனைகள் பொருந்தும் — கீழே முன்னேற்ற உத்தரவாதத்தைப் பார்க்கவும்.",

      "prog.eyebrow": "இப்போது திறந்துள்ளது",
      "prog.title": "திசையுடன் தொடங்க மூன்று வழிகள்",
      "prog.1.flag": "நவ. 2 தொடக்கம்",
      "prog.1.title": "TNPSC குரூப் 1, 2 & 4 — ஒருங்கிணைந்த பாடநெறி",
      "prog.1.desc": "மூன்று தேர்வுகளுக்கும் ஒரே பொதுவான அடித்தளம், அதன் மேல் ஒவ்வொரு குரூப்பிற்கும் தனிப் பயிற்சி. ஈரோட்டில் நேரடி வகுப்பறை.",
      "prog.2.flag": "அக். 20 தொடக்கம்",
      "prog.2.title": "குரூப் 4 தேர்வுத் தொடர்",
      "prog.2.desc": "உண்மையான குரூப் 4 முறையில் முழு நீள மற்றும் தலைப்பு வாரியான தேர்வுகள், ஒவ்வொரு தேர்விற்குப் பின்னும் AI திறன் பகுப்பாய்வு.",
      "prog.3.flag": "இலவசம் · தகுதி அடிப்படையில்",
      "prog.3.title": "UPSC சிவில் சர்வீசஸ் வழிகாட்டுதல்",
      "prog.3.desc": "UPSC நேர்காணல் நிலையை எட்டிய வேட்பாளர்களால் வழிநடத்தப்படும், ஈரோட்டின் திறமையான மாணவர்களுக்கான இலவச வழிகாட்டுதல் — நம் மாணவர்களை தேசிய மேடைக்கு உயர்த்த.",
      "prog.more": "முழு விவரங்களைக் காண →",

      "local.eyebrow": "ஈரோட்டுக்காக உருவானது — ஒரு கிளை அல்ல, ஒரு தொடக்கம்",
      "local.title": "ஈரோட்டின் மாணவர்கள் தீவிரமாகத் தயாராக ஏன் ஊரை விட்டு செல்ல வேண்டும்?",
      "local.p1": "ஒவ்வொரு ஆண்டும், ஈரோடு, பெருந்துறை, பவானி, கோபிசெட்டிபாளையம் மற்றும் சுற்றுப்புற பகுதிகளிலிருந்து திறமையான மாணவர்கள் “சிறந்த” TNPSC பயிற்சியைத் தேடி கோயம்புத்தூர் அல்லது சென்னைக்குப் பயணிக்கிறார்கள் — பயணத்தில் மணிநேரங்களை இழந்து, விடுதிக் கட்டணம் செலுத்தி, குடும்ப ஆதரவு மிகவும் தேவைப்படும் நேரத்தில் அதை விட்டு விலகி படிக்கிறார்கள்.",
      "local.p2": "இதை மாற்றவே திசை IAS அகாடமி உருவாகியுள்ளது. ஈரோட்டின் சொந்த, தீவிரமான, முடிவு சார்ந்த TNPSC சூழலை நாங்கள் உருவாக்குகிறோம் — சக்தி சாலையில், ஈரோடு பேருந்து நிலையம் அருகில், ஊர் முழுவதும் உள்ள மாணவர்களுக்கு நடந்தே வரும் தூரத்தில், அருகிலுள்ள வட்டங்களிலிருந்து வருபவர்களுக்கும் எளிதில் எட்டும் இடத்தில்.",
      "local.pt1": "ஈரோட்டில் தங்குங்கள். குடும்ப ஆதரவுடன் படியுங்கள். பயணம், விடுதி, உணவுக் கட்டணங்களைச் சேமியுங்கள்.",
      "local.pt2": "உள்ளூர் வழிகாட்டிகள், உள்ளூர் சக மாணவர்கள், உள்ளூர் பொறுப்புணர்வு — பேருந்து நிலையத்தில் சந்திக்கும் மக்களுடன் படிப்பதால் வரும் உணர்வு.",
      "local.pt3": "நாங்கள் ஈரோட்டில் தொடங்குவது வரம்பால் அல்ல, திட்டமிட்டே — தொகுதி 1, தகுதியானவர்களுடன் இந்த மாதிரியை முதலில் இங்கே நிரூபிக்க உருவாக்கப்பட்டது.",
      "local.cta": "ஈரோடு, பெருந்துறை, பவானி அல்லது அருகில் TNPSC-க்குத் தயாராகிறீர்களா — இது உங்களுக்காகவே உருவாகிறது.",

      "why.eyebrow": "ஏன் திசை",
      "why.title": "இதை வேறுபடுத்துவது என்ன",
      "why.1.t": "AI திறன் பகுப்பாய்வு இயந்திரம்", "why.1.d": "உங்கள் சரியான பலங்களையும் குறைகளையும் வரைபடமாக்கும் வாராந்திர தேர்வுகள் — வெறும் மதிப்பெண் அல்ல.",
      "why.2.t": "பணியிலுள்ள அதிகாரிகளின் வழிகாட்டுதல்", "why.2.d": "குரூப் 1, குரூப் 2, குரூப் 4 உண்மையாகத் தேர்ச்சி பெற்றவர்களால் வழிநடத்தப்படுகிறது.",
      "why.3.t": "சிறிய தொகுதிகள்", "why.3.d": "200 பேர் கொண்ட அரங்கம் அல்ல — உண்மையான கவனம்.",
      "why.4.t": "முன்னேற்ற உத்தரவாதம்", "why.4.d": "திட்டத்தைப் பின்பற்றியும் முன்னேறவில்லை எனில், பணம் திரும்பக் கிடைக்கும்.*",
      "why.body": "பெரும்பாலான TNPSC பயிற்சி <em>எதைப்</em> படிக்க வேண்டும் என்று சொல்கிறது. திசை <em>நீங்கள் எங்கே தடைபடுகிறீர்கள்</em> என்று சொல்கிறது — குறிப்பிட்ட கருத்து, குறிப்பிட்ட வினா வகை, குறிப்பிட்ட இடைவெளி வரை — மேலும் தேர்வு நாள் வரை ஒவ்வொரு வாரமும் உங்கள் திட்டத்தை சரிசெய்கிறது.",

      "program.eyebrow": "பாடநெறி",
      "program.title": "குரூப் 1, 2 & 4 ஒருங்கிணைந்த அடித்தளம்",
      "program.lead": "TNPSC குரூப் 1, குரூப் 2, குரூப் 4 பொது அறிவில் கிட்டத்தட்ட <b>70% பொதுவான பகுதியைப்</b> பகிர்ந்து கொள்கின்றன. ஒவ்வொன்றுக்கும் தனியாகத் தயாராவதற்குப் பதிலாக, எங்கள் ஒருங்கிணைந்த பாடநெறி உங்கள் அடித்தளத்தை ஒரே முறை — ஆழமாக — உருவாக்கி, பிறகு நீங்கள் இலக்காகக் கொண்ட தேர்வுக்கு(களுக்கு) குறிப்பாகப் பயிற்சி அளிக்கிறது.",
      "program.c1.t": "உள்ளடக்கியவை",
      "program.c1.1": "பொது அடித்தளம்: வரலாறு, புவியியல், இந்திய அரசியலமைப்பு, பொருளாதாரம், அறிவியல் & சுற்றுச்சூழல், திறனறி & மனத்திறன், நடப்பு நிகழ்வுகள், தமிழ் மொழி & பண்பாடு",
      "program.c1.2": "குரூப் வாரியான அடுக்குகள்: விளக்கமான / மெயின்ஸ் பதில் எழுதுதல் (குரூப் 1), குரூப் 2 முறைப் பயிற்சிகள், குரூப் 4 வேக & துல்லியப் பயிற்சிகள்",
      "program.c1.3": "ஒவ்வொரு குரூப்பின் உண்மையான முறைக்கு ஏற்ப வாராந்திர முழு & தலைப்பு வாரியான தேர்வுகள்",
      "program.c2.t": "இது யாருக்காக",
      "program.c2.1": "எந்த குரூப்பை இலக்காகக் கொள்வது என்று இன்னும் முடிவு செய்யாதவர்கள், அனைத்து வாய்ப்புகளையும் திறந்து வைக்கும் அடித்தளம் விரும்புபவர்கள்",
      "program.c2.2": "ஒரே சுழற்சியில் ஒன்றுக்கு மேற்பட்ட குரூப்களுக்குத் தயாராகுபவர்கள்",
      "program.c2.3": "ஆழம் (குரூப் 1/2) விரும்பியும், பாதுகாப்பாக குரூப் 4-ஐயும் விரும்புபவர்கள்",

      "diag.eyebrow": "SWOT இயந்திரம்",
      "diag.title": "நாங்கள் தேர்விற்கு மதிப்பெண் மட்டும் தரவில்லை. அதைப் பகுப்பாய்வு செய்கிறோம்.",
      "diag.lead": "நீங்கள் எழுதும் ஒவ்வொரு தேர்வும் நான்கு அடுக்குகளாகப் பிரிக்கப்படுகிறது, எதைச் சரிசெய்ய வேண்டும் என்பது <em>துல்லியமாக</em> தெரியும். தேக்கமடையும் பெரும்பாலான மாணவர்கள் “போதுமான அளவு படிக்கவில்லை” என்பதால் தோல்வியடைவதில்லை — ஒரு குறிப்பிட்ட தலைப்பில், ஒரு குறிப்பிட்ட அடுக்கில் தடைபடுகிறார்கள். எது என்பதை எங்கள் இயந்திரம் கண்டறிந்து, அந்த இடைவெளியை மூட அடுத்த வார திட்டத்தை உருவாக்குகிறது.",
      "diag.4.t": "கருத்துப் பயன்பாடு", "diag.4.d": "முன்பு பார்த்திராத புதிய வினாவிற்கு அதைப் பயன்படுத்த முடியுமா?", "diag.4.tag": "போலி செய்ய கடினம்",
      "diag.3.t": "கருத்துப் பகுப்பாய்வு", "diag.3.d": "தலைப்புகள் இடையே ஒப்பிட்டு, இணைத்து, பகுத்தறிய முடியுமா?",
      "diag.2.t": "கருத்துப் புரிதல்", "diag.2.d": "அது உண்மை என்பது மட்டுமல்ல, <em>ஏன்</em> உண்மை என்று புரிகிறதா?",
      "diag.1.t": "நினைவுத் திறன்", "diag.1.d": "உண்மை, தேதி அல்லது வரையறை தெரியுமா?", "diag.1.tag": "அடித்தளம்",
      "diag.out.t": "ஒவ்வொரு வாரமும் நீங்கள் பெறுவது:",
      "diag.out.1": "பாடம் வாரியான & தலைப்பு வாரியான பலம் / பலவீன வரைபடம்",
      "diag.out.2": "திறன்-அடுக்கு பகுப்பாய்வு — ஒவ்வொரு தலைப்பிலும் 4 அடுக்குகளில் எது பலவீனம்",
      "diag.out.3": "அடுத்து எதைப் படிப்பது என்ற தரவரிசைப் பட்டியல் — வெறும் “மேலும் படி” அல்ல",

      "mentor.eyebrow": "வழிகாட்டுதல்",
      "mentor.title": "உண்மையாகத் தேர்ச்சி பெற்றவர்களிடம் கற்றுக்கொள்ளுங்கள்",
      "mentor.p1": "உங்கள் வழிகாட்டிகள் பாடப்புத்தகத்தைப் படிக்கும் தொழில்முறை பயிற்சியாளர்கள் அல்ல. அவர்கள் TNPSC-ஐ தாமே தேர்ச்சி பெற்ற <b>பணியிலுள்ள குரூப் 1, குரூப் 2, குரூப் 4 மற்றும் IFoS அதிகாரிகள்</b> — அந்த பயணம் எப்படி இருந்தது என்பதை நினைவில் வைத்து, தன்னார்வத் தொண்டாக நம் மாணவர்களுக்கு வழிகாட்டுகிறார்கள்.",
      "mentor.pull": "உண்மையான தேர்வு உத்தி. உண்மையான நேர்காணல் அனுபவம். “உண்மையில் எது வேலை செய்கிறது” என்பதற்கான உண்மையான பதில்கள் — யூகம் அல்ல.",

      "support.title": "உங்கள் திறன் பகுப்பாய்வைச் சுற்றி கட்டமைக்கப்பட்ட வாராந்திர ஆதரவு",
      "support.1.eyebrow": "வாராந்திர ஐயம் தீர்த்தல்",
      "support.1.t": "உங்கள் அறிக்கை சுட்டிக்காட்டியதை மட்டுமே பேசும் அமர்வுகள்",
      "support.1.d": "ஒவ்வொரு வாரமும் ஒரு வழிகாட்டியுடன் தனித்தனியாக (அல்லது உங்கள் சிறிய தொகுதியில்) அமர்ந்து உங்கள் அறிக்கை சுட்டிக்காட்டியதை மட்டுமே பார்க்கிறீர்கள் — சீரற்ற தலைப்புகளைக் கொண்ட பொது வகுப்பு அல்ல. நவீன வரலாற்றின் காரண-விளைவு பகுத்தறிவில் தடைபடுகிறீர்கள் என AI சொன்னால், அந்த அமர்வு அதையே பேசும்.",
      "support.2.eyebrow": "தனிப்பயன் படிப்புத் திட்டம்",
      "support.2.t": "அடுத்து செய்ய வேண்டிய மூன்று விஷயங்கள் — யூகமே இல்லை",
      "support.2.d": "எந்த இரு மாணவர்களுக்கும் ஒரே வார திட்டம் கிடைக்காது. உங்களுடையது உங்கள் சொந்த திறன் தரவில் இருந்து உருவாக்கப்பட்டு, இடைவெளிகள் மூடும்போதும் புதியவை தோன்றும்போதும் ஒவ்வொரு வாரமும் புதுப்பிக்கப்படுகிறது. அடுத்து செய்ய வேண்டிய மூன்று விஷயங்கள் எப்போதும் தெரியும்; இன்றிரவு எதைப் படிப்பது என யூகிக்க வேண்டாம்.",

      "guar.eyebrow": "எங்கள் உறுதிமொழி",
      "guar.title": "உங்கள் முன்னேற்றத்தை உறுதியளிக்கிறோம். தெரியவில்லை எனில், பணம் திரும்பக் கிடைக்கும்.",
      "guar.head": "ஒரு மாணவர் பின்வருவனவற்றைச் செய்யும்போது உத்தரவாதம் பொருந்தும்:",
      "guar.1": "திட்டமிடப்பட்ட வகுப்புகள் & ஐயம் தீர்க்கும் அமர்வுகளில் குறைந்தது {{GUARANTEE_ATTENDANCE_PCT}}% கலந்து கொள்ளுதல்",
      "guar.2": "ஒதுக்கப்பட்ட வாராந்திர தேர்வுகளில் குறைந்தது {{GUARANTEE_COMPLETION_PCT}}% முடித்தல்",
      "guar.3": "ஒவ்வொரு வாரமும் வழங்கப்படும் தனிப்பயன் படிப்புத் திட்டத்தைப் பின்பற்றுதல்",
      "guar.fine": "இந்த நிபந்தனைகளின் கீழ் {{GUARANTEE_WEEKS}} வாரங்களுக்குப் பிறகு, ஒரு மாணவரின் திறன் மதிப்பெண் <b>அவரது அடிப்படை தேர்வு மதிப்பெண்ணை விட முன்னேறவில்லை</b> எனில், திசை {{GUARANTEE_REFUND_TERMS}} திருப்பித் தரும். முழு நிபந்தனைகள் சேரும்போது வழங்கப்படும்.",
      "guar.legal": "⚠︎ வரைவு நிபந்தனைகள் — வெளியிடுவதற்கு முன் சட்ட ஆய்வு நிலுவையில்.",

      "reg.eyebrow": "சேர்க்கை — தொகுதி 1 & தேர்வுத் தொடர்",
      "reg.title": "உங்கள் ஆர்வத்தைப் பதிவு செய்யுங்கள். WhatsApp-இல் இடத்தை உறுதிப்படுத்துவோம்.",
      "reg.lead": "தொகுதி 1 (குரூப் 1, 2 & 4) நவ. 2-இல் தொடங்குகிறது, குரூப் 4 தேர்வுத் தொடர் அக். 20-இல் தொடங்குகிறது. இடங்கள் வரம்பிடப்பட்டவை, எனவே முன்கூட்டிய பதிவு முக்கியம்.",
      "reg.details": "முக்கிய தேதிகள்",
      "reg.d.testseries": "குரூப் 4 தேர்வுத் தொடர்", "reg.d.testseries.v": "அக்டோபர் 20, 2026 தொடக்கம்",
      "reg.d.batch": "தொகுதி 1 பாடநெறி", "reg.d.batch.v": "நவம்பர் 2, 2026 தொடக்கம்",
      "reg.d.venue": "இடம்", "reg.d.venue.v": "திசை IAS அகாடமி, சக்தி சாலை, ஈரோடு",
      "reg.d.deadline": "கடைசி நாள்", "reg.d.deadline.v": "{{REGISTRATION_DEADLINE}}",
      "reg.tiers": "புலமைச்சலுகை நிலைகள்",
      "reg.tier1": "உயர் நிலை", "reg.tier2": "அடுத்த நிலை", "reg.tier3": "அடுத்த நிலை",
      "reg.seatcap": "புலமைச்சலுகைக்கு தகுதியான இடங்கள் வரம்பு:",
      "reg.form.title": "தொகுதி 1 / தேர்வுத் தொடருக்குப் பதிவு செய்யுங்கள்",
      "reg.form.intro": "ஒரு நிமிடத்திற்குள். WhatsApp-இல் உங்கள் இடத்தை உறுதிப்படுத்துவோம்.",
      "f.name": "முழுப் பெயர்", "f.name.ph": "உங்கள் பெயர்",
      "f.phone": "தொலைபேசி / WhatsApp எண்", "f.phone.ph": "10 இலக்க மொபைல் எண்",
      "f.interest": "எனக்கு ஆர்வம்",
      "f.interest.o0": "ஒன்றைத் தேர்வு செய்யுங்கள்",
      "f.interest.batch": "தொகுதி 1 — ஒருங்கிணைந்த பாடநெறி (நவ. 2)",
      "f.interest.test": "குரூப் 4 தேர்வுத் தொடர் (அக். 20)",
      "f.interest.upsc": "இலவச UPSC வழிகாட்டுதல்",
      "f.interest.unsure": "இன்னும் உறுதியாகத் தெரியவில்லை",
      "f.group": "இலக்கு குரூப்", "f.group.o0": "ஒன்றைத் தேர்வு செய்யுங்கள்",
      "f.group.unsure": "இன்னும் உறுதியில்லை",
      "f.status": "தற்போதைய நிலை", "f.status.o0": "ஒன்றைத் தேர்வு செய்யுங்கள்",
      "f.status.student": "மாணவர்", "f.status.working": "பணிபுரிபவர்", "f.status.other": "மற்றவை",
      "reg.micro": "🔒 WhatsApp-இல் உங்கள் இடத்தை உறுதிப்படுத்துவோம் — அதற்காக மட்டுமே உங்கள் எண்ணைக் கேட்கிறோம். ஸ்பேம் இல்லை.",
      "reg.submit": "இப்போதே பதிவு செய்யுங்கள்",
      "reg.success.t": "நீங்கள் பதிவு செய்யப்பட்டுள்ளீர்கள்.",
      "reg.success.d": "உங்கள் இடத்தை உறுதிப்படுத்தி அடுத்த கட்டங்களைப் பகிர WhatsApp-இல் தொடர்பு கொள்வோம். உங்கள் செய்திகளைக் கவனியுங்கள்.",

      "lead.eyebrow": "இலவசம் — எந்த உறுதிமொழியும் தேவையில்லை",
      "lead.title": "TNPSC குரூப் 4 2024 தீர்வு வினாத்தாள் — இலவசம்",
      "lead.p": "2024 குரூப் 4 தேர்வின் பகுதி-B பொது அறிவு 100 வினாக்கள், <b>தமிழில், விளக்கங்களுடன்</b> தீர்க்கப்பட்டவை. இன்னும் பதிவு செய்யத் தயாராக இல்லையா? இங்கே தொடங்குங்கள். இணைப்பை நேரடியாக உங்கள் WhatsApp-க்கு அனுப்புவோம்.",
      "lead.1": "உண்மையான 2024 வினாக்கள், தீர்க்கப்பட்ட பதில்கள்",
      "lead.2": "தமிழில் விளக்கங்கள்",
      "lead.3": "உங்கள் WhatsApp-க்கு அனுப்பப்படும் — இங்கே பதிவிறக்கம் இல்லை",
      "lead.submit": "இலவச வினாத்தாளை அனுப்புங்கள்",
      "lead.micro": "இந்த WhatsApp எண்ணுக்கு தீர்வுத்தாள் இணைப்பை அனுப்புவோம்.",
      "lead.success.t": "உங்கள் WhatsApp-க்கு வந்து கொண்டிருக்கிறது.",
      "lead.success.d": "பதிவிறக்க இணைப்பிற்கு உங்கள் செய்திகளைப் பாருங்கள். சில நிமிடங்களில் வரவில்லை எனில், WhatsApp பொத்தானை அழுத்துங்கள், நாங்கள் கைமுறையாக அனுப்புவோம்.",
      "lead.openlink": "இப்போதே வினாத்தாளைத் திறக்கவும்",

      "faq.eyebrow": "அடிக்கடி கேட்கும் கேள்விகள்",
      "faq.title": "மாணவர்கள் கேட்கும் கேள்விகள்",
      "faq.q1": "இது ஒரு ஒருங்கிணைந்த பாடநெறியா, அல்லது ஒவ்வொரு குரூப்பிற்கும் தனித்தனி பாடநெறியா?",
      "faq.a1": "இது குரூப் 1, 2 & 4 பாடத்திட்ட ஒற்றுமையை உள்ளடக்கிய ஒரே பொது அடித்தளம், நீங்கள் இலக்காகக் கொள்ளும் தேர்வுக்கு ஏற்ப குரூப் வாரியான பயிற்சி மேலே சேர்க்கப்படும்.",
      "faq.q2": "சேருவதற்கு முன் என் இலக்கு குரூப்பை முடிவு செய்திருக்க வேண்டுமா?",
      "faq.a2": "இல்லை — பல மாணவர்கள் ஒருங்கிணைந்த அடித்தளத்துடன் தொடங்கி, தேர்வு நாட்காட்டி நெருங்கும்போது தங்கள் முதன்மை இலக்கைத் தேர்வு செய்கிறார்கள்.",
      "faq.q3": "இலவச UPSC வழிகாட்டுதல் யாருக்காக?",
      "faq.a3": "இது தகுதி அடிப்படையிலான இலவசத் திட்டம், UPSC நேர்காணல் நிலையை எட்டிய வேட்பாளர்களால் வழிநடத்தப்படும், ஈரோட்டின் திறமையான மாணவர்களுக்கானது. உள்ளூர் மாணவர்களை தேசிய சிவில் சர்வீசஸ் மேடைக்கு உயர்த்தும் எங்கள் வழி.",
      "faq.q4": "இந்த பாடநெறி குரூப் 1 மெயின்ஸை முழுமையாக உள்ளடக்குமா?",
      "faq.a4": "பொது அடித்தளம் பொது அறிவு அடிப்படையை முழுமையாக உள்ளடக்குகிறது. குரூப் 1-க்கு தேர்வு நெருங்கும்போது கூடுதல் மெயின்ஸ் பயிற்சி தேவை — அடித்தள பாடநெறி மட்டும் குரூப் 1 மெயின்ஸை முழுமையாக உள்ளடக்காது என்பதை வெளிப்படையாகச் சொல்கிறோம்.",
      "faq.q5": "பணத் திரும்பப்பெறல் உத்தரவாதம் எப்படி வேலை செய்கிறது?",
      "faq.a5": "மேலே முன்னேற்ற உத்தரவாதப் பகுதியில் பட்டியலிடப்பட்ட வருகை, தேர்வு நிறைவு மற்றும் படிப்புத் திட்ட நிபந்தனைகளைப் பூர்த்தி செய்யும்போது இது பொருந்தும். முழு நிபந்தனைகள் சேரும்போது வழங்கப்படும்.",

      "contact.eyebrow": "ஈரோட்டில் எங்களைச் சந்திக்கவும்",
      "contact.title": "சக்தி சாலை, ஈரோடு பேருந்து நிலையம் அருகில்",
      "contact.cta1": "இப்போதே பதிவு செய்யுங்கள்",
      "contact.directions": "வழிகளைப் பெறுங்கள்",

      "foot.note": "ஈரோட்டின் சொந்த, தீவிரமான, முடிவு சார்ந்த TNPSC அகாடமி — AI திறன் பகுப்பாய்வு, பணியிலுள்ள அதிகாரிகளின் வழிகாட்டுதல், சக்தி சாலையில் குரூப் 1, 2 & 4 ஒருங்கிணைந்த பாடநெறி.",
      "foot.explore": "ஆராயுங்கள்",
      "foot.programs": "பாடநெறிகள்",
      "foot.rights": "© 2026 திசை IAS அகாடமி. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.",
      "foot.prepare": "தயார் · பயிற்சி · முன்னேற்றம்",

      "auth.signin": "உள்நுழைக",
      "auth.signup": "பதிவு செய்க",
      "auth.welcome": "மீண்டும் வருக",
      "auth.create": "உங்கள் கணக்கை உருவாக்குங்கள்",
      "auth.email": "மின்னஞ்சல் அல்லது தொலைபேசி", "auth.email.ph": "you@example.com அல்லது மொபைல்",
      "auth.pass": "கடவுச்சொல்", "auth.pass.ph": "உங்கள் கடவுச்சொல்",
      "auth.pass2": "கடவுச்சொல்லை உறுதிப்படுத்துங்கள்", "auth.pass2.ph": "மீண்டும் உள்ளிடுங்கள்",
      "auth.name": "முழுப் பெயர்", "auth.name.ph": "உங்கள் பெயர்",
      "auth.phone": "WhatsApp எண்", "auth.phone.ph": "10 இலக்க மொபைல் எண்",
      "auth.emailf": "மின்னஞ்சல்", "auth.emailf.ph": "you@example.com",
      "auth.signin.btn": "உள்நுழைக",
      "auth.signup.btn": "கணக்கை உருவாக்குங்கள்",
      "auth.toSignup": "திசைக்குப் புதியவரா? கணக்கை உருவாக்குங்கள்",
      "auth.toSignin": "ஏற்கனவே கணக்கு உள்ளதா? உள்நுழைக",
      "auth.note": "டெமோ கணக்குகள் இந்த உலாவியில் மட்டுமே சேமிக்கப்படுகின்றன. வெளியிடுவதற்கு முன் உண்மையான auth backend (Firebase / Supabase) இணைக்கவும் — js/auth.js பார்க்கவும்.",
      "auth.hi": "வணக்கம்",
      "auth.signout": "வெளியேறு",
      "auth.welcomeToast": "வணக்கம், {name}! நீங்கள் உள்நுழைந்துள்ளீர்கள்.",
      "auth.outToast": "நீங்கள் வெளியேறிவிட்டீர்கள்.",

      "cp.title": "பாடநெறிகள் & தேர்வுத் தொடர்",
      "cp.sub": "ஈரோட்டில் TNPSC மற்றும் UPSC மாணவர்களுக்கு திசை தற்போது நடத்தும் அனைத்தும் — ஒருங்கிணைந்த அடித்தள பாடநெறி, குரூப் 4 தேர்வுத் தொடர், இலவச UPSC வழிகாட்டுதல்.",
      "cp.bc": "பாடநெறிகள் & தேர்வுத் தொடர்",
      "cp.c1.flag": "சேர்க்கை திறந்துள்ளது · நவ. 2, 2026 தொடக்கம்",
      "cp.c1.t": "TNPSC குரூப் 1, 2 & 4 — ஒருங்கிணைந்த அடித்தளம்",
      "cp.c1.d": "மூன்று தேர்வுகளுக்கும் ஆழமான பொது அடித்தளம், அதன் மேல் குரூப் வாரியான பயிற்சி. வாராந்திர AI திறன் பகுப்பாய்வு, அதிகாரிகளின் வழிகாட்டுதல், தனிப்பயன் படிப்புத் திட்டங்கள்.",
      "cp.c2.flag": "அக். 20, 2026 தொடக்கம்",
      "cp.c2.t": "குரூப் 4 தேர்வுத் தொடர்",
      "cp.c2.d": "உண்மையான குரூப் 4 முறையில் முழு & தலைப்பு வாரியான தேர்வுகள். ஒவ்வொரு தேர்வும் 4-அடுக்கு SWOT பகுப்பாய்வு மற்றும் அடுத்து எதைச் சரிசெய்வது என்ற தரவரிசையுடன் திரும்பும்.",
      "cp.c3.flag": "இலவசம் · தகுதி அடிப்படையில்",
      "cp.c3.t": "UPSC சிவில் சர்வீசஸ் வழிகாட்டுதல்",
      "cp.c3.d": "ஈரோட்டின் திறமையான மாணவர்களுக்கான இலவச வழிகாட்டுதல் — UPSC நேர்காணல் நிலையை எட்டிய வேட்பாளர்களால் வழிநடத்தப்படுகிறது — உள்ளூர் மாணவர்களை தேசிய சிவில் சர்வீசஸ் மேடைக்கு உயர்த்த.",
      "cp.label.start": "தொடக்கம்", "cp.label.format": "வடிவம்", "cp.label.duration": "கால அளவு", "cp.label.fee": "கட்டணம்", "cp.label.eligibility": "தகுதி", "cp.label.pattern": "முறை", "cp.label.frequency": "அடிக்கடி",
      "cp.c1.start": "நவம்பர் 2, 2026", "cp.c1.format": "நேரடி வகுப்பறை · ஈரோடு", "cp.c1.duration": "1 ஆண்டு",
      "cp.c2.start": "அக்டோபர் 20, 2026", "cp.c2.pattern": "குரூப் 4 தேர்வு முறை", "cp.c2.frequency": "வாராந்திர தேர்வுகள்",
      "cp.c3.eligibility": "தகுதி / வழிகாட்டி தேர்வு மூலம்", "cp.c3.format": "வழிகாட்டி அமர்வுகள்",
      "cp.enroll": "ஆர்வத்தைப் பதிவு செய்யுங்கள்",
      "cp.cta.title": "எது உங்களுக்குப் பொருந்தும் என்று உறுதியில்லையா?",
      "cp.cta.d": "நீங்கள் எங்கு இருக்கிறீர்கள் என்று சொல்லுங்கள், WhatsApp-இல் சரியான தொடக்கப் புள்ளிக்கு வழிகாட்டுவோம்.",

      "bp.title": "வலைப்பதிவு, கட்டுரைகள் & நடப்பு நிகழ்வுகள்",
      "bp.sub": "திசை குழுவிடமிருந்து TNPSC மற்றும் UPSC நடப்பு நிகழ்வுகள், தேர்வு உத்தி மற்றும் படிப்புக் குறிப்புகள் — தமிழ் மற்றும் ஆங்கிலத்தில். தொகுதி 1 தொடங்கும்போது புதிய பதிவுகள் இங்கே தோன்றும்.",
      "bp.bc": "வலைப்பதிவு & நடப்பு நிகழ்வுகள்",
      "bp.filter.all": "அனைத்தும்",
      "bp.filter.ca": "நடப்பு நிகழ்வுகள்",
      "bp.filter.article": "கட்டுரைகள்",
      "bp.filter.update": "தேர்வு புதுப்பிப்புகள்",
      "bp.readmore": "மேலும் படிக்க →",
      "bp.sample": "இவை தளவமைப்பைக் காட்டும் மாதிரி/வார்ப்புரு பதிவுகள். உண்மையான கட்டுரைகளால் மாற்றவும் — பதிவுகளைச் சேர்க்க blog.html பார்க்கவும். இங்கே எதுவும் கற்பனையான செய்தி அல்ல; குழு உண்மையான உள்ளடக்கத்தை வெளியிடும் வரை ஒவ்வொன்றும் தெளிவாக ஒரு இடம்பிடிப்பே.",
      "bp.empty": "இந்த வகையில் இன்னும் பதிவுகள் இல்லை — விரைவில் பார்க்கவும்.",
      "bp.cta.t": "WhatsApp-இல் நடப்பு நிகழ்வுகள் வேண்டுமா?",
      "bp.cta.d": "தமிழ் & ஆங்கிலத்தில் தினசரி TNPSC/UPSC நடப்பு நிகழ்வுகளுக்கு எங்கள் ஒளிபரப்பில் சேருங்கள்."
    }
  };

  var SAVED_KEY = "thisai_lang";
  function getLang() {
    try { return localStorage.getItem(SAVED_KEY) || "en"; } catch (e) { return "en"; }
  }
  function saveLang(l) { try { localStorage.setItem(SAVED_KEY, l); } catch (e) {} }

  function translate(key, lang) {
    var d = STR[lang] || STR.en;
    return (d[key] != null && d[key] !== "") ? d[key] : STR.en[key];
  }

  function apply(lang) {
    var root = document.documentElement;
    root.lang = (lang === "ta") ? "ta" : "en";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = translate(el.getAttribute("data-i18n"), lang);
      if (v != null) el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = translate(el.getAttribute("data-i18n-html"), lang);
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      var v = translate(el.getAttribute("data-i18n-ph"), lang);
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = translate(el.getAttribute("data-i18n-aria"), lang);
      if (v != null) el.setAttribute("aria-label", v);
    });

    document.querySelectorAll(".lang-btn").forEach(function (b) {
      var active = b.getAttribute("data-lang") === lang;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });

    // Let other scripts (config placeholder swaps, etc.) re-run after text reset
    document.dispatchEvent(new CustomEvent("thisai:langchange", { detail: { lang: lang } }));
  }

  function setLang(lang) { saveLang(lang); apply(lang); }

  window.ThisaiI18n = { setLang: setLang, getLang: getLang, t: function (k) { return translate(k, getLang()); } };

  document.addEventListener("DOMContentLoaded", function () {
    apply(getLang());
    document.querySelectorAll(".lang-btn").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang")); });
    });
  });
})();
