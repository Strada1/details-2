
import { storage } from "./storage.js"
import { getTime } from "./date.js"

const form = document.querySelector('.form');
const nowCityName = document.querySelector('.now__cityName');
const nowTemp = document.querySelector('.now__temp');
const nowIcon = document.querySelector('.now__icon');
const favoritIcon = document.querySelector('.heart');
const cityList = document.querySelector('.city__list');
const detailsTemp = document.querySelector('.details__temp');
const detailsFeelsLike = document.querySelector('.details__feelsLike');
const detailsWeather = document.querySelector('.details__weather');
const detailsCity = document.querySelector('.details__city');
const detailsSunrise = document.querySelector('.details__sunrise');
const detailsSunset = document.querySelector('.details__sunset');
const forecastCityName = document.querySelector('.forecast__city');

favoritIcon.addEventListener('click',addCityList);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = document.querySelector('.search__input').value; 
    if(inputValue !== '') {
        getCity(inputValue)
    }
});

 async function getCity(value) {

    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const cityName = value;
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'; 
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
    
    try{
        let respons = await fetch(url);
        let data = await respons.json();

        getData(data)
    }catch{
        alert(` ${error}`)
    }
};

function getData ({
    name : cityName, 
    main : { feels_like, temp }, 
    weather : [ { description, icon } ], 
    sys : { sunrise, sunset }, 
    timezone, 
}) {
    
    nowCityName.textContent =  cityName;
    nowTemp.textContent = Math.round(temp)+` C°`;
    nowIcon.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

    detailsCity.textContent = cityName;
    detailsTemp.textContent = Math.round(temp)+` C°`;
    detailsFeelsLike.textContent = Math.round(feels_like)+` C°` ;
    detailsWeather.textContent = description;
    detailsSunrise.textContent = getTime(sunrise, timezone);
    detailsSunset.textContent  = getTime(sunset, timezone);

    forecastCityName.textContent = cityName;

     storage.currentCity = cityName;
     storage.saveCurrentCity(storage.currentCity);
};
function addCityList() {
    const city = nowCityName.textContent;

    if (storage.list.has(city)) {
        storage.list.delete(city)
      } else {
        storage.list.add(city)
      }
      storage.saveFavoriteCities(storage.list)

    render();
};
function render() {
    storage.getFavoriteCities();
    if (storage.list === null) {
        storage.list = new Set();
    }
    cityList.innerHTML = "";

    storage.list.forEach((item) => {
        createFavoriteItem(item);
    })
}

function createFavoriteItem(item) {

        let cityItem = document.createElement('div');
        cityItem.className = 'city__item';

        let city = document.createElement('div');
        city.className = 'city';
        city.textContent = item;
   
        let buttonDelete = document.createElement('div');
        buttonDelete.className = 'btn__delete';
        if(city.textContent !== "") {
            buttonDelete.textContent = '+';
        }
        cityList.prepend(cityItem);
        cityItem.prepend(city);
        cityItem.append(buttonDelete);
       
        city.addEventListener("click", () => {
                getCity(item)
        });
    
        buttonDelete.addEventListener("click", function () {
           
            cityItem.remove();  
        });
};

storage.getCurrentCity();
storage.getFavoriteCities();
getCity(storage.currentCity);
render();