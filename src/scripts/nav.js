function nav () {
  const navList = document.querySelector('.nav__list');
  const navOverlay = document.querySelector('.nav__overlay');
  const navTrigger = document.querySelector('.nav__trigger');

  navTrigger.addEventListener('click', () => {
    navOverlay.classList.toggle('nav__overlay--visible');
    navList.classList.toggle('nav__list--visible');
    navTrigger.classList.toggle('nav__trigger--active');

    const triggerIsActive = navTrigger.classList.contains('nav__trigger--active');
    navTrigger.textContent = triggerIsActive ? navTrigger.getAttribute('data-close') 
      : navTrigger.getAttribute('data-open');
    
    navTrigger.style.transform = triggerIsActive ? 
      `translateX(-${navList.offsetWidth}px) rotate(-90deg)` : null;
  });

  navOverlay.addEventListener('click', () => {
    navOverlay.classList.remove('nav__overlay--visible');
    navList.classList.remove('nav__list--visible');
    navTrigger.classList.remove('nav__trigger--active');

    navTrigger.textContent = navTrigger.getAttribute('data-open');
    navTrigger.style.transform = null;
  });

  const navLinkClassName = 'nav__link';
  const navLinks = document.querySelectorAll(`.${navLinkClassName}`);

  function highlightActiveNavLink (url) {
    for (const link of navLinks) {
      const urlArray = link.href.split('/')
      const hash = urlArray[urlArray.length - 1];

      if (hash === url) {
        link.classList.add(`${navLinkClassName}--active`);
      } else {
        link.classList.remove(`${navLinkClassName}--active`);
      }
    }
  }

  function hashChangeHandler() {
    highlightActiveNavLink(location.hash);
  }

  if (navLinks.length) {
    window.addEventListener('hashchange', hashChangeHandler);

    if (location.hash) {
      highlightActiveNavLink(location.hash);
    }
  }
}

export default nav;
