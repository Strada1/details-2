export const UI_ELEMENTS = {
	FORM_INPUT: document.querySelector('.form__input'),
	FORM: document.querySelector('.weather__form'),
	HEADER_TEMPERATURE: document.querySelector('.header__temperature'),
	CURRENT_CITY_NAME: document.querySelector('.current-city__name'),
	IMAGE_MOOD: document.querySelector('.image_mood'),
	FAV_CITIES: document.querySelector(".list__favourite-cities"),
	BTN_LIKE: document.querySelector(".current-city__btn-like"),

	DETAILS_CITY: document.querySelector(".details__city"),
	DETAILS_CITY_TEMP: document.querySelector(".details__city-temp"),
	DETAILS_CITY_FEELS: document.querySelector(".details__city-feels"),
	DETAILS_CITY_MOOD: document.querySelector(".details__city-mood"),
	DETAILS_CITY_SUNRICE: document.querySelector(".details__city-sunrise"),
	DETAILS_CITY_SUNSET: document.querySelector(".details__city-sunset"),

	FORECAST_CONTAINER: document.querySelector(".forecast-container"),
	FORECAST_CITY: document.querySelector(".forecast-city"),
	TOP_DATA: document.querySelector(".forecast-top__data"),
	TOP_TIME: document.querySelector(".forecast-top__time"),
	FORECAST_TEMP: document.querySelector(".bottom-text-data__temp"),
	FORECAST_FEELS_LIKE: document.querySelector(".bottom-text-data__feels-like"),
	FORECAST_MOOD_TEXT: document.querySelector(".bottom-weather-mood__text"),
	FORECAST_IMG: document.querySelector(".mood-img"),
}

export const URLS = {
	weatherImgUrl(idWeatherMood) {
		const serverUrl = 'https://openweathermap.org/img/wn/';
		const url = `${serverUrl}${idWeatherMood}@4x.png`
		return url;
	},
	weatherDataUrl(cityName) {
		const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
		const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
		const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
		return url;
	},
	weatherForecastUrl(cityName) {
		const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast';
		const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
		const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
		return url;
	}
}

export function changeHeaderContent(cityName, { main, weather }) {
	UI_ELEMENTS.HEADER_TEMPERATURE.textContent = `${convertToCelsius(main.temp)}°`;
	UI_ELEMENTS.CURRENT_CITY_NAME.textContent = convertCityName(cityName);
	UI_ELEMENTS.IMAGE_MOOD.setAttribute('src', URLS.weatherImgUrl(weather[0].icon));
}

export function changeDetailContent(cityName, { main, weather, sys }) {
	const { temp, feels_like } = main;
	const { sunrise, sunset } = sys;
	UI_ELEMENTS.DETAILS_CITY.textContent = convertCityName(cityName);
	UI_ELEMENTS.DETAILS_CITY_TEMP.textContent = `Temperature: ${convertToCelsius(temp)}°`;
	UI_ELEMENTS.DETAILS_CITY_FEELS.textContent = `Feels like: ${convertToCelsius(feels_like)}°`;
	UI_ELEMENTS.DETAILS_CITY_MOOD.textContent = `Weather: ${weather[0].main}`;
	UI_ELEMENTS.DETAILS_CITY_SUNRICE.textContent = `Sunrise: ${timeConverter(sunrise)}`;
	UI_ELEMENTS.DETAILS_CITY_SUNSET.textContent = `Sunset: ${timeConverter(sunset)}`;
}

export function addNewForecastElem(temp, feelsLike, data, time, mood, iconId) {
	let forecastElem = document.createElement('div');
	forecastElem.className = "forecast-elem";

	let forecastTop = document.createElement('div');
	forecastTop.className = "forecast-top";

	let topData = document.createElement('div');
	let topTime = document.createElement('div');
	topData.className = "forecast-top__data";
	topData.textContent = data;
	topTime.className = "forecast-top__time";
	topTime.textContent = time;

	let forecastBottom = document.createElement('div');
	forecastBottom.className = "forecast-botom";

	let bottomTextData = document.createElement('div');
	bottomTextData.className = "forecast-bottom__text-data";
	let dataTemp = document.createElement('div');
	let dataFeelsLike = document.createElement('div');
	dataTemp.className = "bottom-text-data__temp";
	dataTemp.textContent = `Temperature: ${convertToCelsius(temp)}°`;
	dataFeelsLike.className = "bottom-text-data__feels-like";
	dataFeelsLike.textContent = `Feels like: ${convertToCelsius(feelsLike)}°`;

	let weatherMood = document.createElement('div');
	weatherMood.className = "forecast-bottom__weather-mood";
	let weatherMoodText = document.createElement('div');
	let weatherMoodImg = document.createElement('div');
	weatherMoodText.className = "bottom-weather-mood__text";
	weatherMoodText.textContent = mood;
	weatherMoodImg.className = "bottom_weather-mood__img";
	let moodImg = document.createElement('img');
	moodImg.className = "mood-img";
	moodImg.setAttribute('src', URLS.weatherImgUrl(iconId));

	weatherMoodImg.append(moodImg);
	weatherMood.append(weatherMoodText, weatherMoodImg);
	bottomTextData.append(dataTemp, dataFeelsLike);
	forecastTop.append(topData, topTime);
	forecastBottom.append(bottomTextData, weatherMood);
	forecastElem.append(forecastTop, forecastBottom);

	UI_ELEMENTS.FORECAST_CONTAINER.append(forecastElem);
}


export function convertToCelsius(temp) {
	let result;
	result = Math.floor(temp - 273.15);
	return result;
}

function convertCityName(city) {
	let result = city.toLowerCase();
	result = result.charAt(0).toUpperCase() + result.slice(1);
	return result;
}

export function timeConverter(UNIX_timestamp) {
	const date = new Date(UNIX_timestamp * 1000);
	let hour = date.getHours();
	hour = (hour < 10) ? "0" + hour : hour;

	let min = date.getMinutes();
	min = (min < 10) ? "0" + min : min;

	const time = hour + ':' + min
	return time;
}

export function dateConvertor(UNIX_timestamp) {
	const date = new Date(UNIX_timestamp * 1000);
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const month = months[date.getMonth()];
	const dayMonth = date.getDate();
	const time = month + ' ' + dayMonth;
	return time;
}
