(() => {
  const carousel = document.querySelector('[data-hero-carousel]');
  const prism = carousel?.querySelector('.hero-prism');
  const faces = Array.from(carousel?.querySelectorAll('.hero-prism-face') || []);

  if (!carousel || !prism || faces.length !== 3) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let step = 0;
  let timer = null;

  const show = (nextStep) => {
    step = nextStep;
    prism.style.setProperty('--hero-rotation', `${step * -120}deg`);
    const active = ((step % faces.length) + faces.length) % faces.length;
    faces.forEach((face, index) => face.classList.toggle('is-active', index === active));
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const start = () => {
    stop();
    if (reducedMotion.matches || document.hidden) return;
    timer = window.setInterval(() => show(step + 1), 6000);
  };

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);
  document.addEventListener('visibilitychange', start);
  reducedMotion.addEventListener?.('change', start);

  show(0);
  start();
})();
