export const storage = {
  currentCity: '',
  listOfFavoriteCities: new Set(),

  saveFavoriteCitiesInStorage(listOfFavoriteCities) {
    return localStorage.setItem(
      'favoriteCities',
      JSON.stringify([...listOfFavoriteCities])
    )
  },
  getFavoriteCitiesFromStorage() {
    return (this.listOfFavoriteCities = new Set(
      JSON.parse(localStorage.getItem('favoriteCities'))
    ))
  },

  saveCurrentCityInStorage(currentCity) {
    return localStorage.setItem('currentCity', JSON.stringify(currentCity))
  },
  getCurrentCityFromStorage() {
    this.currentCity = JSON.parse(localStorage.getItem('currentCity'))
    if (!this.currentCity) {
      this.currentCity = 'Ижевск'
    }
  },
}
