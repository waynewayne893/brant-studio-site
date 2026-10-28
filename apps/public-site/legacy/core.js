export const PAGE_KEYS = Object.freeze([
  'home', 'about', 'research', 'projects', 'lab',
  'journal', 'music', 'life', 'gallery', 'now',
]);

const HOME = Object.freeze({ page: 'home', slug: null });

export function parseRoute(hash) {
  if (typeof hash !== 'string') return { ...HOME };
  const match = /^#\/([a-z]+)(?:\/([a-z0-9-]+))?$/.exec(hash);
  if (!match) return { ...HOME };
  const [, page, slug = null] = match;
  if (!PAGE_KEYS.includes(page)) return { ...HOME };
  if (slug && !['journal', 'projects'].includes(page)) return { ...HOME };
  return { page, slug };
}

export function normalizeLang(value) {
  return value === 'en' ? 'en' : 'zh';
}
