/* ============================================================================
   app.js — renders the whole site from config.js and drives the interactions.
   You normally never need to edit this file. All content lives in config.js.
   ============================================================================ */
(function () {
  "use strict";
  const C = window.PORTFOLIO;
  if (!C) { console.error("config.js missing or failed to load."); return; }

  const $  = (s, el = document) => el.querySelector(s);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Inline SVG icon set (no emoji as icons) ---------- */
  const ICON = {
    github:  '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.7 18 5 18 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z"/></svg>',
    external:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    arrow:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 21h16"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
    mail:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
    sun:     '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon:    '<svg class="moon" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>',
    linkedin:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4 0 4.75 2.65 4.75 6.1V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9V9Z"/></svg>',
    x:       '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.9 2H22l-7.3 8.3L23 22h-6.8l-5-6.5L5.5 22H2.4l7.7-8.8L1.7 2h6.9l4.5 6 5.8-6Zm-1.2 18h1.7L7.1 3.8H5.3L17.7 20Z"/></svg>',
    website: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18"/></svg>',
    pin:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-6.3 7-11a7 7 0 0 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  };
  const socialIcon = (t) => ICON[t] || ICON.website;

  const resumeHref = C.meta.resume;
  const initials = C.meta.name.split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();

  /* turn "word *accent* word" into HTML with an accent span */
  const accentify = (s) => s.replace(/\*(.+?)\*/g, '<span class="accent">$1</span>');

  /* one image face with graceful fallback if the file is absent */
  function faceInner(src, hint) {
    return `
      <div class="photo-fallback">
        <div>
          <div class="initials">${initials}</div>
          <div class="hint">add your photo at<br>${hint}</div>
        </div>
      </div>
      <img src="${src}" alt="${C.meta.name}" loading="lazy"
           onload="this.previousElementSibling.style.display='none'"
           onerror="this.style.display='none'">`;
  }

  /* simple single-photo block (used by About) — shows the second photo */
  function photoBlock(extra) {
    const p2 = C.meta.photoBack || C.meta.photo;
    return `<div class="photo-frame">${faceInner(p2, p2)}</div>${extra || ""}`;
  }

  /* hero photo: a 3D card that flips on scroll to reveal a second photo */
  function heroFlip(extra) {
    return `
      <div class="flip-stage">
        <div class="flip-inner">
          <div class="flip-face front">${faceInner(C.meta.photo, C.meta.photo)}</div>
          <div class="flip-face back">${faceInner(C.meta.photoBack || C.meta.photo, C.meta.photoBack || "assets/profile2.jpg")}</div>
        </div>
      </div>${extra || ""}`;
  }

  /* ============================== NAV ============================== */
  function renderNav() {
    const links = C.nav.map(n => `<a href="${n.target}">${n.label}</a>`).join("");
    $("#site-nav").className = "nav";
    $("#site-nav").innerHTML = `
      <a class="nav-logo" href="#top"><span class="dot"></span>${C.meta.name.split(" ")[0]}</a>
      <nav class="nav-links">${links}</nav>
      <div class="nav-right">
        <a class="nav-resume" href="${resumeHref}" download>${ICON.download}<span>Résumé</span></a>
        <button class="theme-toggle" aria-label="Toggle dark mode">${ICON.sun}${ICON.moon}</button>
        <button class="nav-burger" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>`;
  }

  /* ============================== HERO ============================== */
  function renderHero() {
    const h = C.hero;
    const headline = h.headline.map(line =>
      `<span class="line"><span>${accentify(line)}</span></span>`).join("");
    const ctas = h.ctas.map(c => {
      const href = c.target === "__resume__" ? resumeHref : c.target;
      const dl = c.target === "__resume__" ? "download" : "";
      const icon = c.target === "__resume__" ? ICON.download : (c.primary ? ICON.arrow : ICON.arrow);
      return `<a class="btn ${c.primary ? "btn-primary" : "btn-ghost"}" href="${href}" ${dl}>${c.label}${icon}</a>`;
    }).join("");
    const stats = h.stats.map(s =>
      `<div class="stat"><div class="num" data-count="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div><div class="lbl">${s.label}</div></div>`
    ).join("");
    const badge = C.meta.available
      ? `<div class="hero-badge"><span class="pulse"></span>${h.badge}</div>` : "";

    return `
    <section class="hero section" id="top">
      <div class="hero-grid">
        <div class="hero-copy">
          ${badge}
          <h1>${headline}</h1>
          <p class="hero-intro reveal">${h.intro}</p>
          <div class="hero-ctas reveal">${ctas}</div>
        </div>
        <div class="hero-photo reveal" data-parallax="0.12">
           ${heroFlip(`<div class="photo-tag"><span class="d"></span>${C.meta.role}</div>`)}
        </div>
        <div class="hero-stats reveal">${stats}</div>
      </div>
    </section>`;
  }

  /* ============================== MARQUEE ============================== */
  function renderMarquee() {
    const words = C.stack.marquee;
    const set = words.map(w => `<span>${w}</span>`).join("");
    return `<div class="marquee"><div class="marquee-track">${set}${set}</div></div>`;
  }

  /* ============================== ABOUT ============================== */
  function renderAbout() {
    const a = C.about;
    const paras = a.paragraphs.map(p => `<p>${p}</p>`).join("");
    return `
    <section class="section" id="about">
      <div class="about-grid">
        <div class="about-photo reveal" data-parallax="0.08">
          ${photoBlock("")}
          <div class="deco"></div>
        </div>
        <div class="about-text reveal">
          <span class="kicker">${a.kicker}</span>
          <h2>${a.heading}</h2>
          ${paras}
          <div class="about-sign">${a.signature}</div>
        </div>
      </div>
    </section>`;
  }

  /* ============================== STACK ============================== */
  function renderStack() {
    const s = C.stack;
    const cards = s.groups.map(g => `
      <div class="stack-card reveal">
        <h3>${g.title}</h3>
        <div class="chips">${g.items.map(i => `<span class="chip">${i}</span>`).join("")}</div>
      </div>`).join("");
    return `
    <section class="section" id="stack">
      <div class="section-head reveal">
        <span class="kicker">${s.kicker}</span>
        <h2>${s.heading}</h2>
      </div>
      <div class="stack-grid">${cards}</div>
    </section>`;
  }

  /* ============================== PROJECTS ============================== */
  function renderProjects() {
    const p = C.projects;
    const cards = p.items.map((item, i) => {
      const idx = String(i + 1).padStart(2, "0");
      const tags = item.tags.map(t => `<span class="chip">${t}</span>`).join("");
      const gh = item.github ? `<a class="project-link gh" href="${item.github}" target="_blank" rel="noopener">${ICON.github}<span>GitHub</span></a>` : "";
      const demo = item.demo ? `<a class="project-link demo" href="${item.demo}" target="_blank" rel="noopener">${ICON.external}<span>Live</span></a>` : "";
      /* optional image — only shown on large screens via CSS; hides itself if the file is missing */
      const media = item.image
        ? `<div class="project-media"><img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.closest('.project-media').style.display='none'"></div>`
        : "";
      return `
      <article class="project reveal${item.image ? " has-image" : ""}" data-tilt>
        <div class="project-top">
          <div>
            <span class="project-index">${idx}</span> <span class="year">/ ${item.year}</span>
            <h3>${item.name}</h3>
            <div class="blurb">${item.blurb}</div>
          </div>
        </div>
        <p class="desc">${item.description}</p>
        <div class="project-tags">${tags}</div>
        <div class="project-actions">${gh}${demo}</div>
        ${media}
      </article>`;
    }).join("");
    return `
    <section class="section" id="work">
      <div class="section-head reveal">
        <span class="kicker">${p.kicker}</span>
        <h2>${p.heading}</h2>
      </div>
      <div class="projects-list">${cards}</div>
    </section>`;
  }

  /* ============================== EXPERIENCE ============================== */
  function renderExperience() {
    const e = C.experience;
    const jobs = e.jobs.map(j => {
      const pts = j.points.map(pt => `<li>${pt}</li>`).join("");
      const link = j.link ? `<a class="job-link" href="${j.link}" target="_blank" rel="noopener">Visit ${ICON.external}</a>` : "";
      return `
      <div class="job reveal">
        <div class="job-head">
          <h3>${j.role}</h3><span class="company">· ${j.company}</span>
        </div>
        <div class="job-meta"><span>${j.period}</span><span>${ICON.pin}${j.location}</span></div>
        <p class="job-summary">${j.summary}</p>
        <ul class="job-points">${pts}</ul>
        ${link}
      </div>`;
    }).join("");

    const ed = e.education;
    const cw = ed.coursework.map(c => `<span class="chip">${c}</span>`).join("");
    const edu = `
      <aside class="edu-card reveal">
        <span class="kicker">Education</span>
        <h3>${ed.school}</h3>
        <p class="degree">${ed.degree}</p>
        <div class="edu-meta"><span>${ed.period}</span><span>${ed.location}</span></div>
        <span class="gpa">${ed.gpa}</span>
        <div class="cw-title">Relevant coursework</div>
        <div class="chips">${cw}</div>
      </aside>`;

    return `
    <section class="section" id="experience">
      <div class="section-head reveal">
        <span class="kicker">${e.kicker}</span>
        <h2>${e.heading}</h2>
      </div>
      <div class="exp-wrap">
        <div class="timeline">${jobs}</div>
        ${edu}
      </div>
    </section>`;
  }

  /* ============================== CONTACT ============================== */
  function renderContact() {
    const c = C.contact;
    const socials = C.socials.map(s => {
      /* email is handled in JS: try the OS mail app, fall back to Gmail */
      const smart = s.type === "email" ? ` data-smart-email="${s.url.replace(/^mailto:/, "")}"` : "";
      return `<a class="social-btn" href="${s.url}" target="_blank" rel="noopener"${smart}>${socialIcon(s.type)}<span>${s.label}</span></a>`;
    }).join("");
    return `
    <section class="section contact" id="contact">
      <div class="section-head reveal">
        <span class="kicker">${c.kicker}</span>
        <h2>${c.heading}</h2>
        <p class="lead">${c.text}</p>
      </div>
      <a class="contact-email reveal" href="mailto:${c.email}" data-copy-email="${c.email}"><span class="ce-text">${c.email}</span>${ICON.arrow.replace('viewBox="0 0 24 24"','viewBox="0 0 24 24" style="transform:rotate(-45deg)"')}</a>
      <div class="contact-socials reveal">${socials}</div>
    </section>`;
  }

  /* ============================== FOOTER ============================== */
  function renderFooter() {
    $("#site-footer").className = "footer";
    $("#site-footer").innerHTML = `
      <span class="f-logo">${C.meta.name}</span>
      <span class="f-note">© ${new Date().getFullYear()} · ${C.footer.note}</span>
      <a class="f-top" href="#top">Back to top ${ICON.arrowUp}</a>`;
  }

  /* ============================== MOUNT ============================== */
  document.title = C.meta.tabTitle || C.meta.name;
  document.documentElement.style.setProperty("--accent", C.theme.accent);
  document.documentElement.style.setProperty("--accent-deep", C.theme.accentDeep);

  renderNav();
  $("#app").innerHTML =
      renderHero()
    + renderMarquee()
    + renderAbout()
    + renderStack()
    + renderProjects()
    + renderExperience()
    + renderContact();
  renderFooter();

  /* ============================== INTERACTIONS ============================== */

  /* Theme: respect saved choice, else config default */
  (function theme() {
    const root = document.documentElement;
    const saved = localStorage.getItem("theme");
    root.setAttribute("data-theme", saved || C.theme.defaultMode || "dark");
    $(".theme-toggle").addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      const apply = () => { root.setAttribute("data-theme", next); localStorage.setItem("theme", next); };
      if (document.startViewTransition && !reduceMotion) document.startViewTransition(apply);
      else apply();
    });
  })();

  /* Contact email: click-to-copy. Social email: smart mailto -> Gmail fallback */
  (function contactActions() {
    /* copy helper that also works on file:// (no secure-context clipboard API) */
    function copyText(text) {
      if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
      return new Promise((res, rej) => {
        const ta = document.createElement("textarea");
        ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.focus(); ta.select();
        try { document.execCommand("copy"); res(); } catch (e) { rej(e); }
        document.body.removeChild(ta);
      });
    }

    /* try the OS default mail app; if the window never loses focus, use Gmail */
    function smartMailto(email) {
      const gmail = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(email);
      let handled = false;
      const onLeave = () => { handled = true; };
      window.addEventListener("blur", onLeave, { once: true });
      document.addEventListener("visibilitychange", onLeave, { once: true });
      window.location.href = "mailto:" + email;            // does not unload the page
      setTimeout(() => {
        window.removeEventListener("blur", onLeave);
        document.removeEventListener("visibilitychange", onLeave);
        if (!handled) window.open(gmail, "_blank", "noopener");
      }, 700);
    }

    const link = $(".contact-email");
    if (link) {
      const txt = $(".ce-text", link);
      const original = txt ? txt.textContent : "";
      link.addEventListener("click", (e) => {
        e.preventDefault();
        copyText(link.dataset.copyEmail).then(() => {
          link.classList.add("copied");
          if (txt) txt.textContent = "Copied!";
          clearTimeout(link._t);
          link._t = setTimeout(() => {
            link.classList.remove("copied");
            if (txt) txt.textContent = original;
          }, 1600);
        }).catch(() => { window.location.href = "mailto:" + link.dataset.copyEmail; });
      });
    }

    document.querySelectorAll("[data-smart-email]").forEach(a =>
      a.addEventListener("click", (e) => { e.preventDefault(); smartMailto(a.dataset.smartEmail); }));
  })();

  /* Mobile menu */
  (function burger() {
    const nav = $("#site-nav");
    const btn = $(".nav-burger");
    btn.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll(".nav-links a").forEach(a =>
      a.addEventListener("click", () => nav.classList.remove("open")));
  })();

  /* Sticky nav style + scroll progress */
  (function scrollUI() {
    const nav = $("#site-nav");
    const bar = $(".scroll-progress span");
    const onScroll = () => {
      nav.classList.toggle("scrolled", window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  })();

  /* Hero headline staggered rise-in */
  (function heroIntro() {
    const lines = document.querySelectorAll(".hero h1 .line > span");
    lines.forEach((l, i) => {
      l.style.transition = "transform 1s var(--ease)";
      l.style.transitionDelay = (0.15 + i * 0.12) + "s";
      requestAnimationFrame(() => requestAnimationFrame(() => { l.style.transform = "translateY(0)"; }));
    });
    if (reduceMotion) lines.forEach(l => l.style.transform = "none");
  })();

  /* Scroll reveal with light stagger among siblings */
  (function reveals() {
    const items = document.querySelectorAll(".reveal");
    if (reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(i => i.classList.add("in")); return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const sibs = Array.from(e.target.parentElement.children).filter(c => c.classList.contains("reveal"));
        const idx = Math.max(0, sibs.indexOf(e.target));
        e.target.style.transitionDelay = Math.min(idx, 6) * 0.07 + "s";
        e.target.classList.add("in");
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach(i => io.observe(i));
  })();

  /* Count-up stats (supports decimals) */
  (function counters() {
    const nums = document.querySelectorAll("[data-count]");
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || "";
      const decimals = (String(target).split(".")[1] || "").length;
      const dur = 1400; const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        const val = (target * eased).toFixed(decimals);
        el.innerHTML = val + `<span class="suffix">${suffix}</span>`;
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (reduceMotion || !("IntersectionObserver" in window)) {
      nums.forEach(n => n.innerHTML = n.dataset.count + `<span class="suffix">${n.dataset.suffix || ""}</span>`);
      return;
    }
    const io = new IntersectionObserver((es) => {
      es.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } });
    }, { threshold: 0.6 });
    nums.forEach(n => io.observe(n));
  })();

  /* Parallax on photos + scroll-driven 3D flip of the hero photo */
  (function parallaxAndFlip() {
    if (reduceMotion) return;
    const targets = document.querySelectorAll("[data-parallax]");
    const hero = $(".hero");
    const flip = $(".hero-photo .flip-inner");
    const flipDrop = (C.hero && C.hero.flipDrop) || 0;
    let ticking = false;
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const easeInOut = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const update = () => {
      // flip progress: 0 at top of hero → 1 a little before the hero leaves
      let p = 0;
      if (hero) {
        const r = hero.getBoundingClientRect();
        const scrolled = clamp(-r.top, 0, r.height);
        p = clamp(scrolled / (r.height * 0.8), 0, 1);
      }
      const drop = easeInOut(p) * flipDrop; // how far the hero photo has glided down

      // parallax float + flip descent (descent applies only to the hero stage)
      targets.forEach(t => {
        const speed = parseFloat(t.dataset.parallax);
        const rect = t.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
        const mover = t.querySelector(".photo-frame, .flip-stage");
        if (!mover) return;
        const isHero = mover.classList.contains("flip-stage");
        const extra = isHero ? drop : 0;
        mover.style.transform = `translate3d(0, ${(offset + extra).toFixed(1)}px, 0)`;
        // keep the role badge travelling down with the flipping photo
        if (isHero) {
          const tag = t.querySelector(".photo-tag");
          if (tag) tag.style.transform = `translate3d(0, ${(offset + extra).toFixed(1)}px, 0)`;
        }
      });

      // rotate the hero photo sideways into the second photo
      // if (flip) flip.style.transform = `rotateY(${(p * 180).toFixed(2)}deg)`;
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  })();

  /* Magnetic tilt + spotlight on project cards (desktop pointers only) */
  (function tilt() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll("[data-tilt]").forEach(card => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
        const rx = (0.5 - py) * 4;
        const ry = (px - 0.5) * 4;
        card.style.transform = `translateY(-5px) perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  })();

  /* Cursor glow follows pointer (desktop only) */
  (function cursorGlow() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const glow = $(".cursor-glow");
    let tx = 0, ty = 0, cx = 0, cy = 0;
    window.addEventListener("pointermove", (e) => {
      tx = e.clientX; ty = e.clientY; glow.classList.add("on");
    });
    const loop = () => {
      cx += (tx - cx) * 0.12; cy += (ty - cy) * 0.12;
      glow.style.transform = `translate(${cx}px, ${cy}px)`;
      requestAnimationFrame(loop);
    };
    loop();
  })();

})();
