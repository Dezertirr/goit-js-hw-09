import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const btnStartTimer = document.querySelector('button[data-start]');

const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');


let selectedDate;

// деактивируем кнопку при загрузке страницы
btnStartTimer.disabled = true;

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

function formatNumber(num) {
  return num.toString().padStart(2, '0');
}

function updateTimer(ms) {
  const time = convertMs(ms);
  daysElem.textContent = formatNumber(time.days);
  hoursElem.textContent = formatNumber(time.hours);
  minutesElem.textContent = formatNumber(time.minutes);
  secondsElem.textContent = formatNumber(time.seconds);
}

function activateButton() {
  if (selectedDate && selectedDate.getTime() > Date.now()) {
    btnStartTimer.disabled = false;
  } else {
    btnStartTimer.disabled = true;
  }
}

dateTimePicker.addEventListener('change', () => {
  selectedDate = dateTimePicker.valueAsDate;
  activateButton();
});

btnStartTimer.addEventListener('click', () => {
  dateTimePicker.disabled = true;
  btnStartTimer.disabled = true;

  const intermediateTime = selectedDate.getTime() - Date.now();
  updateTimer(intermediateTime);

  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const intermediateTime = selectedDate.getTime() - currentTime;
    updateTimer(intermediateTime);

    if(intermediateTime <= 1000){
      clearInterval(intervalId);
      Notiflix.Notify.success(`Опять на работу?`);
    }
  }, 1000);
});

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    const selected = selectedDates[0];
    if (selected && selected > new Date()) {
      selectedDate = selected;
      btnStartTimer.disabled = false;
      Notiflix.Notify.success('Будильник заведен правильно!');
    } else {
      instance.clear();
      Notiflix.Notify.failure('Время указано не верно, поставь в будущем времени!');
    }
  },
});






