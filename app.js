(() => {
  const load = (src, done) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = done || null;
    script.defer = true;
    document.head.appendChild(script);
  };

  load('app-base.js?v=20260726-5', () => {
    load('service-flow.js?v=20260726-5');
  });
})();
