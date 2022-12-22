const storage = {
  CITIES: "favouriteCities",
  LAST_CITY: "lastCity",
  ALTERNATIVE_CITY: "Архангельск",
  addOrRemoveCity: function (city) {
    let list = new Set(this.getCities());
    list.has(city) ? list.delete(city) : list.add(city);
    this._stringifyCities([...list]);
  },
  getCities: function () {
    let cities = localStorage.getItem(this.CITIES);
    if (!cities) {
      this._stringifyCities([]);
    }
    return cities ? JSON.parse(cities) : [];
  },
  setLastCity: function (city) {
    localStorage.setItem(this.LAST_CITY, city);
  },
  getLastCity: function () {
    let lastCity = localStorage.getItem(this.LAST_CITY);
    return lastCity ? lastCity : this.ALTERNATIVE_CITY;
  },
  checkCity: function (city) {
    return this.getCities().includes(city);
  },
  _stringifyCities: function (cities) {
    let citiesJSON = JSON.stringify(cities);
    localStorage.setItem(this.CITIES, citiesJSON);
  },
};

export { storage };
