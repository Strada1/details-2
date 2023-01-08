import { render, addCity, renderList, addForecast } from "./render.js";
import { ELEMENT } from "./element.js";
import { storage } from "./storage.js";
const serverUrl = "http://api.openweathermap.org/";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";

if (storage.getFavoriteCities()) {
  renderList();
  const currentCity = storage.getCurrentCity();
  searchCity(currentCity);
}

async function searchCity(city = "") {
  let cityName;
  if (city === "") {
    cityName = ELEMENT.INPUT.value;
  } else {
    cityName = city;
  }
  const url = `${serverUrl}data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  const forecastUrl = `${serverUrl}data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  try {
    let response = await fetch(url);
    let data = await response.json();
    render(data);
  } catch (err) {
    alert(`Ошибка ${err.message}`);
  }

  fetch(forecastUrl)
    .then((response) => response.json())
    .then((response) => addForecast(response))
    .catch((err) => alert(`Ошибка ${err.message}`));
}

ELEMENT.SEARCH_FORM.addEventListener("submit", (event) => {
  event.preventDefault();
  searchCity();
});
ELEMENT.LIKE_IMG.addEventListener("click", addCity);
ELEMENT.CITYS.addEventListener("click", (event) => {
  let city = event.target.textContent;
  searchCity(city);
});
