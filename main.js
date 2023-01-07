import { formatDistanceToNowStrict, intervalToDuration } from 'date-fns';

const UI = {
  FORM: document.querySelector('.js-form'),
  INPUT: document.querySelector('.js-input'),
  OUTPUT: document.querySelector('.js-output'),
  OUTPUT_INTERVAL: document.querySelector('.js-output-interval')
};

UI.FORM.addEventListener('submit', calcDistanse);

function calcDistanse() {
  event.preventDefault();
  const date = new Date(UI.INPUT.value);
  const distanseDate = formatDistanceToNowStrict(date, { locale: this.locale });
  const intervalDate = intervalToDuration({
    start: new Date(),
    end: date
  },
    { locale: this.locale });
  showDistanse(distanseDate);
  showInterval(intervalDate);
}

function showDistanse(distanse) {
  UI.OUTPUT.textContent = distanse;
}

function showInterval(interval) {
  const { years, months, days, hours, minutes, seconds } = interval;
  UI.OUTPUT_INTERVAL.textContent = `Years:${years} Months:${months} Days:${days} Hours:${hours} Minutes:${minutes} Seconds:${seconds}`;
}