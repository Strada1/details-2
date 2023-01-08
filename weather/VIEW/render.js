// eslint-disable-next-line import/no-cycle
import locationHandle from './locationHandle';
import { addLocation, removeLocation, cities } from '../MODEL/locations';

export function cityRender(array) {
  const cityLocations = document.querySelector(
    '.main_info-section_locations-cities',
  );
  cityLocations.replaceChildren();
  const renderCityArr = (arr = [...array]) => {
    if (arr.length) {
      const city = arr.shift();
      const location = document.createElement('p');
      location.textContent = city;
      location.setAttribute('data-cityname', city);
      cityLocations.append(location);
      renderCityArr(arr);
    }
  };
  renderCityArr();

  cityLocations.addEventListener('click', locationHandle);
}

export const addCity = (event) => {
  const cityName = document.querySelector(
    '.main_info-section_left-side_card-first_title-city',
  );
  const city = cityName.dataset.name;
  const likeButton = event.target;
  likeButton.classList.toggle('like');
  likeButton.classList.toggle(
    'main_info-section_left-side_card-first_title-like',
  );
  if (likeButton.classList.contains('like')) {
    addLocation(city);
  } else {
    removeLocation(city);
  }
  cityRender(cities.favoriteCities);
};
