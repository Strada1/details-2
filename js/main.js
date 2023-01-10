import { UI_ELEMENTS, showWeatherNow, showWeatherDetails } from './ui';
import {
  addStorageCurrentCity, getStorageCurrentCity, addStorageFavoriteCities, getStorageFavoriteCities,
} from './storage';

window.location.hash = 'now';

const SERVER_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'f660a2fb1e4bad108d6160b7f58c555f';
let favoriteCityList = [];

function deleteFavoriteCity() {
  const cityName = this.parentNode.textContent;
  this.parentNode.remove();
  favoriteCityList = favoriteCityList.filter((item) => item !== cityName);
  addStorageFavoriteCities(favoriteCityList);
}

function checkCityFavorite(cityName) {
  const isValid = favoriteCityList.includes(cityName);
  if (!isValid) {
    UI_ELEMENTS.NOW_BTN_LIKE.classList.remove('now__sities-btn--like');
  } else {
    UI_ELEMENTS.NOW_BTN_LIKE.classList.add('now__sities-btn--like');
  }
}

async function getWeather(cityName) {
  const city = cityName ?? getStorageCurrentCity() ?? 'Aktobe';
  const url = `${SERVER_URL}?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const promise = await fetch(url);
    const data = await promise.json();
    checkCityFavorite(data.name);
    showWeatherNow(data);
    showWeatherDetails(data);
  } catch (error) {
    alert(error);
  }
}

UI_ELEMENTS.FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  const cityName = UI_ELEMENTS.INPUT_FORM.value;
  addStorageCurrentCity(cityName);
  getWeather(cityName);
  event.target.reset();
});

function renderFavoriteCity() {
  UI_ELEMENTS.FAVORITE_LIST.textContent = '';
  favoriteCityList = getStorageFavoriteCities();
  favoriteCityList.forEach((element) => {
    const isValid = favoriteCityList.includes(element);
    const item = document.createElement('li');
    const button = document.createElement('button');
    item.classList.add('weather__favorites-item');
    button.classList.add('weather__favorites-delete');
    item.textContent = element;
    button.addEventListener('click', deleteFavoriteCity);
    if (isValid) {
      UI_ELEMENTS.NOW_BTN_LIKE.classList.add('now__sities-btn--like');
    }
    item.append(button);
    UI_ELEMENTS.FAVORITE_LIST.append(item);
    item.addEventListener('click', () => {
      getWeather(element);
      addStorageCurrentCity(element);
    });
  });
}

function addCityFavorite(cityName) {
  const isValid = favoriteCityList.includes(cityName);
  if (isValid) {
    favoriteCityList = favoriteCityList.filter((item) => item !== cityName);
    renderFavoriteCity();
  } else {
    favoriteCityList.push(cityName);
    addStorageFavoriteCities(favoriteCityList);
    renderFavoriteCity();
  }
}

UI_ELEMENTS.NOW_BTN_LIKE.addEventListener('click', () => {
  const cityName = UI_ELEMENTS.NOW_BTN_LIKE.previousElementSibling.textContent;
  addCityFavorite(cityName);
});

document.addEventListener('DOMContentLoaded', () => {
  getWeather();
  getStorageFavoriteCities();
  renderFavoriteCity();
});
