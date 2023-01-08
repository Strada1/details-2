import { NOWBLOCKEL } from "./variables.js";
const storage = {
    setFavCities: function(arr) {
        const favCity = JSON.stringify([...arr]);
        localStorage.setItem('city', favCity);
    },
    getFavCities: function() {
        const res = localStorage.getItem('city');
        let arr = [];
        if(localStorage.getItem('city') !== null) {
            arr = JSON.parse(res);
        }
        return arr;
    },
    setCurrentCity: (value) => {
        document.cookie = `currentcity = ${value}; max-age=3600`;
    },
    getCurrentCity: () => {
        let res = document.cookie.split('=');
        return res[1];
    },
};

let listArr = new Set(storage.getFavCities());
let currentCity = storage.getCurrentCity();

if(currentCity !== null) {
    NOWBLOCKEL.CITY.textContent = currentCity;
} else {
    NOWBLOCKEL.CITY.textContent = 'Moscow';
}

export {listArr, currentCity, storage};

