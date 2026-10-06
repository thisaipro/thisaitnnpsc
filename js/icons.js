/* ============================================================================
   Thisai IAS Academy — icon sprite (civil-service / government / academy themed)
   Injects a hidden <svg> sprite once; reference icons anywhere with:
     <svg class="ico"><use href="#ic-building"></use></svg>
   Icons are line-style, inherit currentColor, sized via CSS (.ico / em).
   ========================================================================== */
(function () {
  "use strict";
  var ICONS = {
    "ic-building": '<path d="M3 21h18"/><path d="M4 21V10l8-5 8 5v11"/><path d="M4 10h16"/><path d="M8 21v-6M12 21v-6M16 21v-6"/>',
    "ic-scales":   '<path d="M12 3v18"/><path d="M8 21h8"/><path d="M4 7h16"/><path d="M12 3.2a1 1 0 1 0 .01 0"/><path d="M4 7l-2 5a3 3 0 0 0 6 0z"/><path d="M20 7l-2 5a3 3 0 0 0 6 0z"/>',
    "ic-torch":    '<path d="M12 2c2.2 2 3.2 3.6 3.2 5.6A3.2 3.2 0 1 1 8.8 7.6C8.8 5.6 9.8 4 12 2z"/><path d="M10 12h4l-1 3h-2z"/><path d="M11 15l-1 6h4l-1-6"/>',
    "ic-cap":      '<path d="M2 9l10-4 10 4-10 4z"/><path d="M6 11v4c0 1.3 3 2.4 6 2.4s6-1.1 6-2.4v-4"/><path d="M22 9v5"/>',
    "ic-target":   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
    "ic-shield":   '<path d="M12 3l7 3v5c0 5-3.5 8.2-7 10-3.5-1.8-7-5-7-10V6z"/><path d="M9 12l2 2 4-4.2"/>',
    "ic-doc":      '<path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4"/><path d="M9.5 9h3M9.5 12.5h5M9.5 16h5"/>',
    "ic-users":    '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.2 3-5.2 6-5.2s6 2 6 5.2"/><path d="M16 5.2a3 3 0 0 1 0 5.8"/><path d="M17 15.2c2 .6 4 2.1 4 4.8"/>',
    "ic-trophy":   '<path d="M8 4h8v4a4 4 0 0 1-8 0z"/><path d="M8 5H5v1.5A3.5 3.5 0 0 0 8.5 10M16 5h3v1.5A3.5 3.5 0 0 1 15.5 10"/><path d="M12 12v4M9 20h6M10 20l.4-4h3.2l.4 4"/>',
    "ic-pin":      '<path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    "ic-rupee":    '<path d="M7 5h10M7 9h10M8 5c4.5 0 5.5 7 0 7l6.5 7"/>',
    "ic-chart":    '<path d="M4 20V4M4 20h16"/><path d="M7 16l4-5 3 3 5-7"/><path d="M16 7h3v3"/>',
    "ic-ai":       '<circle cx="6" cy="7" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="17.4" r="2"/><circle cx="12" cy="12" r="2.4"/><path d="M7.7 8.1l2.3 2.8M16.2 6.9l-2.5 3.6M8.7 16.6l1.9-2.6M15.3 16.1l-1.5-2.2"/>',
    "ic-flag":     '<path d="M5 21V3"/><path d="M5 4h12l-2.2 3.2L17 10H5"/>',
    "ic-book":     '<path d="M4 5.5C4 4.1 5.1 3 6.5 3H12v16H6.5C5.1 19 4 20.1 4 21z"/><path d="M20 5.5C20 4.1 18.9 3 17.5 3H12v16h5.5c1.4 0 2.5 1.1 2.5 2z"/>',
    "ic-gift":     '<path d="M4 11h16v9H4z"/><path d="M3 7h18v4H3z"/><path d="M12 7v13"/><path d="M12 7C12 7 11 3.5 8.6 4.1 6.8 4.6 7.4 7 12 7zM12 7s1-3.5 3.4-2.9C17.2 4.6 16.6 7 12 7z"/>',
    "ic-check":    '<path d="M5 12.5l4.2 4.2L19 6"/>',
    "ic-clock":    '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3.2 2"/>',
    "ic-spark":    '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/>',
    "ic-news":     '<path d="M4 5h13v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z"/><path d="M17 8h3v10a2 2 0 0 1-2 2"/><path d="M7 8h7M7 11h7M7 14h4"/>',
    "ic-pencil":   '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M14 6l4 4"/>',
    "ic-repeat":   '<path d="M4 9a6 6 0 0 1 6-6h6"/><path d="M13 1l3 2-3 2"/><path d="M20 15a6 6 0 0 1-6 6H8"/><path d="M11 23l-3-2 3-2"/>',
    "ic-brain":    '<path d="M9 4a2.5 2.5 0 0 0-2.5 2.5A2.5 2.5 0 0 0 4 9a2.5 2.5 0 0 0 1.2 2.1A2.5 2.5 0 0 0 6 16c.5 1.2 1.7 2 3 2V4z"/><path d="M15 4a2.5 2.5 0 0 1 2.5 2.5A2.5 2.5 0 0 1 20 9a2.5 2.5 0 0 1-1.2 2.1A2.5 2.5 0 0 1 18 16c-.5 1.2-1.7 2-3 2V4z"/>',
    "ic-rocket":   '<path d="M5 15c-1 1-1.5 4-1.5 4s3-.5 4-1.5"/><path d="M9 15l-3-3c1-5 5-9 11-9 0 6-4 10-9 11z"/><circle cx="14.5" cy="9.5" r="1.5"/>',
    "ic-calendar": '<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 9h16M8 3v4M16 3v4"/>',
    "ic-arrow-down":'<path d="M12 4v16M6 14l6 6 6-6"/>'
  };
  function build() {
    if (document.getElementById("thisai-icon-sprite")) return;
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.id = "thisai-icon-sprite";
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("style", "position:absolute;width:0;height:0;overflow:hidden");
    var defs = "";
    for (var k in ICONS) defs += '<symbol id="' + k + '" viewBox="0 0 24 24">' + ICONS[k] + "</symbol>";
    svg.innerHTML = defs;
    document.body.insertBefore(svg, document.body.firstChild);
  }
  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
