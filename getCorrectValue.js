export function getCorrectTime(time) {
  let date = new Date(time * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  if (hours < 10) hours = `0${date.getHours()}`;
  let formattedTime = `${hours}:${minutes}:${seconds}`;
  return formattedTime;
}

export function getCurrentWeather(number) {
  return Math.floor(Number(number) - 273);
}
