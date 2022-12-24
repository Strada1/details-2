const ELEMENT = {
  ACTIVE_CITY_LIST: document.querySelectorAll('[class*="active-city"]'),
  ACTIVE_CITY: document.querySelector('.active-city'),
  FAVORITES_LIST: document.querySelector('.city-list-wrapper'),
  TABS_WEATHER: document.querySelectorAll('.tab'),
  TAB_LIST_FORECAST: document.querySelector('.tab-list-forecast'),
  BUTTONS_WRAPPER: document.querySelector('.tab-buttons-wrapper'),
  BUTTONS: document.querySelectorAll('.tab-button'),
  FORM: document.querySelector('form'),
  LIKE: document.querySelector('.like'),
  CURRENT_STATE: document.querySelector('.current-state'),
  TEMPERATURE: document.querySelectorAll('.temperature'),
  FEELS_LIKE: document.querySelector('.feels-like'),
  SUNRISE: document.querySelector('.time-sunrise'),
  SUNSET: document.querySelector('.time-sunset'),
  ICON: document.querySelector('.icon'),
};

const CLASS = {
  ACTIVE_BUTTON: 'active-button',
  ACTIVE_TAB: 'active-tab',
  CITY: 'city',
  FORECAST_BLOCK: 'forecast-block',
  FORECAST_DATE: 'forecast-date',
  FORECAST_TIME: 'forecast-time',
  FORECAST_TEMPERATURE: 'forecast-temperature',
  FORECAST_FEELS_LIKE: 'forecast-feels-like',
  FORECAST_STATE: 'forecast-state',
  ICON_ITEM: 'icon-item',
};

export { ELEMENT, CLASS };
