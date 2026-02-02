// import '../styles/main.scss';

import Alpine from 'alpinejs';
import persist from '@alpinejs/persist';

// Import Swiper
import Swiper from 'swiper';
// import 'swiper/swiper-bundle.css';
import { Navigation, Pagination } from 'swiper/modules';

window.Alpine = Alpine;
window.Swiper = Swiper;
Swiper.use([Navigation, Pagination]);

Alpine.plugin(persist);
Alpine.start();

const JUNIP_CONTAINER_SELECTOR = '.junip-reviews-container';
const JUNIP_ROOT_SELECTOR = '.junip-product-review-container';
const JUNIP_REVIEW_ITEM_SELECTOR = '.junip-review-list-item';
const JUNIP_STARS_FILLED_SELECTOR = '.junip-stars-filled';
const JUNIP_SEE_MORE_SELECTOR = '.junip-btn.junip-btn-sm.junip-see-more';
const JUNIP_MIN_PERCENT = 80;
const JUNIP_MIN_VISIBLE = 5;
const JUNIP_LOAD_COOLDOWN_MS = 1500;

const extractWidthPercent = (el) => {
  if (!el) return null;
  const inline = el.style?.width;
  if (inline) {
    const parsed = Number.parseFloat(inline);
    return Number.isFinite(parsed) ? parsed : null;
  }
  const attr = el.getAttribute('style') || '';
  const match = attr.match(/width:\s*([0-9.]+)%/i);
  if (match) {
    const parsed = Number.parseFloat(match[1]);
    return Number.isFinite(parsed) ? parsed : null;
  }
  const computed = window.getComputedStyle(el).width;
  const parentWidth = el.parentElement ? window.getComputedStyle(el.parentElement).width : null;
  if (computed && parentWidth) {
    const w = Number.parseFloat(computed);
    const pw = Number.parseFloat(parentWidth);
    if (Number.isFinite(w) && Number.isFinite(pw) && pw > 0) {
      return (w / pw) * 100;
    }
  }
  return null;
};

const maybeLoadMoreJunip = (container, visibleCount) => {
  if (!container) return;
  if (visibleCount >= JUNIP_MIN_VISIBLE) return;
  const now = Date.now();
  const lastClick = Number(container.dataset.junipAutoloadTs || 0);
  if (now - lastClick < JUNIP_LOAD_COOLDOWN_MS) return;

  const root =
    container.closest(JUNIP_ROOT_SELECTOR) ||
    document.querySelector(JUNIP_ROOT_SELECTOR);
  const button = (root || container).querySelector(JUNIP_SEE_MORE_SELECTOR);
  if (!button || button.disabled) return;

  container.dataset.junipAutoloadTs = String(now);
  button.click();
};

const processJunipReviews = (container) => {
  if (!container) return;
  const items = Array.from(container.querySelectorAll(JUNIP_REVIEW_ITEM_SELECTOR));
  if (!items.length) return;

  let visibleCount = 0;
  items.forEach((itemEl) => {
    const starsFilled = itemEl.querySelector(JUNIP_STARS_FILLED_SELECTOR);
    const widthPercent = extractWidthPercent(starsFilled);
    const containerEl =
      itemEl.closest('.junip-review-list-item-container') || itemEl;
    const separatorEl =
      containerEl?.nextElementSibling?.classList?.contains('junip-separator')
        ? containerEl.nextElementSibling
        : null;
    if (widthPercent != null && widthPercent < JUNIP_MIN_PERCENT) {
      containerEl.style.display = 'none';
      if (separatorEl) separatorEl.style.display = 'none';
    } else {
      containerEl.style.removeProperty('display');
      if (separatorEl) separatorEl.style.removeProperty('display');
      visibleCount += 1;
    }
  });

  maybeLoadMoreJunip(container, visibleCount);
};

const initJunipFilter = (initialContainer) => {
  let container = initialContainer;
  let reviewsObserver = null;

  const attachReviewsObserver = (nextContainer) => {
    if (!nextContainer) return;
    if (reviewsObserver) reviewsObserver.disconnect();
    reviewsObserver = new MutationObserver(() => {
      processJunipReviews(nextContainer);
    });
    reviewsObserver.observe(nextContainer, { childList: true, subtree: true });
  };

  attachReviewsObserver(container);
  processJunipReviews(container);

  const containerObserver = new MutationObserver(() => {
    const fresh = document.querySelector(JUNIP_CONTAINER_SELECTOR);
    if (fresh && fresh !== container) {
      container = fresh;
      attachReviewsObserver(container);
      processJunipReviews(container);
    }
  });

  containerObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  document.addEventListener('click', (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const tab = target.closest('.junip-reviews-tab');
    if (!tab) return;
    const tryProcess = () => {
      const root =
        tab.closest(JUNIP_ROOT_SELECTOR) ||
        document.querySelector(JUNIP_ROOT_SELECTOR);
      const fresh =
        root?.querySelector(JUNIP_CONTAINER_SELECTOR) ||
        document.querySelector(JUNIP_CONTAINER_SELECTOR);
      if (fresh && fresh !== container) {
        container = fresh;
        attachReviewsObserver(container);
      }
      if (container) delete container.dataset.junipAutoloadTs;
      processJunipReviews(container);
    };

    setTimeout(tryProcess, 0);
    setTimeout(tryProcess, 300);
    setTimeout(tryProcess, 800);
  });
};

window.addEventListener('load', () => {
  const existing = document.querySelector(JUNIP_CONTAINER_SELECTOR);
  if (existing) {
    initJunipFilter(existing);
    return;
  }

  const bootObserver = new MutationObserver(() => {
    const found = document.querySelector(JUNIP_CONTAINER_SELECTOR);
    if (found) {
      bootObserver.disconnect();
      initJunipFilter(found);
    }
  });

  bootObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
});
