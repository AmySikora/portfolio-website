/* ===== scripts.js (minimal + robust) ===== */
document.addEventListener("DOMContentLoaded", () => {
  // ---- Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const hash = a.getAttribute("href");
      if (!hash || hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", hash);
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    // Add ARIA + helpful title to every modal trigger
    document.querySelectorAll(".modal-trigger").forEach(btn => {
      const targetSel = btn.getAttribute("data-modal-target");
      const labelText = (btn.textContent || btn.getAttribute("aria-label") || "details")
        .trim().replace(/\s+/g, " ");
  
      if (targetSel && targetSel.startsWith("#")) {
        btn.setAttribute("aria-haspopup", "dialog");
        btn.setAttribute("aria-controls", targetSel.slice(1));
      }
  
      // Tooltip text on hover/focus
      if (!btn.title) btn.title = `Open details: ${labelText}`;
    });
  
    // After user opens any modal, stop the gentle pulsing globally
    const stopHints = () => document.documentElement.classList.add("modal-hints-off");
    document.addEventListener("click", e => {
      const t = e.target.closest(".modal-trigger");
      if (t) stopHints();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") stopHints();
    });
  });


  // ---- Hamburger menu
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("header nav");
  const list = nav?.querySelector(".navigation-list");

  if (toggle && nav && list) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      // support both of your CSS patterns
      nav.classList.toggle("show", open);
      list.classList.toggle("show", open);
      nav.setAttribute("aria-expanded", String(open)); // extra ARIA hook if your CSS uses it
    };
    setOpen(false);

    toggle.addEventListener("click", () => {
      const next = toggle.getAttribute("aria-expanded") !== "true";
      setOpen(next);
    });

    list.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", (e) => {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (!nav.contains(e.target) && e.target !== toggle) setOpen(false);
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  // ---- Promote legacy <span class="tech-badge"> to modal triggers (if you didn't change to <button>)
  (function promoteBadges() {
    const map = {
      "HTML": "#modal-html", "CSS": "#modal-css", "JavaScript": "#modal-js", "JS": "#modal-js",
      "React": "#modal-react", "Angular": "#modal-angular", "Python": "#modal-python",
      "Django": "#modal-django", "SQL": "#modal-sql", "PostgreSQL": "#modal-sql",
      "React Native": "#modal-react-native", "Firebase": "#modal-firebase", "Expo": "#modal-expo",
      "PWA": "#modal-pwa", "Google Calendar API": "#modal-gcal", "Heroku": "#modal-heroku",
      "AWS S3": "#modal-aws", "S3": "#modal-aws", "Pandas": "#modal-pandas", "Matplotlib": "#modal-matplotlib",
      "Node.js": "#modal-node", "Node": "#modal-node", "MongoDB": "#modal-mongodb", "Express": "#modal-express",
      "TypeScript": "#modal-typescript", "SCSS": "#modal-scss"
    };

    document.querySelectorAll('#work .project-buttons.tech-stack .tech-badge').forEach(el => {
      if (el.tagName.toLowerCase() === "button" && el.dataset.modalTarget) return; // already wired
      const key = el.textContent.trim();
      const target = map[key];
      if (!target) return;
      el.setAttribute("role", "button");
      el.setAttribute("tabindex", "0");
      el.setAttribute("data-modal-target", target);
      el.classList.add("modal-trigger");
      el.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); }
      });
    });
  })();

  // ---- Global modal engine (uses your existing hidden #modal-... blocks)
  (function initModal() {
    const modal = document.getElementById("modal");
    if (!modal) return;

    const dlg = modal.querySelector(".modal__dialog");
    const titleEl = modal.querySelector("#modal-title");
    const bodyEl  = modal.querySelector("#modal-body");
    let lastTrigger = null;

    const open = (title, html) => {
      titleEl.textContent = title || "";
      bodyEl.innerHTML = html || "";
      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      dlg?.focus();
      document.body.style.overflow = "hidden";
    };
    const close = () => {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      lastTrigger?.focus();
      lastTrigger = null;
    };

    modal.addEventListener("click", (e) => {
      if (e.target.matches("[data-close-modal], .modal__backdrop")) close();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) close();
    });

    document.addEventListener("click", (e) => {
      const trigger = e.target.closest("[data-modal-target], .modal-trigger");
      if (!trigger) return;
      const sel = trigger.getAttribute("data-modal-target");
      if (!sel) return;
      e.preventDefault();

      const src = document.querySelector(sel);
      if (!src) return;

      const srcDialog = src.querySelector(".modal__dialog") || src;
      const title =
        srcDialog.querySelector("h3")?.textContent?.trim() ||
        trigger.getAttribute("data-modal-title") ||
        trigger.textContent.trim() ||
        "Details";

      const clone = srcDialog.cloneNode(true);
      clone.querySelector(".modal__close")?.remove();
      clone.querySelector("h3")?.remove();
      const html = clone.innerHTML.trim();

      lastTrigger = trigger;
      open(title, html);
    });
  })();
});
// HAMBURGER
(function(){
  const btn = document.querySelector('.menu-toggle');
  const nav = document.querySelector('header nav');
  if(!btn || !nav) return;

  const hamburger = btn.querySelector('.icon-hamburger');
  const closeIcon = btn.querySelector('.icon-close');

  function setState(open){
    document.body.classList.toggle('nav-open', open);
    nav.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    if(hamburger && closeIcon){
      hamburger.style.display = open ? 'none' : 'inline';
      closeIcon.style.display = open ? 'inline' : 'none';
    }
  }

  setState(false);
  btn.addEventListener('click', () => setState(!nav.classList.contains('is-open')));

  // close on escape
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape') setState(false);
  });
})();

// === Endorsements carousel (scroll-snap + autoplay) ===
(function initEndorsements() {
  const wrap  = document.querySelector('.endorsements');
  const track = wrap?.querySelector('.endorsements__track');
  if (!wrap || !track) return;

  const slides   = [...track.querySelectorAll('.endorsement')];
  const prevBtn  = wrap.querySelector('.endorsements__nav.prev');
  const nextBtn  = wrap.querySelector('.endorsements__nav.next');
  const dotsWrap = wrap.querySelector('.endorsements__dots');
  if (!slides.length) return;

  // Build dots once
  if (dotsWrap && dotsWrap.children.length === 0) {
    dotsWrap.innerHTML = slides.map((_, i) =>
      `<button type="button" aria-label="Go to quote ${i + 1}"></button>`
    ).join('');
  }
  const dots = dotsWrap ? [...dotsWrap.children] : [];

  // Helpers to measure slide width + gap (gap matters for scroll distance)
  const getGap = () => {
    const cs = getComputedStyle(track);
    // in flexbox, the horizontal gap is "column-gap"
    return parseFloat(cs.columnGap || cs.gap || '0') || 0;
  };
  const slideW = () => slides[0].getBoundingClientRect().width;

  let index = 0;
  let timer = null;
  let hovering = false;

  const setDot = (i) => dots.forEach((d, k) => d.setAttribute('aria-current', String(k === i)));

  const scrollToIndex = (i, smooth = true) => {
    index = (i + slides.length) % slides.length;
    const distance = index * (slideW() + getGap());
    track.scrollTo({ left: distance, behavior: smooth ? 'smooth' : 'auto' });
    setDot(index);
  };

  const next = () => scrollToIndex(index + 1);
  const prev = () => scrollToIndex(index - 1);

  // Keep index in sync if the user drags/scrolls manually
  let rafId = null;
  const onScroll = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      const step = slideW() + getGap();
      const newIndex = Math.round(track.scrollLeft / step);
      if (newIndex !== index) {
        index = (newIndex + slides.length) % slides.length;
        setDot(index);
      }
    });
  };
  track.addEventListener('scroll', onScroll, { passive: true });

  // Controls
  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);
  dots.forEach((d, i) => d.addEventListener('click', () => scrollToIndex(i)));

  // Autoplay (pause on hover/visibility)
  const start = () => { stop(); timer = setInterval(() => { if (!hovering) next(); }, 5000); };
  const stop  = () => { if (timer) clearInterval(timer); timer = null; };

  wrap.addEventListener('mouseenter', () => { hovering = true; });
  wrap.addEventListener('mouseleave', () => { hovering = false; });

  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());

  // Touch swipe helpers (optional: snap already handles well)
  let startX = 0, dx = 0;
  wrap.addEventListener('touchstart', e => { startX = e.touches[0].clientX; dx = 0; }, { passive: true });
  wrap.addEventListener('touchmove',  e => { dx = e.touches[0].clientX - startX; }, { passive: true });
  wrap.addEventListener('touchend',   () => { if (Math.abs(dx) > 40) (dx < 0 ? next() : prev()); dx = 0; });

  // Resize: keep current slide centered
  const ro = new ResizeObserver(() => scrollToIndex(index, false));
  ro.observe(track);

  // Init
  setDot(0);
  scrollToIndex(0, false);
  start();
})();

