import giveTabs from './tabs';
// eslint-disable-next-line import/no-cycle
import nowCard from './cards/nowcard';
import detailsCard from './cards/detailscard';
import forecastCard from './cards/forecastcard';
import RU from '../MODEL/languages/ru';
import EN from '../MODEL/languages/en';
// eslint-disable-next-line import/no-named-as-default
import languageHelper from '../CONTROLLER/langHelp';
// eslint-disable-next-line import/no-cycle
import { cityRender } from './render';
import { cities } from '../MODEL/locations';

async function render(array) {
  const [cityWeather, forecast] = await array;
  const leftSide = document.querySelector('.main_info-section_left-side_card');
  languageHelper(cities.lang);
  leftSide.replaceChildren();
  leftSide.append(nowCard(cityWeather));
  leftSide.append(detailsCard(cityWeather, cities.lang === 'ru' ? RU : EN));
  leftSide.append(
    forecastCard(cityWeather, forecast, cities.lang === 'ru' ? RU : EN),
  );
  giveTabs();
  cityRender(cities.favoriteCities);
  cities.currentCity = cityWeather.name;
}
export default render;
