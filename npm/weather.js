"use script";
import { format } from "date-fns";
import { ELEMENTS, TABS } from "./uiElements.js";
import { checkClickTabs, changeTabs } from "./changingTabs.js";
import { cityTemp } from "./apiRequest.js";
import Cookies from "js-cookie";

const loc = document.querySelector(".locations h2");
loc.innerHTML = format(new Date(), "Pp");

TABS.weatherButtons.addEventListener("click", function (event) {
  const clickButton = event.target;
  if (checkClickTabs(clickButton)) {
    changeTabs(clickButton)
  }
});

const storage = [];

storage.getFavoriteCities = function () {
  return JSON.parse(localStorage.getItem("query"));
};

storage.saveFavoriteCities = function (value) {
  localStorage.setItem("query", JSON.stringify(value));
};

storage.getCurrentCity = function () {
  return localStorage.getItem("currentCity");
};
storage.saveCurrentCity = function (value) {
  localStorage.setItem("currentCity", value);
};

// //поиск города

export const obj = { currentCity: Cookies.get("name") };

cityTemp(obj.currentCity??"Aktobe");

ELEMENTS.searchCity.addEventListener("click", function (e) {
  e.preventDefault();
  cityTemp(obj.currentCity);
});

// добавление в избранное

const like = document.getElementById("like");
const cities = document.querySelector(".listOfCities");
const svg = document.getElementById("svg_2");

let favouriteCities = new Set();

function pushCity (newTask) {
  favouriteCities.add(newTask);
  storage.saveFavoriteCities([...favouriteCities]);
}

function deleteCity (task) {
  favouriteCities.delete(task);
  storage.saveFavoriteCities([...favouriteCities]);
}

like.addEventListener("click", function () {
  if (favouriteCities.size === 0) {
    pushCity(ELEMENTS.city.textContent);
    svg.classList.add("filled");
    render();
    return;
  }

  const fav = [...favouriteCities].find(item => item === ELEMENTS.city.textContent);
  if (fav) {
    console.log("gg");
    deleteCity(ELEMENTS.city.textContent);
    svg.classList.remove("filled");
    render();
  } else {
    pushCity(ELEMENTS.city.textContent);
    svg.classList.add("filled");
    render();
  }
  console.log([...favouriteCities]);
});

render();

function render () {
  cities.textContent = "";
  storage.getFavoriteCities();
  const map = new Set(storage.getFavoriteCities());
  favouriteCities = map;
  console.log();
  function arrayAdd (array, i = 0) {
    if (i === array.length) {
      return array;
    } else {
      addCity(array[i]);
      i++;
      arrayAdd(array, i);
    }
  }
  arrayAdd([...favouriteCities]);
}
function addCity (favCity) {
  const li = document.createElement("li");
  li.className = "li";
  li.textContent = favCity;

  const close = document.createElement("pop_up_close");
  close.className = "pop_up_close";
  close.innerHTML = "&#10006";

  li.append(close);
  cities.append(li);

  close.addEventListener("click", function () {
    deleteCity(favCity);
    render();
  });

  li.addEventListener("click", async function () {
    obj.currentCity = `${li.firstChild.textContent}`;
    try {
      cityTemp(obj.currentCity);
    } catch (err) {
      alert(err);
    }
  });
}

export { storage, favouriteCities, svg };
