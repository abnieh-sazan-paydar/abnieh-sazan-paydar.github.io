(() => {
  const footerBrand = document.querySelector('footer .footer-brand > div');
  if (!footerBrand || footerBrand.querySelector('.company-registration')) return;

  const registration = document.createElement('p');
  registration.className = 'company-registration';
  registration.textContent = 'شماره ثبت: ۶۳۳۸۷۷ | شناسه ملی: ۱۴۰۱۳۴۹۲۹۴۹';
  footerBrand.appendChild(registration);
})();
