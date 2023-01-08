import { ru, enUS } from 'date-fns/locale';
import { format } from 'date-fns';
import { cities } from '../MODEL/locations';
import TIMEMETHOD from '../MODEL/timemethods';

export const getTimeFrom = (method, value) => {
  let time;
  switch (method) {
    case TIMEMETHOD.TIMESTAMP_TO_HOURS_MINUTES:
      time = format(new Date(value * 1000), 'HH:mm');
      break;
    case TIMEMETHOD.DT_TO_DAY_MONTH: {
      const lang = cities.lang === 'ru' ? ru : enUS;
      time = format(new Date(value), 'dd MMMM', { locale: lang });
      break; }
    default:
      time = format(new Date(value), 'HH:mm');
  }
  return time;
};
export const getImageURL = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

export const createElementWithClassname = (someElement, classname) => {
  const element = document.createElement(someElement);
  element.className = classname;
  return element;
};

export const getCookie = (name) => {
  // eslint-disable-next-line prefer-template, no-useless-escape
  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};
