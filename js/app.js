/* ==========================================================================
   app.js — Dựng nội dung từ content.js, xử lý form đặt xe và animation.
   Không cần sửa file này khi chỉ muốn đổi nội dung.
   ========================================================================== */
(function () {
  "use strict";

  var C = window.XDV_CONTENT || {};
  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* Định dạng 3300000 → "3.300.000₫" */
  function vnd(n) {
    return Number(n).toLocaleString("vi-VN") + "₫";
  }

  /* Định dạng 3300000 → "3,3 triệu" (dùng cho phần tóm tắt nhanh) */
  function trieu(n) {
    var t = n / 1000000;
    return (Math.round(t * 10) / 10).toLocaleString("vi-VN") + " triệu";
  }

  /* Chống chèn HTML từ dữ liệu */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* =====================================================================
     1. TUYẾN NGẮN Ở HERO
     ===================================================================== */
  function renderHeroRoutes() {
    var host = $("#heroRoutes");
    if (!host || !C.routes) return;
    host.innerHTML = "";
    C.routes.forEach(function (r) {
      host.appendChild(el(
        '<li>' +
          '<span class="route-list__path">' + esc(r.from) + ' <i aria-hidden="true">→</i> ' + esc(r.to) + '</span>' +
          '<span class="route-list__price">từ ' + esc(trieu(r.price[4])) + '</span>' +
        '</li>'
      ));
    });
  }

  /* =====================================================================
     2. GRID TUYẾN ĐƯỜNG
     ===================================================================== */
  function renderRouteGrid() {
    var host = $("#routeGrid");
    if (!host || !C.routes) return;
    host.innerHTML = "";

    var list = C.routes.slice().sort(function (a, b) {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

    list.forEach(function (r) {
      var times = r.depart.map(function (t) {
        return '<span class="time">' + esc(t) + '</span>';
      }).join("");

      var card = el(
        '<article class="route rv">' +
          '<div class="shell"><div class="core">' +
            '<header class="route__head">' +
              '<h3>' + esc(r.from) + ' <i aria-hidden="true">→</i> ' + esc(r.to) + '</h3>' +
              (r.featured ? '<span class="route__flag">Khách đi nhiều</span>' : '') +
            '</header>' +
            '<p class="route__note">' + esc(r.note) + '</p>' +
            '<dl class="route__specs">' +
              '<div><dt>Quãng đường</dt><dd>' + esc(r.km) + ' km</dd></div>' +
              '<div><dt>Thời gian</dt><dd>' + esc(r.duration) + '</dd></div>' +
              '<div><dt>Khởi hành</dt><dd class="times">' + times + '</dd></div>' +
            '</dl>' +
            '<footer class="route__foot">' +
              '<span class="route__from"><small>Giá từ</small><b>' + esc(vnd(r.price[4])) + '</b></span>' +
              '<button class="btn btn--sm" type="button" data-book="' + esc(r.id) + '">' +
                '<span>Đặt tuyến này</span>' +
                '<span class="btn__ic" aria-hidden="true">' +
                  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12 12 4M6 4h6v6"/></svg>' +
                '</span>' +
              '</button>' +
            '</footer>' +
          '</div></div>' +
        '</article>'
      );
      host.appendChild(card);
    });
  }

  /* =====================================================================
     3. BẢNG GIÁ
     ===================================================================== */
  function renderPriceTable() {
    var host = $("#priceBody");
    if (!host || !C.routes) return;
    host.innerHTML = "";
    C.routes.forEach(function (r) {
      var tr = el(
        '<tr>' +
          '<th scope="row">' +
            '<span class="price__route">' + esc(r.from) + ' → ' + esc(r.to) + '</span>' +
            '<span class="price__meta">' + esc(r.km) + ' km · ' + esc(r.duration) + '</span>' +
          '</th>' +
          '<td data-car="4">' + esc(vnd(r.price[4])) + '</td>' +
          '<td data-car="7">' + esc(vnd(r.price[7])) + '</td>' +
          '<td data-car="16">' + esc(vnd(r.price[16])) + '</td>' +
        '</tr>'
      );
      host.appendChild(tr);
    });
  }

  /* =====================================================================
     4. ĐÁNH GIÁ
     ===================================================================== */
  function renderQuotes() {
    var host = $("#quoteGrid");
    if (!host || !C.quotes) return;
    host.innerHTML = "";
    C.quotes.forEach(function (q) {
      host.appendChild(el(
        '<figure class="quote rv">' +
          '<div class="shell"><div class="core">' +
            '<span class="quote__mark" aria-hidden="true">&#8220;</span>' +
            '<blockquote>' + esc(q.text) + '</blockquote>' +
            '<figcaption>' +
              '<span class="quote__av" aria-hidden="true">' + esc(q.initial) + '</span>' +
              '<span class="quote__who"><b>' + esc(q.name) + '</b><i>' + esc(q.where) + '</i></span>' +
            '</figcaption>' +
          '</div></div>' +
        '</figure>'
      ));
    });
  }

  /* =====================================================================
     5. CÁC BƯỚC
     ===================================================================== */
  function renderSteps() {
    var host = $("#stepGrid");
    if (!host || !C.steps) return;
    host.innerHTML = "";
    C.steps.forEach(function (s, i) {
      host.appendChild(el(
        '<li class="step rv">' +
          '<span class="step__n" aria-hidden="true">' + (i + 1) + '</span>' +
          '<h3>' + esc(s.title) + '</h3>' +
          '<p>' + esc(s.text) + '</p>' +
        '</li>'
      ));
    });
  }

  /* =====================================================================
     6. HỎI ĐÁP
     ===================================================================== */
  function renderFaq() {
    var host = $("#faqList");
    if (!host || !C.faq) return;
    host.innerHTML = "";
    C.faq.forEach(function (f, i) {
      var id = "faq-p-" + i;
      var item = el(
        '<div class="faq__item">' +
          '<h3>' +
            '<button class="faq__q" type="button" aria-expanded="false" aria-controls="' + id + '">' +
              '<span>' + esc(f.q) + '</span>' +
              '<span class="faq__ic" aria-hidden="true">' +
                '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M8 3v10M3 8h10"/></svg>' +
              '</span>' +
            '</button>' +
          '</h3>' +
          '<div class="faq__a" id="' + id + '" hidden><p>' + esc(f.a) + '</p></div>' +
        '</div>'
      );
      host.appendChild(item);
    });

    host.addEventListener("click", function (e) {
      var btn = e.target.closest(".faq__q");
      if (!btn) return;
      var panel = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";

      /* Đóng các mục khác cho gọn */
      $$(".faq__q", host).forEach(function (b) {
        if (b === btn) return;
        b.setAttribute("aria-expanded", "false");
        var p = document.getElementById(b.getAttribute("aria-controls"));
        if (p) { p.hidden = true; }
        var it = b.closest(".faq__item");
        if (it) it.classList.remove("is-open");
      });

      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (panel) panel.hidden = open;
      var item = btn.closest(".faq__item");
      if (item) item.classList.toggle("is-open", !open);
    });
  }

  /* =====================================================================
     7. FORM ĐẶT XE
     ===================================================================== */
  var form, okBox, estBox, routeSel;

  function fillRouteSelect() {
    routeSel = $("#fRoute");
    if (!routeSel || !C.routes) return;
    C.routes.forEach(function (r) {
      var o = document.createElement("option");
      o.value = r.id;
      o.textContent = r.from + " → " + r.to + " (" + r.km + " km)";
      routeSel.appendChild(o);
    });
  }

  function findRoute(id) {
    if (!C.routes) return null;
    for (var i = 0; i < C.routes.length; i++) {
      if (C.routes[i].id === id) return C.routes[i];
    }
    return null;
  }

  /* Cập nhật dòng "giá dự kiến" mỗi khi đổi tuyến / loại xe */
  function updateEstimate() {
    if (!estBox) return;
    var r = findRoute(routeSel && routeSel.value);
    var car = $("#fCar") && $("#fCar").value;
    if (!r || !car) {
      estBox.textContent = "Chọn tuyến và loại xe để xem giá dự kiến.";
      estBox.classList.remove("is-ready");
      return;
    }
    var p = r.price[car];
    estBox.innerHTML =
      'Giá dự kiến: <b>' + esc(vnd(p)) + '</b> cho xe ' + esc(car) +
      ' chỗ, trọn tuyến ' + esc(r.from) + ' → ' + esc(r.to) + '.';
    estBox.classList.add("is-ready");
  }

  function setErr(name, msg) {
    var p = $('[data-err="' + name + '"]');
    var input = $('[name="' + name + '"]');
    if (p) p.textContent = msg || "";
    if (input) {
      if (msg) {
        input.setAttribute("aria-invalid", "true");
        /* Chỉ gắn liên kết tới ô lỗi khi thực sự có lỗi, để trình đọc
           màn hình đọc được nội dung lỗi ngay sau nhãn của ô nhập. */
        if (p && p.id) input.setAttribute("aria-describedby", p.id);
      } else {
        input.removeAttribute("aria-invalid");
        input.removeAttribute("aria-describedby");
      }
    }
    return !msg;
  }

  function validate(data) {
    var ok = true;

    if (!data.name || data.name.trim().length < 2) {
      ok = setErr("name", "Vui lòng nhập tên của bạn.") && ok;
    } else { setErr("name", ""); }

    var digits = (data.phone || "").replace(/[\s.\-()]/g, "");
    if (!/^(\+?84|0)\d{9,10}$/.test(digits)) {
      ok = setErr("phone", "Số điện thoại chưa đúng. Ví dụ: 0912 345 678.") && ok;
    } else { setErr("phone", ""); }

    if (!data.route || !findRoute(data.route)) {
      ok = setErr("route", "Vui lòng chọn tuyến đi.") && ok;
    } else { setErr("route", ""); }

    if (!data.car) {
      ok = setErr("car", "Vui lòng chọn loại xe.") && ok;
    } else { setErr("car", ""); }

    if (!data.date) {
      ok = setErr("date", "Vui lòng chọn ngày đi.") && ok;
    } else {
      var today = new Date(); today.setHours(0, 0, 0, 0);
      var picked = new Date(data.date + "T00:00:00");
      if (isNaN(picked.getTime()) || picked < today) {
        ok = setErr("date", "Ngày đi không thể nằm trong quá khứ.") && ok;
      } else { setErr("date", ""); }
    }

    return ok;
  }

  function summarize(data) {
    var r = findRoute(data.route);
    if (!r) return "";
    var parts = [
      r.from + " → " + r.to,
      "xe " + data.car + " chỗ",
      data.date + (data.time ? " lúc " + data.time : ""),
      vnd(r.price[data.car])
    ];
    return parts.join(" · ");
  }

  function handleSubmit(e) {
    e.preventDefault();
    var data = Object.fromEntries(new FormData(form).entries());
    if (!validate(data)) {
      var bad = $('[aria-invalid="true"]', form);
      if (bad) bad.focus();
      return;
    }

    var btn = $("#bookSubmit");
    var label = $(".btn__label", btn);
    var original = label.textContent;
    btn.disabled = true;
    label.textContent = "Đang gửi…";

    /* -----------------------------------------------------------------
       DEMO: không gửi đi đâu cả, chỉ hiện xác nhận sau 700ms.
       Nối vào API thật tại đây. Ví dụ:

       fetch("/api/dat-xe", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data)
       })
       .then(function (res) {
         if (!res.ok) throw new Error("HTTP " + res.status);
         return res.json();
       })
       .then(showOk)
       .catch(function () {
         label.textContent = original;
         btn.disabled = false;
         alert("Chưa gửi được, bạn thử lại hoặc gọi hotline 0900 000 000 nhé.");
       });
       ----------------------------------------------------------------- */
    window.setTimeout(function () {
      btn.disabled = false;
      label.textContent = original;
      showOk(data);
    }, 700);
  }

  function showOk(data) {
    var summary = summarize(data);
    $("#okText").innerHTML =
      "Chuyến bạn vừa gửi: <b>" + esc(summary) + "</b>.<br>" +
      "Chúng tôi sẽ gọi số <b>" + esc(data.phone) + "</b> để xác nhận.";
    form.hidden = true;
    okBox.hidden = false;
    /* Chuyển tiêu điểm vào khối xác nhận: vừa cuộn tới, vừa để trình đọc
       màn hình đọc nội dung thay vì mất tiêu điểm ở nút gửi đã bị ẩn. */
    okBox.focus({ preventScroll: true });
    okBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function resetForm() {
    form.reset();
    $$(".field__err", form).forEach(function (p) { p.textContent = ""; });
    $$('[aria-invalid]', form).forEach(function (i) { i.removeAttribute("aria-invalid"); });
    $$('[aria-describedby]', form).forEach(function (i) { i.removeAttribute("aria-describedby"); });
    okBox.removeAttribute("tabindex");
    okBox.hidden = true;
    form.hidden = false;
    updateEstimate();
    var f = $("#fName"); if (f) f.focus();
  }

  /* Nút "Đặt tuyến này" trên card → cuộn tới form và điền sẵn */
  function wireRouteButtons() {
    document.addEventListener("click", function (e) {
      var b = e.target.closest("[data-book]");
      if (!b) return;
      e.preventDefault();
      var id = b.getAttribute("data-book");
      if (routeSel) {
        routeSel.value = id;
        updateEstimate();
      }
      var target = $("#dat-xe");
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(function () {
        var f = $("#fName");
        if (f) f.focus({ preventScroll: true });
      }, 500);
    });
  }

  /* Ngày tối thiểu = hôm nay (không cho chọn ngày quá khứ trên lịch) */
  function setDateFloor() {
    var d = $("#fDate");
    if (!d) return;
    var t = new Date();
    var iso = t.getFullYear() + "-" +
      String(t.getMonth() + 1).padStart(2, "0") + "-" +
      String(t.getDate()).padStart(2, "0");
    d.min = iso;
  }

  function initForm() {
    form = $("#bookForm");
    if (!form) return;
    okBox  = $("#bookOk");
    estBox = $("#bookEst");

    fillRouteSelect();
    setDateFloor();

    form.addEventListener("submit", handleSubmit);
    form.addEventListener("change", function (e) {
      if (e.target.name === "route" || e.target.name === "car") updateEstimate();
    });
    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") {
        setErr(e.target.name, "");
      }
    });

    var again = $("#okAgain");
    if (again) again.addEventListener("click", resetForm);

    wireRouteButtons();
    updateEstimate();
  }

  /* =====================================================================
     8. NAV: cuộn, menu mobile, thank-you khi bấm gọi
     ===================================================================== */
  function initNav() {
    var shell = $("#navShell");
    var toggle = $("#navToggle");
    var menu = $("#navMenu");

    /* Nav nổi đổi nền khi đã cuộn */
    var last = -1;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      var on = y > 24;
      if (on !== last) { shell.classList.toggle("is-stuck", on); last = on; }
    }, { passive: true });

    if (!toggle || !menu) return;

    function closeMenu() {
      toggle.setAttribute("aria-expanded", "false");
      shell.classList.remove("is-open");
      document.body.classList.remove("nav-lock");
    }

    /* Đưa tiêu điểm tới link đầu tiên trong menu để bàn phím/trình đọc màn hình
       không đi lạc ra sau lớp phủ. */
    function focusFirstLink() {
      var first = $("a", menu);
      if (first) first.focus();
    }

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
      shell.classList.toggle("is-open", !open);
      document.body.classList.toggle("nav-lock", !open);
      toggle.setAttribute("aria-label", open ? "Mở menu" : "Đóng menu");
      if (open) {
        /* Đóng bằng chính nút: trả tiêu điểm về nút. */
        toggle.focus();
      } else {
        focusFirstLink();
      }
    });

    /* Bấm vào link trong menu thì đóng menu */
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    /* Giữ tiêu điểm bên trong menu khi đang mở (bẫy Tab đơn giản). */
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !shell.classList.contains("is-open")) return;
      var items = $$("a", menu).filter(function (a) { return a.offsetParent !== null; });
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && shell.classList.contains("is-open")) {
        closeMenu();
        toggle.focus();
      }
    });

    window.matchMedia("(min-width: 861px)").addEventListener("change", function (e) {
      if (e.matches) closeMenu();
    });
  }

  /* =====================================================================
     9. ANIMATION KHI CUỘN TỚI
     ===================================================================== */
  function initReveal() {
    var nodes = $$(".rv");
    if (!nodes.length) return;

    if (!("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.documentElement.classList.add("no-reveal");
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en, i) {
        if (!en.isIntersecting) return;
        var n = en.target;
        var d = Math.min(i, 4) * 70;
        window.setTimeout(function () { n.classList.add("in"); }, d);
        io.unobserve(n);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    nodes.forEach(function (n) { io.observe(n); });
  }

  function initYear() {
    var y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  }

  /* =====================================================================
     Khởi động
     ===================================================================== */
  function boot() {
    document.documentElement.classList.add("js");
    renderHeroRoutes();
    renderRouteGrid();
    renderPriceTable();
    renderQuotes();
    renderSteps();
    renderFaq();
    initForm();
    initNav();
    initReveal();
    initYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
