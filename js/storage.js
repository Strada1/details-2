export function addStorageCurrentCity(cityName) {
  document.cookie = `currentCity = ${cityName}; max-age=3600`;
}

export function getStorageCurrentCity() {
  let arrCookie = document.cookie.split('=');
  return arrCookie[1];
}

export function addStorageFavoriteCities(array) {
  const json = JSON.stringify(array);
  localStorage.setItem('favoriteCities', json);

}

export function getStorageFavoriteCities() {
  const json = localStorage.getItem('favoriteCities');
  let array = JSON.parse(json);
  if (!json) {
    array = [];
  }
  return array;
}
