import { ELEMENT } from './ui.js';
import { API } from './data.js';
import { render, updateLike } from './render.js';

const storage = {
  saveFavoritesList: function (favoritesList) {
    localStorage.setItem('favoritesList', JSON.stringify([...favoritesList]));
  },
  saveCurrentCity: function (city) {
    localStorage.setItem('currentCity', city);
  },
  getFavoritesList: function () {
    return new Set(JSON.parse(localStorage.getItem('favoritesList')));
  },
  getCurrentCity: function () {
    return localStorage.getItem('currentCity');
  },
};

let favoritesList = storage.getFavoritesList() || new Set();
let currentCity = storage.getCurrentCity() || API.START_CITY;

function changeFavoritesList() {
  const city = ELEMENT.ACTIVE_CITY.textContent;
  favoritesList.delete(city) || favoritesList.add(city);
  storage.saveFavoritesList(favoritesList);
  updateLike(city);
  render();
}

export { currentCity, favoritesList, changeFavoritesList, storage };
