import { ELEMENTS_UI } from './ui-elements.js'
import { storage } from './storage.js'
import {
  convertKelvinToCelsius,
  convertTimestampToTime,
  convertTimestampToDayAndMonth,
  translateWeather,
} from './helpers.js'

storage.getCurrentCityFromStorage() // storage ==>>  LIST
storage.getFavoriteCitiesFromStorage() // storage ==>>  currentCity
getResult(storage.currentCity)
renderForFavoriteList()

ELEMENTS_UI.TAB_LINKS.forEach((item) => item.addEventListener('click', showTab))
ELEMENTS_UI.FAVORITE_BUTTON.addEventListener(
  'click',
  addOrRemoveCityOnHeartButton
)
ELEMENTS_UI.BUTTON_CLEAR_ALL.addEventListener('click', clearAllFavoriteList)
ELEMENTS_UI.FORM_SEARCH.addEventListener('submit', getCity)

function showTab() {
  ELEMENTS_UI.TAB_LINKS.forEach((item) => item.classList.remove('active'))
  this.classList.add('active')
  ELEMENTS_UI.TAB_CONTENTS.forEach((item) => {
    item.classList.remove('active')
    if (item.dataset.name === this.dataset.name) {
      item.classList.add('active')
    }
  })
}

function addOrRemoveCityOnHeartButton() {
  const cityName = ELEMENTS_UI.CITY_NAME_NOW.textContent

  if (storage.listOfFavoriteCities.has(cityName)) {
    storage.listOfFavoriteCities.delete(cityName)
  } else {
    storage.listOfFavoriteCities.add(cityName)
  }

  ELEMENTS_UI.FAVORITE_BUTTON.classList.toggle('checked')
  storage.saveFavoriteCitiesInStorage(storage.listOfFavoriteCities) //  LIST ==>> storage
  renderForFavoriteList()
}

function clearAllFavoriteList() {
  localStorage.clear()
  storage.listOfFavoriteCities = []
  storage.saveFavoriteCitiesInStorage(storage.listOfFavoriteCities) //  LIST ==>> storage
  getResult(storage.currentCity)
  renderForFavoriteList()
}

function getCity() {
  if (ELEMENTS_UI.INPUT_SEARCH.value !== '') {
    event.preventDefault()
    getResult(ELEMENTS_UI.INPUT_SEARCH.value.trim())
    ELEMENTS_UI.INPUT_SEARCH.value = ''
  }
}

async function getResult(cityName) {
  const serverUrlWeather = 'https://api.openweathermap.org/data/2.5/weather'
  const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f'
  const urlWeather = `${serverUrlWeather}?q=${cityName}&appid=${apiKey}&lang=ru`
  const serverUrlForecast = 'https://api.openweathermap.org/data/2.5/forecast'
  const urlForecast = `${serverUrlForecast}?q=${cityName}&appid=${apiKey}&lang=ru`

  try {
    let responseCurrentWeather = await fetch(urlWeather)
    let responseForecast = await fetch(urlForecast)
    if (responseCurrentWeather.ok && responseForecast.ok) {
      let dataWeather = await responseCurrentWeather.json()
      let forecastData = await responseForecast.json()
      showResult(dataWeather)
      showForecast(forecastData)

      ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.classList.remove('active')
    }
    if (
      responseCurrentWeather.status === 404 ||
      responseForecast.status === 404
    ) {
      showError('404')
    }
    if (
      responseCurrentWeather.status === 400 ||
      responseForecast.status === 400
    ) {
      showError()
    }
  } catch (error) {
    showError()
  }
}

function showForecast({ list }) {
  ELEMENTS_UI.FORECAST_LIST.textContent = ''
  list.forEach((item) => {
    let forecastItem = document.createElement('div')
    forecastItem.className = 'forecast-item'

    let forecastDateDiv = document.createElement('div')
    forecastDateDiv.className = 'date-time'

    let forecastDate_date = document.createElement('div')
    forecastDate_date.className = 'date'
    forecastDate_date.textContent = convertTimestampToDayAndMonth(item.dt)

    let forecastDate_time = document.createElement('div')
    forecastDate_time.className = 'time'
    forecastDate_time.textContent = convertTimestampToTime(item.dt, 0)

    forecastDateDiv.append(forecastDate_date, forecastDate_time)

    let forecastWeatherDiv = document.createElement('div')
    forecastWeatherDiv.className = 'weather'

    let forecastTemperDiv = document.createElement('div')
    forecastTemperDiv.className = 'temper'
    forecastWeatherDiv.append(forecastTemperDiv)

    let forecastTemperReal = document.createElement('div')
    forecastTemperReal.className = 'real-temp'
    forecastTemperReal.innerHTML = `Температура: ${convertKelvinToCelsius(
      item.main.temp
    )}&#176`

    let forecastTemperFeel = document.createElement('div')
    forecastTemperFeel.className = 'feels-temp'
    forecastTemperFeel.innerHTML = `Ощущается как: ${convertKelvinToCelsius(
      item.main.feels_like
    )}&#176`

    forecastTemperDiv.append(forecastTemperReal, forecastTemperFeel)

    let forecastSkyDiv = document.createElement('div')
    forecastSkyDiv.className = 'sky'
    forecastWeatherDiv.append(forecastSkyDiv)

    let forecastSkyText = document.createElement('div')
    forecastSkyText.className = 'sky-text'
    forecastSkyText.textContent = translateWeather(item.weather[0].main)

    let forecastSkyPicture = document.createElement('img')
    forecastSkyPicture.className = 'sky-pic'
    forecastSkyPicture.src = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`

    forecastSkyDiv.append(forecastSkyText, forecastSkyPicture)

    forecastItem.append(forecastDateDiv, forecastWeatherDiv)

    ELEMENTS_UI.FORECAST_LIST.append(forecastItem)
  })
}

function showError(errorStatus) {
  ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.classList.add('active')
  if (errorStatus === '404') {
    ELEMENTS_UI.SYSTEM_MESSAGE_TEXT.textContent = `Город не найден. Введите другой город..`
  } else {
    ELEMENTS_UI.SYSTEM_MESSAGE_TEXT.textContent = `Извините, ошибка сети. Попробуйте еще раз..`
  }

  ELEMENTS_UI.SYSTEM_MESSAGE_CLOSE.addEventListener('click', function () {
    ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.classList.remove('active')
  })

  setTimeout(() => {
    ELEMENTS_UI.SYSTEM_MESSAGE_BLOCK.classList.remove('active')
  }, 7000)
}

function showResult({
  name: cityName,
  main: { feels_like, temp },
  weather: [{ description, icon }],
  sys: { sunrise, sunset },
  timezone,
}) {
  ELEMENTS_UI.CITY_NAME_NOW.textContent = cityName
  ELEMENTS_UI.CITY_NAME_DETAILS.textContent = cityName
  ELEMENTS_UI.CITY_NAME_FORECAST.textContent = cityName

  ELEMENTS_UI.WEATHER_DIV_CURRENT_TEMPER.style.display = 'inline'
  ELEMENTS_UI.WEATHER_SPAN_CURRENT_TEMPER.forEach(
    (item) => (item.textContent = convertKelvinToCelsius(temp))
  )
  ELEMENTS_UI.WEATHER_FEELS_TEMPER.textContent =
    convertKelvinToCelsius(feels_like)
  ELEMENTS_UI.WEATHER_CLOUDY.textContent = description
  ELEMENTS_UI.WEATHER_PICTURE.src = `https://openweathermap.org/img/wn/${icon}@4x.png`
  ELEMENTS_UI.WEATHER_PICTURE.style.display = 'block'

  ELEMENTS_UI.WEATHER_SUNRISE.textContent = convertTimestampToTime(
    sunrise,
    timezone
  )
  ELEMENTS_UI.WEATHER_SUNSET.textContent = convertTimestampToTime(
    sunset,
    timezone
  )

  if (storage.listOfFavoriteCities.has(ELEMENTS_UI.CITY_NAME_NOW.textContent)) {
    ELEMENTS_UI.FAVORITE_BUTTON.classList.add('checked')
  } else {
    ELEMENTS_UI.FAVORITE_BUTTON.classList.remove('checked')
  }

  storage.currentCity = cityName
  storage.saveCurrentCityInStorage(storage.currentCity) // currentCity ==>> storage
}

function renderForFavoriteList() {
  storage.getFavoriteCitiesFromStorage() // storage ==>>  LIST

  if (storage.listOfFavoriteCities === null) {
    storage.listOfFavoriteCities = new Set()
  }

  ELEMENTS_UI.FAVORITE_LIST.textContent = ''

  if (storage.listOfFavoriteCities) {
    storage.listOfFavoriteCities.forEach((item) => {
      let cityItem = document.createElement('div')
      cityItem.className = 'list-item'

      let cityItemName = document.createElement('div')
      cityItemName.className = 'list-item_name'
      cityItemName.textContent = item
      cityItemName.addEventListener('click', () =>
        getResult(event.target.textContent)
      )

      let cityItemBtn = document.createElement('div')
      cityItemBtn.className = 'list-item_btn'
      cityItemBtn.innerHTML = '&#9587'
      cityItemBtn.addEventListener('click', deleteButtonOnEachItem)

      cityItem.prepend(cityItemBtn)
      cityItem.prepend(cityItemName)

      ELEMENTS_UI.FAVORITE_LIST.prepend(cityItem)
    })
  }
}

function deleteButtonOnEachItem() {
  const cityName = this.previousElementSibling.textContent

  storage.listOfFavoriteCities.delete(cityName)

  storage.saveFavoriteCitiesInStorage(storage.listOfFavoriteCities) //  LIST ==>> storage

  if (cityName === ELEMENTS_UI.CITY_NAME_NOW.textContent) {
    ELEMENTS_UI.FAVORITE_BUTTON.classList.remove('checked')
  }

  renderForFavoriteList()
}
