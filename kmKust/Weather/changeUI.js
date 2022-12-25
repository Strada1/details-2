import { storage } from './storageMethods.js';
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

export function changeDivNow(cityName, degreesCelsius, imgLocation) {
	CITY_DIV.textContent = cityName;
	CELSIUS_DIV.textContent = degreesCelsius;
	IMG_WEATHER.src = imgLocation;
}

export function changeDivDetails(
	cityName,
	degreesCelsius,
	feelsLike,
	weatherData,
	timeSunrise,
	timeSunset) {

	let city = document.querySelector('.citiesDetails');
	city.textContent = cityName;

	let liTemp = document.querySelectorAll('.liCityInfo')[0];
	liTemp.textContent = `Temperature: ${degreesCelsius}`;

	let liFeelsLike = document.querySelectorAll('.liCityInfo')[1];
	liFeelsLike.textContent = `Feels like: ${feelsLike}`;

	let liWeather = document.querySelectorAll('.liCityInfo')[2];
	liWeather.textContent = weatherData;

	let liSunrise = document.querySelectorAll('.liCityInfo')[3];
	liSunrise.textContent = `Sunrise: ${timeSunrise}`;

	let liSunset = document.querySelectorAll('.liCityInfo')[4];
	liSunset.textContent = `Sunset: ${timeSunset}`;
}

export function changeColorHeart() {
	let imgHeartRed = "url(./img/imgHeartRed.png)";
	let imgHeart = "url(./img/imgHeart.png)";

	let cityDivText = CITY_DIV.textContent;
	let jsonParseLs = storage.getFavoriteCities();
	let cityInArray = listIncludesСity(jsonParseLs, cityDivText);

	if (!cityInArray) {
		BTN_SAVE_CITY.style.backgroundImage = imgHeart;
	} else if (cityInArray) {
		BTN_SAVE_CITY.style.backgroundImage = imgHeartRed;
	}
}

export function listIncludesСity(jsonParseLs, cityDivText) {
	let cityInArray = jsonParseLs.includes(cityDivText, 0);
	return cityInArray;
}

export function displayAddedLocations(city) {
	let createLi = document.createElement('li');
	createLi.className = "liCity";
	createLi.innerHTML = city;
	UL_CITIES.append(createLi);
}

export function checkTime(getHoursSunrise, getMinutesSunrise) {
	(getHoursSunrise < 10) ?
		getHoursSunrise = (`0${getHoursSunrise}`) : getHoursSunrise;

	(getMinutesSunrise < 10) ?
		getMinutesSunrise = (`0${getMinutesSunrise}`) : getMinutesSunrise;

	let time = `${getHoursSunrise}:${getMinutesSunrise}`;
	return time
}
