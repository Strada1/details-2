import getCityInfo from '../MODEL/getcity';
import render from '../VIEW/rendering';
import { cities } from '../MODEL/locations';

const searching = (event) => {
  event.preventDefault();
  const cityName = event.target.searchInput.value.trim();
  render(getCityInfo(cityName, cities.lang));
};

const searchCityForm = () => {
  const searchForm = document.querySelector('.main__city-search');
  searchForm.addEventListener('submit', searching);
};

export default searchCityForm;
