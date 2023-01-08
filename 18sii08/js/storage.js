import Cookies from "js-cookie";
const storage = {
  saveFavoriteCities(cities) {
    localStorage.setItem("favoriteCities", JSON.stringify([...cities]));
  },
  saveCurrentCity(city) {
    const inFifteenMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set("currentCity", city, { expires: inFifteenMinutes });
  },
  getFavoriteCities() {
    return JSON.parse(localStorage.getItem("favoriteCities"));
  },
  getCurrentCity() {
    return Cookies.get("currentCity");
  },
};

export { storage };
