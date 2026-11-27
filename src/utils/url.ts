/**
 * Monta um endereço interno respeitando o caminho base do site
 * (`/asimovjr-site/` no GitHub Pages, `/` na Hostinger).
 *
 * @example url('blog') // "/asimovjr-site/blog" no GitHub Pages
 * @example url('#contato') // "/asimovjr-site/#contato"
 */
export function url(path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (path === '' || path === '/') return `${base}/`;
  if (path.startsWith('#')) return `${base}/${path}`;
  return `${base}/${path.replace(/^\//, '')}`;
}
