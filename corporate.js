(() => {
  const body = document.body;

  document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
    dropdown.addEventListener('toggle', () => {
      if (!dropdown.open) return;
      document.querySelectorAll('.nav-dropdown').forEach((item) => {
        if (item !== dropdown) item.removeAttribute('open');
      });
    });
  });

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.nav-dropdown[open]').forEach((dropdown) => {
      if (!dropdown.contains(event.target)) dropdown.removeAttribute('open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.nav-dropdown[open]').forEach((dropdown) => dropdown.removeAttribute('open'));
    }
  });

  const serviceSelect = document.querySelector('#project-form select[name="type"]');
  document.querySelectorAll('[data-service-choice]').forEach((link) => {
    link.addEventListener('click', () => {
      if (!serviceSelect) return;
      const requested = link.dataset.serviceChoice;
      const option = Array.from(serviceSelect.options).find((item) => item.textContent.trim() === requested);
      if (option) serviceSelect.value = option.value;
    });
  });

  const publicationSearch = document.querySelector('#publication-search');
  if (publicationSearch) {
    const publications = Array.from(document.querySelectorAll('.publication'));
    const applyPublicationSearch = () => {
      const query = publicationSearch.value.trim().toLocaleLowerCase('fa');
      const activeFilter = document.querySelector('.filter-bar button.active')?.dataset.filter || 'all';
      publications.forEach((publication) => {
        const matchesText = !query || publication.textContent.toLocaleLowerCase('fa').includes(query);
        const matchesCategory = activeFilter === 'all' || publication.dataset.category === activeFilter;
        publication.classList.toggle('hidden', !(matchesText && matchesCategory));
      });
    };
    publicationSearch.addEventListener('input', applyPublicationSearch);
    document.querySelectorAll('.filter-bar button').forEach((button) => {
      button.addEventListener('click', () => window.setTimeout(applyPublicationSearch, 0));
    });
  }

  const header = document.querySelector('.site-header');
  const updateHeaderState = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Intl.NumberFormat('fa-IR', { useGrouping: false }).format(new Date().getFullYear());
  });

  body.classList.add('corporate-ready');
})();
