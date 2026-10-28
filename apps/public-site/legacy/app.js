import { parseRoute, normalizeLang } from './core.js';
import { pageData, galleryItems, journalCategories, lifeCategories, getText, safeImagePath } from './content.js';
import { renderNav, renderPage, renderFooter, escapeHtml } from './render.js';

const LANGUAGE_KEY = 'personal-space-language';

export function readStoredLanguage(storage) {
  try {
    return normalizeLang(storage?.getItem(LANGUAGE_KEY));
  } catch {
    return 'zh';
  }
}

export function writeStoredLanguage(storage, lang) {
  try {
    storage?.setItem(LANGUAGE_KEY, normalizeLang(lang));
  } catch {
    // Storage may be disabled by privacy settings; the in-memory choice still works.
  }
}

export function closeGalleryDialog(dialog) {
  if (!dialog) return;
  if (dialog.element?.open) dialog.element.close();
  dialog.trigger?.focus?.();
}

export function selectArchiveCategory(page, id) {
  const categories = page === 'journal' ? journalCategories : page === 'life' ? lifeCategories : null;
  if (!categories || typeof id !== 'string') return null;
  return id === 'all' || categories.some(item => item.id === id) ? id : null;
}

function accessibleStorage() {
  try { return window.localStorage; } catch { return null; }
}

export function documentTitle(page, lang = 'zh') {
  const identity = '郭程 · Brant Wayne';
  if (page === 'home') return `${identity} | Personal Space`;
  const title = getText(pageData[page]?.title, lang).replace(/\s+/g, ' ').trim();
  return `${title} — ${identity}`;
}

export function initializeApp(root = document) {
  const header = root.getElementById('site-header');
  const main = root.getElementById('main-content');
  const footer = root.getElementById('site-footer');
  const modalRoot = root.getElementById('gallery-modal-root');
  if (!header || !main || !footer || !modalRoot) return;

  const storage = accessibleStorage();
  let lang = readStoredLanguage(storage);
  let dialogState = null;
  const archiveView = { journalCategory: 'all', lifeCategory: 'all' };

  function render(shouldFocus = false) {
    const route = parseRoute(window.location.hash);
    root.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    header.innerHTML = renderNav(lang, route.page);
    main.innerHTML = renderPage(route, lang, archiveView);
    footer.innerHTML = renderFooter(lang);
    root.title = documentTitle(route.page, lang);
    if (shouldFocus) {
      main.focus({ preventScroll: true });
      window.scrollTo?.({ top: 0, behavior: 'instant' });
    }
  }

  function toggleMenu() {
    const button = header.querySelector('[data-menu-toggle]');
    if (!button) return;
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    header.querySelector('.site-header')?.classList.toggle('menu-open', !expanded);
    button.setAttribute('aria-label', lang === 'en' ? (expanded ? 'Open navigation menu' : 'Close navigation menu') : (expanded ? '打开导航菜单' : '关闭导航菜单'));
  }

  function openGallery(index, trigger) {
    const item = galleryItems[index];
    const src = safeImagePath(item?.src);
    if (!src) return;
    const alt = getText(item.alt, lang);
    modalRoot.innerHTML = `<dialog class="gallery-dialog" aria-label="${escapeHtml(alt)}"><div class="gallery-dialog-inner"><button type="button" class="dialog-close" data-gallery-close aria-label="${lang === 'en' ? 'Close image' : '关闭图片'}">×</button><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"><p>${escapeHtml(alt)}</p></div></dialog>`;
    const element = modalRoot.querySelector('dialog');
    dialogState = { element, trigger };
    element.addEventListener('close', () => {
      dialogState?.trigger?.focus?.();
      dialogState = null;
      modalRoot.innerHTML = '';
    }, { once: true });
    element.showModal();
  }

  root.addEventListener('click', event => {
    const target = event.target instanceof Element ? event.target : null;
    if (!target) return;
    if (target.closest('[data-lang-switch]')) {
      lang = lang === 'zh' ? 'en' : 'zh';
      writeStoredLanguage(storage, lang);
      render();
      header.querySelector('[data-lang-switch]')?.focus({ preventScroll: true });
      return;
    }
    if (target.closest('[data-menu-toggle]')) { toggleMenu(); return; }
    const categoryButton = target.closest('[data-category-select]');
    if (categoryButton) {
      const [page, id] = (categoryButton.getAttribute('data-category-select') ?? '').split(':');
      const selected = selectArchiveCategory(page, id);
      if (selected === null || parseRoute(window.location.hash).page !== page) return;
      archiveView[page === 'journal' ? 'journalCategory' : 'lifeCategory'] = selected;
      render();
      main.querySelector(`[data-category-select="${page}:${selected}"]`)?.focus({ preventScroll: true });
      return;
    }
    const galleryButton = target.closest('[data-gallery-open]');
    if (galleryButton) {
      const index = Number(galleryButton.getAttribute('data-gallery-open'));
      if (Number.isInteger(index) && index >= 0) openGallery(index, galleryButton);
      return;
    }
    if (target.closest('[data-gallery-close]')) { closeGalleryDialog(dialogState); return; }
    if (dialogState && target === dialogState.element) { closeGalleryDialog(dialogState); return; }
    if (target.closest('.primary-nav a') && header.querySelector('.menu-open')) toggleMenu();
    const anchorLink = target.closest('a[href^="#"]:not([href^="#/"])');
    const anchor = anchorLink && root.getElementById(anchorLink.getAttribute('href').slice(1));
    if (anchor) {
      event.preventDefault();
      anchor.scrollIntoView({ block: 'start' });
      if (!anchor.hasAttribute('tabindex')) anchor.setAttribute('tabindex', '-1');
      anchor.focus({ preventScroll: true });
    }
  });

  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && dialogState) {
      event.preventDefault();
      closeGalleryDialog(dialogState);
    }
    if (event.key === 'Escape' && header.querySelector('.menu-open')) {
      toggleMenu();
      header.querySelector('[data-menu-toggle]')?.focus();
    }
  });

  window.addEventListener('hashchange', () => render(true));
  render();
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => initializeApp(), { once: true });
  else initializeApp();
}
