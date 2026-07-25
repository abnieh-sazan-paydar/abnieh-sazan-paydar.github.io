from pathlib import Path
import base64
import json
import hashlib
import shutil
import zipfile

ROOT = Path(__file__).resolve().parents[1]
TEMP_DIR = ROOT / "tmp" / "shemshak_project_bundle"
ASSET_DIR = ROOT / "assets" / "projects" / "shemshak-residential-7-storey"

# Rebuild and extract the selected, web-optimised project images.
parts = sorted(TEMP_DIR.glob("tiny*.txt"))
if not parts:
    raise SystemExit("Project image bundle parts were not found.")

encoded = "".join(part.read_text(encoding="utf-8").strip() for part in parts)
zip_path = TEMP_DIR / "images.zip"
zip_bytes = base64.b64decode(encoded)
expected_sha256 = "b7a1ee2c12290c9dd1b3f0178f1524c18043e3bc280280f8f3950395bc78e924"
if hashlib.sha256(zip_bytes).hexdigest() != expected_sha256:
    raise SystemExit("Project image bundle checksum mismatch.")
zip_path.write_bytes(zip_bytes)

ASSET_DIR.mkdir(parents=True, exist_ok=True)
with zipfile.ZipFile(zip_path) as archive:
    archive.extractall(ASSET_DIR)

# Add the design category and a visible caption overlay to the project gallery.
index_path = ROOT / "index.html"
index = index_path.read_text(encoding="utf-8")

if 'data-filter="طراحی سازه"' not in index:
    index = index.replace(
        '<button data-filter="اجرا">اجرا</button>',
        '<button data-filter="اجرا">اجرا</button>\n'
        '        <button data-filter="طراحی سازه">طراحی سازه</button>'
    )

if '<option>طراحی سازه</option>' not in index:
    index = index.replace(
        '<option>طراحی یکپارچه</option>',
        '<option>طراحی یکپارچه</option><option>طراحی سازه</option>'
    )

if 'id="slideCaption"' not in index:
    index = index.replace(
        '<div id="slideCounter" class="slide-counter"></div>',
        '<div id="slideCaption" class="slide-caption" aria-live="polite"></div>'
        '<div id="slideCounter" class="slide-counter"></div>'
    )

index_path.write_text(index, encoding="utf-8")

# Make the gallery backward-compatible with old string image paths and new
# image objects containing both src and caption.
app_path = ROOT / "app.js"
app = app_path.read_text(encoding="utf-8")

if "const slideCaption=document.querySelector('#slideCaption');" not in app:
    app = app.replace(
        "const slideCounter=document.querySelector('#slideCounter');",
        "const slideCounter=document.querySelector('#slideCounter');\n"
        "const slideCaption=document.querySelector('#slideCaption');"
    )

if "function normalizeProjectImage(image)" not in app:
    app = app.replace(
        "function openGallery(project){",
        "function normalizeProjectImage(image){\n"
        "  return typeof image==='string'?{src:image,caption:''}:image;\n"
        "}\n\n"
        "function openGallery(project){"
    )

old_thumbs = "thumbs.innerHTML=(project.images||[]).map((src,index)=>`<button type=\"button\" data-index=\"${index}\" aria-label=\"تصویر ${index+1}\"><img src=\"${src}\" alt=\"\" loading=\"lazy\"></button>`).join('');"
new_thumbs = "thumbs.innerHTML=(project.images||[]).map((image,index)=>{const item=normalizeProjectImage(image);return `<button type=\"button\" data-index=\"${index}\" aria-label=\"تصویر ${index+1}: ${item.caption||project.title}\"><img src=\"${item.src}\" alt=\"${item.caption||''}\" loading=\"lazy\"></button>`}).join('');"
if old_thumbs in app:
    app = app.replace(old_thumbs, new_thumbs)

old_slide = """  currentSlide=(index+currentProject.images.length)%currentProject.images.length;
  slideImage.src=currentProject.images[currentSlide];
  slideImage.alt=`${currentProject.title}، تصویر ${currentSlide+1}`;
  slideCounter.textContent=`${currentSlide+1} / ${currentProject.images.length}`;"""
new_slide = """  currentSlide=(index+currentProject.images.length)%currentProject.images.length;
  const item=normalizeProjectImage(currentProject.images[currentSlide]);
  slideImage.src=item.src;
  slideImage.alt=item.caption||`${currentProject.title}، تصویر ${currentSlide+1}`;
  if(slideCaption){
    slideCaption.textContent=item.caption||'';
    slideCaption.hidden=!item.caption;
  }
  slideCounter.textContent=`${currentSlide+1} / ${currentProject.images.length}`;"""
if old_slide in app:
    app = app.replace(old_slide, new_slide)

app_path.write_text(app, encoding="utf-8")

# Add unobtrusive captions directly over each full-size image.
styles_path = ROOT / "styles.css"
styles = styles_path.read_text(encoding="utf-8")
caption_css = r"""

/* project gallery image captions */
.slide-caption{
  position:absolute;
  right:50%;
  bottom:44px;
  transform:translateX(50%);
  z-index:2;
  max-width:min(82%,760px);
  padding:9px 14px;
  background:rgba(0,0,0,.72);
  color:#fff;
  font-size:12px;
  line-height:1.9;
  text-align:center;
  backdrop-filter:blur(5px);
}
.slide-caption[hidden],.slide-caption:empty{display:none}
@media(max-width:560px){
  .slide-caption{bottom:40px;max-width:88%;padding:7px 10px;font-size:10px;line-height:1.75}
}
"""
if "/* project gallery image captions */" not in styles:
    styles += caption_css
styles_path.write_text(styles, encoding="utf-8")

# Register the project with precise role wording: structural designer, not executor.
projects_path = ROOT / "projects.json"
projects = json.loads(projects_path.read_text(encoding="utf-8"))
project_id = "shemshak-residential-7-storey"
projects = [item for item in projects if item.get("id") != project_id]
projects.append({
    "id": project_id,
    "title": "طراحی سازه ساختمان مسکونی هفت‌طبقه در شمشک",
    "service": "طراحی سازه",
    "summary": "طراحی سازه یک ساختمان مسکونی هفت‌طبقه با حدود ۱۰۰۰ مترمربع زیربنا در شمشک؛ شامل مدل‌سازی و تحلیل، طراحی اعضای باربر و اتصالات و تهیه نقشه‌های اجرایی سازه متناسب با محدودیت‌های زمین و شرایط اقلیمی منطقه.",
    "meta": ["طراحی سازه", "کاربری مسکونی", "۷ طبقه", "۱۰۰۰ مترمربع زیربنا", "شمشک"],
    "cover": "assets/projects/shemshak-residential-7-storey/09-current-progress.webp",
    "images": [
        {
            "src": "assets/projects/shemshak-residential-7-storey/01-before.webp",
            "caption": "وضعیت اولیه ساختمان پیش از تخریب و آغاز عملیات اجرایی"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/02-cleared-site.webp",
            "caption": "پاک‌سازی زمین و آماده‌سازی بستر پروژه پس از تخریب"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/03-foundation-rebar.webp",
            "caption": "آرماتوربندی اجزای فونداسیون و ریشه‌های قائم در مجاورت جداره موجود"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/04-foundation-formwork.webp",
            "caption": "تکمیل شبکه آرماتور و قالب‌بندی فونداسیون پیش از بتن‌ریزی"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/05-steel-fabrication.webp",
            "caption": "ساخت و مونتاژ تیرها و ستون‌های فولادی با مقاطع ورق‌جوش در کارگاه"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/06-weld-penetrant-test.webp",
            "caption": "کنترل کیفی سطح جوش با آزمون مایع نافذ در مرحله ساخت قطعات"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/07-site-frame-installation.webp",
            "caption": "نصب ستون‌ها و تیرهای اصلی اسکلت فولادی در شرایط زمستانی شمشک"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/08-complete-steel-frame.webp",
            "caption": "نمای کلی اسکلت هفت‌طبقه پس از تکمیل بخش عمده اعضای باربر و تیرهای فرعی"
        },
        {
            "src": "assets/projects/shemshak-residential-7-storey/09-current-progress.webp",
            "caption": "ادامه عملیات اجرایی طبقات و حفاظت موقت کارگاه در فصل سرد"
        }
    ]
})
projects_path.write_text(
    json.dumps(projects, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8"
)

# Remove one-shot deployment helpers and encoded bundle parts from the final repository.
shutil.rmtree(TEMP_DIR, ignore_errors=True)
for relative in [
    ".github/workflows/apply-shemshak-project.yml",
    "scripts/apply_shemshak_project.py",
]:
    path = ROOT / relative
    if path.exists():
        path.unlink()

scripts_dir = ROOT / "scripts"
if scripts_dir.exists() and not any(scripts_dir.iterdir()):
    scripts_dir.rmdir()
tmp_dir = ROOT / "tmp"
if tmp_dir.exists() and not any(tmp_dir.iterdir()):
    tmp_dir.rmdir()
