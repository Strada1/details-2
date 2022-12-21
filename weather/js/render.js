import { EXTRA_VARIABLE, SRC_IMG } from './data.js';
import { ELEMENT, CLASS } from './ui.js';
import { findImageForState } from './conversion.js';
import { favoritesList } from './favorites.js';
import { getWeatherData } from './main.js';

const render = () => {
  ELEMENT.FAVORITES_LIST.replaceChildren();
  favoritesList.forEach((cityName) => createFavoriteCity(cityName));
};

const clearForecastList = () => ELEMENT.TAB_LIST_FORECAST.replaceChildren();

const updateCityName = (cityName) => {
  ELEMENT.ACTIVE_CITY_LIST.forEach((element) => {
    element.textContent = cityName;
    updateLike(cityName);
  });
  clearForecastList();
};

const updateLike = (cityName) => {
  favoritesList.has(cityName)
    ? (ELEMENT.LIKE.src = SRC_IMG.BLACK_HEART)
    : (ELEMENT.LIKE.src = SRC_IMG.HEART);
};

const updateTemperature = (temperature, feelsLike) => {
  ELEMENT.TEMPERATURE.forEach((element) => {
    element.textContent = `${temperature}${EXTRA_VARIABLE.DEGREE_SYMBOL}`;
  });
  ELEMENT.FEELS_LIKE.textContent = `${feelsLike}${EXTRA_VARIABLE.DEGREE_SYMBOL}`;
};

const updateWeatherState = (state) => {
  ELEMENT.CURRENT_STATE.textContent === state ||
    (ELEMENT.CURRENT_STATE.textContent = state);
  ELEMENT.ICON.src === findImageForState(state) ||
    (ELEMENT.ICON.src = findImageForState(state));
};

const updateTimeDetails = (sunriseTime, sunsetTime) => {
  ELEMENT.SUNRISE.textContent = sunriseTime;
  ELEMENT.SUNSET.textContent = sunsetTime;
};

const createElement = (
  tag,
  className,
  textContent = '',
  alt = '',
  src = ''
) => {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = textContent;
  element.alt = alt;
  element.src = src;
  return element;
};

const createFavoriteCity = (cityName) => {
  const cityWrapper = createElement('li', CLASS.CITY, cityName);
  ELEMENT.FAVORITES_LIST.prepend(cityWrapper);
  cityWrapper.addEventListener('click', () => getWeatherData(cityName));
};

const createItemsForecast = ({
  date,
  time,
  temperature,
  feels_like,
  state,
  image,
}) => {
  const divBlock = createElement('div', CLASS.FORECAST_BLOCK);
  const spanDate = createElement('span', CLASS.FORECAST_DATE, date);
  const spanTime = createElement('span', CLASS.FORECAST_TIME, time);
  const spanState = createElement('span', CLASS.FORECAST_STATE, state);

  const spanTemperature = createElement(
    'span',
    CLASS.FORECAST_TEMPERATURE,
    `Temperature: ${temperature}${EXTRA_VARIABLE.DEGREE_SYMBOL}`
  );

  const spanFeelsLike = createElement(
    'span',
    CLASS.FORECAST_FEELS_LIKE,
    `Feels like: ${feels_like}${EXTRA_VARIABLE.DEGREE_SYMBOL}`
  );

  const imgIcon = createElement(
    'img',
    CLASS.ICON_ITEM,
    '',
    CLASS.ICON_ITEM,
    image
  );

  ELEMENT.TAB_LIST_FORECAST.append(divBlock);
  divBlock.append(
    spanDate,
    spanTime,
    spanTemperature,
    spanState,
    spanFeelsLike,
    imgIcon
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
