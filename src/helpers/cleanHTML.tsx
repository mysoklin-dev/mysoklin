/**
 * Membersihkan HTML dari style inline, class, dan tag <span> yang tidak diperlukan.
 * @param rawHTML - String HTML mentah yang ingin dibersihkan.
 * @returns String HTML yang sudah dibersihkan.
 */
export const cleanHTMLContent = (rawHTML: string): string => {
  // Pastikan DOMParser tersedia (hindari error di server-side rendering)
  if (typeof window === 'undefined') return rawHTML;

  // Parse HTML string to DOM
  const parser = new DOMParser();
  const doc = parser.parseFromString(rawHTML, 'text/html');

  // Hapus semua atribut style dan class
  doc.querySelectorAll<HTMLElement>('[style], [class]').forEach((el) => {
    el.removeAttribute('style');
    el.removeAttribute('class');
  });

  // Hapus semua tag <span> yang tidak perlu
  doc.querySelectorAll<HTMLSpanElement>('span').forEach((el) => {
    const parent = el.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(el.textContent || ''), el);
    }
  });

  return doc.body.innerHTML;
};
