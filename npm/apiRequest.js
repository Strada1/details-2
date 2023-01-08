"use script";
import { ELEMENTS } from "./uiElements.js";
import { obj, favouriteCities, svg } from "./weather.js";
import Cookies from "js-cookie";

const serverUrl = "https://api.openweathermap.org/data/2.5/";
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
const weather = "weather";
const forecast = "forecast";

const div = document.createElement("div");
div.className = "table-scroll";

async function cityTemp (city) {
  const cityName = `${ELEMENTS.inpCity.value}`;
  if (ELEMENTS.inpCity.value === "") {
    Cookies.get("name") ?? (obj.currentCity = cityName);
  } else {
    obj.currentCity = cityName;
  }
  city = obj.currentCity;
  try {
    const url = `${serverUrl}${weather}?q=${city}&appid=${apiKey}`;
    const forecastURL = `${serverUrl}${forecast}?q=${city}&appid=${apiKey}`;

    const response2 = await fetch(forecastURL);
    const jss2 = await response2.json();

    const response = await fetch(url);
    const jss = await response.json();

    const {
      list
    } = jss2;

    function render () {
      div.textContent = "";
      for (const item of list) {
        const weatherOnTime = document.createElement("div");
        weatherOnTime.className = "weatherOnTime";
        div.append(weatherOnTime);

        const dateAndTime = document.createElement("div");
        dateAndTime.className = "dateNtime";
        weatherOnTime.append(dateAndTime);

        const tempAndfeels = document.createElement("div");
        tempAndfeels.className = "tempNfeels";
        weatherOnTime.append(tempAndfeels);

        const divInTemp = document.createElement("div");
        tempAndfeels.append(divInTemp);
        const divInTemp2 = document.createElement("div");
        tempAndfeels.append(divInTemp2);

        const temperature = document.createElement("p");
        temperature.className = "temp";
        temperature.textContent = `${Math.floor(item.main.temp - 273)}°`;
        divInTemp.append(temperature);
        const imgText = document.createElement("p");
        divInTemp2.append(imgText);

        const img = document.createElement("img");
        img.className = "iconWeather";
        img.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`;
        divInTemp2.append(img);

        const day = document.createElement("p");
        day.className = "day";
        const partsOfDay = item.dt_txt.split(" ");
        day.textContent = `${partsOfDay[0]}`;

        dateAndTime.append(day);

        const time = document.createElement("p");
        time.className = "time";
        time.textContent = `${(new Date(item.dt * 1000).getHours()) === 0
          ? 21
          : (new Date(item.dt * 1000).getHours()) - 3
        }:${"0" + new Date(item.dt * 1000).getMinutes()}`;
        dateAndTime.append(time);

        document.getElementById("forecast").append(div);
      }
    }
    render();

    const {
      main: { temp, feels_like },
      sys: { sunrise, sunset },
      weather: {
        0: { main }
      }, name
    } = jss;

    ELEMENTS.chosenCity.textContent = name;
    ELEMENTS.temper.textContent = `${Math.floor(temp - 273)}°`;
    ELEMENTS.city.textContent = name;
    ELEMENTS.imageTemp.src = `https://openweathermap.org/img/wn/${jss.weather[0].icon}@4x.png`;
    Cookies.set("name", name, { expires: 1 / 24 });

    document.querySelector(".chosenCity").textContent = name;
    ELEMENTS.listDetails.firstElementChild.textContent = `Temperature: ${Math.floor(temp - 273)}°`;
    ELEMENTS.listDetails.children[1].textContent = `Feels like: ${Math.floor(feels_like - 273)}°`;
    ELEMENTS.listDetails.children[2].textContent = `Weather: ${main}`;
    ELEMENTS.listDetails.children[3].textContent = `Sunrise: ${new Date(sunrise * 1000).getHours()}:${new Date(sunrise * 1000).getMinutes() < 10 
    ? '0' + new Date(sunrise * 1000).getMinutes() 
    : new Date(sunrise * 1000).getMinutes()}`;
    ELEMENTS.listDetails.children[4].textContent = `Sunset: ${new Date(sunset * 1000).getHours()}:${new Date(sunset * 1000).getMinutes() < 10 
      ? '0' + new Date(sunset * 1000).getMinutes() 
      : new Date(sunset * 1000).getMinutes()}`;

    const fav = [...favouriteCities].find(item => item === ELEMENTS.city.textContent);
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
