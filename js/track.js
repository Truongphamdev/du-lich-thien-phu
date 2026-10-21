/* ==========================================================================
   track.js — Đo lường cho quảng cáo. Nạp Facebook Pixel và Google tag khi
   content.js → brand.tracking có ID; đọc UTM từ URL và nhớ trong phiên để
   gắn vào yêu cầu đặt xe; bắn sự kiện Lead khi khách gửi form.
   ========================================================================== */
(function () {
  "use strict";
  var UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid"];
  var STORE_KEY = "tp_utm";
  var C = window.TP_CONTENT;
  var T = (C && C.brand && C.brand.tracking) || {};

  /** Đọc UTM từ URL; có thì lưu sessionStorage để trang sau vẫn nhớ nguồn. */
  function readUtm() {
    var q = new URLSearchParams(location.search), found = {};
    UTM_KEYS.forEach(function (k) { if (q.get(k)) { found[k] = q.get(k); } });
    try {
      if (Object.keys(found).length) { sessionStorage.setItem(STORE_KEY, JSON.stringify(found)); return found; }
      return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}");
    } catch (e) { return found; }
  }

  function loadScript(src) {
    var s = document.createElement("script"); s.async = true; s.src = src; document.head.appendChild(s);
  }

  function initFacebook(id) {
    /* Đoạn khởi tạo chuẩn của Meta Pixel, rút gọn. */
    var f = window.fbq = function () { f.callMethod ? f.callMethod.apply(f, arguments) : f.queue.push(arguments); };
    if (!window._fbq) { window._fbq = f; }
    f.push = f; f.loaded = true; f.version = "2.0"; f.queue = [];
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    f("init", id); f("track", "PageView");
  }

  function initGoogle(id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    loadScript("https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id));
    window.gtag("js", new Date()); window.gtag("config", id);
  }

  /** Bắn sự kiện Lead sang các nền tảng đang bật. info: { route, car, price }. */
  function lead(info) {
    info = info || {};
    if (window.fbq && T.fbPixel) {
      window.fbq("track", "Lead", { content_name: info.route || "", content_category: info.car || "", currency: "VND", value: info.value || 0 });
    }
    if (window.gtag && T.gaId) {
      window.gtag("event", "generate_lead", { route: info.route || "", car: info.car || "", currency: "VND", value: info.value || 0 });
    }
    if (window.gtag && T.adsConversion) {
      window.gtag("event", "conversion", { send_to: T.adsConversion, currency: "VND", value: info.value || 0 });
    }
  }

  if (T.fbPixel) { initFacebook(T.fbPixel); }
  if (T.gaId) { initGoogle(T.gaId); }
  window.TP_TRACK = { utm: readUtm, lead: lead };
})();
