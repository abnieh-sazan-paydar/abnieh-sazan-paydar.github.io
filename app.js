(() => {
  const applyAssetOverrides = () => {
    document.querySelectorAll('.brand img, .footer-brand img').forEach((img) => {
      img.src = 'assets/header-logo.png?v=20260727-2';
    });

    if (!document.querySelector('link[data-asset-overrides]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'asset-overrides.css?v=20260727-2';
      link.dataset.assetOverrides = 'true';
      document.head.appendChild(link);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAssetOverrides, { once: true });
  } else {
    applyAssetOverrides();
  }

  const load = (src, done) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = done || null;
    script.defer = true;
    document.head.appendChild(script);
  };

  load('app-base.js?v=20260726-5', () => {
    load('service-flow.js?v=20260726-5', () => {
      load('footer-registration.js?v=20260726-1', () => {
        load('site-final-fix.js?v=20260831-2');
      });
    });
  });
})();
