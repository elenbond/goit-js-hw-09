import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const inputDate = document.querySelector("#datetime-picker");
const buttonStart = document.querySelector('button[data-start]');
const outputDays = document.querySelector("[data-days]");
const outputHours = document.querySelector("[data-hours]");
const outputMinutes = document.querySelector("[data-minutes]");
const outputSeconds = document.querySelector("[data-seconds]");

buttonStart.disabled = true;
const DELAY = 1000;
let timerId = null;

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = options.defaultDate.getTime();
        const selectedDate = selectedDates[0].getTime();
        if (selectedDate < currentDate) {
            buttonStart.disabled = true;
            // window.alert("Please choose a date in the future");
            Notiflix.Notify.failure("Please choose a date in the future");
        } else {
            buttonStart.disabled = false;
        }
  },
};

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

const addingZeroToString = ({ days, hours, minutes, seconds }) => {
    outputDays.textContent = addLeadingZero(days);
    outputHours.textContent = addLeadingZero(hours);
    outputMinutes.textContent = addLeadingZero(minutes);
    outputSeconds.textContent = addLeadingZero(seconds);
    
    buttonStart.disabled = true;
}

const flatp = flatpickr(inputDate, options);

const stopTimer = ({ days, hours, minutes, seconds }) => {
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
        return addingZeroToString({days: 0, hours: 0, minutes: 0, seconds: 0})
    }
}

const onButtonStartClick = () => {
    const date = new Date();
    timerId = setInterval(() => {
        const currentTime = convertMs(flatp.selectedDates[0] - Date.now());
        addingZeroToString(currentTime);
        stopTimer(currentTime);
    }, DELAY);
}

buttonStart.addEventListener("click", onButtonStartClick);