import TIMEMETHOD from '../timemethods';
import { getTimeFrom } from '../../CONTROLLER/helpers';

const forecastInterface = ({ list }, forecast = []) => {
  if (list.length) {
    const element = list.shift();
    const needInfoInForecast = {
      date: getTimeFrom(TIMEMETHOD.DT_TO_DAY_MONTH, element.dt_txt),
      time: getTimeFrom(TIMEMETHOD.DT_TO_HOURS_MINUTES, element.dt_txt),
      temp: Math.round(element.main.temp),
      feels_like: Math.round(element.main.feels_like),
      weather: element.weather[0].description,
      icon: element.weather[0].icon,
    };
    forecast.push(needInfoInForecast);
    forecastInterface({ list }, forecast);
  }

  return forecast;
};

export default forecastInterface;
