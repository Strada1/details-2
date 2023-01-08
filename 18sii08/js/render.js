import { ELEMENT } from "./element.js";
import { storage } from "./storage.js";
import { format } from "date-fns";
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
  console.log("img");
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
  function createNode(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
  }
  for (let times of list) {
    const div = createNode("div", "page_three__info__card");
    document.querySelector(".forecast__card_list").append(div);
    const date = createNode("p", "page_three__info__date");
    const dateText = new Date(times.dt * 1000);
    const DATE = {
      DAY: dateText.getDate(),
      MONTH: dateText.getMonth(),
      YEARS: dateText.getFullYear(),
    };
    date.textContent = format(
      new Date(DATE.YEARS, DATE.MONTH, DATE.DAY),
      "dd MMMM"
    );
    const temperature = createNode("p", "page_three__info__temperature");
    temperature.textContent = `Temperature: ${Math.round(
      times.main.temp - 273.15
    )}° Feels like: ${Math.round(times.main.feels_like - 273.15)}°`;
    const time = createNode("p", "page_three__time");
    time.textContent = `${dateText.getHours()}:00`;
    const weather = createNode("p", "page_three__weather");
    weather.textContent = times.weather[0].main;
    const img = createNode("img", "page_three__card__sign");
    img.src = `http://openweathermap.org/img/wn/${times.weather[0].icon}.png`;
    div.append(img, time, date, temperature, weather);
  }
  document.querySelector(".forecast-title").textContent = city;
}

export { renderNow, addCity, render, renderList, addForecast };
