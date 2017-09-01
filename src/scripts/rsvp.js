const form = document.querySelector('#rsvp-form');
const additionalInfo = document.querySelector('#additional-info');
const radioInputs = [...document.querySelectorAll('[name=isComing]')];
const partySize = document.querySelector('[name=partySize]');

const frameRate = 1000 / 40;
const initialSpeed = 55;
const easeOutRate = 0.87;
let speed = initialSpeed;
let isAnimating = false;
let timer = null;

/**
 * Clear the timer so that animation timers do not trip over themselves if the uses changes the
 * input rapidly.
 */
function stopTimer() {
  clearTimeout(timer);
  timer = null;
  speed = initialSpeed;
  isAnimating = false;
}

/**
 * Opens the additional information section of the form.
 */
function animateOpen() {
  additionalInfo.style.display = 'block';
  additionalInfo.style.height = 'auto';

  const finalHeight = additionalInfo.offsetHeight;
  additionalInfo.style.height = '0px';

  timer = setInterval(() => {
    const { offsetHeight } = additionalInfo;
    isAnimating = true;

    if (offsetHeight >= finalHeight) {
      stopTimer();
      additionalInfo.style.height = 'auto';
      partySize.setAttribute('required', true);
      partySize.focus();
      return;
    }

    additionalInfo.style.height = `${offsetHeight + speed}px`;
    speed = Math.max(2, speed * easeOutRate);
  }, frameRate);
}

/**
 * Closes the additional information section of the form.
 */
function animateClose() {
  timer = setInterval(() => {
    const { offsetHeight } = additionalInfo;
    isAnimating = true;

    if (offsetHeight <= 2) {
      stopTimer();
      partySize.removeAttribute('required');
      additionalInfo.style.height = '0px';
      additionalInfo.style.display = 'none';
      return;
    }


    additionalInfo.style.height = `${offsetHeight - speed}px`;
    speed = Math.max(2, speed * easeOutRate);
  }, frameRate);
}

/**
 * Handles the change in radio buttons to toggle the additional information section open or close.
 * 
 * @param {Event} event The event object created from the input change event.
 */
function toggleAdditionalInfo(event) {
  const { value } = event.target;
  const areComing = value === 'yes';

  if (isAnimating || timer) {
    stopTimer();
  }

  if (areComing) {
    animateOpen();
  } else {
    animateClose();
  }
}

(function init() {
  let areComing = false;
  radioInputs.forEach((input) => {
    input.addEventListener('change', toggleAdditionalInfo);

    if (input.checked && input.value === 'yes') {
      areComing = true;
    }
  });

  if (!areComing) {
    additionalInfo.style.overflow = 'hidden';
    additionalInfo.style.display = 'none';
    additionalInfo.style.height = '0px';
  }
})();