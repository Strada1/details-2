// eslint-disable-next-line import/no-cycle
import errorHandle from './error';
import RU from '../MODEL/languages/ru';
import EN from '../MODEL/languages/en';

export const languageHelper = (language) => {
  const addLocationsTitle = document.querySelector(
    '.main_info-section_locations-title',
  );
  const RuLang = document.querySelector('.main_info-section_locations-lang-ru');
  const en = document.querySelector('.main_info-section_locations-lang-en');
  if (language === 'ru') {
    RuLang.classList.add('lang-active');
    en.classList.remove('lang-active');
  } else {
    en.classList.add('lang-active');
    RuLang.classList.remove('lang-active');
  }
  addLocationsTitle.replaceChildren();
  const justAddCityTitle = document.createElement('p');
  if (language === 'ru') {
    justAddCityTitle.textContent = `${RU.ADD_CITIES}:`;
  } else if (language === 'en') {
    justAddCityTitle.textContent = `${EN.ADD_CITIES}:`;
  } else {
    errorHandle('Ошибка,такого языка нет');
  }
  addLocationsTitle.append(justAddCityTitle);
};

export default languageHelper;
