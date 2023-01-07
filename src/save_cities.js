/*function saveFavoriteCities(array) {
  const list = JSON.stringify(array);
  localStorage.setItem("FavoriteCities", list);
}

function saveCurrentCity(cityName) {
  localStorage.setItem("CurrentCity", cityName);
}

function getFavoriteCities() {
  const savedList = localStorage.getItem("FavoriteCities");
  const savedArray = JSON.parse(savedList);
  return savedArray;
}

function getCurrentCity() {
  return localStorage.getItem("CurrentCity");
}*/

const storage = {
  getCurrentCity: () => {
    let name = 'CurrentCity'
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
    //const nameOfCity = document.cookie.replace(/(?:(?:^|.*;\s*)Current%20City\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    console.log(nameOfCity)
    return nameOfCity;
    //localStorage.getItem("CurrentCity");
  },
  getFavoriteCities: () => {
    const savedList = localStorage.getItem("FavoriteCities");
    const savedArray = JSON.parse(savedList);
    return savedArray;
  },
  saveCurrentCity: (cityName) => {
    //localStorage.setItem("CurrentCity", cityName);
    const name = 'CurrentCity';
    const value = cityName;
    document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + '; max-age=3600';
  },
  saveFavoriteCities: (array) => {
    const favorites = [...array];
    const list = JSON.stringify(favorites);
    localStorage.setItem("FavoriteCities", list);
  },
};
export { storage };
