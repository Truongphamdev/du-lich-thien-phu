/* ==========================================================================
   app.js — Thiên Phú Travel. Đọc dữ liệu từ content.js, dựng các khối
   động (xe, điểm đến, bảng giá, giá trị, đánh giá, hỏi đáp) và xử lý
   ô báo giá tức thì + form yêu cầu báo giá.
   ========================================================================== */
(function () {
  "use strict";
  var C = window.TP_CONTENT;
  if (!C) { return; }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /** Định dạng số VND kiểu 1.100.000 ₫ */
  function vnd(n) { return n.toLocaleString("vi-VN") + " ₫"; }

  /** Thoát ký tự HTML trước khi chèn chuỗi vào innerHTML */
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /** Thẻ <img>: ưu tiên ảnh JPG, lỗi thì tự chuyển sang SVG tạm. */
  function photoTag(item, alt, w, h) {
    var fallback = item.img
      ? ' data-fallback="' + esc(item.img) + '" onerror="this.onerror=null;this.src=this.dataset.fallback"'
      : ' onerror="this.remove()"';
    return '<img src="' + esc(item.photo || item.img) + '" alt="' + alt + '" width="' + w + '" height="' + h + '"' + fallback + '>';
  }

  /** Tham số trên URL, ví dụ dat-xe.html?tuyen=nt-dl&xe=7 */
  function urlParam(name) {
    try { return new URLSearchParams(window.location.search).get(name) || ""; } catch (e) { return ""; }
  }

  function findRoute(id) {
    return C.routes.filter(function (r) { return r.id === id; })[0] || C.routes[0];
  }

  var TRIP_LABEL = { "1c": "một chiều", "kh": "khứ hồi trong ngày", "nn": "nhiều ngày, xe ở lại phục vụ" };

  /* ---------------------------------------------------------------- render */
  function renderCars() {
    var host = $("#carGrid"); if (!host) { return; }
    host.innerHTML = C.cars.map(function (c) {
      var hasPrice = C.routes[0].price[c.id] !== undefined;
      var cheapest = hasPrice ? C.routes.reduce(function (m, r) { return r.price[c.id] < m.price[c.id] ? r : m; }, C.routes[0]) : null;
      var from = cheapest
        ? 'Giá từ <b>' + vnd(cheapest.price[c.id]) + '</b> (Nha Trang đi ' + esc(cheapest.to) + ')'
        : 'Giá theo tuyến, <a href="tel:' + esc(C.brand.hotlineTel[1]) + '"><b>gọi để báo giá</b></a>';
      return '<article class="car bezel rv"><div class="core">' +
        photoTag(c, esc(c.name), 480, 220) +
        '<div class="car__body"><h3>' + esc(c.name) + '</h3>' +
        '<div class="car__spec"><div><b>' + c.pax + ' khách</b>tối đa</div><div><b>' + esc(c.bags) + '</b>hành lý</div></div>' +
        '<p>' + esc(c.note) + '</p>' +
        '<p class="car__from">' + from + '</p>' +
        '</div></div></article>';
    }).join("");
  }

  function renderGallery() {
    var host = $("#galleryGrid"); if (!host || !C.gallery) { return; }
    host.innerHTML = C.gallery.map(function (g) {
      return '<figure class="shot bezel rv"><img src="' + esc(g.photo) + '" alt="' + esc(g.caption) + '" width="1200" height="675" loading="lazy">' +
        '<figcaption>' + esc(g.caption) + '</figcaption></figure>';
    }).join("");
    /* Thiếu ảnh nào thì bỏ thẻ đó; hết ảnh thì ẩn cả mục. */
    $$("img", host).forEach(function (img) {
      img.addEventListener("error", function () {
        img.closest("figure").remove();
        if (!host.children.length) { host.closest("section").hidden = true; }
      });
    });
  }

  function renderDests() {
    var host = $("#destGrid"); if (!host) { return; }
    host.innerHTML = C.routes.map(function (r) {
      return '<button type="button" class="dest bezel rv' + (r.featured ? " dest--featured" : "") + '" data-route="' + esc(r.id) + '" aria-label="Xem giá Nha Trang đi ' + esc(r.to) + '"><div class="core">' +
        photoTag(r, "", 400, 280) +
        '<div class="dest__body"><h3>' + esc(r.to) + '</h3>' +
        '<div class="dest__price"><small>Xe 4 chỗ</small><b>' + vnd(r.price[4]) + '</b></div>' +
        '<span class="dest__km">' + esc(r.km) + ', ' + esc(r.hours) + '</span>' +
        '<p class="dest__note">' + esc(r.note) + '</p></div>' +
        '</div></button>';
    }).join("");
    host.addEventListener("click", function (e) {
      var btn = e.target.closest(".dest"); if (!btn) { return; }
      var id = btn.getAttribute("data-route");
      var sel = $("#qRoute"), box = $("#bao-gia");
      if (!sel || !box) { window.location.href = "dat-xe.html?tuyen=" + encodeURIComponent(id); return; }
      sel.value = id;
      updateQuote();
      box.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(function () { sel.focus({ preventScroll: true }); }, 600);
    });
  }

  function renderPrices() {
    var body = $("#priceBody"); if (!body) { return; }
    body.innerHTML = C.routes.map(function (r) {
      return "<tr><td>" + esc(r.to) + "<small>" + esc(r.hours) + "</small></td><td>" + esc(r.km) + "</td>" +
        '<td class="num">' + vnd(r.price[4]) + '</td><td class="num num--7">' + vnd(r.price[7]) + "</td></tr>";
    }).join("");
  }

  function renderValues() {
    var host = $("#valueList"); if (!host) { return; }
    host.innerHTML = C.values.map(function (v) {
      return "<li><b>" + esc(v.title) + "</b><p>" + esc(v.text) + "</p></li>";
    }).join("");
  }

  /** Trang giới thiệu / liên hệ: danh sách lý do, dịch vụ (tiêu đề + mô tả). */
  function renderPlainList(sel, items) {
    var host = $(sel); if (!host || !items) { return; }
    host.innerHTML = items.map(function (it) {
      return "<li><h3>" + esc(it.title) + "</h3><p>" + esc(it.text) + "</p></li>";
    }).join("");
  }

  function renderStories() {
    var host = $("#storyGrid"); if (!host) { return; }
    host.innerHTML = C.quotes.map(function (q) {
      return '<article class="story bezel rv"><div class="core"><blockquote>' + esc(q.text) + "</blockquote>" +
        '<div class="story__who"><span aria-hidden="true">' + esc(q.initial) + "</span><div><b>" + esc(q.name) + "</b><small>" + esc(q.where) + "</small></div></div></div></article>";
    }).join("");
  }

  function renderFaq() {
    var host = $("#faqList"); if (!host) { return; }
    host.innerHTML = C.faq.map(function (f) {
      return '<div class="rv"><dt>' + esc(f.q) + "</dt><dd>" + esc(f.a) + "</dd></div>";
    }).join("");
  }

  function fillSelects() {
    var opts = C.routes.map(function (r) {
      return '<option value="' + esc(r.id) + '">' + esc(r.to) + "</option>";
    }).join("");
    ["#qRoute", "#bRoute"].forEach(function (s) { var el = $(s); if (el) { el.innerHTML = opts; } });
  }

  /* ---------------------------------------------------------------- báo giá tức thì */
  function updateQuote() {
    var sel = $("#qRoute"); if (!sel) { return; }
    var r = findRoute(sel.value);
    var car = ($('input[name="car"]:checked') || {}).value || "4";
    $("#qPrice").textContent = vnd(r.price[car]);
    $("#qMeta").textContent = r.km + ", khoảng " + r.hours.replace("≈ ", "");
    var bRoute = $("#bRoute"); if (bRoute) { bRoute.value = r.id; }
    var bCar = $("#bCar"); if (bCar) { bCar.value = car; }
  }

  function wireQuote() {
    var form = $("#bao-gia"); if (!form) { return; }
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    form.addEventListener("change", updateQuote);
    updateQuote();
  }

  /* ---------------------------------------------------------------- form yêu cầu */
  function setErr(form, name, msg) {
    var p = $('[data-err="' + name + '"]', form);
    var input = $('[name="' + name + '"]', form);
    if (p) { p.textContent = msg || ""; }
    if (input) {
      if (msg) { input.setAttribute("aria-invalid", "true"); } else { input.removeAttribute("aria-invalid"); }
    }
  }

  function validate(form, d) {
    var ok = true;
    setErr(form, "name", d.name.length < 2 ? "Cho Thiên Phú biết tên để tiện xưng hô." : "");
    ok = ok && d.name.length >= 2;
    var phoneOk = /^(\+84|0)(\d[\s.]?){8,10}$/.test(d.phone);
    setErr(form, "phone", phoneOk ? "" : "Số điện thoại chưa đúng, ví dụ 0912 345 678.");
    ok = ok && phoneOk;
    setErr(form, "date", d.date ? "" : "Chọn ngày đi để bên mình xếp xe.");
    ok = ok && !!d.date;
    return ok;
  }

  function composeMessage(d) {
    var r = findRoute(d.route);
    var carName = "xe " + d.car + " chỗ";
    var isListed = d.car !== "16" && d.trip === "1c";
    var price = isListed ? vnd(r.price[d.car]) : "báo giá riêng";
    var dateVi = d.date ? d.date.split("-").reverse().join("/") : "";
    return "Chào Thiên Phú Travel, mình muốn đặt " + carName + " Nha Trang đi " + r.to +
      " (" + TRIP_LABEL[d.trip] + ") ngày " + dateVi + (d.time ? " lúc " + d.time : "") +
      (d.pax ? ", " + d.pax + " khách" : "") + (d.pickup ? ", đón tại " + d.pickup : "") +
      ". Giá trên web: " + price + "." +
      " Tên: " + d.name + ", SĐT: " + d.phone + "." + (d.note ? " Ghi chú: " + d.note : "");
  }

  /** Điền sẵn tuyến và loại xe từ URL (thẻ điểm đến ở trang khác dẫn sang). */
  function prefillFromUrl(form) {
    var route = urlParam("tuyen"), car = urlParam("xe");
    var bRoute = $("#bRoute", form), bCar = $("#bCar", form);
    if (bRoute && route && findRoute(route).id === route) { bRoute.value = route; }
    if (bCar && car && $('option[value="' + car + '"]', bCar)) { bCar.value = car; }
  }

  function wireBookForm() {
    var form = $("#bookForm"); if (!form) { return; }
    var ok = $("#bookOk");
    var dateInput = $("#bDate");
    if (dateInput) { dateInput.min = new Date().toISOString().slice(0, 10); }
    prefillFromUrl(form);

    var via = "zalo";
    $$('button[type="submit"]', form).forEach(function (b) {
      b.addEventListener("click", function () { via = b.getAttribute("data-via") || "zalo"; });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fd = new FormData(form);
      var d = {
        name: String(fd.get("name") || "").trim(),
        phone: String(fd.get("phone") || "").trim(),
        route: String(fd.get("route") || ""),
        car: String(fd.get("car") || "4"),
        trip: TRIP_LABEL[fd.get("trip")] ? String(fd.get("trip")) : "1c",
        date: String(fd.get("date") || ""),
        time: String(fd.get("time") || ""),
        pax: String(fd.get("pax") || "").trim(),
        pickup: String(fd.get("pickup") || "").trim(),
        note: String(fd.get("note") || "").trim()
      };
      if (!validate(form, d)) {
        var bad = $('[aria-invalid="true"]', form); if (bad) { bad.focus(); }
        return;
      }
      var msg = composeMessage(d);
      if (via === "whatsapp") {
        window.open("https://wa.me/" + C.brand.whatsapp + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
        showOk(ok, "Đã mở WhatsApp với tin nhắn soạn sẵn. Bấm gửi là xong.");
        return;
      }
      copyText(msg).then(function (copied) {
        window.open("https://zalo.me/" + C.brand.zalo, "_blank", "noopener");
        showOk(ok, copied
          ? "Đã sao chép nội dung đặt xe. Dán vào khung chat Zalo vừa mở rồi gửi."
          : "Đã mở Zalo. Nhắn giúp: " + msg);
      });
    });
  }

  function copyText(t) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return false; });
    }
    return Promise.resolve(false);
  }

  function showOk(el, text) {
    if (!el) { return; }
    el.textContent = text;
    el.hidden = false;
  }

  /* ---------------------------------------------------------------- nav */
  function wireNav() {
    var toggle = $("#navToggle"), overlay = $("#navOverlay");
    if (!toggle || !overlay) { return; }
    function setOpen(open) {
      if (open) {
        overlay.hidden = false;
        window.requestAnimationFrame(function () { overlay.classList.add("is-open"); });
      } else {
        overlay.classList.remove("is-open");
        window.setTimeout(function () { overlay.hidden = true; }, 500);
      }
      document.body.classList.toggle("is-locked", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    }
    toggle.addEventListener("click", function () { setOpen(toggle.getAttribute("aria-expanded") !== "true"); });
    overlay.addEventListener("click", function (e) { if (e.target.closest("a")) { setOpen(false); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) { setOpen(false); } });
  }

  /* Hiện dần khi cuộn tới. Không có IntersectionObserver thì hiện luôn. */
  function wireReveal() {
    /* Gán chỉ số cho con trong lưới để hiện lần lượt. */
    $$(".cars, .shots, .dests, .stories, .faq, .values, .why, .services, .contacts, #priceBody").forEach(function (grid) {
      Array.prototype.forEach.call(grid.children, function (el, i) {
        el.classList.add("rv"); el.style.setProperty("--i", i);
      });
    });
    var items = $$(".rv");
    if (!("IntersectionObserver" in window)) { items.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: .08 });
    items.forEach(function (el) { io.observe(el); });
    /* Lưới an toàn: sau 6 giây hiện hết, phòng trường hợp observer không bắn. */
    window.setTimeout(function () { items.forEach(function (el) { el.classList.add("in"); }); }, 6000);
  }

  /* ---------------------------------------------------------------- init */
  renderCars();
  renderGallery();
  renderDests();
  renderPrices();
  renderValues();
  renderStories();
  renderFaq();
  renderPlainList("#whyList", C.why);
  renderPlainList("#serviceList", C.services);
  fillSelects();
  wireQuote();
  wireBookForm();
  wireNav();
  wireReveal();
})();
