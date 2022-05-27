import Notiflix from "notiflix";

const form = document.querySelector(".form");
const elements = {};
const inputedValues = (form) => {
  [...form.elements].forEach(({name, value}) => (elements[name] = Number(value))); 
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position: position, delay: delay });
      } else {
        // Reject
        reject({ position: position, delay: delay });
      }
    }, delay);
  });
  return promise;
}

const generatePromise = () => {
  const { delay: firstDelay, step, amount } = elements;
  let delay = firstDelay;
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

const onFormSubmit = (event) => {
  event.preventDefault();
  inputedValues(event.currentTarget);
  generatePromise();
  event.currentTarget.reset();
}

form.addEventListener('submit', onFormSubmit);

const label = document.querySelectorAll("label");
label.forEach((label) => (label.classList.add("form__label")));