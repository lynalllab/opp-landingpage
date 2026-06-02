(function () {
  'use strict';

  // ── STICKY NAV ────────────────────────────────────────────────────────────────
  var nav  = document.getElementById('site-nav');
  var hero = document.querySelector('.hero');

  if (nav && hero) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('site-nav--visible', window.scrollY > hero.offsetHeight * 0.65);
    }, { passive: true });
  }

  // ── HERO CANVAS — MOLECULAR PARTICLE NETWORK ──────────────────────────────────
  var canvas = document.getElementById('hero-canvas');
  if (canvas && canvas.getContext) {
    var ctx       = canvas.getContext('2d');
    var COUNT     = window.innerWidth < 768 ? 35 : 70;
    var CONNECT   = 130;
    var particles = [];
    var animId    = null;
    var running   = false;

    function resize() {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function Particle() {
      this.reset();
    }
    Particle.prototype.reset = function () {
      this.x     = Math.random() * canvas.width;
      this.y     = Math.random() * canvas.height;
      this.vx    = (Math.random() - 0.5) * 0.5;
      this.vy    = (Math.random() - 0.5) * 0.5;
      this.r     = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.15;
    };
    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    };

    function init() {
      resize();
      particles = [];
      for (var i = 0; i < COUNT; i++) particles.push(new Particle());
    }

    function frame() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections first (below dots)
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var d  = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(255,255,255,' + ((1 - d / CONNECT) * 0.18) + ')';
            ctx.lineWidth   = 0.7;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (var k = 0; k < particles.length; k++) {
        particles[k].update();
        ctx.beginPath();
        ctx.arc(particles[k].x, particles[k].y, particles[k].r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + particles[k].alpha + ')';
        ctx.fill();
      }

      if (running) animId = requestAnimationFrame(frame);
    }

    function start() { if (!running) { running = true; frame(); } }
    function stop()  { running = false; if (animId) cancelAnimationFrame(animId); }

    // Pause off-screen to save battery
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries[0].isIntersecting ? start() : stop();
      }).observe(canvas.parentElement);
    } else {
      start();
    }

    init();
    window.addEventListener('resize', init, { passive: true });
  }

  // ── SCROLL REVEAL ─────────────────────────────────────────────────────────────
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      reveals.forEach(function (el) { revealObs.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('revealed'); });
    }
  }

  // ── ANIMATED STAT COUNTERS ────────────────────────────────────────────────────
  var statEls = document.querySelectorAll('.stat-number[data-target]');
  if (statEls.length && 'IntersectionObserver' in window) {
    var counterObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el       = entry.target;
        var target   = parseFloat(el.getAttribute('data-target'));
        var decimals = parseInt(el.getAttribute('data-decimal') || '0', 10);
        var duration = 1600;
        var startTime = null;

        function tick(ts) {
          if (!startTime) startTime = ts;
          var p       = Math.min((ts - startTime) / duration, 1);
          var eased   = 1 - Math.pow(1 - p, 3);
          var val     = eased * target;
          el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val);
          if (p < 1) requestAnimationFrame(tick);
          else el.textContent = decimals ? target.toFixed(decimals) : target;
        }

        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });

    statEls.forEach(function (el) { counterObs.observe(el); });
  }

  // ── SMOOTH SCROLL POLYFILL ────────────────────────────────────────────────────
  if (!('scrollBehavior' in document.documentElement.style)) {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

}());
