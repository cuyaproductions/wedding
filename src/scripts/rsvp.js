const radioInputs = document.querySelectorAll('[name=coming]');
const additionalInfo = document.querySelector('#additional-info');
const partySize = document.querySelector('[name=size]');
const frameRate = 1000 / 40;
const initialSpeed = 55;
const easeOutRate = 0.87;
let speed = initialSpeed;
let isAnimating = false;
let timer = null;

function stopTimer() {
  clearTimeout(timer);
  timer = null;
  speed = initialSpeed;
  isAnimating = false;
}

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
      partySize.focus();
      return;
    }

    additionalInfo.style.height = `${offsetHeight + speed}px`;
    speed = Math.max(2, speed * easeOutRate);
  }, frameRate);
}

function animateClose() {
  timer = setInterval(() => {
    const { offsetHeight } = additionalInfo;
    isAnimating = true;

    if (offsetHeight <= 2) {
      stopTimer();
      additionalInfo.style.height = '0px';
      additionalInfo.style.display = 'none';
      return;
    }


    additionalInfo.style.height = `${offsetHeight - speed}px`;
    speed = Math.max(2, speed * easeOutRate);
  }, frameRate);
}

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
  radioInputs.forEach((input) => {
    input.addEventListener('change', toggleAdditionalInfo);
  });

  additionalInfo.style.overflow = 'hidden';
  additionalInfo.style.display = 'none';
  additionalInfo.style.height = '0px';
})();