import {
    FORMELEMENTS,
    serverUrl,
    apiKey,
    forecastUrl,
    NOWBLOCKEL, 
    FORECASTBLOCKEL, 
    divList, 
} from './modules/variables.js';
import {storage, listArr} from './modules/local.js';
import { renderData, renderDetails } from './modules/renderData.js';
import {addToarr, toggleLike} from './modules/addDelete.js';
import createForecastEl from './modules/createEl.js';

showList();

function showList() {
    divList.innerHTML = '';
    listArr.forEach((item)=> {
        createCityEl(item);
    });
    storage.setFavCities(listArr);
};

FORMELEMENTS.MAIN_FORM.addEventListener('submit', (event) =>{
    event.preventDefault();
    formHandler();
});

NOWBLOCKEL.HEART.addEventListener('click', () =>{
    heartHandler();
});

function formHandler() {
    toggleLike(FORMELEMENTS.CITY_INPUT.value);
    getRequest(serverUrl, FORMELEMENTS.CITY_INPUT.value);
    getForecastRequest(forecastUrl, FORMELEMENTS.CITY_INPUT.value);
    FORMELEMENTS.CITY_INPUT.value = '';
};

function heartHandler() {
    addToarr(NOWBLOCKEL.CITY.textContent);
    showList();
};

function getRequest(link, cityName) {
    fetch( `${link}?q=${cityName}&appid=${apiKey}`)
    .then(response => {
        if(response.ok) {
            return response.json()
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
        response.json()})
    .then(data => {
        renderData(data);
        renderDetails(data);
        storage.setCurrentCity(data.name);
    });
};

function getForecastRequest(link, cityName) {
    fetch(`${link}?q=${cityName}&appid=${apiKey}`)
    .then(response => response.json())
    .then(result => {
        let list = result.list;
        let spliceList = list.splice(0, 5);
        FORECASTBLOCKEL.CITY.textContent = result.city.name;
        FORECASTBLOCKEL.BLOCK.innerHTML = '';
        spliceList.forEach(function(item) {
            createForecastEl(item);
        });
    });
};

function createCityEl(name) {
    const newEl = document.createElement('li');
    newEl.className = 'cityList';
    newEl.textContent = name;
    newEl.addEventListener('click', function(item) {
        toggleLike(name);
        getRequest(serverUrl, name);
        getForecastRequest(forecastUrl, name);
    })
    const cross = document.createElement('button');
    cross.textContent = '+';
    cross.className = 'cross';
    newEl.append(cross); 
    divList.append(newEl);
    cross.addEventListener('click', () => {
        deleteFromArr(name);
    });
};

function deleteFromArr(cityName) {
    if(listArr.has(cityName)) {
        listArr.delete(cityName);
    }
    storage.setFavCities(listArr);
    showList();
};