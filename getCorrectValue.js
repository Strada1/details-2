import { format } from 'date-fns';
export function getCorrectTime(time) {
  const date = new Date(time * 1000);
  const formattedTime = format(date, 'H:mm:ss');
  return formattedTime;
}

export function getCurrentWeather(number) {
  return Math.floor(Number(number) - 273);
}
