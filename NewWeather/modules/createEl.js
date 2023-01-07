
import { FORECASTBLOCKEL } from "./variables.js";
import { getCelsius, dateTimeToHuman, getHumanHours } from "./countDateTime.js";

function createForecastEl(value) {
    const forecastBlock = document.createElement('div');
    forecastBlock.className = 'forecast-block';
    let forecastDateTime = document.createElement('div');
    forecastDateTime.className = 'forecast_date_time';
    let forecastDate = document.createElement('p');
    forecastDate.className = 'forecast_date';
    forecastDate.textContent = `${dateTimeToHuman(new Date(value.dt_txt))}`;
    let forecastTime = document.createElement('p');
    forecastTime.className = 'forecast_time';
    forecastTime.textContent = `${getHumanHours(new Date(value.dt_txt))}`;

    forecastDateTime.prepend(forecastDate, forecastTime);

    const forecastTempCondition = document.createElement('div');
    forecastTempCondition.className = 'forecast_temp_condition';
    let forecastTemp = document.createElement('p');
    forecastTemp.className = 'forecast_temp';
    forecastTemp.textContent = `Temperature: ${getCelsius(value.main.temp)}`;
    let forecastCond = document.createElement('p');
    forecastCond.className = 'forecast_cond';
    forecastCond.textContent = `${value.weather[0].description}`;

    forecastTempCondition.prepend( forecastTemp, forecastCond);

    const forecastFeelPict = document.createElement('div');
    forecastFeelPict.className = 'forecast_feel_pict';
    let forecastFeel = document.createElement('p');
    forecastFeel.className = 'forecast_feel';
    forecastFeel.textContent = `Feels like: ${getCelsius(value.main.feels_like)}`;
    const forecastPict = document.createElement('img');
    forecastPict.className = 'forecast_pict';
    forecastPict.src = `http://openweathermap.org/img/wn/${value.weather[0].icon}@2x.png`;
    forecastFeelPict.prepend(forecastFeel, forecastPict);

    forecastBlock.prepend(forecastDateTime, forecastTempCondition, forecastFeelPict,);

    FORECASTBLOCKEL.BLOCK.append(forecastBlock);
}

export default createForecastEl;

