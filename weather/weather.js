let form = document.forms.first;
let input = document.querySelector(".input");
let new_favorite_city = document.querySelector(".name");
let temperature_now = document.querySelector(".grad");
let icon_weather = document.querySelector(".rain");
let details_menu = document.querySelector(".additional");
let like = document.querySelector(".snow");
let added_location = document.querySelector(".listcity");
let city_name_details_menu = document.querySelector(".name-details");

const storage = {
    saveCityFavoriteList: function (set) {
        localStorage.setItem('cityFavoriteList', JSON.stringify(Array.from(set)));
    },
    getCityFavoriteList() {
        return JSON.parse(localStorage.getItem('cityFavoriteList'));
    },
    getCurrentCity() {
        return localStorage.getItem('city');
    },
    saveCurrentCity(currentCityName) {
        return localStorage.setItem('city', currentCityName);
    }
}

form.addEventListener("submit", function (event) {
    renderDetails();
    fetchRequest(input.value);
    event.preventDefault();
})

let cityFavoriteList = storage.getCityFavoriteList();
let set = new Set(cityFavoriteList);
storage.saveCityFavoriteList(set);  
fetchRequest(storage.getCurrentCity());
addUI();

like.addEventListener("click", function () {
    renderNow();
    addCityFavorite(new_favorite_city.textContent);
    storage.saveCityFavoriteList(set);
    addUI();
})
function addCityFavorite(newCityFavorite) {
    set.add(newCityFavorite);
}
function renderDetails() {
    details_menu.textContent = "";
}
function renderNow() {
    let block_of_city = document.querySelectorAll(".blockcity");
    for (let city_name of block_of_city) {
        city_name.remove();
    }
}
function addUI() {
    for (i = 0; i < storage.getCityFavoriteList().length; i++) {
        let blockcity = document.createElement("div");
        blockcity.className = "blockcity";
        added_location.append(blockcity);

        let newcity = document.createElement("li");
        newcity.textContent = storage.getCityFavoriteList()[i];
        newcity.className = "newcity";
        blockcity.append(newcity);

        let delete_button = document.createElement('button');
        delete_button.className = "deletetask";
        delete_button.textContent = "+";
        newcity.after(delete_button);

        delete_button.addEventListener('click', function deleteTask() {
            set.delete( newcity.textContent);
            storage.saveCityFavoriteList(set);
            blockcity.textContent = "";
            blockcity.remove();
        })
        newcity.addEventListener('click', function ShowCity() {
            renderDetails();
            storage.saveCurrentCity(newcity.textContent);
            fetchRequest(newcity.textContent);
        })
    }
}
async function fetchRequest(cityName) {
    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    let response = await fetch(url);
    let commits = await response.json();
    
            new_favorite_city.textContent = commits.name;
            temperature_now.textContent = Math.round(commits.main.temp - 273) + '°C';
            icon_weather.src = `http://openweathermap.org/img/wn/${commits.weather[0].icon}@4x.png`;

            city_name_details_menu.textContent = commits.name;

            let temperature_details = document.createElement("li");
            temperature_details.textContent = `Temperature:${Math.round(commits.main.temp - 273.13)}°C`;
            details_menu.append(temperature_details);

            let feels = document.createElement("li");
            feels.textContent = `Feels like:${Math.round(commits.main.feels_like - 273.13)}°C`;
            temperature_details.append(feels);

            let weath = document.createElement("li");
            weath.textContent = `Weather: ${commits.weather[0].main}`;
            feels.append(weath);

            let sunris = document.createElement("li");
            let t = new Date(commits.sys.sunrise * 1000);
            sunris.textContent = `Sunrise:${t.getHours()}:${t.getMinutes() }`;
            weath.append(sunris);

            let time = new Date(commits.sys.sunset * 1000);
            let sunse = document.createElement("li");
            sunse.textContent = `Sunset:${time.getHours()}:${t.getMinutes() }`;
            sunris.append(sunse);
        }

