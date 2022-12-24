import { ELEMENT, MONTH } from "./element.js";
import { storage } from "./storage.js";
function render(response) {
  renderNow(response);
  renderDetails(response);
  storage.saveCurrentCity(response.name);
}

function renderNow(response) {
  let city = response.name;
  document.querySelector(".city-name").textContent = city;
  let temp = Math.round(response.main.temp - 273.15);
  ELEMENT.DEGREE.textContent = temp;
  let img = response.weather[0].icon;
  ELEMENT.INFO_IMG.src = `http://openweathermap.org/img/wn/${img}@2x.png`;
}

function renderDetails(response) {
  let city = response.name;
  document.querySelector(".details-title").textContent = city;
  let temp = Math.round(response.main.temp - 273.15);
  ELEMENT.TEMP.textContent = temp;
  let feels = Math.round(response.main.feels_like - 273.15);
  ELEMENT.FEELS.textContent = feels;
  let weather = response.weather[0].main;
  ELEMENT.WEATHER.textContent = weather;
  let sunrise = new Date(response.sys.sunrise * 1000);
  ELEMENT.SUNRISE.textContent = `${sunrise.getHours()}:${sunrise.getMinutes()}`;
  let sunset = new Date(response.sys.sunset * 1000);
  ELEMENT.SUNSET.textContent = `${sunset.getHours()}:${sunset.getMinutes()}`;
}

function addCity() {
  let list = new Set(storage.getFavoriteCities());
  const city = ELEMENT.CITY_NAME.textContent;
  if (city === "undefined" || !city) {
    return;
  }
  if (!list) {
    list.add(city);
    storage.saveFavoriteCities(list);
    renderList();
    return;
  }
  if (list.has(city)) {
    list.delete(city);
  } else {
    list.add(city);
  }
  storage.saveFavoriteCities(list);
  renderList();
}

function renderList() {
  let citys = document.querySelectorAll(".city");
  for (let city of citys) {
    city.remove();
  }
  const list = Array.from(storage.getFavoriteCities());
  list.forEach((item) => {
    for (let citys of document.querySelectorAll(".citys")) {
      citys.insertAdjacentHTML("afterbegin", `<li class="city">${item}</li>`);
    }
  });
}

function addForecast(response) {
  let city = response.city.name;
  let list = response.list;
  renderForecast(city, list);
}

function renderForecast(city, list) {
  let lists = document.querySelectorAll(".page_three__info__card");
  for (let list of lists) {
    list.remove();
  }
  for (let times of list) {
    let div = document.createElement("div");
    div.className = "page_three__info__card";
    document.querySelector(".forecast__card_list").append(div);
    let date = document.createElement("p");
    date.className = "page_three__info__date";
    let dateText = new Date(times.dt * 1000);
    let number = dateText.getMonth();
    date.textContent = `${dateText.getDate()} ${MONTH[number]}`;
    let temperature = document.createElement("p");
    temperature.className = "page_three__info__temperature";
    temperature.textContent = `Temperature: ${Math.round(
      times.main.temp - 273.15
    )}° Feels like: ${Math.round(times.main.feels_like - 273.15)}°`;
    let time = document.createElement("p");
    time.className = "page_three__time";
    time.textContent = `${dateText.getHours()}:00`;
    let weather = document.createElement("p");
    weather.className = "page_three__weather";
    weather.textContent = times.weather[0].main;
    let img = document.createElement("img");
    img.className = "page_three__card__sign";
    img.src = `http://openweathermap.org/img/wn/${times.weather[0].icon}.png`;
    div.append(img, time, date, temperature, weather);
  }
  document.querySelector(".forecast-title").textContent = city;
}

export { renderNow, addCity, render, renderList, addForecast };
