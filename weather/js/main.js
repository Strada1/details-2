import { ELEMENT, CLASS } from './ui.js';
import { API, ERROR } from './data.js';
import { render } from './render.js';
import { parseWeather, parseForecast } from './conversion.js';
import { changeFavoritesList, currentCity } from './favorites.js';

document.addEventListener('DOMContentLoaded', handleContentLoaded);
ELEMENT.BUTTONS_WRAPPER.addEventListener('click', changeActiveButton);
ELEMENT.LIKE.addEventListener('click', changeFavoritesList);
ELEMENT.FORM.addEventListener('submit', handleSendingData);

function handleContentLoaded() {
  getWeatherData(currentCity);
  render();
}

function handleSendingData(event) {
  event.preventDefault();
  const cityName = event.target.city.value;
  cityName === ERROR.EMPTY_VALUE || getWeatherData(cityName);
  this.reset();
}

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

function createError(error, cityName) {
  if (error === 404) {
    throw new CustomError(ERROR.INCORRECT_CITY);
  } else {
    getForecastData(cityName);
  }
}

async function getWeatherData(cityName) {
  try {
    let response = await fetch(API.GET_URL(cityName, API.URL_WEATHER));
    if (response.ok) {
      let data = await response.json();
      parseWeather(data);
      getForecastData(cityName);
    } else {
      createError(response.status, cityName);
    }
  } catch (error) {
    error instanceof TypeError
      ? alert(ERROR.NOT_RESPONDING)
      : alert(error.message);
  }
}

async function getForecastData(cityName) {
  try {
    let response = await fetch(API.GET_URL(cityName, API.URL_FORECAST));
    let data = await response.json();
    parseForecast(data);
  } catch (error) {
    alert(error.message);
  }
}

function changeActiveButton(event) {
  const buttonClicked = event.target;
  const active = CLASS.ACTIVE_BUTTON;
  ELEMENT.BUTTONS.forEach((button) => {
    (buttonClicked === button && !button.classList.contains(active)) ||
      button.classList.remove(active);
  });
  buttonClicked.classList.contains(active) ||
    buttonClicked.classList.add(active) + changeTabView(buttonClicked);
}

const changeTabView = (buttonClicked) => {
  const tabButton = buttonClicked.dataset.tab;
  const active = CLASS.ACTIVE_TAB;
  ELEMENT.TABS_WEATHER.forEach((element) => {
    const tab = element.dataset.tab;
    switch (tab) {
      case tabButton:
        element.classList.contains(active) || element.classList.add(active);
        break;
      default:
        !element.classList.contains(active) || element.classList.remove(active);
        break;
    }
  });
};

export { getWeatherData };
