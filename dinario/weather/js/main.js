import { URL, getFetch } from "./api.js";
import {
    cityList,
    getCurrentCity,
    saveCurrentCity,
    saveFavoriteCityToList,
    getStoredCityFromList,
    deleteFavoriteCity,
} from "./cityStorage.js";

const NOW = {
    CityName: document.querySelector(".now-city"),
    CityTemp: document.querySelector(".now-temp"),
    CityImg: document.querySelector(".now-img"),
};

const DETAILS = {
    CityName: document.querySelector(".details-city"),
    Temp: document.querySelector(".details-temp"),
    Feels: document.querySelector(".details-feels"),
    Weather: document.querySelector(".details-weather"),
    Sunnrise: document.querySelector(".details-sunrise"),
    Sunset: document.querySelector(".details-sunset"),
};

const FORECASTS = {
    CityOne: document.querySelector(".forecast-city"),
};

const tabsBtn = document.querySelector(".weather-tabs");
const favoriteBtn = document.querySelector(".now-favorites-btn");
const searchForm = document.querySelector(".search-form");

tabsBtn.addEventListener("click", handleTabClick);
function handleTabClick(event) {
    const currentBtn = event.target;
    const tabId = currentBtn.getAttribute("data-tab");
    const currentTab = document.querySelector(tabId);
    const activeTab = document.querySelectorAll(".active");

    activeTab.forEach(function (item) {
        item.classList.remove("active");
    });
    currentBtn.classList.add("active");
    currentTab.classList.add("active");
}
document.querySelector(".weather-tab").click();

searchForm.addEventListener("submit", handleSearch);
function handleSearch(event) {
    event.preventDefault();

    const inputValue = event.target.querySelector("input").value;
    fetchCityData(inputValue);

    event.target.reset();
};

favoriteBtn.addEventListener("click", handleAddToFavorite);
function handleAddToFavorite() {
    saveFavoriteCityToList(NOW.CityName.textContent);
    render();
};

function handleStoredCitySelect({ id }) {
    let clickCity = getStoredCityFromList(id);
    fetchCityData(clickCity.name);
};

function handleDeleteCity({ id }) {
    deleteFavoriteCity(id);
    render();
};

async function fetchCityData(cityName) {
    let actualData = await getFetch(cityName, URL.WEATHER)
    let forecastData = await getFetch(cityName, URL.FORECAST)
    if(actualData){
        addInfo(actualData)
        addToForecast(forecastData)
    }
}

function addInfo({ name, main, weather, sys }) {
    NOW.CityName.textContent = name;
    NOW.CityTemp.textContent = Math.round(main.temp) + "˚";
    NOW.CityImg.style.background =
        `url(http://openweathermap.org/img/wn/${weather[0].icon}@4x.png)`;

    DETAILS.CityName.textContent = name;
    DETAILS.Temp.textContent = "Temperature: " + Math.round(main.temp) + "˚";
    DETAILS.Feels.textContent =
        "Feels like: " + Math.round(main.feels_like) + "˚";
    DETAILS.Weather.textContent = "Weather: " + weather[0].main;
    const sunrise = new Date(1000 * sys.sunrise);
    const sunset = new Date(1000 * sys.sunset);
    DETAILS.Sunnrise.textContent =
        "Sunrise: " + sunrise.getHours() + ":" + sunrise.getMinutes();
    DETAILS.Sunset.textContent =
        "Sunset: " + sunset.getHours() + ":" + sunset.getMinutes();

    saveCurrentCity(NOW.CityName.textContent);
}

function addToForecast({ city, list }) {
    FORECASTS.CityOne.textContent = city.name;
    let forcastList = document.querySelector(".forecast-list");
    forcastList.innerHTML = "";

    for (let i = 1; i < 5; i++) {
        const forecastCard = document.createElement("div");
        const forecastDay = document.createElement("p");
        const forecastTime = document.createElement("p");
        const forecastDegree = document.createElement("div");
        const forecastFeels = document.createElement("div");
        const forecastaData = document.createElement("div");
        const forecastImg = document.createElement("div");

        forecastCard.className = "forecast-card";
        forecastTime.className = "forecast-card-time";
        forecastaData.className = "card-precipitation";
        forecastImg.className = "card-img";

        const dateTime = list[i].dt_txt.split(" ");
        forecastDay.textContent = dateTime[0];
        forecastTime.textContent = dateTime[1];
        forecastDegree.textContent =
            "Temperature:" + Math.round(list[i].main.temp) + "˚";
        forecastFeels.textContent =
            "Feels like:" + Math.round(list[i].main.feels_like) + "˚";
        forecastaData.textContent = list[i].weather[0].main;
        forecastImg.style.background =
            `url(http://openweathermap.org/img/wn/${list[i].weather[0].icon}.png)`;

        forecastCard.append(
            forecastDay,
            forecastTime,
            forecastDegree,
            forecastaData,
            forecastFeels,
            forecastImg
        );
        forcastList.append(forecastCard);
    }
}

function render() {
    const locList = document.querySelectorAll(".location-list li");
    locList.forEach((item) => item.remove());

    cityList.forEach((city) => {
        const place = document.querySelector(".location-list");
        const newLi = document.createElement("li");
        const newDiv = document.createElement("div");
        const newBnt = document.createElement("button");
        newBnt.textContent = "+";
        newDiv.textContent = city.name;
        newLi.append(newDiv, newBnt);

        newBnt.addEventListener("click", () => handleDeleteCity(city));
        newDiv.addEventListener("click", () => handleStoredCitySelect(city));
        place.prepend(newLi);
    });
}

window.addEventListener("load", () => {
    render();
    let lastCity = getCurrentCity();
    if (lastCity) {
        fetchCityData(lastCity);
    }
});

