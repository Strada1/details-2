const TABS = {
    ALL_BTN: document.querySelectorAll('.btn-nav'),
    ALL_TABS: document.querySelectorAll('.tabs_block'),
};

const FORMELEMENTS = {
    MAIN_FORM: document.querySelector('.main-form'),
    CITY_INPUT: document.querySelector('.city-input'),
};

const serverUrl= 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '0d8b1ccc4f47d75a3547f596bbe9594a';
const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';

const NOWBLOCKEL = {
    DEGREES: document.querySelector('.main-number'),
    CITY: document.querySelector('.main-forecast-city'),
    HEART: document.querySelector('.like'),
    ICON: document.querySelector('.main-forecast-img'),
};

const DETAILSBLOCK = {
    CITY: document.querySelector('.main-location-cities'),
    TEMP: document.querySelector('.det-temp'),
    FEEL: document.querySelector('.det-feel'),
    WEATHER: document.querySelector('.det-weather'),
    SUNRISE: document.querySelector('.det-sunrise'),
    SUNSET: document.querySelector('.det-sunset'),
};

const FORECASTBLOCKEL = {
    CITY: document.querySelector('.main-forecast-cities'),
    BLOCK: document.querySelector('.for'),
};

let divList = document.querySelector('.div-list');


TABS.ALL_BTN.forEach(function(item) {
    item.addEventListener('click', function() {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);
        TABS.ALL_BTN.forEach(function(item) {
            item.classList.remove('active');
        });
        TABS.ALL_TABS.forEach(function(item) {
            item.classList.remove('active');
        });
        currentBtn.classList.add('active');
        currentTab.classList.add('active');
    });
});

export {TABS, FORMELEMENTS, serverUrl, apiKey, forecastUrl, NOWBLOCKEL, DETAILSBLOCK, FORECASTBLOCKEL, divList};