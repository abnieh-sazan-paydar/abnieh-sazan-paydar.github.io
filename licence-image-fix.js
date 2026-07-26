(() => {
  const image = document.querySelector('#documents .document-image');
  if (!image) return;

  const link = image.closest('a');
  const parts = [
    'assets/images/documents/licence-part-00.txt?v=20260726-2',
    'assets/images/documents/licence-part-01.txt?v=20260726-2',
    'assets/images/documents/licence-part-02.txt?v=20260726-2'
  ];

  Promise.all(parts.map(path => fetch(path, { cache: 'no-store' }).then(response => {
    if (!response.ok) throw new Error(path);
    return response.text();
  }))).then(chunks => {
    const source = `data:image/webp;base64,${chunks.join('').replace(/\s+/g, '')}`;
    image.src = source;
    image.removeAttribute('srcset');
    if (link) link.href = source;
  }).catch(() => {
    image.src = 'assets/images/documents/parvane-nezam-mohandesi.png';
  });
})();
