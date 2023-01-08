"use script";
import { ELEMENTS } from "./uiElements.js";
import { obj, favouriteCities, svg } from "./weather.js";
import Cookies from "js-cookie";

const serverUrl = "https://api.openweathermap.org/data/2.5/weather";

async function cityTemp (city) {
  const cityName = `${ELEMENTS.inpCity.value}`;
  if (ELEMENTS.inpCity.value === "") {
    Cookies.get("name") ?? (obj.currentCity = cityName);
  } else {
    obj.currentCity = cityName;
  }
  city = obj.currentCity;
  try {
    const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
    const url = `${serverUrl}?q=${city}&appid=${apiKey}`;
    const response = await fetch(url);

    const jss = await response.json();

    const {
      main: { temp, feelsLike },
      sys: { sunrise, sunset },
      weather: {
        0: { main }
      }, name
    } = jss;

    ELEMENTS.temper.textContent = `${Math.floor(temp - 273)}°`;
    ELEMENTS.city.textContent = name;
    ELEMENTS.imageTemp.src = `https://openweathermap.org/img/wn/${jss.weather[0].icon}@4x.png`;
    Cookies.set("name", name, { expires: 1 / 24 });

    document.querySelector(".chosenCity").textContent = name;
    ELEMENTS.listDetails.firstElementChild.textContent = `Temperature: ${Math.floor(temp - 273)}°`;
    ELEMENTS.listDetails.children[1].textContent = `Feels like: ${Math.floor(feelsLike - 273)}°`;
    ELEMENTS.listDetails.children[2].textContent = `Weather: ${main}`;
    ELEMENTS.listDetails.children[3].textContent = `Sunrise: ${new Date(sunrise * 1000).getHours()}:${new Date(sunrise * 1000).getMinutes()}`;
    ELEMENTS.listDetails.children[4].textContent = `Sunset: ${new Date(sunset * 1000).getHours()}:${new Date(sunset * 1000).getMinutes()}`;

    const fav = [...favouriteCities].find(item => item == ELEMENTS.city.textContent);
    if (fav) {
      svg.classList.add("filled");
    } else {
      svg.classList.remove("filled");
    }
    console.log(jss);
    ELEMENTS.inpCity.value = null;
  } catch (err) {
    alert(err);
  }
}

export { cityTemp };
