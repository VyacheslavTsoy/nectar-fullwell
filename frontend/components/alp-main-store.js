document.addEventListener('alpine:init', () => {
  Alpine.store('shopMainStore', {
    body_no_scroll: false,

    getBodyScrollbarWidth() {
      const body = document.querySelector('body');
      return body.offsetWidth - body.clientWidth;
    }
  });
  document.documentElement.style.setProperty('--body-scrollbar-width', `${Alpine.store('shopMainStore').getBodyScrollbarWidth()}px`);
});
