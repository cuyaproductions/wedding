!(function() {
  const { body } = document;
  const nav = document.querySelector('.nav');
  const navListContainer = nav.querySelector('.nav__list-container');
  const navList = navListContainer.querySelector('.nav__list');
  const navTrigger = nav.querySelector('.nav__trigger');
  const navOverlay = nav.querySelector('.nav__overlay');
  const triggerOpenText = navTrigger.getAttribute('data-open');
  const triggerCloseText = navTrigger.getAttribute('data-close');
  const activeNavListContainerClassName = 'nav__list-container--active';
  let isNavOpen = false;
  let isAnimating = false;

  function openMobileNav() {
    if (!isAnimating) {
      navListContainer.classList.add(activeNavListContainerClassName);
      isAnimating = true;
      setTimeout(() => {
        nav.classList.add('nav--open');
        navTrigger.textContent = triggerCloseText;
        navTrigger.style.transform = `translateX(-${navList.offsetWidth + 3}px) rotate(-90deg)`;
        body.style.overflow = 'hidden';
        navOverlay.addEventListener('click', closeMobileNav);
        isNavOpen = true;
        isAnimating = false;
      }, 1);
    }
  }

  function closeMobileNav() {
    if (!isAnimating) {
      nav.classList.remove('nav--open');
      navTrigger.textContent = triggerOpenText;
      navTrigger.style.transform = null;
      body.style.overflow = 'auto';
      navOverlay.removeEventListener('click', closeMobileNav);
      isAnimating = true;

      setTimeout(() => {
        navListContainer.classList.remove(activeNavListContainerClassName);
        isNavOpen = false;
        isAnimating = false;
      }, 1);
    }
  }

  navTrigger.addEventListener('click', () => isNavOpen ? closeMobileNav() : openMobileNav());
  navList.addEventListener('click', (event) => { 
    if (event.target.classList.contains('nav__link')) {
      closeMobileNav();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 750 && isNavOpen)  closeMobileNav();
  });
})();