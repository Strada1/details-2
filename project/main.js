import { UI_ELEMENTS, URLS, changeDetailContent, changeHeaderContent, addNewForecastElem, dateConvertor, timeConverter } from "./module/view.js"
import { storage } from "./module/storage.js"
import { TABS } from "./module/tabs.js"

TABS.addEventTabChange();
let setCities = storage.getFavoriteCities() || [];
render()

UI_ELEMENTS.FORM.addEventListener('submit', (event) => {
	const cityName = UI_ELEMENTS.FORM_INPUT.value;
	getWeather(cityName);
	getForecast(cityName);
	storage.saveCurrentCity(cityName);
	event.preventDefault();
})

UI_ELEMENTS.BTN_LIKE.addEventListener('click', () => {
	const cityName = UI_ELEMENTS.CURRENT_CITY_NAME.textContent;
	addSetElem(cityName);
	storage.saveCurrentCity(cityName);
})

function render() {
	UI_ELEMENTS.FAV_CITIES.replaceChildren();
	for (let city of setCities) {
		addCityToFav(city);
	}
	getWeather(storage.getCurrentCity());
	getForecast(storage.getCurrentCity());
}

function getWeather(cityName) {
	let url = URLS.weatherDataUrl(cityName)
	let weatherData;
	fetch(url)
		.then(response => {
			if (response.ok) {
				return response.json()
			}
			else {
				throw new Error("Server not work.");
			}
		})
		.then(data => {
			weatherData = data;
		})
		.then(() => {
			changeHeaderContent(cityName, weatherData);
			changeDetailContent(cityName, weatherData);
		})
		.catch(alert)
}

function getForecast(cityName) {
	UI_ELEMENTS.FORECAST_CONTAINER.replaceChildren();
	UI_ELEMENTS.FORECAST_CITY.textContent = cityName;
	let url = URLS.weatherForecastUrl(cityName);
	let forecastData;
	fetch(url)
		.then(response => response.json())
		.then(result => {
			forecastData = result.list;
		})
		.then(() => {
			forecastData.forEach((obj) => {
				addNewForecastElem(
					obj.main.temp,
					obj.main.feels_like,
					dateConvertor(obj.dt),
					timeConverter(obj.dt),
					obj.weather[0].main,
					obj.weather[0].icon
				)
			})
		})
}

function addCityToFav(cityName) {
	let li = document.createElement('li');
	let div = document.createElement('div');
	div.textContent = cityName;
	div.className = 'list-city__text';

	div.addEventListener('click', () => {
		getWeather(cityName);
		getForecast(cityName);
		storage.saveCurrentCity(cityName);
	})

	let btn_del = document.createElement('span');
	btn_del.className = "added_city-remove";
	btn_del.textContent = "+";
	btn_del.addEventListener('click', () => {
		deleteSetElem(cityName);
	})

	li.append(div);
	li.append(btn_del);
	UI_ELEMENTS.FAV_CITIES.append(li);
}

function addSetElem(item) {
	setCities.add(item);
	storage.saveFavoriteCities(setCities);
	render();
	return setCities;
}

function deleteSetElem(item) {
	setCities.delete(item);
	storage.saveFavoriteCities(setCities);
	render();
	return setCities;
}