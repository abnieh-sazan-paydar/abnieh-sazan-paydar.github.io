(() => {
  const services = document.querySelector('#services');
  if (!services) return;

  services.classList.add('services-flow');

  const oldLink = document.querySelector('link[data-services-flow]');
  if (oldLink) oldLink.remove();

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'services-flow.css?v=20260726-4';
  link.dataset.servicesFlow = 'true';
  document.head.appendChild(link);

  services.querySelector('.service-grid')?.setAttribute('aria-label', 'فرآیند خدمات شرکت');
})();
