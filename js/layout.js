/* ==========================================================================
   layout.js — khung dùng chung cho mọi trang: nav đảo, menu mobile, footer,
   nút liên hệ nổi. Mỗi trang chỉ cần đặt 3 ô trống:
     <div id="siteHeader"></div> … <div id="siteFooter"></div> <div id="siteDock"></div>
   Thêm/bớt trang: sửa mảng PAGES.
   ========================================================================== */
(function () {
  "use strict";
  var C = window.TP_CONTENT;
  if (!C) { return; }

  var PAGES = [
    { href: "index.html",      label: "Trang chủ" },
    { href: "gioi-thieu.html", label: "Giới thiệu" },
    { href: "bang-gia.html",   label: "Bảng giá" },
    { href: "dat-xe.html",     label: "Yêu cầu báo giá" },
    { href: "lien-he.html",    label: "Liên hệ" }
  ];

  var PHONE_ICON = '<svg viewBox="0 0 20 20"><path d="M5 3h3l1.5 4-2 1.2a9 9 0 0 0 4.3 4.3L13 10.5l4 1.5v3a2 2 0 0 1-2 2A13 13 0 0 1 3 5a2 2 0 0 1 2-2Z" fill="currentColor"/></svg>';
  var LOGO_MARK = '<svg viewBox="0 0 40 40"><path d="M6 24c4-10 10-14 20-14 4 0 7 1 8 2-2 6-8 10-14 10H6z" fill="#0E8FA8"/><path d="M6 24h24c0 4-2 6-6 6H12c-4 0-6-2-6-6z" fill="#F6B73C"/><circle cx="13" cy="31" r="3" fill="#0E2433"/><circle cx="25" cy="31" r="3" fill="#0E2433"/></svg>';
  var ICON_PHONE_RING = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" fill="currentColor"/></svg>';
  /* Logo WhatsApp và Zalo lấy từ bộ Simple Icons (CC0). */
  var ICON_WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/></svg>';
  var ICON_ZALO = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.49 10.2722v-.4496h1.3467v6.3218h-.7704a.576.576 0 01-.5763-.5729l-.0006.0005a3.273 3.273 0 01-1.9372.6321c-1.8138 0-3.2844-1.4697-3.2844-3.2823 0-1.8125 1.4706-3.2822 3.2844-3.2822a3.273 3.273 0 011.9372.6321l.0006.0005zM6.9188 7.7896v.205c0 .3823-.051.6944-.2995 1.0605l-.03.0343c-.0542.0615-.1815.206-.2421.2843L2.024 14.8h4.8948v.7682a.5764.5764 0 01-.5767.5761H0v-.3622c0-.4436.1102-.6414.2495-.8476L4.8582 9.23H.1922V7.7896h6.7266zm8.5513 8.3548a.4805.4805 0 01-.4803-.4798v-7.875h1.4416v8.3548H15.47zM20.6934 9.6C22.52 9.6 24 11.0807 24 12.9044c0 1.8252-1.4801 3.306-3.3066 3.306-1.8264 0-3.3066-1.4808-3.3066-3.306 0-1.8237 1.4802-3.3044 3.3066-3.3044zm-10.1412 5.253c1.0675 0 1.9324-.8645 1.9324-1.9312 0-1.065-.865-1.9295-1.9324-1.9295s-1.9324.8644-1.9324 1.9295c0 1.0667.865 1.9312 1.9324 1.9312zm10.1412-.0033c1.0737 0 1.945-.8707 1.945-1.9453 0-1.073-.8713-1.9436-1.945-1.9436-1.0753 0-1.945.8706-1.945 1.9436 0 1.0746.8697 1.9453 1.945 1.9453z" fill="currentColor"/></svg>';

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /** Tên file của trang hiện tại, ví dụ "bang-gia.html". Mở từ thư mục gốc thì là trang chủ. */
  function currentPage() {
    var file = window.location.pathname.split("/").pop();
    return file && file.indexOf(".html") > -1 ? file : "index.html";
  }

  function pageLinks(cls) {
    var cur = currentPage();
    return PAGES.map(function (p) {
      var active = p.href === cur;
      return '<li><a href="' + p.href + '"' + (active ? ' class="' + cls + '" aria-current="page"' : "") + ">" + esc(p.label) + "</a></li>";
    }).join("");
  }

  function callButton(cls, label) {
    return '<a class="btn btn--sun ' + cls + '" href="tel:' + esc(C.brand.hotlineTel[1]) + '"><span>' + esc(label) + '</span><span class="btn__ic" aria-hidden="true">' + PHONE_ICON + "</span></a>";
  }

  function header() {
    return '<div class="progress" aria-hidden="true"></div>' +
      '<div class="nav-sentinel" id="navSentinel" aria-hidden="true"></div>' +
      '<header class="nav-wrap" id="navWrap"><nav class="nav" aria-label="Điều hướng chính">' +
      '<a class="logo" href="index.html" aria-label="Thiên Phú Travel, về trang chủ">' +
      '<span class="logo__mark" aria-hidden="true">' + LOGO_MARK + '</span>' +
      '<span class="logo__text">Thiên Phú <span>Travel</span></span></a>' +
      '<ul class="nav__links">' + pageLinks("is-active") + "</ul>" +
      callButton("btn--sm nav__call", C.brand.hotline[1]) +
      '<button class="nav__toggle" id="navToggle" aria-expanded="false" aria-controls="navOverlay" aria-label="Mở menu"><span></span><span></span></button>' +
      "</nav></header>" +
      '<div class="overlay" id="navOverlay" hidden><ul class="overlay__links">' + pageLinks("is-active") + "</ul>" +
      '<div class="overlay__contact">' + callButton("btn--lg", "Gọi " + C.brand.hotline[1]) + "<p>Nghe máy 24/7, kể cả lễ Tết</p></div></div>";
  }

  function footer() {
    var b = C.brand;
    var routes = C.routes.map(function (r) {
      return '<li><a href="bang-gia.html#diem-den">Nha Trang đi ' + esc(r.to) + "</a></li>";
    }).join("");
    return '<footer class="foot" id="chan-trang"><div class="wrap foot__grid">' +
      '<div class="foot__brand"><p class="logo__text">Thiên Phú <span>Travel</span></p>' +
      "<p>Xe dịch vụ du lịch Nha Trang, Đà Lạt và dọc miền Trung từ " + b.since + ".</p>" +
      '<a class="foot__fb" href="' + esc(b.facebook) + '" target="_blank" rel="noopener">Fanpage Facebook</a></div>' +
      '<dl class="foot__contact">' +
      '<div><dt>Hotline 24/7</dt><dd><a href="tel:' + esc(b.hotlineTel[1]) + '">' + esc(b.hotline[1]) + '</a><a href="tel:' + esc(b.hotlineTel[0]) + '">' + esc(b.hotline[0]) + "</a></dd></div>" +
      '<div><dt>Zalo</dt><dd><a href="https://zalo.me/' + esc(b.zalo) + '" target="_blank" rel="noopener">' + esc(b.hotline[1]) + "</a></dd></div>" +
      '<div><dt>WhatsApp</dt><dd><a href="https://wa.me/' + esc(b.whatsapp) + '" target="_blank" rel="noopener">+' + esc(b.whatsapp) + "</a></dd></div>" +
      '<div><dt>Email</dt><dd><a href="mailto:' + esc(b.email) + '">' + esc(b.email) + "</a></dd></div></dl>" +
      '<nav class="foot__nav" aria-label="Tuyến đường"><h3>Tuyến đang chạy</h3><ul>' + routes + "</ul></nav>" +
      '<nav class="foot__nav" aria-label="Các trang"><h3>Trang</h3><ul>' + pageLinks("is-here") + "</ul></nav>" +
      '</div><div class="wrap foot__base"><p>© ' + new Date().getFullYear() + " Thiên Phú Travel. Khu vực hoạt động: " + esc(b.area.join(", ")) + ".</p></div></footer>";
  }

  function ring(cls, href, label, icon, extra) {
    return '<a class="ring ' + cls + '" href="' + href + '"' + extra + ' aria-label="' + label + '">' +
      '<span class="ring__wrap"><span class="ring__circle"></span><span class="ring__fill"></span>' +
      '<span class="ring__icon">' + icon + "</span></span>";
  }

  function dock() {
    var b = C.brand, blank = ' target="_blank" rel="noopener"';
    return ring("ring--phone", "tel:" + esc(b.hotlineTel[1]), "Gọi hotline " + esc(b.hotline[1]), ICON_PHONE_RING, "") +
      '<span class="ring__bar">' + esc(b.hotline[1]) + "</span></a>" +
      '<div class="ring-stack">' +
      ring("ring--wa", "https://wa.me/" + esc(b.whatsapp), "Chat WhatsApp", ICON_WA, blank) + "</a>" +
      ring("ring--zalo", "https://zalo.me/" + esc(b.zalo), "Chat Zalo", ICON_ZALO, blank) + "</a></div>";
  }

  function mount(id, html) {
    var host = document.getElementById(id);
    if (!host) { return; }
    host.insertAdjacentHTML("beforebegin", html);
    host.remove();
  }

  mount("siteHeader", header());
  mount("siteFooter", footer());
  mount("siteDock", dock());
})();
