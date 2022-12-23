import { WEATHER_CLASS, HEART, MONTH } from "./constants.js";
const CELSIUS = "\u2103";

export class Tabs {
  constructor() {
    this.now = document.createElement("div");
    this.details = document.createElement("div");
    this.forecast = document.createElement("div");
    this.activeTab = this.now;
  }
  
  changeActiveTab(activeTab) {
    this.activeTab = this[activeTab.toLowerCase()];
  }

  createTabNow({ temperature, name, weather }, favouriteCity) {
    this.now.textContent = '';
    this.now.className = WEATHER_CLASS.NOW;

    let temp = document.createElement("div");
    temp.className = "now__temperature";
    temp.textContent = temperature + CELSIUS;

    let img = document.createElement("img");
    img.className = "now__picture";
    try {
      img.src = getImageURL(weather[0].icon);
    } catch {
      img.alt = weather[0].main;
    }

    let city = document.createElement("div");
    city.className = "now__city";

    let nameCity = document.createElement("div");
    nameCity.className = "now__name-city";
    nameCity.textContent = name;

    let addCity = document.createElement("img");
    addCity.className = "now__add-city";
    addCity.src = favouriteCity ? HEART.FILL : HEART.EMPTY;

    city.append(nameCity, addCity);
    this.now.append(temp, img, city);
  }

  createTabDetails({
    name,
    temperature,
    feelsLike,
    weather,
    sunrise,
    sunset,
  }) {
    this.details.textContent = '';
    this.details.className = WEATHER_CLASS.DETAILS;
  
    let city = document.createElement("div");
    city.className = "details__city";
    city.textContent = name;
  
    let listDetails = document.createElement("ul");
    listDetails.className = "details__list-details";
  
    let temperatureCity = document.createElement("li");
    temperatureCity.textContent = `Температура: ${temperature}`;
    let feels_like = document.createElement("li");
    feels_like.textContent = `Ощущается: ${feelsLike}`;
    let weatherCity = document.createElement("li");
    weatherCity.textContent = `Погода: ${weather[0].description}`;
    let sunriseCity = document.createElement("li");
    sunriseCity.textContent = `Восход солнца: ${sunrise + ""}`;
    let sunsetCity = document.createElement("li");
    sunsetCity.textContent = `Заход солнца: ${sunset}`;
  
    listDetails.append(
      temperatureCity,
      feels_like,
      weatherCity,
      sunriseCity,
      sunsetCity
    );
    this.details.append(city, listDetails);
  }

  createTabForecast({ city: { name }, list }) {
    this.forecast.textContent = '';
    this.forecast.className = WEATHER_CLASS.FORECAST;
  
    let city = document.createElement("div");
    city.className = "forecast__city";
    city.textContent = name;
  
    let listCard = document.createElement("div");
    listCard.className = "list-card";
  
    let cards = list.map((element) => this.createCardForecast(element));
  
    listCard.append(...cards);
    this.forecast.append(city, listCard);
  }

  createCardForecast({ dt_txt, weather, main: { temp, feels_like } }) {
    let card = document.createElement("div");
    card.className = "card-weather";
    let [dateCity, timeCity] = dt_txt.split(" ");
    dateCity = dateCity.split("-");
  
    let date = document.createElement("div");
    date.textContent = `${MONTH[dateCity[1] - 1]}, ${dateCity[2]}`;
    let time = document.createElement("div");
    time.textContent = timeCity.slice(0, 5);
  
    let temperature = document.createElement("div");
    temperature.textContent = `Температура: ${Math.round(temp)}`;
    let feelsLike = document.createElement("div");
    feelsLike.textContent = `Ощущается: ${Math.round(feels_like)}`;
  
    let weatherCity = document.createElement("div");
    weatherCity.textContent = `${weather[0].main}`;
    let container = document.createElement("div");
    container.className = "card-weather__picture";
    let img = document.createElement("img");
    img.src = getImageURL(weather[0].icon);
  
    container.append(img);
    card.append(date, time, temperature, weatherCity, feelsLike, container);
  
    return card;
  }
}

const getImageURL = (iconCode) =>
  `https://openweathermap.org/img/wn/${iconCode}@4x.png`;