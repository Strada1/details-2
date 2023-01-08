import { ELEMENT } from "./element.js";
export function render(TIMER) {
  ELEMENT.YEARS.textContent = TIMER.YEARS;
  ELEMENT.DAYS.textContent = TIMER.DAYS;
  ELEMENT.HOURS.textContent = TIMER.HOURS;
  ELEMENT.MINUTES.textContent = TIMER.MINUTES;
  ELEMENT.SECONDS.textContent = TIMER.SECONDS;
}
