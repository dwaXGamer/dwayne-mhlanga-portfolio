// ============================================================
// main.js — shared site behaviour (used on index.html)
// Nav scroll state, hero parallax, typewriter, canvas background,
// scroll-reveal, hamburger menu, stack pill magnetic hover
// ============================================================

// ── NAV SCROLLED STATE ─────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
  const hero = document.getElementById('hero');
  if (hero) hero.classList.toggle('scrolled-past', window.scrollY > 120);
});

// ── HERO PARALLAX ───────────────────────────────────────────────────────
(function () {
  const name  = document.querySelector('.hero-name');
  const photo = document.querySelector('.hero-glass-frame');
  if (!name) return;
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 10;
    name.style.transform  = `translate(${x * 0.15}px, ${y * 0.1}px)`;
    if (photo) photo.style.transform = `translate(${x * -0.25}px, ${y * -0.15}px)`;
  });
})();

// ── HERO NAME ───────────────────────────────────────────────────────────
// Name is static (white→grey gradient, blinking cursor handled in CSS).
// Background rain + drifting orbs provide the motion.

// ── HERO CANVAS ANIMATION — rain + drifting dark orbs ───────────────────
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    const hero = document.getElementById('hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Soft dark orbs drifting slowly (darker than bg, blurry)
  const orbs = Array.from({ length: 7 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 90 + Math.random() * 190,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.12,
    phase: Math.random() * Math.PI * 2
  }));

  function drawOrbs(t) {
    orbs.forEach(o => {
      o.x += o.vx; o.y += o.vy;
      if (o.x < -o.r) o.x = canvas.width + o.r;
      if (o.x > canvas.width + o.r) o.x = -o.r;
      if (o.y < -o.r) o.y = canvas.height + o.r;
      if (o.y > canvas.height + o.r) o.y = -o.r;
      const pulse = 0.6 + 0.4 * Math.sin(t * 0.006 + o.phase);
      const grad = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
      // Dark, subtle orbs — slightly lighter charcoal fading to transparent
      grad.addColorStop(0, `rgba(40,44,52,${0.5 * pulse})`);
      grad.addColorStop(0.55, `rgba(24,26,32,${0.28 * pulse})`);
      grad.addColorStop(1, 'rgba(8,8,8,0)');
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    });
  }

  // Rain streaks — thin diagonal lines falling
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const rainCount = Math.floor((canvas.width * canvas.height) / 26000);
  const rain = Array.from({ length: Math.max(40, rainCount) }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    len: 14 + Math.random() * 26,
    speed: 3 + Math.random() * 5,
    drift: 0.5 + Math.random() * 0.8,
    alpha: 0.05 + Math.random() * 0.14
  }));

  function drawRain() {
    ctx.lineCap = 'round';
    rain.forEach(d => {
      ctx.beginPath();
      ctx.strokeStyle = `rgba(180,200,220,${d.alpha})`;
      ctx.lineWidth = 1;
      ctx.moveTo(d.x, d.y);
      ctx.lineTo(d.x - d.drift * 2, d.y + d.len);
      ctx.stroke();

      d.y += d.speed;
      d.x -= d.drift;
      if (d.y > canvas.height + d.len) {
        d.y = -d.len;
        d.x = Math.random() * (canvas.width + 100);
      }
      if (d.x < -20) d.x = canvas.width + 20;
    });
  }

  let t = 0;
  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOrbs(t);
    drawRain();
    t++;
    requestAnimationFrame(loop);
  }
  loop();
})();

// ── TERMINAL CLOCK ──────────────────────────────────────────────────────
(function () {
  const clock = document.getElementById('term-clock');
  if (!clock) return;
  function tick() {
    const now = new Date();
    clock.textContent = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  }
  tick();
  setInterval(tick, 10000);
})();

// ── STACK PILL MAGNETIC HOVER ────────────────────────────────────────────
(function () {
  const pills = document.querySelectorAll('.stack-pill');
  pills.forEach(pill => {
    pill.addEventListener('mousemove', e => {
      const rect = pill.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      pill.style.transform = `scale(1.08) translate(${dx * 6}px, ${dy * 6}px)`;
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = '';
    });
  });
})();

// ── SCROLL REVEAL ────────────────────────────────────────────────────────
(function () {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => obs.observe(el));
})();

// ── HAMBURGER MENU ───────────────────────────────────────────────────────
(function () {
  const btn = document.getElementById('nav-hamburger');
  const menu = document.getElementById('nav-mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    menu.classList.toggle('open');
  });
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      menu.classList.remove('open');
    });
  });
})();

// ── BLOG SUBSCRIBE FORM (Buttondown) ────────────────────────────────────
(function () {
  const form = document.getElementById('subscribe-form');
  if (!form) return;
  const btn = document.getElementById('subscribe-btn');
  const msg = document.getElementById('subscribe-msg');

  // Strip the fallback popup handler — we submit via fetch instead
  form.onsubmit = null;
  form.removeAttribute('target');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Guard: reminder to set the Buttondown username
    if (form.action.includes('YOUR_USERNAME')) {
      msg.className = 'subscribe-msg error';
      msg.textContent = 'Not configured yet — add your Buttondown username (see README).';
      return;
    }

    btn.disabled = true;
    const original = btn.textContent;
    btn.textContent = 'Subscribing…';
    msg.className = 'subscribe-msg';
    msg.textContent = '';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        msg.className = 'subscribe-msg success';
        msg.textContent = '\u2713 Almost there! Check your inbox to confirm your subscription.';
        form.reset();
      } else {
        const data = await res.json().catch(() => ({}));
        msg.className = 'subscribe-msg error';
        msg.textContent = (data && (data.detail || data.error))
          ? (data.detail || data.error)
          : 'Something went wrong. Please try again.';
      }
    } catch (err) {
      msg.className = 'subscribe-msg error';
      msg.textContent = 'Network error — please try again.';
    } finally {
      btn.disabled = false;
      btn.textContent = original;
    }
  });
})();
