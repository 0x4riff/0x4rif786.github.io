/* ============================================================
   VIBEKODING ENGINE v2.0 (Modern Interaction & Quick Filter)
   Dual-language (ID/EN) · Instant Theme · Copy Prompt · Interactive Quiz · XP
   ============================================================ */
(function() {
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];

  /* ---------- Language Switcher ---------- */
  function setLang(l) {
    document.documentElement.dataset.lang = l;
    localStorage.setItem('vk-lang', l);
    $$('.lang-btn').forEach(b => {
      const on = b.dataset.lang === l;
      b.classList.toggle('on', on);
      b.setAttribute('aria-pressed', on);
    });
  }

  /* ---------- Theme Switcher ---------- */
  function setTheme(t) {
    document.documentElement.dataset.theme = t;
    localStorage.setItem('vk-theme', t);
    const btn = $('#theme-toggle');
    if (btn) {
      btn.textContent = t === 'light' ? '🌙' : '☀️';
      btn.setAttribute('aria-label', `Switch to ${t === 'light' ? 'dark' : 'light'} theme`);
    }
  }

  /* ---------- Event Delegation ---------- */
  document.addEventListener('click', e => {
    // Language toggle
    const lb = e.target.closest('.lang-btn');
    if (lb) {
      setLang(lb.dataset.lang);
      return;
    }

    // Theme toggle
    if (e.target.closest('#theme-toggle')) {
      const current = document.documentElement.dataset.theme || 'dark';
      setTheme(current === 'light' ? 'dark' : 'light');
      return;
    }

    // Copy button
    const cb = e.target.closest('.copy-btn');
    if (cb) {
      const card = cb.closest('.prompt-card');
      const pre = card ? card.querySelector('pre') : null;
      if (pre) {
        navigator.clipboard.writeText(pre.innerText).then(() => {
          const isId = document.documentElement.dataset.lang === 'id';
          const oldHtml = cb.innerHTML;
          cb.innerHTML = isId ? '✅ Tersalin!' : '✅ Copied!';
          cb.style.borderColor = 'var(--accent-emerald)';
          cb.style.color = 'var(--accent-emerald)';
          setTimeout(() => {
            cb.innerHTML = oldHtml;
            cb.style.borderColor = '';
            cb.style.color = '';
          }, 1800);
        });
      }
      return;
    }

    // Quiz accordion
    const q = e.target.closest('.quiz .q');
    if (q) {
      q.classList.toggle('open');
      renderXP();
      return;
    }
  });

  /* ---------- Scroll Progress Bar ---------- */
  const bar = $('#scroll-progress');
  if (bar) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const h = document.documentElement;
          const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
          bar.style.width = scrolled + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Intersection Observer (Reveal on Scroll) ---------- */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => io.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------- XP Calculation & Progress (Lesson Pages) ---------- */
  const lessonId = document.body.dataset.lesson;
  const xpFill = $('#xp-fill');
  const xpPct = $('#xp-pct');
  const xpBox = $('#xp-box');
  const done = $('#lesson-done');

  function loadXP() {
    try {
      return JSON.parse(localStorage.getItem('vk-xp') || '{}');
    } catch {
      return {};
    }
  }

  function saveXP(x) {
    localStorage.setItem('vk-xp', JSON.stringify(x));
  }

  function renderXP() {
    const xp = loadXP();
    const totalQuestions = $$('.quiz .q').length;
    const openedQuestions = $$('.quiz .q.open').length;
    const isDone = !!(lessonId && xp[lessonId]);

    let pct = 0;
    if (totalQuestions > 0) {
      const qWeight = (openedQuestions / totalQuestions) * 50;
      const doneWeight = isDone ? 50 : 0;
      pct = Math.min(100, Math.round(qWeight + doneWeight));
    } else {
      pct = isDone ? 100 : 0;
    }

    if (xpFill) xpFill.style.width = pct + '%';
    if (xpPct) xpPct.textContent = pct + '%';
  }

  if (done && lessonId) {
    const xp = loadXP();
    done.checked = !!xp[lessonId];
    done.addEventListener('change', () => {
      const x = loadXP();
      if (done.checked) {
        x[lessonId] = Date.now();
      } else {
        delete x[lessonId];
      }
      saveXP(x);
      renderXP();
    });
  }

  if (xpBox) renderXP();

  /* ---------- Fast Search / Filter on Appendix & Stage Hubs ---------- */
  const searchInput = $('#quick-search');
  if (searchInput) {
    searchInput.addEventListener('input', e => {
      const q = e.target.value.toLowerCase().trim();
      $$('.mod, .topic-pills a, .b-card').forEach(item => {
        const text = item.textContent.toLowerCase();
        if (!q || text.includes(q)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }

  /* ---------- Keyboard Shortcuts ---------- */
  window.addEventListener('keydown', e => {
    // Press 'L' to toggle Language
    if (e.key === 'l' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      const cur = document.documentElement.dataset.lang || 'id';
      setLang(cur === 'id' ? 'en' : 'id');
    }
    // Press 'T' to toggle Theme
    if (e.key === 't' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      const cur = document.documentElement.dataset.theme || 'dark';
      setTheme(cur === 'light' ? 'dark' : 'light');
    }
  });

  /* ---------- Initial State Boot ---------- */
  const savedLang = localStorage.getItem('vk-lang') || 'id';
  const savedTheme = localStorage.getItem('vk-theme') || 'dark';
  setLang(savedLang);
  setTheme(savedTheme);
})();
