// Hero canvas — molecular particle network background.
// Home page (index.md) only; no-ops on pages without #hero-canvas.
(function () {
  'use strict';

  var canvas = document.getElementById('hero-canvas');
  if (!canvas || !canvas.getContext) return;

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

}());
