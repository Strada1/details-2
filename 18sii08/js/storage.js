const storage = {
  saveFavoriteCities(cities) {
    localStorage.setItem("favoriteCities", JSON.stringify([...cities]));
  },
  saveCurrentCity(city) {
    localStorage.setItem("currentCity", city);
  },
  getFavoriteCities() {
    return JSON.parse(localStorage.getItem("favoriteCities"));
  },
  getCurrentCity() {
    return localStorage.getItem("currentCity");
  },
};

export { storage };
