from pathlib import Path

INDEX = Path("index.html")
STYLES = Path("styles.css")

old_social = '''    <div class="strip-social" aria-label="شبکه‌های اجتماعی">
      <a href="https://instagram.com/omran_kia" target="_blank" rel="noopener">Instagram <b>@omran_kia</b></a>
      <a href="https://youtube.com/@omran_kia" target="_blank" rel="noopener">YouTube <b>@omran_kia</b></a>
      <a href="https://t.me/omran_kia" target="_blank" rel="noopener">Telegram <b>@omran_kia</b></a>
    </div>'''

new_social = '''    <div class="strip-social social-icons" aria-label="شبکه‌های اجتماعی">
      <a class="social-icon instagram" href="https://instagram.com/omran_kia" target="_blank" rel="noopener noreferrer" aria-label="اینستاگرام عمران کیا" title="Instagram — @omran_kia">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm9.45 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>
        <span class="sr-only">Instagram</span>
      </a>
      <a class="social-icon youtube" href="https://youtube.com/@omran_kia" target="_blank" rel="noopener noreferrer" aria-label="یوتیوب عمران کیا" title="YouTube — @omran_kia">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.3 6.2a3 3 0 0 0-2.1-2.1C19.3 3.6 12 3.6 12 3.6s-7.3 0-9.2.5A3 3 0 0 0 .7 6.2 31 31 0 0 0 .2 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.2.5 9.2.5s7.3 0 9.2-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-5.8 31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
        <span class="sr-only">YouTube</span>
      </a>
      <a class="social-icon telegram" href="https://t.me/omran_kia" target="_blank" rel="noopener noreferrer" aria-label="کانال تلگرام عمران کیا" title="Telegram — @omran_kia">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22.6 2.4a1.5 1.5 0 0 0-1.55-.22L2.3 9.42c-1.28.5-1.27 1.22-.23 1.54l4.82 1.5 1.84 5.66c.24.67.12.94.83.94.55 0 .8-.25 1.1-.55l2.34-2.28 4.87 3.6c.9.5 1.55.24 1.78-.83l3.22-15.17c.33-1.32-.5-1.92-1.27-1.43ZM8.5 12.12l9.4-5.93c.47-.28.9-.13.55.18l-7.76 7-.3 3.2-1.89-4.45Z"/></svg>
        <span class="sr-only">Telegram</span>
      </a>
    </div>'''

old_footer = '''      <div class="footer-brand">
        <img src="assets/header-logo.webp" alt="لوگوی شرکت">
        <div><h2>ابنیه سازان پایدار شمیران</h2><p>ارائه خدمات تخصصی در طراحی و اجرای پروژه‌های عمرانی و معماری</p></div>
      </div>'''

new_footer = '''      <div class="footer-brand">
        <img src="assets/header-logo.webp" alt="لوگوی شرکت">
        <div class="footer-brand-copy">
          <h2>ابنیه سازان پایدار شمیران</h2>
          <p>ارائه خدمات تخصصی در طراحی و اجرای پروژه‌های عمرانی و معماری</p>
          <div class="company-registration" aria-label="اطلاعات ثبتی شرکت">
            <span>شماره ثبت: <bdi>633877</bdi></span>
            <span>شناسه ملی: <bdi>14013492949</bdi></span>
          </div>
        </div>
      </div>'''

css_addition = r'''

/* social icon and company registration refinements */
.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.strip-social.social-icons{gap:10px}
.social-icons .social-icon{width:27px;height:27px;border:1px solid rgba(255,255,255,.32);border-radius:50%;display:grid;place-items:center;color:#fff;background:rgba(255,255,255,.04);transition:transform .2s ease,background-color .2s ease,border-color .2s ease}
.social-icons .social-icon svg{display:block;width:14px;height:14px;fill:currentColor}
.social-icons .social-icon:hover{transform:translateY(-2px);color:#fff}
.social-icons .instagram:hover{background:#e4405f;border-color:#e4405f}
.social-icons .youtube:hover{background:#ff0000;border-color:#ff0000}
.social-icons .telegram:hover{background:#229ed9;border-color:#229ed9}
.footer-brand-copy{min-width:0}
.company-registration{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:14px;padding-top:12px;border-top:1px solid #333}
.company-registration span{font-size:10px;color:#aaa;white-space:nowrap}
.company-registration bdi{font:600 10px var(--latin);color:#fff;direction:ltr;unicode-bidi:isolate;letter-spacing:.35px}
@media(max-width:820px){.strip-social.social-icons{justify-content:center;gap:13px}.social-icons .social-icon{width:29px;height:29px}.social-icons .social-icon svg{width:15px;height:15px}}
@media(max-width:560px){.strip-social.social-icons{justify-content:center;gap:15px}.company-registration{align-items:flex-start;flex-direction:column;gap:4px}}
'''

html = INDEX.read_text(encoding="utf-8")
if old_social in html:
    html = html.replace(old_social, new_social, 1)
elif 'class="strip-social social-icons"' not in html:
    raise RuntimeError("The social links block could not be located.")

if old_footer in html:
    html = html.replace(old_footer, new_footer, 1)
elif 'class="company-registration"' not in html:
    raise RuntimeError("The footer brand block could not be located.")

INDEX.write_text(html, encoding="utf-8")

css = STYLES.read_text(encoding="utf-8")
if "/* social icon and company registration refinements */" not in css:
    STYLES.write_text(css + css_addition, encoding="utf-8")
