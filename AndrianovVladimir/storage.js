export const storage = {
    currentCity: '',
    list: new Set(),

    saveFavoriteCities(list) {
        
        return localStorage.setItem('favoriteCities', JSON.stringify([...list]))
    },
    getFavoriteCities() {
        return this.list = new Set( JSON.parse(localStorage.getItem('favoriteCities')))
    },

    saveCurrentCity(currentCity) {
        return localStorage.setItem('currentCity', JSON.stringify(currentCity))
    },
    getCurrentCity() {
        this.currentCity = JSON.parse(localStorage.getItem('currentCity'))
        if (!this.currentCity) {
            this.currentCity = 'Boston'
        }
    }
}