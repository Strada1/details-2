import { UI_ELEMENT, HEART } from "./constants.js";
import { storage } from "./storage.js";
import { Tabs } from "./createTabs.js";

const tabs = new Tabs('Now');

const render = {
  weatherNow: {},
  weatherForecast: {},
  activeTab: "Now",
  changeActiveTab: function (button) {
    if (button.classList.contains("-active")) return;

    const activeButton = button.closest(".tablinks").querySelector(".-active");
    activeButton.classList.remove("-active");
    this.activeTab = button.dataset.tab;
    button.classList.add("-active");

    tabs.changeActiveTab(this.activeTab);
    this.infoWindow();
  },
  createTabs: function(){
    let favouriteCity = storage.checkCity(this.weatherNow.name);
    tabs.createTabNow(this.weatherNow, favouriteCity);
    tabs.createTabDetails(this.weatherNow);
    tabs.createTabForecast(this.weatherForecast);
  },
  infoWindow: function () {
    UI_ELEMENT.INFO_WINDOW.replaceChildren();
    UI_ELEMENT.INFO_WINDOW.append(tabs.activeTab);
  },
  listCity: function () {
    UI_ELEMENT.FAVOURITES.replaceChildren();
    let cities = storage.getCities();
    cities.forEach((item) => UI_ELEMENT.FAVOURITES.prepend(createCity(item)));
  },
  allInfo: function (city) {
    this.infoWindow();
    this.listCity();
    if(city === this.weatherNow.name){
      this.fillHeart()
    }
  },
  fillHeart: function(){
    let heartImg = document.querySelector('.now__add-city')
    let isFavouriteCity = storage.checkCity(this.weatherNow.name);
    heartImg.src = isFavouriteCity ? HEART.FILL : HEART.EMPTY;
  },
  showError: function (message) {
    let messageContainer = document.body.querySelector(".main__error");
    let textError = document.createElement("div");
    textError.className = "main__text-error";
    textError.textContent = message;
    messageContainer.append(textError);
    document.body.querySelector(".main").append(messageContainer);
    setTimeout(() => (textError.remove()), 2000);
  },
};

function createCity(cityName) {
  let city = document.createElement("li");
  city.className = "favourites__city";
  city.textContent = cityName;

  let remove = document.createElement("div");
  remove.className = "favourites__remove";

  city.append(remove);
  return city;
}
export { render };
