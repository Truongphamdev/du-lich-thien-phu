/* ==========================================================================
   effects.js — hiệu ứng trình diễn: mở màn hero, số đếm, dải chữ chạy,
   nghiêng 3D theo chuột, nút hút chuột, thanh tiến độ cuộn, giá nhảy số.
   Tôn trọng prefers-reduced-motion: tắt gần hết khi người dùng yêu cầu.
   ========================================================================== */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var C = window.TP_CONTENT || {};

  /* ---- 1. Tách tiêu đề thành từng từ để trồi lên lần lượt ---- */
  function splitWords() {
    var h = $("[data-split]"); if (!h) { return; }
    var words = h.textContent.trim().split(/\s+/);
    h.textContent = "";
    words.forEach(function (w, i) {
      var box = document.createElement("span"); box.className = "w";
      var inner = document.createElement("span"); inner.textContent = w;
      inner.style.transitionDelay = (0.12 + i * 0.045) + "s";
      box.appendChild(inner); h.appendChild(box);
      if (i < words.length - 1) { h.appendChild(document.createTextNode(" ")); }
    });
  }

  function playIntro() {
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        $$(".split, .intro").forEach(function (el) { el.classList.add("in"); });
      });
    });
  }

  /* ---- 2. Số đếm tăng dần ---- */
  function countUp(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var start = null, dur = 1400;
    function step(t) {
      if (start === null) { start = t; }
      var p = Math.min(1, (t - start) / dur);
      var eased = 1 - Math.pow(1 - p, 4);
      el.textContent = String(Math.round(target * eased));
      if (p < 1) { window.requestAnimationFrame(step); }
    }
    window.setTimeout(function () { window.requestAnimationFrame(step); }, 150);
  }

  /* ---- 3. Dải chữ chạy: tên tuyến + giá từ ---- */
  function buildMarquee() {
    var track = $("#marqueeTrack"); if (!track || !C.routes) { return; }
    var items = C.routes.map(function (r) {
      return '<span class="marquee__item">Nha Trang đi ' + r.to + '<small>từ ' + r.price[4].toLocaleString("vi-VN") + ' ₫</small></span>';
    }).join("");
    track.innerHTML = items + items; /* nhân đôi để chạy liền mạch */
  }

  /* ---- 4. Nghiêng 3D + viền sáng theo chuột ---- */
  function wireTilt() {
    if (!finePointer || reduce) { return; }
    $$(".dest, .car, .story, .shot").forEach(function (card) {
      card.classList.add("tilt");
      var core = $(".core", card) || card;
      var raf = null;
      card.addEventListener("pointerenter", function () { card.classList.add("is-live"); });
      card.addEventListener("pointermove", function (e) {
        if (raf) { return; }
        raf = window.requestAnimationFrame(function () {
          raf = null;
          var r = card.getBoundingClientRect();
          var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          var rx = (0.5 - y) * 6, ry = (x - 0.5) * 8;
          card.style.transform = "perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg) translateY(-6px)";
          core.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
          core.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        });
      });
      card.addEventListener("pointerleave", function () {
        card.classList.remove("is-live");
        card.style.transform = "";
      });
    });
  }

  /* ---- 5. Nút hút chuột nhẹ ---- */
  function wireMagnetic() {
    if (!finePointer || reduce) { return; }
    $$(".btn--sun, .btn--line").forEach(function (btn) {
      btn.classList.add("btn--mag");
      btn.addEventListener("pointermove", function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / r.width, dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        btn.style.transform = "translate(" + (dx * 6).toFixed(1) + "px," + (dy * 4 - 2).toFixed(1) + "px)";
      });
      btn.addEventListener("pointerleave", function () { btn.style.transform = ""; });
    });
  }

  /* ---- 6. Nav co lại khi rời đỉnh trang (IntersectionObserver, không nghe scroll) ---- */
  function wireScrollUi() {
    var nav = $("#navWrap"), sentinel = $("#navSentinel");
    if (!nav || !sentinel || !("IntersectionObserver" in window)) { return; }
    new IntersectionObserver(function (en) {
      nav.classList.toggle("is-scrolled", !en[0].isIntersecting);
    }, { rootMargin: "-40px 0px 0px 0px" }).observe(sentinel);
  }

  /* ---- 6a. Thanh vàng dưới nav trượt theo mục đang rê chuột, rời ra thì về trang hiện tại ---- */
  function wireNavBar() {
    var ul = $(".nav__links"); if (!ul) { return; }
    var bar = document.createElement("span"); bar.className = "nav__bar"; bar.setAttribute("aria-hidden", "true");
    ul.appendChild(bar); ul.classList.add("has-bar");
    var PAD = 14; /* trùng padding ngang của link */
    function home() { return $("a.is-active", ul); }
    function moveTo(a) {
      if (!a) { bar.style.opacity = "0"; return; }
      var r = a.getBoundingClientRect(), u = ul.getBoundingClientRect();
      bar.style.width = Math.max(0, r.width - PAD * 2) + "px";
      bar.style.transform = "translateX(" + (r.left - u.left + PAD) + "px)";
      bar.style.opacity = "1";
    }
    ul.addEventListener("mouseover", function (e) { var a = e.target.closest("a"); if (a) { moveTo(a); } });
    ul.addEventListener("focusin", function (e) { var a = e.target.closest("a"); if (a) { moveTo(a); } });
    ul.addEventListener("mouseleave", function () { moveTo(home()); });
    ul.addEventListener("focusout", function () { moveTo(home()); });
    window.addEventListener("resize", function () { moveTo(home()); });
    moveTo(home());
    /* bật chuyển động sau khi đặt vị trí đầu, để lúc tải không thấy thanh chạy từ mép */
    window.requestAnimationFrame(function () { bar.classList.add("is-live"); });
    if (document.fonts && document.fonts.ready) { document.fonts.ready.then(function () { moveTo(home()); }); }
  }

  /* ---- 6b. Scrollspy: gạch dưới trượt theo mục đang xem ---- */
  function wireScrollSpy() {
    var links = $$('.nav__links a[href^="#"]'); if (!links.length || !("IntersectionObserver" in window)) { return; }
    var map = {};
    links.forEach(function (a) { var id = a.getAttribute("href").slice(1); map[id] = a; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) { return; }
        links.forEach(function (a) { a.classList.remove("is-active"); });
        var a = map[en.target.id]; if (a) { a.classList.add("is-active"); }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    Object.keys(map).forEach(function (id) { var sec = document.getElementById(id); if (sec) { io.observe(sec); } });
  }

  /* ---- 8. Tiêu đề mục trồi lên từng từ khi cuộn tới ---- */
  function wireScrollSplit() {
    var heads = $$("[data-split-scroll]"); if (!heads.length) { return; }
    heads.forEach(function (h) {
      var words = h.textContent.trim().split(/\s+/); h.textContent = ""; h.classList.add("split");
      words.forEach(function (w, i) {
        var box = document.createElement("span"); box.className = "w";
        var inner = document.createElement("span"); inner.textContent = w;
        inner.style.transitionDelay = (i * 0.05) + "s";
        box.appendChild(inner); h.appendChild(box);
        if (i < words.length - 1) { h.appendChild(document.createTextNode(" ")); }
      });
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: .4 });
    heads.forEach(function (h) { io.observe(h); });
  }

  /* ---- 9. Banner hero nghiêng nhẹ theo chuột ---- */
  function wireMouseParallax() {
    if (!finePointer || reduce) { return; }
    var box = $("[data-mouse-parallax]"); if (!box) { return; }
    var img = $("img", box); var raf = null;
    box.addEventListener("pointermove", function (e) {
      if (raf) { return; }
      raf = window.requestAnimationFrame(function () {
        raf = null;
        var r = box.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        box.style.transform = "perspective(1400px) rotateX(" + (-y * 3).toFixed(2) + "deg) rotateY(" + (x * 4).toFixed(2) + "deg)";
        if (img) { img.style.translate = (x * -8).toFixed(1) + "px " + (y * -6).toFixed(1) + "px"; }
      });
    });
    box.addEventListener("pointerleave", function () { box.style.transform = ""; if (img) { img.style.translate = ""; } });
  }

  /* ---- 10. Gợn sóng từ điểm bấm trên nút ---- */
  function wireRipple() {
    if (reduce) { return; }
    document.addEventListener("pointerdown", function (e) {
      var btn = e.target.closest(".btn, .dest"); if (!btn) { return; }
      var r = btn.getBoundingClientRect();
      var rip = document.createElement("span"); rip.className = "ripple";
      var size = Math.max(r.width, r.height) * 2;
      rip.style.width = rip.style.height = size + "px";
      rip.style.left = (e.clientX - r.left - size / 2) + "px";
      rip.style.top = (e.clientY - r.top - size / 2) + "px";
      btn.appendChild(rip);
      rip.addEventListener("animationend", function () { rip.remove(); });
    });
  }

  /* ---- 11. Số đếm chỉ chạy khi cuộn tới ---- */
  function wireCounters() {
    var els = $$("[data-count]"); if (!els.length) { return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { countUp(en.target); io.unobserve(en.target); } });
    }, { threshold: .6 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- 7. Giá nhảy số khi đổi tuyến / loại xe ---- */
  function wirePriceTick() {
    var price = $("#qPrice"); if (!price || reduce) { return; }
    var mo = new MutationObserver(function () {
      price.classList.remove("tick");
      void price.offsetWidth;
      price.classList.add("tick");
    });
    mo.observe(price, { childList: true, characterData: true, subtree: true });
  }

  /* ---- 12. Tuyết và lấp lánh vàng rơi nhẹ toàn trang ---- */
  function wireSnow() {
    var cv = $("#snow"); if (!cv || reduce) { if (cv) { cv.remove(); } return; }
    var ctx = cv.getContext("2d"), flakes = [], W = 0, H = 0, running = true, dpr = Math.min(2, window.devicePixelRatio || 1);
    var isSmall = window.matchMedia("(max-width: 640px)").matches;
    var COUNT = isSmall ? 36 : 80;
    function resize() {
      W = window.innerWidth; H = window.innerHeight;
      cv.width = W * dpr; cv.height = H * dpr; cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function spawn(f, top) {
      f.x = Math.random() * W; f.y = top ? -10 : Math.random() * H;
      f.r = 1.1 + Math.random() * 2.1;
      f.vy = 0.35 + Math.random() * 0.8; f.vx = (Math.random() - .5) * .4;
      f.gold = Math.random() < .4;             /* 40% là hạt vàng lấp lánh, còn lại là tuyết trắng */
      f.phase = Math.random() * Math.PI * 2; f.tw = 0.02 + Math.random() * 0.04;
      f.a = 0.7 + Math.random() * 0.3;
      f.rot = Math.random() * Math.PI;
      return f;
    }
    function draw(t) {
      if (!running) { return; }
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < flakes.length; i++) {
        var f = flakes[i];
        f.phase += f.tw; f.x += f.vx + Math.sin(f.phase) * .3; f.y += f.vy;
        if (f.y > H + 10 || f.x < -10 || f.x > W + 10) { spawn(f, true); }
        var tw = f.gold ? (0.55 + 0.45 * Math.sin(f.phase * 3)) : 1;
        ctx.globalAlpha = f.a * tw;
        if (f.gold) {
          /* hạt vàng hình sao 4 cánh, xoay chậm */
          ctx.fillStyle = "#FFC94D"; ctx.shadowBlur = 14; ctx.shadowColor = "rgba(255,190,60,1)";
          f.rot += 0.01;
          var R = f.r * 1.9, r2 = f.r * 0.5;
          ctx.save(); ctx.translate(f.x, f.y); ctx.rotate(f.rot); ctx.beginPath();
          for (var k = 0; k < 8; k++) { var rr = k % 2 ? r2 : R, an = k * Math.PI / 4; ctx.lineTo(Math.cos(an) * rr, Math.sin(an) * rr); }
          ctx.closePath(); ctx.fill(); ctx.restore();
        } else {
          /* tuyết: lõi trắng đục, viền sáng */
          ctx.fillStyle = "#FFFFFF"; ctx.shadowBlur = 10; ctx.shadowColor = "rgba(160,220,240,1)";
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0; ctx.globalAlpha = f.a * 0.5; ctx.strokeStyle = "rgba(14,143,168,.55)"; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r + 1, 0, Math.PI * 2); ctx.stroke();
        }
      }
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
      window.requestAnimationFrame(draw);
    }
    resize();
    for (var i = 0; i < COUNT; i++) { flakes.push(spawn({}, false)); }
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", function () {
      var was = running; running = !document.hidden;
      if (running && !was) { window.requestAnimationFrame(draw); }
    });
    window.requestAnimationFrame(draw);
  }

  /* ---- init ---- */
  buildMarquee();
  wireScrollUi();
  wireNavBar();
  wireScrollSpy();
  wirePriceTick();
  if (reduce) {
    var snow = $("#snow"); if (snow) { snow.remove(); }
    $$(".split, .intro").forEach(function (el) { el.classList.add("in"); });
    $$("[data-count]").forEach(function (el) { el.textContent = el.getAttribute("data-count"); });
    document.body.classList.add("is-ready");
    return;
  }
  splitWords();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(playIntro, playIntro);
  } else { playIntro(); }
  wireCounters();
  wireScrollSplit();
  wireMouseParallax();
  wireRipple();
  wireTilt();
  wireMagnetic();
  wireSnow();
  document.body.classList.add("is-ready");
})();
