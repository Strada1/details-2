import { storage } from './storage.js';

const UI_ELEMENTS = {
	FORM: document.querySelector('.weather__form'),
	INPUT: document.querySelector('.weather__input'),
	SEARCH: document.querySelector('.weather__submit'),
	FAVORITES_CITIES_LIST: document.querySelector('.weather__cities'),
	CURRENT__CITIES: document.querySelectorAll('.-city'),
	NOW_CITY: document.querySelector('.now__city'),
	NOE_TEMPERATURE: document.querySelector('.now__temperature'),
	LIKE_BUTTON: document.querySelector('.now__like'),
	ICON__WEATHER: document.querySelector('.now__img'),
	FORECAST_CONTAINER: document.querySelector('.forecast__cards'),
}

const WEATHER_DETAILS = {
	CITY: document.querySelector('.details__city'),
	TEMPERATURE: document.querySelector('.details__temperature'),
	FEELS__LIKE: document.querySelector('.details__feels-like'),
	WEATHER: document.querySelector('.details__weather'),
	SUNRISE: document.querySelector('.details__sunrise'),
	SUNSET: document.querySelector('.details__sunset'),
}

let citiesList = storage.getFavoriteCities();
render();


UI_ELEMENTS.LIKE_BUTTON.addEventListener('click', addCity);

UI_ELEMENTS.FORM.addEventListener('submit', function (event) {
    event.preventDefault();

	let newCity = UI_ELEMENTS.INPUT.value;

    sendRequest(newCity);
	event.target.reset();
});


function addCity(e) {
	e.preventDefault();

	const currenCity = UI_ELEMENTS.NOW_CITY.textContent;
	console.log(currenCity);

	if (citiesList.length > 0) {
		if (citiesList.includes(currenCity)) {
			deleteFavoriteCity(currenCity);
			
		} else {
			citiesList.push(currenCity);
			storage.saveFavoriteCities(citiesList);
		}
	} else if (citiesList.length === 0) {
		citiesList.push(currenCity);
		storage.saveFavoriteCities(citiesList);
	}

	render();	
}

function deleteFavoriteCity(currenCity) {
	citiesList = citiesList.filter((city) => {
		return city !== currenCity;				
	});

	storage.saveFavoriteCities(citiesList);
	render();
}


//функция удаления, 
function deleteCity() {
	citiesList = citiesList.filter((cityName) => {
		let currenCity = this.parentNode.textContent;
		return cityName !== currenCity;
	})

	storage.saveFavoriteCities(citiesList);
	render();
}


//функция добавления в ui
function render(){
	const favoritesCitiesList = UI_ELEMENTS.FAVORITES_CITIES_LIST;
	favoritesCitiesList.textContent = '';

	citiesList = storage.getFavoriteCities();
	 
	if (citiesList.length > 0) {
		citiesList.forEach((city) => {
			favoritesCitiesList.append(createNewListNode(city));
		})
	}
	console.log(citiesList);
}

//функция вывода города на экран из списка избранных
function replace(currenCity) {
	let cities = UI_ELEMENTS.CURRENT__CITIES;

	for (let city of cities) {
		city.textContent = currenCity;
	}

	storage.addLastCityName(currenCity);
}


function openFavoritCity(e) {
	let currenCity = e.target;
	console.log(currenCity.textContent);

	if(currenCity) {
		sendRequest(currenCity.textContent);
	}
	UI_ELEMENTS.INPUT.placeholder = currenCity.textContent;
	
}

//функция создания узла для DOM
function createNewListNode(city) {
    let newFavoritCity = document.createElement('li');
	newFavoritCity.classList.add('weather__city');
	newFavoritCity.innerHTML = city;

	const deleteIcon = document.createElement('span');
	deleteIcon.classList.add('weather__delete-city');
	deleteIcon.addEventListener('click', deleteCity);

	newFavoritCity.append(deleteIcon);
	newFavoritCity.addEventListener('click', openFavoritCity);
	
    return newFavoritCity;
}

//функция смены ui для страницы деталей погоды
function changeDetails(data) {
	WEATHER_DETAILS.TEMPERATURE.textContent = data.main.temp.toFixed(0);
	WEATHER_DETAILS.FEELS__LIKE.textContent = data.main.feels_like.toFixed(0);
	WEATHER_DETAILS.WEATHER.textContent = data.weather[0].main;
	WEATHER_DETAILS.SUNRISE.textContent = getTime(1000 * data.sys.sunrise);
	WEATHER_DETAILS.SUNSET.textContent = getTime(1000 * data.sys.sunset);
}

//функция получения иконки погоды
function getTime(data) {
	let time = new Date(data);
	let hours = time.getHours();
	let minutes = time.getMinutes();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}
	
	return `${hours}:${minutes}`
}

function getIconWeather(data) {
	const icon = data.weather[0].icon;
	const apiIcon = `http://openweathermap.org/img/wn/${icon}@4x.png`;
	
	UI_ELEMENTS.ICON__WEATHER.src = apiIcon;
}

//функция отправления запроса на сервер
async function sendRequest(text) {
	let cityName = text;
	const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
	const forecastUrl = 'http://api.openweathermap.org/data/2.5/forecast';
	const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
	const urlForForcast = `${forecastUrl}?q=${cityName}&appid=${apiKey}&units=metric`;
	let myCityActive;
	
	try {
		let responseData = await fetch(url);
		let jsonData = await responseData.json();

		if (!jsonData.name) {
			alert('This city doesn\'t exsist');
		}

		if (jsonData.cod < 300) {
			replace(jsonData.name);
			//console.log(data);
			UI_ELEMENTS.NOE_TEMPERATURE.textContent = jsonData.main.temp.toFixed(0) + '°';
			storage.getLastCityName();
			storage.addLastCityName(jsonData.name);
			changeDetails(jsonData);
			getIconWeather(jsonData);
			myCityActive = new CityActive(jsonData.name);
			//console.log(myCityActive);	
		}
		
		let responseForecast = await fetch(urlForForcast);
		let jsonForecast = await responseForecast.json();

		if (jsonForecast.name){
			forecastRequest(jsonForecast.list);
		}

	} catch(error) {
		alert(`ERROR! ${error.message}`);
	}
	/*
	fetch(url)
			.then(response => response.json())
			.then(data => {
				if (data.cod < 300) {
					replace(data.name);
					//console.log(data);
					UI_ELEMENTS.NOE_TEMPERATURE.textContent = data.main.temp.toFixed(0) + '°';
					storage.getLastCityName();
					storage.addLastCityName(data.name);
					changeDetails(data);
					getIconWeather(data);
					myCityActive = new CityActive(data.name);
					console.log(myCityActive);
				}
				
			})
			.catch(error => alert(`Error!: ${error.message}`));
	
	fetch(urlForForcast)
			.then(response => response.json())
			.then(data => {
				console.log(data);
				forecastRequest(data.list);
			})
			.catch(error => alert(`Error!: ${error.message}`));
			*/
}

function forecastRequest(dataArr) {
	//const temperature = data.list.0.main.temp;
	//const weatherStatus = data.list.0.main.feels_like;
	//const iconWeather = data.list.0.weather.0.main;
	for (let data of dataArr) {
		
	}
}

function createForecastCard(data) {
	UI_ELEMENTS.FORECAST_CONTAINER.textContent = '';

	const forecastCard = createElement('div');
	forecastCard.classList.add('forecast__card');

	const temperature = data.main.temp.toFixed(1);
	const temperatureDiv = createElement('div');
	temperatureDiv.classList.add('forecast__temperature');
	temperatureDiv.textContent = `Temperature: ${temperature}&deg`;

	const feelsLike = data.main.feels_like.toFixed(1);
	const feelsLikeDiv = createElement('div');
	feelsLikeDiv.classList.add('forecast__feels-like');
	feelsLikeDiv.textContent = `Feels like: ${feelsLike}&deg`;

	const weatherCondition = data.weather[0].main;
	const weatherConditionDiv = createElement('div');
	weatherConditionDiv.classList.add('forecast__conditions');
	weatherConditionDiv.textContent = `${weatherCondition}`;

	forecastCard.append();
	/*
	date
	time
	icon
	*/
}


function CityActive(city) {
	this.name = city;
	this.favoritesCity = false;
}
/* object after fetch request
base: "stations"
clouds: {all: 9}
cod: 200
coord: {lon: 50, lat: 53}
dt: 1669997227
id: 499068
main: {feels_like: 254.43, grnd_level: 1033, humidity: 92,
		pressure: 1048, sea_level: 1048, temp: 261.32,
		temp_max: 261.32, temp_min: 261.32}
name: "Samara Oblast"
sys: {country: 'RU', sunrise: 1669955499, sunset: 1669984040}
timezone: 14400
visibility: 10000
weather: [{id: 800, main: 'Clear', description: 'clear sky', icon: '01n'}]
wind: {speed: 3.9, deg: 77, gust: 8.01}


forecast
http://api.openweathermap.org/data/2.5/forecast
*/