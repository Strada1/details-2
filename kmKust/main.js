import { storage } from './storageMethods.js';
import {
    changeDivNow,
    changeDivDetails,
    listIncludesСity,
    changeColorHeart,
    displayAddedLocations,
    checkTime,
} from './changeUI.js';

import {
    CURRENT_TAB,
    BTN_SAVE_CITY,
    SEARCH__INPUT,
    FORM,
    UL_CITIES,
    CITY_DIV,
    CELSIUS_DIV,
    IMG_WEATHER,
} from './view.js';
import Cookies from 'js-cookie';

const CURRENT_TAB_TEXT = {
    NOW: 'Now',
    DETAILS: 'Details',
    FORECAST: 'Forecast',
};

document.addEventListener('DOMContentLoaded', handleContentLoaded);

async function handleContentLoaded() {
    let localStorageLength = localStorage.length;

    if (localStorageLength === 0) {
        await storage.defaultLocalStorage();
    }
    if (document.cookie === '') {
        let cityDivText = CITY_DIV.textContent;
        await setCookie(cityDivText);
        await getCookie();
    } else {
        await getCookie();
    }
}

function getCookie() {
    let cityName = Cookies.get('currentCity');
    cityDataSearch(cityName);
}

function setCookie(cityDivText) {
    let in1horse = 1 / 24;
    Cookies.set('currentCity', `${cityDivText}`, { expires: in1horse });
}

function chooseTab() {
    let currentTab = storage.getCurrentTab();
    switch (currentTab) {
        case CURRENT_TAB_TEXT.NOW:
            document.querySelector('.tabs__item:nth-child(1)').click();
            return;

        case CURRENT_TAB_TEXT.DETAILS:
            document.querySelector('.tabs__item:nth-child(2)').click();
            return;

        case CURRENT_TAB_TEXT.FORECAST:
            document.querySelector('.tabs__item:nth-child(3)').click();
            return;
    }
}

async function cityDataSearch(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = '3bfb7384f048b8e78896a10d694dd618';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (!data.name) {
            throw new Error('Введите существующий город');
        }
        CityData(data);
    } catch (error) {
        alert(`Ошибка: ${error.message}`);
    }
}

const CityData = ({ name, main, weather, sys }) => {
    let cityName = name;
    let degreesCelsius = Math.round(main.temp - 273, 15) + '°';
    let imgLocation = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;
    let feelsLike = Math.round(main.feels_like - 273, 15) + '°';
    let weatherData = weather[0].main;

    let sunriseDate = new Date(sys.sunrise * 1000);
    let getHoursSunrise = sunriseDate.getHours();
    let getMinutesSunrise = sunriseDate.getMinutes();
    let timeSunrise = checkTime(getHoursSunrise, getMinutesSunrise);

    let sunsetDate = new Date(sys.sunset * 1000);
    let getHoursSunset = sunsetDate.getHours();
    let getMinutesSunset = sunsetDate.getMinutes();
    let timeSunset = checkTime(getHoursSunset, getMinutesSunset);

    changeDivNow(cityName, degreesCelsius, imgLocation);
    changeDivDetails(
        cityName,
        degreesCelsius,
        feelsLike,
        weatherData,
        timeSunrise,
        timeSunset
    );
    render();
};

function render() {
    UL_CITIES.replaceChildren();

    let cityDivText = CITY_DIV.textContent;
    let jsonParseLs = storage.getFavoriteCities();
    let lengthArray = jsonParseLs.length - 1;

    chooseTab();
    getCitysName(jsonParseLs, lengthArray);
    setCookie(cityDivText);
    changeColorHeart();
}

function getCitysName(jsonParseLs, lengthArray) {
    if (lengthArray === 0) {
        return displayAddedLocations(jsonParseLs[lengthArray]);
    } else if (lengthArray > 0) {
        displayAddedLocations(jsonParseLs[lengthArray]);
        return getCitysName(jsonParseLs, lengthArray - 1);
    }
}

function changLocalStorage() {
    let cityDivText = CITY_DIV.textContent;
    let jsonParseLs = storage.getFavoriteCities();
    let cityInArray = listIncludesСity(jsonParseLs, cityDivText);

    if (cityInArray) {
        jsonParseLs = jsonParseLs.filter((item) => item !== cityDivText);
    } else {
        jsonParseLs.push(cityDivText);
    }

    storage.saveFavoriteCities(jsonParseLs);
}

BTN_SAVE_CITY.addEventListener('click', () => {
    changLocalStorage();
    render();
});

FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    let cityName = SEARCH__INPUT.value;
    cityDataSearch(cityName);
    render();
    event.target.reset();
});

UL_CITIES.addEventListener('click', (event) => {
    let clickCity = event.target.closest('.liCity');
    let cityName = clickCity.textContent;
    cityDataSearch(cityName);
});

CURRENT_TAB.addEventListener('click', (event) => {
    let clickCurrentTab = event.target.closest('.tabs__item');
    storage.saveCurrentTab(clickCurrentTab);
});
