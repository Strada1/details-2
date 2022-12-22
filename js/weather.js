import { API_KEY, SERVER_URL } from "./constants.js";
import { render } from "./render.js";
import { storage } from "./storage.js";
import { ValidationError, RequestError } from "./errors.js";


async function createWeatherCity(inputValue) {
  if (!inputValue) inputValue = storage.getLastCity();
  try {
    let weather = await getResponse(inputValue, SERVER_URL.WEATHER);
    outputWeather(weather);
    let weatherForecast = await getResponse(inputValue, SERVER_URL.FORECAST);
    render.weatherForecast = weatherForecast;
    render.createTabs();
    render.infoWindow();
  } catch (error) {
    render.showError(error.message);
  }
  
}

async function getResponse(city, url) {
  const urlWeather = `${url}?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
  try {
    let response = await fetch(urlWeather);
    if (!response.ok) {
      throw new ValidationError(city);
    }
    let json = await response.json();
    return json;
  } catch (error) {
    if (error instanceof ValidationError) {
      throw error;
    }
    if (url === SERVER_URL.WEATHER) {
      throw new RequestError("Текущей погоды");
    }
    if (url === SERVER_URL.FORECAST) {
      throw new RequestError("Прогноза погоды");
    }
  }
}

function outputWeather({
  name,
  weather,
  timezone,
  main: { temp, feels_like },
  sys: { sunrise, sunset },
}) {
  render.weatherNow = {
    name,
    weather,
    sunrise: getDate(timezone, sunrise),
    sunset: getDate(timezone, sunset),
    temperature: Math.round(temp),
    feelsLike: Math.round(feels_like),
  };
  storage.setLastCity(name);
}

function getDate(timezone, seconds) {
  let date = new Date(seconds * 1000) ;
  let dateTime = {
    hours: addZero(date.getUTCHours() + timezone / 3600),
    minutes: addZero(date.getMinutes()),
  };
  return `${dateTime.hours}:${dateTime.minutes}`;
}

const addZero = (number) => (number < 10 ? "0" + number : number);

export { createWeatherCity };
