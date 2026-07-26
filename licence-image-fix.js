(() => {
  const image = document.querySelector('#documents .document-image');
  if (!image) return;
  const source = 'assets/images/documents/parvane-nezam-mohandesi-restored.jpg?v=20260726-3';
  image.src = source;
  image.removeAttribute('srcset');
  const link = image.closest('a');
  if (link) link.href = source;
})();