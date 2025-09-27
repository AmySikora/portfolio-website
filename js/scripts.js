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
