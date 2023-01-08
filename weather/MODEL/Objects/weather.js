import TIMEMETHOD from '../timemethods';
import { getTimeFrom } from '../../CONTROLLER/helpers';

const weatherInterface = ({
  id, name, main, weather, sys,
}) => {
  const needInfo = {
    id,
    name,
    temp: Math.round(main.temp),
    feelsLike: Math.round(main.feels_like),
    weatherMain: weather[0].main,
    WeatherDescription: weather[0].description,
    sunrise: getTimeFrom(TIMEMETHOD.TIMESTAMP_TO_HOURS_MINUTES, sys.sunrise),
    sunset: getTimeFrom(TIMEMETHOD.TIMESTAMP_TO_HOURS_MINUTES, sys.sunset),
    icon: weather[0].icon,
  };
  return needInfo;
};

export default weatherInterface;
