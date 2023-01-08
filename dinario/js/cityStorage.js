export let cityList = [];

const storage = {
    saveCityFavoriteList: function (cityList) {
        localStorage.setItem("favCityList", JSON.stringify(cityList));
    },
    saveCurrentCity: function (currentCity) {
        document.cookie =
            "lastCityName=" + encodeURIComponent(currentCity) + ";max-age=3600";
    },
    getCityFavoriteList: function () {
        return JSON.parse(localStorage.getItem("favCityList"));
    },
    getCurrentCity: function () {
        return document.cookie.split("=")[1];
    },
};

export function saveFavoriteCityToList(cityName) {
    if (!cityList.find((item) => item.name === cityName)) {
        cityList.push({ id: Date.now(), name: cityName });

        storage.saveCityFavoriteList(cityList);
    }
}

export const getStoredCityFromList = (cityId) => {
    return cityList.find((item) => item.id === cityId);
};

export const deleteFavoriteCity = (cityId) => {
    cityList = cityList.filter((item) => item.id !== cityId);

    storage.saveCityFavoriteList(cityList);
};

export const saveCurrentCity = storage.saveCurrentCity;
export const getCurrentCity = storage.getCurrentCity;

(function initialize() {
    cityList = storage.getCityFavoriteList() || [];
})();
