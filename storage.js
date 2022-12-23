export const storage = {
  saveFavoriteCities: function(favoriteCities){
    //отправляю строку в виде массива городов в хранилище
    const jsonCities = JSON.stringify(favoriteCities);
    localStorage.setItem('favoriteCities', jsonCities);
  },
  
  getFavoriteCities: function() {
    const localCities = localStorage.getItem('favoriteCities');
    
    let currentList = [];
    //let setCurrentCities = new Set();

    if (localCities) {
      currentList = JSON.parse(localCities);
      //пример создания сета
      //setCurrentCities = ([...currentList]);
      //console.log(`this is set ${setCurrentCities}`);
    }
    //return setCurrentCities;
    
    return currentList;
  },
  addLastCityName: function(cityName) {
    localStorage.setItem('lastCity', cityName);
  },
  getLastCityName: function() {
    const lastCity = localStorage.getItem('lastCity');
    return lastCity;
  },
  clear: function() {
    localStorage.clear();
  }
}




/*
Объекты хранилища localStorage и sessionStorage предоставляют одинаковые методы и свойства:

setItem(key, value) – сохранить пару ключ/значение.
getItem(key) – получить данные по ключу key.
removeItem(key) – удалить данные с ключом key.
clear() – удалить всё.
key(index) – получить ключ на заданной позиции.
length – количество элементов в хранилище.
*/