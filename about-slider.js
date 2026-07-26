(() => {
  const frame = document.querySelector('#about .profile-image');
  if (!frame) return;

  frame.innerHTML = '';
  frame.classList.add('about-slider');

  const sources = [
    {src:'assets/saeed-kiadarbandsari.png', alt:'دکتر سعید کیادربندسری'},
    {src:'assets/about-engineer-02.png', alt:'دکتر سعید کیادربندسری با پوشش مهندسی'}
  ];

  const slides = sources.map((item,index) => {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.className = `about-slide${index===0?' active':''}`;
    if(index===1) img.loading = 'lazy';
    frame.appendChild(img);
    return img;
  });

  const controls = document.createElement('div');
  controls.className = 'about-slider-controls';
  controls.innerHTML = '<button type="button" class="about-slider-arrow about-prev" aria-label="تصویر قبلی">‹</button><div class="about-slider-dots"><button type="button" class="active" data-index="0" aria-label="تصویر اول"></button><button type="button" data-index="1" aria-label="تصویر دوم"></button></div><button type="button" class="about-slider-arrow about-next" aria-label="تصویر بعدی">›</button>';
  frame.appendChild(controls);

  const style = document.createElement('style');
  style.textContent = '#about .profile-image.about-slider{position:relative;overflow:hidden}#about .profile-image.about-slider .about-slide{display:none;width:100%;height:100%;object-fit:cover;object-position:center 12%;filter:saturate(.75)}#about .profile-image.about-slider .about-slide.active{display:block}#about .about-slider-controls{position:absolute;right:18px;left:18px;bottom:18px;z-index:5;display:flex;align-items:center;justify-content:space-between;pointer-events:none}#about .about-slider-arrow{pointer-events:auto;width:42px;height:42px;border:1px solid rgba(255,255,255,.58);background:rgba(17,17,17,.65);color:#fff;font-size:27px;cursor:pointer}#about .about-slider-dots{display:flex;gap:8px;pointer-events:auto}#about .about-slider-dots button{width:9px;height:9px;padding:0;border:1px solid #fff;border-radius:50%;background:transparent;cursor:pointer}#about .about-slider-dots button.active{background:#fff}';
  document.head.appendChild(style);

  const dots = [...controls.querySelectorAll('.about-slider-dots button')];
  let current = 0;
  const show = index => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide,i)=>slide.classList.toggle('active',i===current));
    dots.forEach((dot,i)=>dot.classList.toggle('active',i===current));
  };
  controls.querySelector('.about-prev').addEventListener('click',()=>show(current-1));
  controls.querySelector('.about-next').addEventListener('click',()=>show(current+1));
  dots.forEach(dot=>dot.addEventListener('click',()=>show(Number(dot.dataset.index))));
})();