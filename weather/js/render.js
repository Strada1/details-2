import { EXTRA_VARIABLE, SRC_IMG } from './data.js';
import { ELEMENT, CLASS } from './ui.js';
import { favoritesList } from './favorites.js';
import { getWeatherData } from './main.js';

const render = (favoritesList, index = -1) => {
  const cities = Array.from(favoritesList);
  if (index >= cities.length) return;
  index === -1
    ? ELEMENT.FAVORITES_LIST.replaceChildren()
    : createFavoriteCity(cities[index]);
  render(favoritesList, index + 1);
};

const clearForecastList = () => ELEMENT.TAB_LIST_FORECAST.replaceChildren();

const updateCityName = (city, index = 0) => {
  ELEMENT.ACTIVE_CITY_LIST[index].textContent = city;
  if (index >= ELEMENT.ACTIVE_CITY_LIST.length - 1) return;
  updateCityName(city, index + 1);
  updateLike(city);
  clearForecastList();
};

const updateLike = (city) => {
  favoritesList.has(city)
    ? (ELEMENT.LIKE.src = SRC_IMG.BLACK_HEART)
    : (ELEMENT.LIKE.src = SRC_IMG.HEART);
};

const updateTemperature = (temperature, feelsLike, index = 0) => {
  ELEMENT.TEMPERATURE[index].textContent = `${temperature}${EXTRA_VARIABLE.DEGREE_SYMBOL}`;
  if (index >= ELEMENT.TEMPERATURE.length - 1) return;
  updateTemperature(temperature, feelsLike, index + 1);
  ELEMENT.FEELS_LIKE.textContent = `${feelsLike}${EXTRA_VARIABLE.DEGREE_SYMBOL}`;
};

const updateWeatherState = (state, icon) => {
  ELEMENT.CURRENT_STATE.textContent === state ||
    (ELEMENT.CURRENT_STATE.textContent = state);
  ELEMENT.ICON.src === icon || (ELEMENT.ICON.src = icon);
};

const updateTimeDetails = (sunrise, sunset) => {
  ELEMENT.SUNRISE.textContent = sunrise;
  ELEMENT.SUNSET.textContent = sunset;
};

const createElement = (options) => {
  const element = document.createElement(options.tag);
  element.className = options.class;
  element.textContent = options.text;
  element.alt = options.alt;
  element.src = options.src;
  return element;
};

const createFavoriteCity = (city) => {
  const cityWrapper = createElement({
    tag: 'li',
    text: city,
    class: CLASS.CITY,
  });
  ELEMENT.FAVORITES_LIST.prepend(cityWrapper);
  cityWrapper.addEventListener('click', () => getWeatherData(city));
};

const forecast = {
  createWrapper: function () {
    return createElement({ tag: 'div', class: CLASS.FORECAST_BLOCK });
  },
  createDate: function (date) {
    return createElement({
      tag: 'span',
      class: CLASS.FORECAST_DATE,
      text: date,
    });
  },
  createTime: function (time) {
    return createElement({
      tag: 'span',
      class: CLASS.FORECAST_TIME,
      text: time,
    });
  },
  createState: function (state) {
    return createElement({
      tag: 'span',
      class: CLASS.FORECAST_STATE,
      text: state,
    });
  },
  createTemperature: function (temperature) {
    return createElement({
      tag: 'span',
      class: CLASS.FORECAST_TEMPERATURE,
      text: `Temperature: ${temperature}${EXTRA_VARIABLE.DEGREE_SYMBOL}`,
    });
  },
  createFeelsLike: function (feels_like) {
    return createElement({
      tag: 'span',
      class: CLASS.FORECAST_FEELS_LIKE,
      text: `Feels like: ${feels_like}${EXTRA_VARIABLE.DEGREE_SYMBOL}`,
    });
  },
  createIcon: function (icon) {
    return createElement({
      tag: 'img',
      class: CLASS.ICON_ITEM,
      alt: CLASS.ICON_ITEM,
      src: icon,
    });
  },
};

const createItemsForecast = (forecastData) => {
  const wrapper = forecast.createWrapper();
  ELEMENT.TAB_LIST_FORECAST.append(wrapper);
  wrapper.append(
    forecast.createDate(forecastData.date),
    forecast.createTime(forecastData.time),
    forecast.createTemperature(forecastData.temperature),
    forecast.createState(forecastData.state),
    forecast.createFeelsLike(forecastData.feels_like),
    forecast.createIcon(forecastData.icon)
  );
};

export {
  updateTemperature,
  updateWeatherState,
  updateCityName,
  updateTimeDetails,
  updateLike,
  createItemsForecast,
  render,
};
