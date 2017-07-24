function nav () {
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
