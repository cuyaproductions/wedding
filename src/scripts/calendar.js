!(function() {
  const tabsEnum = {};
  const calendar = document.querySelector('.calendar');
  const navigation = calendar.querySelector('.calendar__navigation');
  const container = calendar.querySelector('.calendar__container');
  const buttons = calendar.querySelectorAll('.calendar__button');
  const tabContents = calendar.querySelectorAll('.calendar__content');
  const dateTitles = calendar.querySelectorAll('.calendar__date-title');
  let currentTab = 0;

  /**
   * 
   * @param {String} href The href to get the has day from.
   */
  function getDayFromLinkHash(href) {
    return href.match(/#(\w+)/)[1];
  }

  function handleButtonClick(event) {
    event.preventDefault();
    const day = getDayFromLinkHash(event.currentTarget.href);
    const newTab = tabsEnum[day];
    updateCalendarView(newTab);
  }

  function updateCalendarView(newTab) {
    deactivateElement(buttons[currentTab]);
    deactivateElement(tabContents[currentTab]);
    currentTab = newTab;
    activateElement(buttons[currentTab]);
    activateElement(tabContents[currentTab]);
  }

  function activateElement(element) {
    const { classList } = element;
    const baseClass = classList[0];
    if (baseClass) {
      classList.add(`${baseClass}--active`);
      classList.remove(`${baseClass}--inactive`);
    }
  }

  function deactivateElement(element) {
    const { classList } = element;
    const baseClass = classList[0];
    classList.remove(`${baseClass}--active`);
    classList.add(`${baseClass}--inactive`);
  }

  buttons.forEach((button, buttonIndex) => {
    const day = getDayFromLinkHash(button.href);
    tabsEnum[day] = buttonIndex;
    button.addEventListener('click', handleButtonClick);
  });

  tabContents.forEach(content => deactivateElement(content));
  dateTitles.forEach(title => deactivateElement(title));
  activateElement(navigation);
  activateElement(container);
  activateElement(buttons[0]);
  activateElement(tabContents[0]);
})();