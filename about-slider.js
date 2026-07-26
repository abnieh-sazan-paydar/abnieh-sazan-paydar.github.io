(() => {
  const frame = document.querySelector('#about .profile-image');
  if (!frame || frame.dataset.sliderReady === 'true') return;

  const originalImage = frame.querySelector('img');
  if (!originalImage) return;

  frame.dataset.sliderReady = 'true';
  frame.classList.add('about-slider');
  originalImage.style.display = 'none';

  const sources = [
    'assets/saeed-kiadarbandsari.png',
    'assets/about-engineer-02.webp'
  ];

  const stage = document.createElement('div');
  stage.className = 'about-slider-stage';
  const slides = sources.map((source, index) => {
    const slide = document.createElement('div');
    slide.className = `about-slide${index === 0 ? ' active' : ''}`;
    slide.style.backgroundImage = `url("${source}")`;
    slide.setAttribute('role', 'img');
    slide.setAttribute('aria-label', index === 0 ? 'دکتر سعید کیادربندسری' : 'دکتر سعید کیادربندسری با پوشش مهندسی');
    stage.appendChild(slide);
    return slide;
  });
  frame.appendChild(stage);

  const controls = document.createElement('div');
  controls.className = 'about-slider-controls';
  controls.innerHTML = `
    <button type="button" class="about-slider-arrow about-prev" aria-label="تصویر قبلی">‹</button>
    <div class="about-slider-dots" aria-label="انتخاب تصویر">
      <button type="button" class="active" data-index="0" aria-label="تصویر اول"></button>
      <button type="button" data-index="1" aria-label="تصویر دوم"></button>
    </div>
    <button type="button" class="about-slider-arrow about-next" aria-label="تصویر بعدی">›</button>
  `;
  frame.appendChild(controls);

  const style = document.createElement('style');
  style.textContent = `
    #about .profile-image.about-slider{position:relative;isolation:isolate}
    #about .profile-image.about-slider .about-slider-stage{position:absolute;inset:0;z-index:1;background:#252525}
    #about .profile-image.about-slider .about-slide{position:absolute;inset:0;background-size:cover;background-position:center 12%;background-repeat:no-repeat;opacity:0;visibility:hidden;transition:opacity .4s ease;filter:saturate(.75)}
    #about .profile-image.about-slider .about-slide.active{opacity:1;visibility:visible}
    #about .profile-image.about-slider .about-slider-controls{position:absolute;right:18px;left:18px;bottom:18px;z-index:3;display:flex;align-items:center;justify-content:space-between;pointer-events:none}
    #about .profile-image.about-slider .about-slider-arrow{pointer-events:auto;width:42px;height:42px;border:1px solid rgba(255,255,255,.58);background:rgba(17,17,17,.58);color:#fff;font-size:27px;line-height:1;cursor:pointer;backdrop-filter:blur(7px)}
    #about .profile-image.about-slider .about-slider-arrow:hover{background:var(--red);border-color:var(--red)}
    #about .profile-image.about-slider .about-slider-dots{display:flex;gap:8px;pointer-events:auto}
    #about .profile-image.about-slider .about-slider-dots button{width:9px;height:9px;padding:0;border:1px solid #fff;border-radius:50%;background:transparent;cursor:pointer}
    #about .profile-image.about-slider .about-slider-dots button.active{background:#fff}
  `;
  document.head.appendChild(style);

  const dots = [...controls.querySelectorAll('.about-slider-dots button')];
  let current = 0;

  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
  };

  controls.querySelector('.about-prev').addEventListener('click', () => show(current - 1));
  controls.querySelector('.about-next').addEventListener('click', () => show(current + 1));
  dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.index))));

  let touchStart = 0;
  frame.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
  frame.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1));
  }, { passive: true });
})();
