import { UI, DETAILS } from "./module/ui.js";
import { render } from "./module/render.js";
import { serverUrl, apiKey } from "./module/data.js";

UI.FAVORITE_BTN.addEventListener("click", addFavoriteLocations);
UI.FAVORITE_LIST.addEventListener("click", deleteCity);
UI.FAVORITE_LIST.addEventListener("click", showFavoriteCity);

UI.FORM.addEventListener("submit", handleSubmit);
UI.SEARCH_BTN.addEventListener("click", handleSubmit);

export let favoriteCities = [];
let city = "";
let cityName = "";
let details = "";

if (localStorage.getItem("favoriteCities")) {
  favoriteCities = JSON.parse(localStorage.getItem("favoriteCities"));
  render();
}

if (localStorage.getItem("currentCity") === "") {
  city = "";
} else {
  city = JSON.parse(localStorage.getItem("currentCity"));
  renderNow(city.temp, city.icon, city.name);
}

if (localStorage.getItem("details") === "") {
  details = "";
} else {
  details = JSON.parse(localStorage.getItem("details"));
  renderDetails(details.name, details.temp, details.feels, details.weather, details.sunrise, details.sunset);
}

async function searchCity() {
  const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const temp = `${Math.floor(data.main.temp)}°`;
    const feelsLikeTemp = `${Math.floor(data.main.feels_like)}°`;
    renderNow(temp, data.weather[0].icon, data.name);
    renderDetails(data.name, temp, feelsLikeTemp, data.weather[0].main, data.sys.sunrise, data.sys.sunset);
  } catch (error) {
    alert(`Ошибка: ${error}`);
  }
}

function renderNow(temp, icon, name) {
  UI.TEMP.textContent = temp;
  UI.CITY_NAME.textContent = name;
  UI.ICON.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

  city = {
    temp: temp,
    icon: icon,
    name: name,
  };
  localSetNow();
}

function renderDetails(name, temp, feels, weather, sunrise, sunset) {
  DETAILS.CITY_NAME.textContent = name;
  DETAILS.TEMP.textContent = temp;
  DETAILS.FEELS.textContent = feels;
  DETAILS.WEATHER.textContent = weather;
  DETAILS.SUNRISE.textContent = timeConverter(sunrise);
  DETAILS.SUNSET.textContent = timeConverter(sunset);

  details = {
    name: name,
    temp: temp,
    feels: feels,
    weather: weather,
    sunrise: sunrise,
    sunset: sunset,
  };
  localSetDetails();
}

export function localSetNow() {
  localStorage.setItem("currentCity", JSON.stringify(city));
}

function localSetDetails() {
  localStorage.setItem("details", JSON.stringify(details));
}

function timeConverter(unixTime) {
  const date = new Date(unixTime * 1000);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

function handleSubmit(event) {
  event.preventDefault();
  console.log("input");
  cityName = UI.INPUT.value;
  searchCity();
}

function addFavoriteLocations() {
  const favoriteCity = {
    name: UI.CITY_NAME.textContent,
    id: Date.now(),
  };

  const suchCity = favoriteCities.findIndex((city) => city.name === UI.CITY_NAME.textContent);
  suchCity === -1 ? favoriteCities.push(favoriteCity) && console.log(favoriteCities) : false;
  saveToLS("favoriteCities", favoriteCities);
  render();
}

function deleteCity(event) {
  const parentNode = event.target.closest(".locations__list-item");

  if (event.target.dataset.action === "delete") {
    const id = Number(parentNode.id);
    favoriteCities = favoriteCities.filter((city) => city.id !== id);
  }

  saveToLS("favoriteCities", favoriteCities);
  render();
}

function showFavoriteCity(event) {
  const parentNode = event.target.closest(".locations__list-item");

  if (event.target.dataset.action === "city-info") {
    cityName = parentNode.textContent;
    searchCity();
  }
  saveToLS("favoriteCities", favoriteCities);
  render();
}

saveToLS("favoriteCities", favoriteCities);

function saveToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
