import { cities } from '../MODEL/locations';
import RU from '../MODEL/languages/ru';
import EN from '../MODEL/languages/en';

const tabHandle = (card) => {
  const firstCard = document.querySelector(
    '.main_info-section_left-side_card-first',
  );
  const secondCard = document.querySelector(
    '.main_info-section_left-side_card-second',
  );
  const thirdCard = document.querySelector(
    '.main_info-section_left-side_card-third',
  );
  const forecast = document.getElementById('forecast');
  const now = document.getElementById('now');
  const details = document.getElementById('details');
  switch (card.id) {
    case 'details':
      cities.tab = 'details';
      card.classList.add('active');
      secondCard.style.display = 'block';
      firstCard.style.display = 'none';
      thirdCard.style.display = 'none';
      forecast.classList.remove('active');
      now.classList.remove('active');
      thirdCard.style.display = 'none';
      break;
    case 'forecast':
      cities.tab = 'forecast';
      card.classList.add('active');
      thirdCard.style.display = 'block';
      firstCard.style.display = 'none';
      secondCard.style.display = 'none';
      details.classList.remove('active');
      now.classList.remove('active');
      break;
    default:
      cities.tab = 'now';
      card.classList.add('active');
      firstCard.style.display = 'block';
      secondCard.style.display = 'none';
      thirdCard.style.display = 'none';
      details.classList.remove('active');
      forecast.classList.remove('active');
  }
};
const tabOnClick = (event) => {
  const tab = event.target;
  tabHandle(tab);
};
const giveTabs = () => {
  const tabs = document.querySelector('.main_info-section_left-side_tabs');
  const myTab = document.getElementById(cities.tab);
  const now = document.getElementById('now');
  now.textContent = cities.lang === 'ru' ? RU.NOW : EN.NOW;
  const details = document.getElementById('details');
  details.textContent = cities.lang === 'ru' ? RU.DETAILS : EN.DETAILS;
  const forecast = document.getElementById('forecast');
  forecast.textContent = cities.lang === 'ru' ? RU.FORECAST : EN.FORECAST;
  myTab.classList.add('active');
  tabHandle(myTab);
  tabs.addEventListener('click', tabOnClick);
};

export default giveTabs;
