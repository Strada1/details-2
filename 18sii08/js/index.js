import { ELEMENT } from "./element.js";
import { timer } from "./timer.js";
import { storage } from "./storage.js";
if (storage.getDateCalendar()) {
  ELEMENT.INPUT.value = storage.getDateCalendar();
  setInterval(timer, 1000);
}
if (storage.getTimeCalendar()) {
  ELEMENT.INPUT_TIME.value = storage.getTimeCalendar();
  setInterval(timer, 1000);
}
ELEMENT.CALENDAR.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = ELEMENT.INPUT.value;
  const time = ELEMENT.INPUT_TIME.value;
  storage.saveDate(date, time);
  setInterval(timer, 1000);
});
