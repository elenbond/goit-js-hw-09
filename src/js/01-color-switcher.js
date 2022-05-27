const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');

const DELAY = 1000;
let timerId = null;

const startChangingColor = () => {
  if (buttonStart) {
    buttonStart.disabled = true;
  }
  
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, DELAY);
}

const stopChangingColor = () => {
  clearInterval(timerId);
  if (buttonStop) {
    buttonStart.disabled = false;
  }
}
  
buttonStart.addEventListener("click", startChangingColor);
buttonStop.addEventListener("click", stopChangingColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}