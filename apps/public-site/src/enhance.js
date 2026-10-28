/**
 * Progressive enhancement for the T08 static preview.
 *
 * This script never renders page content. The page is complete HTML; this
 * file only adds the mobile menu, anchor focus, archive tab state, and an
 * optional image dialog.
 */

const header = document.getElementById('site-header');
const modalRoot = document.getElementById('gallery-modal-root');
const isEnglish = document.documentElement.lang.startsWith('en');

const labels = isEnglish
  ? {
      openMenu: 'Open navigation menu',
      closeMenu: 'Close navigation menu',
      closeImage: 'Close image',
    }
  : {
      openMenu: '打开导航菜单',
      closeMenu: '关闭导航菜单',
      closeImage: '关闭图片',
    };

let lightbox = null;

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&#39;';
    }
  });
}

function toggleMenu() {
  if (!header) return;

  const button = header.querySelector('[data-menu-toggle]');
  if (!button) return;

  const expanded = button.getAttribute('aria-expanded') === 'true';
  const next = !expanded;

  button.setAttribute('aria-expanded', String(next));
  button.setAttribute('aria-label', next ? labels.closeMenu : labels.openMenu);
  header.querySelector('.site-header')?.classList.toggle('menu-open', next);
}

function openLightbox(trigger) {
  if (!modalRoot || !trigger) return;

  const src = trigger.getAttribute('data-gallery-src');
  const alt = trigger.getAttribute('data-gallery-alt') ?? '';
  if (!src) return;

  modalRoot.innerHTML = `<dialog class="gallery-dialog" aria-label="${escapeHtml(alt)}"><div class="gallery-dialog-inner"><button type="button" class="dialog-close" data-gallery-close aria-label="${labels.closeImage}">×</button><img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}"><p>${escapeHtml(alt)}</p></div></dialog>`;

  lightbox = modalRoot.querySelector('dialog');
  if (!lightbox) return;

  lightbox.addEventListener(
    'close',
    () => {
      trigger.focus?.();
      modalRoot.innerHTML = '';
      lightbox = null;
    },
    { once: true },
  );

  lightbox.showModal();
}

function closeLightbox() {
  if (lightbox?.open) lightbox.close();
}

function selectArchiveTab(tab) {
  const group = tab.closest('.archive-tabs');
  if (!group) return;

  for (const button of group.querySelectorAll('[data-category-select]')) {
    const selected = button === tab;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  }
}

function focusAnchor(anchor) {
  const href = anchor.getAttribute('href');
  if (!href || href === '#') return false;

  const target = document.getElementById(href.slice(1));
  if (!target) return false;

  target.scrollIntoView({ block: 'start' });
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  return true;
}

document.addEventListener('click', (event) => {
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return;

  if (target.closest('[data-menu-toggle]')) {
    toggleMenu();
    return;
  }

  if (target.closest('[data-gallery-close]')) {
    closeLightbox();
    return;
  }

  const galleryTrigger = target.closest('[data-gallery-open]');
  if (galleryTrigger) {
    openLightbox(galleryTrigger);
    return;
  }

  const tab = target.closest('[data-category-select]');
  if (tab) {
    selectArchiveTab(tab);
    return;
  }

  const anchor = target.closest('a[href^="#"]:not([href^="#/"])');
  if (anchor) {
    const handled = focusAnchor(anchor);
    if (handled) {
      event.preventDefault();
      if (anchor.closest('.primary-nav')) toggleMenu();
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (lightbox) {
    event.preventDefault();
    closeLightbox();
    return;
  }

  if (header?.querySelector('.menu-open')) {
    toggleMenu();
    header.querySelector('[data-menu-toggle]')?.focus();
  }
});
