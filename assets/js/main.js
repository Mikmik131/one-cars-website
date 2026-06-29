/* ============================================================
   RM Luxury — Logique site (vanilla JS, zéro framework)
   i18n · preloader · nav · reveals · compteurs · cartes · modale · configurateur
   ============================================================ */
(function () {
  "use strict";

  var SUPPORTED = ["fr", "en", "es"];
  var WA_NUMBER = "33663234117";
  var state = { lang: "fr", chauffeur: false, vehicle: "" };

  /* ---------- i18n helpers ---------- */
  function detectLang() {
    var saved = null;
    try { saved = localStorage.getItem("rm_lang"); } catch (e) {}
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "fr").slice(0, 2).toLowerCase();
    return SUPPORTED.indexOf(nav) !== -1 ? nav : "fr";
  }
  function t(key) {
    var d = I18N[state.lang];
    return (d && d[key] != null) ? d[key] : (I18N.fr[key] != null ? I18N.fr[key] : key);
  }
  function veh(slug) {
    var d = I18N[state.lang].vehicles[slug] || I18N.fr.vehicles[slug];
    return d;
  }

  function applyStatic() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    // <head>
    document.documentElement.lang = state.lang;
    document.title = t("meta.title");
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", t("meta.desc"));
    var ogt = document.querySelector('meta[property="og:title"]');
    if (ogt) ogt.setAttribute("content", t("meta.title"));
    var ogd = document.querySelector('meta[property="og:description"]');
    if (ogd) ogd.setAttribute("content", t("meta.desc"));
  }

  function setLang(lang, render) {
    if (SUPPORTED.indexOf(lang) === -1) lang = "fr";
    state.lang = lang;
    try { localStorage.setItem("rm_lang", lang); } catch (e) {}
    document.querySelectorAll(".lang button[data-lang]").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === lang);
    });
    applyStatic();
    if (render) {
      renderCatalogue();
      buildVehicleSelect();
      refreshRecap();
    }
  }

  /* ---------- Preloader ---------- */
  function initPreloader() {
    var pre = document.getElementById("preloader");
    if (!pre) return;
    function done() { pre.classList.add("is-done"); }
    if (document.readyState === "complete") setTimeout(done, 700);
    else window.addEventListener("load", function () { setTimeout(done, 600); });
    // garde-fou : si load tarde, on découvre quand même
    setTimeout(done, 3500);
  }

  /* ---------- Nav ---------- */
  function initNav() {
    var nav = document.querySelector(".nav");
    var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 40); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var burger = document.querySelector(".nav__burger");
    var mobile = document.querySelector(".nav__mobile");
    if (burger && mobile) {
      var toggle = function () {
        var open = mobile.classList.toggle("is-open");
        nav.classList.toggle("is-burger-open", open);
        burger.setAttribute("aria-expanded", open ? "true" : "false");
      };
      burger.addEventListener("click", toggle);
      mobile.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobile.classList.remove("is-open");
          nav.classList.remove("is-burger-open");
        });
      });
    }
  }

  /* ---------- Reveals ---------- */
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (e) { e.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Compteurs ---------- */
  function initCounters() {
    var nums = document.querySelectorAll("[data-count]");
    if (!("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        animate(en.target); io.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (n) { io.observe(n); });

    function animate(el) {
      var target = parseInt(el.getAttribute("data-count"), 10);
      var suffix = el.getAttribute("data-suffix") || "";
      var reduce = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
      if (reduce) { el.textContent = target + suffix; return; }
      var start = null, dur = 1300;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }
  }

  /* ---------- Catalogue (cartes) ---------- */
  function rangeVehicles(key) {
    return VEHICLES.filter(function (v) { return v.range === key; });
  }
  function renderCatalogue() {
    var root = document.getElementById("catalogue");
    if (!root) return;
    var html = "";
    RANGES.forEach(function (r) {
      var list = rangeVehicles(r.key);
      if (!list.length) return;
      html += '<div class="range">';
      html += '<div class="range__label reveal"><span class="eyebrow">' + t(r.i18n) + '</span></div>';
      html += '<div class="grid">';
      list.forEach(function (v, i) {
        var d = veh(v.slug);
        var pts = d.points.map(function (p) { return escapeHtml(p); }).join('<span class="dot">·</span>');
        var img = '<div class="media-ph" data-ph="' + escapeHtml(v.name) + '"></div>';
        // Si l'image WebP existe, on l'utilisera (remplacée à l'intégration Higgsfield)
        html +=
          '<article class="card reveal" data-d="' + (i % 3) + '" data-slug="' + v.slug + '" tabindex="0" role="button" aria-label="' + escapeHtml(v.name) + '">' +
            '<div class="card__media">' + img + '</div>' +
            '<div class="card__body">' +
              '<span class="card__range">' + escapeHtml(t(r.i18n)) + '</span>' +
              '<h3 class="card__name">' + escapeHtml(v.name) + '</h3>' +
              '<p class="card__points">' + pts + '</p>' +
              '<p class="card__why"><b>' + escapeHtml(t("card.why")) + '</b> — ' + escapeHtml(d.why) + '</p>' +
              '<div class="card__foot"><button class="btn btn--ghost card__cta" data-slug="' + v.slug + '">' + escapeHtml(t("cta")) + '</button></div>' +
            '</div>' +
          '</article>';
      });
      html += '</div></div>';
    });
    root.innerHTML = html;
    // re-observe reveals nouvellement créés
    root.querySelectorAll(".reveal").forEach(function (e) {
      if ("IntersectionObserver" in window) revealObserver.observe(e);
      else e.classList.add("is-in");
    });
    // events cartes
    root.querySelectorAll(".card").forEach(function (card) {
      var slug = card.getAttribute("data-slug");
      card.addEventListener("click", function (e) {
        if (e.target.closest(".card__cta")) return; // le bouton gère lui-même
        openModal(slug);
      });
      card.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openModal(slug); }
      });
    });
    root.querySelectorAll(".card__cta").forEach(function (b) {
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        prefillAndGo(b.getAttribute("data-slug"));
      });
    });
  }

  /* ---------- Modale ---------- */
  var modal, lastFocus;
  function buildModalShell() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML =
      '<div class="modal__box" role="document">' +
        '<button class="modal__close" aria-label="' + escapeHtml(t("modal.close")) + '">&times;</button>' +
        '<div class="modal__media" id="mMedia"></div>' +
        '<div class="modal__body">' +
          '<span class="modal__range" id="mRange"></span>' +
          '<h2 class="modal__name" id="mName"></h2>' +
          '<p class="modal__desc" id="mDesc"></p>' +
          '<div><p class="modal__sub" id="mPtsLabel"></p><ul class="modal__points" id="mPoints"></ul></div>' +
          '<p class="modal__why" id="mWhy"></p>' +
          '<div><p class="modal__sub" id="mDurLabel"></p><p class="modal__dur" id="mDur"></p></div>' +
          '<button class="btn btn--solid btn--block" id="mCta"></button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    modal.querySelector(".modal__close").addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) {
      if (!modal.classList.contains("is-open")) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") trapFocus(e);
    });
  }
  function openModal(slug) {
    var v = VEHICLES.find(function (x) { return x.slug === slug; });
    if (!v) return;
    var d = veh(slug);
    var rangeI18n = (RANGES.find(function (r) { return r.key === v.range; }) || {}).i18n;
    lastFocus = document.activeElement;
    modal.querySelector("#mMedia").innerHTML = '<div class="media-ph" data-ph="' + escapeHtml(v.name) + '"></div>';
    modal.querySelector("#mRange").textContent = t(rangeI18n);
    modal.querySelector("#mName").textContent = v.name;
    modal.querySelector("#mDesc").textContent = d.desc;
    modal.querySelector("#mPtsLabel").textContent = t("modal.points");
    modal.querySelector("#mPoints").innerHTML = d.points.map(function (p) {
      return "<li>" + escapeHtml(p) + "</li>";
    }).join("");
    var why = modal.querySelector("#mWhy");
    why.innerHTML = "<b>" + escapeHtml(t("card.why")) + "</b> — " + escapeHtml(d.why);
    modal.querySelector("#mDurLabel").textContent = t("modal.duration");
    modal.querySelector("#mDur").textContent = t(RANGE_DURATION[v.range]);
    var cta = modal.querySelector("#mCta");
    cta.textContent = t("cta.vehicle");
    cta.onclick = function () { closeModal(); prefillAndGo(slug); };
    modal.classList.add("is-open");
    document.body.classList.add("no-scroll");
    modal.querySelector(".modal__close").focus();
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function trapFocus(e) {
    var f = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  /* ---------- Configurateur ---------- */
  function buildVehicleSelect() {
    var sel = document.getElementById("cfgVehicle");
    if (!sel) return;
    var current = sel.value;
    var html = '<option value="" disabled' + (current ? "" : " selected") + '>' + escapeHtml(t("cfg.vehicle.placeholder")) + "</option>";
    RANGES.forEach(function (r) {
      var list = rangeVehicles(r.key);
      if (!list.length) return;
      html += '<optgroup label="' + escapeHtml(t(r.i18n)) + '">';
      list.forEach(function (v) {
        html += '<option value="' + escapeHtml(v.name) + '"' + (v.name === current ? " selected" : "") + ">" + escapeHtml(v.name) + "</option>";
      });
      html += "</optgroup>";
    });
    sel.innerHTML = html;
  }

  function initConfigurator() {
    var panels = document.querySelectorAll(".cfg__panel");
    var steps = document.querySelectorAll(".cfg__steps li");
    var sel = document.getElementById("cfgVehicle");
    var err = document.getElementById("cfgErr");
    var err2 = document.getElementById("cfgErr2");
    var startI = document.getElementById("cfgStart");
    var endI = document.getElementById("cfgEnd");

    function show(step) {
      panels.forEach(function (p) { p.classList.toggle("is-active", p.getAttribute("data-step") === String(step)); });
      steps.forEach(function (s) { s.classList.toggle("is-active", s.getAttribute("data-step") === String(step)); });
    }

    document.querySelectorAll("[data-next]").forEach(function (b) {
      b.addEventListener("click", function () {
        var step = parseInt(b.getAttribute("data-next"), 10);
        if (step === 2) { // quitter étape 1 → véhicule requis
          if (!sel.value) { err.textContent = t("cfg.err.vehicle"); return; }
          err.textContent = "";
        }
        if (step === 3) { // quitter étape 2 → dates cohérentes si renseignées
          if (startI.value && endI.value && endI.value < startI.value) {
            err2.textContent = t("cfg.err.dates"); return;
          }
          err2.textContent = "";
          refreshRecap();
        }
        show(step);
      });
    });
    document.querySelectorAll("[data-back]").forEach(function (b) {
      b.addEventListener("click", function () { show(parseInt(b.getAttribute("data-back"), 10)); });
    });

    // toggle chauffeur
    document.querySelectorAll(".toggle button").forEach(function (b) {
      b.addEventListener("click", function () {
        document.querySelectorAll(".toggle button").forEach(function (x) { x.classList.remove("is-active"); });
        b.classList.add("is-active");
        state.chauffeur = b.getAttribute("data-chf") === "1";
      });
    });

    sel.addEventListener("change", function () { state.vehicle = sel.value; err.textContent = ""; });

    // envoi WhatsApp
    var send = document.getElementById("cfgSend");
    if (send) send.addEventListener("click", function () {
      if (!sel.value) { show(1); err.textContent = t("cfg.err.vehicle"); return; }
      window.open(buildWa(), "_blank", "noopener");
    });
  }

  function refreshRecap() {
    var sel = document.getElementById("cfgVehicle");
    if (!sel) return;
    var start = document.getElementById("cfgStart").value;
    var end = document.getElementById("cfgEnd").value;
    var dur = document.getElementById("cfgDuration").value;
    var note = document.getElementById("cfgNote").value;
    set("rcVehicle", sel.value || t("cfg.recap.none"));
    set("rcDates", (start || t("wa.notset")) + " → " + (end || t("wa.notset")));
    set("rcDuration", dur || t("cfg.recap.none"));
    set("rcChauffeur", state.chauffeur ? t("wa.with") : t("wa.without"));
    set("rcNote", note || t("cfg.recap.none"));
    function set(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
  }

  function buildWa() {
    var sel = document.getElementById("cfgVehicle");
    var start = document.getElementById("cfgStart").value || t("wa.notset");
    var end = document.getElementById("cfgEnd").value || t("wa.notset");
    var dur = document.getElementById("cfgDuration").value || t("wa.notset");
    var note = document.getElementById("cfgNote").value;
    var msg =
      t("wa.hello") + "\n" +
      "• " + t("wa.vehicle") + " : " + sel.value + "\n" +
      "• " + t("wa.dates") + " : " + t("wa.from") + " " + start + " " + t("wa.to") + " " + end + "\n" +
      "• " + t("wa.duration") + " : " + dur + "\n" +
      "• " + t("wa.chauffeur") + " : " + (state.chauffeur ? t("wa.with") : t("wa.without")) + "\n" +
      (note ? ("• " + t("wa.message") + " : " + note + "\n") : "") +
      t("wa.confirm");
    return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  function prefillAndGo(slug) {
    var v = VEHICLES.find(function (x) { return x.slug === slug; });
    if (!v) return;
    var sel = document.getElementById("cfgVehicle");
    if (sel) { sel.value = v.name; state.vehicle = v.name; refreshRecap(); }
    var contact = document.getElementById("contact");
    if (contact) contact.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  /* ---------- Utils ---------- */
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var revealObserver;

  /* ---------- Boot ---------- */
  function boot() {
    state.lang = detectLang();
    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("is-in"); revealObserver.unobserve(en.target); }
        });
      }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    }
    buildModalShell();
    setLang(state.lang, false);
    renderCatalogue();
    buildVehicleSelect();
    initPreloader();
    initNav();
    initReveals();
    initCounters();
    initConfigurator();
    refreshRecap();

    document.querySelectorAll(".lang button[data-lang]").forEach(function (b) {
      b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); });
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
