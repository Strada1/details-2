import render from './VIEW/rendering';
import getCityInfo from './MODEL/getcity';
import searchCityForm from './CONTROLLER/searchform';
import { cities } from './MODEL/locations';
import langSwitcher from './VIEW/lang';

const handleDom = () => {
  langSwitcher();
  searchCityForm();
  render(getCityInfo(cities.currentCity, cities.lang));
};
document.addEventListener('DOMContentLoaded', handleDom);
