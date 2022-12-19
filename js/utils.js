export function diffTime({ endDate }, dateTimeNow) {
  let ms = Math.abs(endDate - dateTimeNow);
  let sec = Math.floor(ms / 1000);
  let min = Math.floor(sec / 60);
  let hour = Math.floor(min / 60);
  let day = Math.floor(hour / 24);
  let stingDate = `${day}д ${hour % 24}ч ${min % 60}м ${sec % 60}c`;
  let result =
    endDate > dateTimeNow
      ? `На выполнение ${stingDate}`
      : `Просрочено на ${stingDate}`;
  return result;
}
