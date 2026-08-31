(() => {
  const frame = document.querySelector('#about .profile-image');
  if (frame && !frame.classList.contains('technical-profile-visual') && frame.dataset.finalSliderReady !== 'true') {
    frame.dataset.finalSliderReady = 'true';
    frame.innerHTML = `
      <div class="about-final-slides">
        <img class="about-final-slide active" src="assets/saeed-kiadarbandsari.png" alt="دکتر سعید کیادربندسری">
       <img class="about-final-slide" src="assets/about-engineer-02.png" alt="دکتر سعید کیادربندسری با پوشش مهندسی" loading="lazy">
      </div>
      <div class="about-final-controls">
        <button type="button" class="about-final-arrow about-final-prev" aria-label="تصویر قبلی">‹</button>
        <div class="about-final-dots" aria-label="انتخاب تصویر">
          <button type="button" class="active" data-index="0" aria-label="تصویر اول"></button>
          <button type="button" data-index="1" aria-label="تصویر دوم"></button>
        </div>
        <button type="button" class="about-final-arrow about-final-next" aria-label="تصویر بعدی">›</button>
      </div>`;

    const style = document.createElement('style');
    style.textContent = `
      #about .profile-image{position:relative;isolation:isolate}
      #about .about-final-slides{position:absolute;inset:0;z-index:1;background:#252525}
      #about .about-final-slide{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 12%;opacity:0;visibility:hidden;transition:opacity .35s ease;filter:saturate(.75)}
      #about .about-final-slide.active{opacity:1;visibility:visible}
      #about .about-final-controls{position:absolute;right:18px;left:18px;bottom:18px;z-index:3;display:flex;align-items:center;justify-content:space-between;pointer-events:none}
      #about .about-final-arrow{pointer-events:auto;width:42px;height:42px;border:1px solid rgba(255,255,255,.58);background:rgba(17,17,17,.58);color:#fff;font-size:27px;line-height:1;cursor:pointer;backdrop-filter:blur(7px)}
      #about .about-final-arrow:hover{background:var(--red);border-color:var(--red)}
      #about .about-final-dots{display:flex;gap:8px;pointer-events:auto}
      #about .about-final-dots button{width:9px;height:9px;padding:0;border:1px solid #fff;border-radius:50%;background:transparent;cursor:pointer}
      #about .about-final-dots button.active{background:#fff}`;
    document.head.appendChild(style);

    const slides = [...frame.querySelectorAll('.about-final-slide')];
    const dots = [...frame.querySelectorAll('.about-final-dots button')];
    let current = 0;
    const show = index => {
      current = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle('active', i === current));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    };
    frame.querySelector('.about-final-prev').addEventListener('click', () => show(current - 1));
    frame.querySelector('.about-final-next').addEventListener('click', () => show(current + 1));
    dots.forEach(dot => dot.addEventListener('click', () => show(Number(dot.dataset.index))));
    let touchStart = 0;
    frame.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
    frame.addEventListener('touchend', event => {
      const distance = event.changedTouches[0].clientX - touchStart;
      if (Math.abs(distance) > 45) show(current + (distance < 0 ? 1 : -1));
    }, { passive: true });
  }

  const licenceImage = document.querySelector('#documents .document-image');
  if (licenceImage) {
    const licencePath = 'assets/images/documents/parvane-nezam-mohandesi.jpg';
    licenceImage.src = licencePath;
    licenceImage.removeAttribute('srcset');
    const licenceLink = licenceImage.closest('a');
    if (licenceLink) licenceLink.href = licencePath;
  }
})();
