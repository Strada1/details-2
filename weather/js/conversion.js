import { EXTRA_VARIABLE, ERROR, MONTH, WEATHER_STATE } from './data.js';
import { storage } from './favorites.js';
import {
  updateCityName,
  updateTemperature,
  updateWeatherState,
  updateTimeDetails,
  createItemsForecast,
} from './render.js';

function WeatherData({ name, main, weather, sys }) {
  this.city = name;
  this.temperature = convertKelvinToCelsius(main.temp);
  this.feels_like = convertKelvinToCelsius(main.feels_like);
  this.state = weather[0].main;
  this.icon = findImageForState(weather[0].main);
  this.sunrise = convertTimestamp(sys.sunrise, EXTRA_VARIABLE.TIME);
  this.sunset = convertTimestamp(sys.sunset, EXTRA_VARIABLE.TIME);
}

const parseWeather = (weatherData) => {
  updateCityName(weatherData.city);
  storage.saveCurrentCity(weatherData.city);
  updateWeatherState(weatherData.state, weatherData.icon);
  updateTemperature(weatherData.temperature, weatherData.feels_like);
  updateTimeDetails(weatherData.sunrise, weatherData.sunset);
};

function ForecastData(list) {
  this.date = convertTimestamp(list.dt, EXTRA_VARIABLE.DATE);
  this.time = convertTimestamp(list.dt, EXTRA_VARIABLE.TIME);
  this.temperature = convertKelvinToCelsius(list.main.temp);
  this.feels_like = convertKelvinToCelsius(list.main.feels_like);
  this.state = list.weather[0].main;
  this.icon = findImageForState(list.weather[0].main);
}

const parseForecast = ({ list }, index = 0) => {
  const forecastData = new ForecastData(list[index]);
  createItemsForecast(forecastData);
  index++;
  if (index >= list.length) return;
  parseForecast({ list }, index);
};

const findImageForState = (state) => {
  const objectForState = WEATHER_STATE.find((object) => {
    return object.state.includes(state);
  });
  return objectForState.src;
};

const convertKelvinToCelsius = (temperature) => {
  try {
    if (isNaN(temperature)) throw new Error(ERROR.NaN);
    return (temperature + EXTRA_VARIABLE.ABSOLUTE_ZERO).toFixed(0);
  } catch (error) {
    console.log(error.message);
  }
};

const padTo2Digits = (number) => number.toString().padStart(2, '0');

function TimestampData(timestamp) {
  this.new_date = new Date(timestamp * 1000);
  this.month = MONTH[this.new_date.getMonth()];
  this.day = padTo2Digits(this.new_date.getDate());
  this.hours = this.new_date.getHours();
  this.minutes = this.new_date.getMinutes();
}

const convertTimestamp = (timestamp, option) => {
  try {
    if (isNaN(timestamp)) throw new Error(ERROR.NaN);
    const timestampData = new TimestampData(timestamp);
    switch (option) {
      case EXTRA_VARIABLE.TIME:
        const time = `${padTo2Digits(timestampData.hours)}:${padTo2Digits(
          timestampData.minutes
        )}`;
        return time;
      case EXTRA_VARIABLE.DATE:
        const date = `${timestampData.day} ${timestampData.month}`;
        return date;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export { parseWeather, parseForecast, WeatherData };
