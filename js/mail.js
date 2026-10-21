/* ==========================================================================
   mail.js — Gửi yêu cầu đặt xe lên Google Apps Script (ghi Sheet + email).
   URL cấu hình ở content.js → brand.formUrl. Chưa có URL thì bỏ qua.
   Cách gửi giống yoko-landing: no-cors + keepalive, chờ tối đa 2,5 giây.
   ========================================================================== */
(function () {
  "use strict";
  var WAIT_MS = 2500;

  function formUrl() {
    var C = window.TP_CONTENT;
    return (C && C.brand && C.brand.formUrl) ? String(C.brand.formUrl).trim() : "";
  }

  /**
   * Gửi dữ liệu form. Trả về Promise<boolean>: true nếu có cấu hình và
   * không lỗi mạng tức thì; false nếu chưa cấu hình hoặc lỗi.
   */
  function send(payload) {
    var url = formUrl();
    if (!url) { return Promise.resolve(false); }
    var utm = window.TP_TRACK ? window.TP_TRACK.utm() : {};
    var body = JSON.stringify(Object.assign({}, payload, utm, {
      time: new Date().toLocaleString("vi-VN"),
      source: location.href
    }));
    var req = fetch(url, {
      method: "POST", mode: "no-cors", keepalive: true,
      headers: { "Content-Type": "text/plain" }, body: body
    }).then(function () { return true; }, function () { return false; });
    var timer = new Promise(function (resolve) { setTimeout(function () { resolve(true); }, WAIT_MS); });
    return Promise.race([req, timer]);
  }

  window.TP_MAIL = { send: send, isReady: function () { return !!formUrl(); } };
})();
