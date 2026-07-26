(() => {
  const frame = document.querySelector('#about .profile-image');
  if (!frame || frame.dataset.sliderReady === 'true') return;

  const firstImage = frame.querySelector('img');
  if (!firstImage) return;

  frame.dataset.sliderReady = 'true';
  frame.classList.add('about-slider');

  firstImage.classList.add('about-slide', 'active');
  firstImage.setAttribute('data-slide', '0');

  const secondImage = document.createElement('img');
  secondImage.className = 'about-slide';
  secondImage.dataset.slide = '1';
  secondImage.src = 'assets/about-engineer-02.webp';
  secondImage.alt = 'دکتر سعید کیادربندسری با پوشش مهندسی';
  secondImage.loading = 'lazy';
  frame.appendChild(secondImage);

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
    #about .profile-image.about-slider{position:relative}
    #about .profile-image.about-slider .about-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 12%;opacity:0;visibility:hidden;transition:opacity .4s ease;filter:saturate(.75)}
    #about .profile-image.about-slider .about-slide.active{opacity:1;visibility:visible}
    #about .profile-image.about-slider .about-slider-controls{position:absolute;right:18px;left:18px;bottom:18px;z-index:3;display:flex;align-items:center;justify-content:space-between;pointer-events:none}
    #about .profile-image.about-slider .about-slider-arrow{pointer-events:auto;width:42px;height:42px;border:1px solid rgba(255,255,255,.58);background:rgba(17,17,17,.58);color:#fff;font-size:27px;line-height:1;cursor:pointer;backdrop-filter:blur(7px)}
    #about .profile-image.about-slider .about-slider-arrow:hover{background:var(--red);border-color:var(--red)}
    #about .profile-image.about-slider .about-slider-dots{display:flex;gap:8px;pointer-events:auto}
    #about .profile-image.about-slider .about-slider-dots button{width:9px;height:9px;padding:0;border:1px solid #fff;border-radius:50%;background:transparent;cursor:pointer}
    #about .profile-image.about-slider .about-slider-dots button.active{background:#fff}
  `;
  document.head.appendChild(style);

  const slides = [...frame.querySelectorAll('.about-slide')];
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
  frame.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, {passive:true});
  frame.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1));
  }, {passive:true});
})();