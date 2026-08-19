/* ============================================================
   VIBEKODING ENGINE v1.0
   Dual-language (EN/ID) · dark/light · copy-prompt · quiz · XP
   ============================================================ */
(function(){
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

  /* ---------- Language ---------- */
  function setLang(l){
    document.documentElement.dataset.lang=l;
    localStorage.setItem('vk-lang',l);
    $$('.lang-btn').forEach(b=>{
      const on=b.dataset.lang===l;
      b.classList.toggle('on',on);
      b.setAttribute('aria-pressed',on);
    });
  }

  /* ---------- Theme ---------- */
  function setTheme(t){
    document.documentElement.dataset.theme=t;
    localStorage.setItem('vk-theme',t);
    const btn=$('#theme-toggle');
    if(btn) btn.textContent = t==='light' ? '🌙' : '☀️';
  }

  /* ---------- Init controls ---------- */
  document.addEventListener('click',e=>{
    const lb=e.target.closest('.lang-btn');
    if(lb){ setLang(lb.dataset.lang); return; }
    if(e.target.closest('#theme-toggle')){
      setTheme(document.documentElement.dataset.theme==='light'?'dark':'light'); return;
    }
    const cb=e.target.closest('.copy-btn');
    if(cb){
      const pre=cb.closest('.prompt-card').querySelector('pre');
      navigator.clipboard.writeText(pre.innerText).then(()=>{
        const id=document.documentElement.dataset.lang;
        const old=cb.innerHTML;
        cb.innerHTML = id==='id' ? '✅ Tersalin!' : '✅ Copied!';
        setTimeout(()=>cb.innerHTML=old,1600);
      });
      return;
    }
    const q=e.target.closest('.quiz .q');
    if(q){ q.classList.toggle('open'); return; }
  });

  /* ---------- Reading progress ---------- */
  const bar=$('#scroll-progress');
  if(bar){
    addEventListener('scroll',()=>{
      const h=document.documentElement;
      const p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
      bar.style.width=p+'%';
    },{passive:true});
  }

  /* ---------- Reveal on scroll ---------- */
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>{
      es.forEach(x=>{ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target);} });
    },{threshold:.12});
    $$('.reveal').forEach(el=>io.observe(el));
  } else $$('.reveal').forEach(el=>el.classList.add('in'));

  /* ---------- XP progress (lesson pages) ---------- */
  const lessonId=document.body.dataset.lesson;
  const xpFill=$('#xp-fill'), xpPct=$('#xp-pct'), xpBox=$('#xp-box'), done=$('#lesson-done');
  function loadXP(){ return JSON.parse(localStorage.getItem('vk-xp')||'{}'); }
  function saveXP(x){ localStorage.setItem('vk-xp',JSON.stringify(x)); }
  function renderXP(){
    const xp=loadXP();
    const total=$$('.quiz .q').length;
    const opened=$$('.quiz .q.open').length;
    const doneFlag=!!(lessonId&&xp[lessonId]);
    const pct= total? Math.min(100, Math.round(((opened*0.5)+(doneFlag?50:0))/ (total*0.5+50)*100)) : (doneFlag?100:0);
    if(xpFill) xpFill.style.width=pct+'%';
    if(xpPct) xpPct.textContent=pct+'%';
  }
  if(done&&lessonId){
    const xp=loadXP();
    done.checked=!!xp[lessonId];
    done.addEventListener('change',()=>{
      const x=loadXP();
      if(done.checked){ x[lessonId]=Date.now(); } else { delete x[lessonId]; }
      saveXP(x); renderXP();
    });
  }
  if(xpBox) renderXP();

  /* ---------- Init ---------- */
  setLang(localStorage.getItem('vk-lang')||'id');
  setTheme(localStorage.getItem('vk-theme')||'dark');
})();
