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
        localStorage.setItem('currentCity', value);
    },
    getCurrentCity: () => {
        let res;
        if(localStorage.getItem('currentCity') !== null) {
            res = localStorage.getItem('currentCity');
        } else {
            res = 'Moscow';
        }
        return res;
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

