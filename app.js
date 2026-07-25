const body=document.body;
const html=document.documentElement;

function ensureSocialStrip(){
  if(document.querySelector('.social-strip')) return;
  const strip=document.createElement('div');
  strip.className='social-strip';
  strip.innerHTML=`<div class="strip-contact"><a href="tel:+982126313946">۰۲۱ ۲۶۳۱ ۳۹۴۶</a><span>تهران، پاسداران</span></div><div class="strip-social" aria-label="شبکه‌های اجتماعی"><a href="https://instagram.com/omran_kia" target="_blank" rel="noopener">Instagram <b>@omran_kia</b></a><a href="https://youtube.com/@omran_kia" target="_blank" rel="noopener">YouTube <b>@omran_kia</b></a><a href="https://t.me/omran_kia" target="_blank" rel="noopener">Telegram <b>@omran_kia</b></a></div>`;
  document.body.prepend(strip);
}
ensureSocialStrip();
const socialStrip=document.querySelector('.social-strip');
if(socialStrip) socialStrip.style.flexDirection='row-reverse';

const menuButton=document.querySelector('#menu-toggle');
const nav=document.querySelector('#main-nav');
menuButton?.addEventListener('click',()=>nav?.classList.toggle('open'));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>nav.classList.remove('open')));

const langButton=document.querySelector('#lang-toggle');
let lang=localStorage.getItem('aps-lang')||'fa';
function setLanguage(next){
  lang=next;
  const isFa=lang==='fa';
  body.classList.toggle('lang-en',!isFa);
  html.lang=lang;
  html.dir=isFa?'rtl':'ltr';
  document.querySelectorAll('[data-fa][data-en]').forEach(el=>{el.innerHTML=el.dataset[lang]});
  if(langButton) langButton.textContent=isFa?'EN':'فا';
  localStorage.setItem('aps-lang',lang);
}
if(langButton){
  setLanguage(lang);
  langButton.addEventListener('click',()=>setLanguage(lang==='fa'?'en':'fa'));
}

const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.1}):null;
document.querySelectorAll('.reveal').forEach(el=>observer?observer.observe(el):el.classList.add('visible'));

document.querySelectorAll('#year').forEach(el=>el.textContent=new Date().getFullYear());

if(document.querySelector('.research-hero')){
  body.classList.add('article-page');
  const footer=document.querySelector('footer');
  if(footer){
    footer.innerHTML=`<div class="footer-main"><div class="footer-brand"><span class="logo-mini logo-large"></span><div><h2>ابنیه سازان پایدار شمیران</h2><p>پژوهش، طراحی و اجرای مهندسی</p></div></div><div class="footer-col"><small>دسترسی سریع</small><a href="index.html">صفحه اصلی</a><a href="index.html#projects">پروژه‌ها</a><a href="index.html#request">درخواست مشاوره</a></div><div class="footer-col"><small>شبکه‌های اجتماعی</small><a href="https://instagram.com/omran_kia" target="_blank" rel="noopener">Instagram</a><a href="https://youtube.com/@omran_kia" target="_blank" rel="noopener">YouTube</a><a href="https://t.me/omran_kia" target="_blank" rel="noopener">Telegram</a></div><div class="footer-col"><small>ارتباط</small><a href="tel:+982126313946">۰۲۱ ۲۶۳۱ ۳۹۴۶</a><a href="tel:+989125361958">۰۹۱۲ ۵۳۶ ۱۹۵۸</a><a href="mailto:Abniyeh_sazan_Shemiran@gmail.com">ایمیل شرکت</a></div></div><div class="footer-bottom"><span>© <span id="year">${new Date().getFullYear()}</span> ABNIEH SAZAN PAYDAR SHEMIRAN</span><span>مسئولیت محدود</span></div>`;
  }
}

const legacyProjects=[
  {
    id:'villa-supervision',
    title:'نظارت بر اجرای ویلای مدرن سه‌طبقه',
    service:'نظارت فنی',
    summary:'نظارت تخصصی از قالب‌بندی و آرماتورگذاری فونداسیون تا نصب اسکلت فلزی، اجرای دیوار برشی، سقف عرشه فولادی، تأسیسات مکانیکی، استخر، نازک‌کاری و نمای نهایی.',
    meta:['ویلای مدرن','سال ۱۳۹۹','سازه فلزی','نظارت از فونداسیون تا تحویل'],
    cover:'assets/projects/villa-supervision/04-steel-frame.webp',
    images:[
      'assets/projects/villa-supervision/01-foundation.webp',
      'assets/projects/villa-supervision/02-formwork.webp',
      'assets/projects/villa-supervision/03-baseplate.webp',
      'assets/projects/villa-supervision/04-steel-frame.webp',
      'assets/projects/villa-supervision/05-shear-wall.webp',
      'assets/projects/villa-supervision/06-deck-concrete.webp',
      'assets/projects/villa-supervision/07-mep.webp',
      'assets/projects/villa-supervision/08-facade.webp'
    ]
  },
  {
    id:'pasdaran-renovation',
    title:'بازسازی کامل واحد مسکونی',
    service:'اجرا',
    summary:'اجرای صفر تا صد بازسازی شامل تخریب کنترل‌شده، اصلاح پلان، بازطراحی تأسیسات، نوسازی کف و دیوارها، سقف و نورپردازی، آشپزخانه مدرن و بازسازی کامل سرویس‌ها.',
    meta:['مجری پروژه','۱۰۰ مترمربع','تهران، پاسداران','بازسازی صفر تا صد'],
    cover:'assets/projects/pasdaran-renovation/05-final.webp',
    images:[
      'assets/projects/pasdaran-renovation/01-before.webp',
      'assets/projects/pasdaran-renovation/02-demolition.webp',
      'assets/projects/pasdaran-renovation/03-utilities.webp',
      'assets/projects/pasdaran-renovation/04-wall-prep.webp',
      'assets/projects/pasdaran-renovation/05-final.webp',
      'assets/projects/pasdaran-renovation/06-kitchen.webp',
      'assets/projects/pasdaran-renovation/07-entry.webp',
      'assets/projects/pasdaran-renovation/08-bathroom.webp'
    ]
  }
];

const projectsGrid=document.querySelector('#projectsGrid');
const filterButtons=document.querySelectorAll('.project-filter button');
let projects=[];
let currentProject=null;
let currentSlide=0;

function renderProjects(filter='all'){
  if(!projectsGrid) return;
  const visible=projects.filter(p=>filter==='all'||p.service===filter);
  projectsGrid.innerHTML='';
  if(!visible.length){
    projectsGrid.innerHTML='<p class="empty-state">پروژه‌ای در این دسته ثبت نشده است.</p>';
    return;
  }
  visible.forEach((project,index)=>{
    const card=document.createElement('button');
    card.type='button';
    card.className='project-card reveal visible';
    card.setAttribute('aria-label',`مشاهده ${project.title}`);
    const meta=Array.isArray(project.meta)?project.meta.slice(0,3).join(' • '):'';
    card.innerHTML=`<div class="project-image"><img loading="lazy" src="${project.cover}" alt="${project.title}"><span class="project-index">${String(index+1).padStart(2,'0')}</span></div><div class="project-body"><div><h3>${project.title}</h3><p>${meta}</p></div><span>${project.service}</span></div>`;
    card.addEventListener('click',()=>openGallery(project));
    projectsGrid.append(card);
  });
}

if(projectsGrid){
  fetch('projects.json',{cache:'no-store'})
    .then(response=>response.ok?response.json():Promise.reject(new Error('projects.json')))
    .then(data=>{
      projects=[...legacyProjects,...data.filter(item=>!legacyProjects.some(old=>old.id===item.id))];
      renderProjects();
    })
    .catch(()=>{
      projects=[...legacyProjects];
      renderProjects();
    });
}

filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  renderProjects(button.dataset.filter);
}));

const modal=document.querySelector('#galleryModal');
const slideImage=document.querySelector('#slideImage');
const thumbs=document.querySelector('#thumbs');
const slideCounter=document.querySelector('#slideCounter');

function openGallery(project){
  if(!modal||!slideImage||!thumbs) return;
  currentProject=project;
  currentSlide=0;
  document.querySelector('#modalTitle').textContent=project.title;
  document.querySelector('#modalService').textContent=project.service;
  document.querySelector('#modalSummary').textContent=project.summary||'';
  document.querySelector('#modalMeta').innerHTML=(project.meta||[]).map(item=>`<b>${item}</b>`).join('');
  thumbs.innerHTML=(project.images||[]).map((src,index)=>`<button type="button" data-index="${index}" aria-label="تصویر ${index+1}"><img src="${src}" alt="" loading="lazy"></button>`).join('');
  thumbs.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>showSlide(Number(button.dataset.index))));
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  body.classList.add('modal-open');
  showSlide(0);
}
function showSlide(index){
  if(!currentProject||!currentProject.images?.length) return;
  currentSlide=(index+currentProject.images.length)%currentProject.images.length;
  slideImage.src=currentProject.images[currentSlide];
  slideImage.alt=`${currentProject.title}، تصویر ${currentSlide+1}`;
  slideCounter.textContent=`${currentSlide+1} / ${currentProject.images.length}`;
  thumbs.querySelectorAll('button').forEach((button,i)=>button.classList.toggle('active',i===currentSlide));
}
function closeGallery(){
  modal?.classList.remove('open');
  modal?.setAttribute('aria-hidden','true');
  body.classList.remove('modal-open');
}
document.querySelector('.gallery-close')?.addEventListener('click',closeGallery);
document.querySelector('.gallery-nav.prev')?.addEventListener('click',()=>showSlide(currentSlide-1));
document.querySelector('.gallery-nav.next')?.addEventListener('click',()=>showSlide(currentSlide+1));
modal?.addEventListener('click',event=>{if(event.target===modal)closeGallery()});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape')closeGallery();
  if(modal?.classList.contains('open')&&event.key==='ArrowLeft')showSlide(currentSlide+1);
  if(modal?.classList.contains('open')&&event.key==='ArrowRight')showSlide(currentSlide-1);
});
let touchStart=0;
slideImage?.addEventListener('touchstart',event=>touchStart=event.changedTouches[0].clientX,{passive:true});
slideImage?.addEventListener('touchend',event=>{
  const distance=event.changedTouches[0].clientX-touchStart;
  if(Math.abs(distance)>45)showSlide(currentSlide+(distance<0?1:-1));
},{passive:true});

const projectForm=document.querySelector('#project-form');
projectForm?.addEventListener('submit',event=>{
  event.preventDefault();
  const form=new FormData(projectForm);
  const lines=[
    'سلام، برای مشاوره پروژه پیام می‌دهم.',
    `نام: ${form.get('name')}`,
    `شماره تماس: ${form.get('phone')}`,
    `نوع خدمات: ${form.get('type')}`,
    `توضیحات: ${form.get('details')}`
  ];
  window.open(`https://wa.me/989125361958?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener');
});
