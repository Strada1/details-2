import render from '../VIEW/rendering';
import { cities } from '../MODEL/locations';
import { languageHelper } from './langHelp';
import getCityInfo from '../MODEL/getcity';

export const langHandler = (event) => {
  const { lang } = event.target.dataset;
  if (lang && lang !== cities.lang) {
    cities.lang = lang;
    languageHelper(lang);
    render(getCityInfo(cities.currentCity, cities.lang));
  }
};
export default langHandler;
