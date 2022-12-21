import { getCorrectTime, getCurrentWeather } from "./getCorrectValue.js";
import { fetchData } from "./main.js";
const content = document.querySelector(".left_side_content");
const div = document.querySelector(".list");
const localStorageCities = JSON.parse(localStorage.getItem("citys"));
let favCities = [];
export let mainText;
export function renderDetailsPage(weatherObject) {
  const headingCity = document.createElement("h1");
  const tempretature = document.createElement("span");
  const feelsLike = document.createElement("span");
  const weather = document.createElement("span");
  const sunrise = document.createElement("span");
  const sunset = document.createElement("span");
  headingCity.textContent = weatherObject.name;
  tempretature.textContent = `Temperature: ${getCurrentWeather(
    weatherObject.main.temp
  )}`;
  feelsLike.textContent = `Feels like: ${getCurrentWeather(
    weatherObject.main.feels_like
  )} `;
  weather.textContent = `Weather: ${weatherObject.weather[0].main}`;
  sunrise.textContent = `Sunrise: ${getCorrectTime(weatherObject.sys.sunrise)}`;
  sunset.textContent = `Sunset: ${getCorrectTime(weatherObject.sys.sunset)}`;
  content.replaceChildren();
  content.classList.add("details");
  content.appendChild(headingCity);
  content.appendChild(tempretature);
  content.appendChild(feelsLike);
  content.appendChild(weather);
  content.appendChild(sunrise);
  content.appendChild(sunset);
  mainText = weatherObject.name;
}
export function renderNowPage(dataObject) {
  const degreeDiv = document.createElement("div");
  const degreeSpan = document.createElement("span");
  const weatherDiv = document.createElement("div");
  const footerDiv = document.createElement("div");
  const footerSpan = document.createElement("span");
  const iconFooter = document.createElement("i");
  const iconImage = document.createElement("img");
  const weatherImage = document.createElement("img");

  content.classList.remove("details");
  content.replaceChildren();
  degreeDiv.classList.add("degree");
  degreeSpan.classList.add("degree_value");
  degreeSpan.textContent = Math.floor(Number(dataObject.main.temp) - 273);
  degreeDiv.appendChild(degreeSpan);
  footerDiv.classList.add("footer_main");
  footerSpan.textContent = dataObject.name;
  mainText = dataObject.name;
  footerSpan.classList.add("city_name");
  iconFooter.classList.add("heart_icon");
  iconImage.src = "./assets/Shape.png";
  weatherDiv.classList.add("weather");
  weatherImage.src = `http://openweathermap.org/img/wn/${dataObject.weather[0].icon}@2x.png`;
  weatherImage.classList.add("icon");
  weatherDiv.appendChild(weatherImage);
  iconFooter.appendChild(iconImage);
  footerDiv.appendChild(footerSpan);
  footerDiv.appendChild(iconFooter);
  content.prepend(degreeDiv);
  content.appendChild(footerDiv);
  content.insertBefore(weatherDiv, footerDiv);

  if (
    favCities.some(
      (city) => city.toLowerCase() === footerSpan.textContent.toLowerCase()
    )
  ) {
    iconImage.classList.add("liked");
  }

  iconFooter.addEventListener("click", () => {
    const spanCity = document.createElement("span");

    if (iconImage.classList.contains("liked")) {
      iconImage.classList.remove("liked");
      let newFavCities = favCities.filter(
        (city) => city !== footerSpan.textContent
      );
      favCities = [...newFavCities];
      localStorage.setItem("citys", JSON.stringify(favCities));
      div.replaceChildren();
      favCities.map((city) => {
        const span = document.createElement("span");

        span.textContent = city;
        div.appendChild(span);
        span.addEventListener("click", (e) => {
          if (city === e.target.textContent) fetchData(city);
        });
      });
    } else {
      iconImage.classList.add("liked");

      const isCityInArray = favCities.some(
        (city) => city === footerSpan.textContent
      );

      if (!isCityInArray) {
        favCities.push(footerSpan.textContent);
        localStorage.setItem("citys", JSON.stringify(favCities));
        favCities.map((city) => {
          spanCity.textContent = city;
          div.appendChild(spanCity);
          spanCity.addEventListener("click", (e) => {
            if (city === e.target.textContent) fetchData(city);
          });
        });

        return;
      }
    }
  });
}

export function addFromLocalStorage() {
  if (localStorageCities && localStorageCities.length > 0) {
    favCities = [...localStorageCities];
    favCities.map((city) => {
      const span = document.createElement("span");

      span.textContent = city;
      div.appendChild(span);
      span.addEventListener("click", () => {
        fetchData(city);
      });
    });
  }
  return;
}
