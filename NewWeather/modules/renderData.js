import { NOWBLOCKEL, DETAILSBLOCK } from "./variables.js";
import { getCelsius, getHumanHours } from "./countDateTime.js";

export function renderData(value) {
    NOWBLOCKEL.DEGREES.textContent = getCelsius(value.main.temp) + '℃';
    NOWBLOCKEL.CITY.textContent = value.name;
    NOWBLOCKEL.ICON.src = `http://openweathermap.org/img/wn/${value.weather[0].icon}@4x.png`;
}

export function renderDetails(value) {
    DETAILSBLOCK.CITY.textContent = value.name;
    DETAILSBLOCK.TEMP.textContent = getCelsius(value.main.temp) + '℃';
    DETAILSBLOCK.FEEL.textContent = getCelsius(value.main.feels_like) + '℃';
    DETAILSBLOCK.WEATHER.textContent = value.weather[0].main;
    DETAILSBLOCK.SUNRISE.textContent = getHumanHours(new Date(value.sys.sunrise * 1000));
    DETAILSBLOCK.SUNSET.textContent = getHumanHours(new Date(value.sys.sunset * 1000));
}

