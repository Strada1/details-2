export const storage = {
  CITIES: "favouriteCities",
  LAST_CITY: "lastCity",
  ALTERNATIVE_CITY: "Архангельск",
  addOrRemoveCity: function (city) {
    let list = new Set(this.getCities());
    list.has(city) ? list.delete(city) : list.add(city);
    let citiesJSON = JSON.stringify([...list]);
    localStorage.setItem(this.CITIES, citiesJSON);
  },
  setLastCity: function (city) {
    localStorage.setItem(this.LAST_CITY, city);
  },
  checkCity: function (city) {
    return this.getCities().includes(city);
  },
  getCities: function () {
    let cities = localStorage.getItem(this.CITIES);
    return cities ? JSON.parse(cities) : [];
  },
  getLastCity: function () {
    let lastCity = localStorage.getItem(this.LAST_CITY);
    return lastCity ? lastCity : this.ALTERNATIVE_CITY;
  },
};