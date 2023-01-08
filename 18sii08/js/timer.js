import { formatDistanceToNowStrict, add } from "date-fns";
import { render } from "./render.js";
import { storage } from "./storage.js";
export function timer() {
  const date = new Date(storage.getDateCalendar());
  const time = storage.getTimeCalendar();
  const hour = time.split(":")[0];
  const minute = time.split(":")[1];
  const getDate = add(date, {
    hours: hour,
    minutes: minute,
  });
  const resultYears = Math.floor(
    parseInt(
      formatDistanceToNowStrict(getDate, {
        unit: "day",
      })
    ) / 365
  );
  const resultDays = Math.floor(
    parseInt(
      formatDistanceToNowStrict(getDate, {
        unit: "day",
      })
    ) % 365
  );
  const resultHours =
    Math.floor(
      parseInt(
        formatDistanceToNowStrict(getDate, {
          unit: "minute",
        })
      ) / 60
    ) % 24;
  const resultMinutes = Math.floor(
    (parseInt(
      formatDistanceToNowStrict(getDate, {
        unit: "second",
      })
    ) /
      60) %
      60
  );
  const resultSeconds =
    parseInt(
      formatDistanceToNowStrict(getDate, {
        unit: "second",
      })
    ) % 60;
  const TIMER = {
    YEARS: resultYears,
    DAYS: resultDays,
    HOURS: resultHours,
    MINUTES: resultMinutes,
    SECONDS: resultSeconds,
  };
  render(TIMER);
}
