export const storage = {
	currentCity: '',
	saveFavoriteCities(setCities) {
		localStorage.setItem('FavouriteCities', JSON.stringify(Array.from(setCities)))
	},
	getFavoriteCities() {
		return new Set(JSON.parse(localStorage.getItem('FavouriteCities')));
	},

	saveCurrentCity(cityName) {
		localStorage.setItem("CurrentCity", JSON.stringify(cityName));
	},
	getCurrentCity() {
		this.currentCity = JSON.parse(localStorage.getItem('CurrentCity'));
		if (!this.currentCity) {
			this.currentCity = 'Voronezh';
		}
		return this.currentCity;
	}
}
