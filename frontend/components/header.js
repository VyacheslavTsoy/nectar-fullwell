export function headerSticky() {
  const header = document.getElementById('id_header');
  const mainWrapper = document.querySelector('#l-main');
  const headerHeight = header.offsetHeight;

  const sticky = header.offsetTop;
  console.log('sticky', sticky);
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > sticky) {
      header.classList.add('m-sticky');
      if (!mainWrapper.classList.contains('m-header-sticky')) {
        mainWrapper.classList.add('m-header-sticky');
        mainWrapper.style.paddingTop = `${headerHeight}px`;
      }
    } else {
      header.classList.remove('m-sticky');
      if (mainWrapper.classList.contains('m-header-sticky')) {
        mainWrapper.classList.remove('m-header-sticky');
        mainWrapper.style.paddingTop = '0px';
      }
    }
  });
}
