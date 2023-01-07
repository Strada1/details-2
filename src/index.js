import { storage } from './save_cities.js'

const city_list = new Set()

function getCityName () {
  const cityName = document.querySelector('.search-text').value
  if (cityName) {
    storage.saveCurrentCity(cityName)
    getWeather(cityName)
    getForecastWeather(cityName)
  } else alert('Введите название города')
}

function serverConnect (city) {
  const serverUrl = 'https://api.openweathermap.org'
  const apiKey = '96b8ddfea8e4ddd7fa44a1fad797a919'
  const url = `${serverUrl}/data/2.5/weather?q=${city}&appid=${apiKey}`
  return url
}

function serverConnectForecast (city) {
  const serverUrl = 'https://api.openweathermap.org'
  const apiKey = '96b8ddfea8e4ddd7fa44a1fad797a919'
  const url = `${serverUrl}/data/2.5/forecast?q=${city}&appid=${apiKey}`
  return url
}

function getWeather (city) {
  likeCheck()
  const url = serverConnect(city)
  const response = fetch(url)
  response
    .then((resp) => resp.json())
    .then((value) => {
      try {
        const temp = Math.round(value.main.temp - 273.15) + '°'
        document.querySelector('.temp').textContent = temp

        const icon = document.querySelector('.weather-icon')
        icon.src = `https://openweathermap.org/img/wn/${value.weather[0].icon}@4x.png`
        icon.hidden = false
        const cities = document.querySelectorAll('.city-name')
        for (const key of cities) {
          key.textContent = city
        }

        getDetails(value)
      } catch {
        alert(value.message)
      }
    })
    .catch((error) => alert(error.message))
}

function getForecastWeather (city) {
  const url = serverConnectForecast(city)
  const response = fetch(url)
  response
    .then((resp) => resp.json())
    .then((value) => {
      try {
        const unorderedList = document.querySelector('.forecast-list-ul')
        unorderedList.innerHTML = ''
        const forecastList = [...value.list]
        forecastList.forEach((element) => {
          getForecast(element)
        })
      } catch {
        alert(value.message + 'hui')
      }
    })
    .catch((error) => alert(error.message))
}

function getDetails (data) {
  const temperature = document.querySelector('.temp-details')
  const feelsLike = document.querySelector('.feel-details')
  const weather = document.querySelector('.weather-details')
  const sunRise = document.querySelector('.sunrise-details')
  const sunSet = document.querySelector('.sunset-details')
  temperature.textContent = Math.round(data.main.temp - 273.15) + '°'
  feelsLike.textContent = Math.round(data.main.feels_like - 273.15) + '°'
  weather.textContent = data.weather[0].main
  const sunriseDate = new Date(1000 * data.sys.sunrise)
  sunRise.textContent = sunriseDate.getHours() + ':' + sunriseDate.getMinutes()
  const sunsetDate = new Date(1000 * data.sys.sunset)
  sunSet.textContent = sunsetDate.getHours() + ':' + sunsetDate.getMinutes()
}

function getForecast (data) {
  const unorderedList = document.querySelector('.forecast-list-ul')
  try {
    const date = new Date(Date.parse(data.dt_txt))
    const dayAndMonth = date.toLocaleDateString()
    const dateDiv = document.createElement('div')
    dateDiv.textContent = dayAndMonth
    dateDiv.className = 'date-month'

    const time = date.toLocaleTimeString()
    const timeDiv = document.createElement('div')
    timeDiv.textContent = time
    timeDiv.className = 'date-time'

    const temp = `Temperature : ${Math.round(data.main.temp - 273.15)}`
    const tempP = document.createElement('p')
    tempP.textContent = temp
    const feel = `Feels Like : ${Math.round(data.main.feels_like - 273.15)}`
    const feelP = document.createElement('p')
    feelP.textContent = feel
    const tempDiv = document.createElement('div')
    tempDiv.append(tempP)
    tempDiv.append(feelP)
    tempDiv.className = 'temp-feel'

    const weather = data.weather[0].main
    const weatherP = document.createElement('p')
    weatherP.textContent = weather
    const weatherIcon = document.createElement('img')
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
    weatherIcon.className = 'forecast-image'
    const weatherDiv = document.createElement('div')
    weatherDiv.className = 'temp-weather'
    weatherDiv.append(weatherP)
    weatherDiv.append(weatherIcon)

    const itemDiv = document.createElement('div')
    itemDiv.className = 'forecast-item'
    itemDiv.append(dateDiv)
    itemDiv.append(timeDiv)

    const seconditemDiv = document.createElement('div')
    seconditemDiv.className = 'forecast-item'
    seconditemDiv.append(tempDiv)
    seconditemDiv.append(weatherDiv)

    const listItem = document.createElement('li')
    listItem.append(itemDiv)
    listItem.append(seconditemDiv)

    unorderedList.append(listItem)
  } catch (error) {
    console.log(error.message)
  }
}

function saveCity () {
  const cityName = document.querySelector('.city-name').textContent
  const cityIndex = city_list.has(cityName)
  const likeImage = document.querySelector('.city-like-img')
  if (!cityIndex) {
    city_list.add(cityName)
    likeImage.src =
      'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/heart.png'
  } else {
    city_list.delete(cityName)
    likeImage.src =
      'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/empty_heart.png'
  }
}

function likeCheck () {
  const currentCityName = storage.getCurrentCity()
  console.log(currentCityName)
  const favoriteCityArray = new Set(storage.getFavoriteCities())
  console.log(favoriteCityArray)
  const likeImage = document.querySelector('.city-like-img')
  if (favoriteCityArray != null) {
    if (favoriteCityArray.has(currentCityName)) {
      console.log(2)
      likeImage.src =
        'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/heart.png'
      likeImage.hidden = false
    } else {
      console.log(1)
      likeImage.src =
        'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/empty_heart.png'
      likeImage.hidden = false
    }
  } else {
    likeImage.src =
      'https://raw.githubusercontent.com/SqW4ER/Weather/main/img/empty_heart.png'
    likeImage.hidden = false
    console.log(3)
  }
}

function render () {
  const getList = document.querySelector('.location-list-ul')
  getList.innerHTML = ''
  city_list.forEach((element) => {
    const listItem = document.createElement('li')
    listItem.textContent = element
    listItem.addEventListener('click', (event) => {
      event.preventDefault()
      storage.saveCurrentCity(element)
      getWeather(element)
      getForecastWeather(element)
      storage.saveCurrentCity(element)
    })
    getList.append(listItem)
  })
  storage.saveFavoriteCities(city_list)
}

function searchButtonHandler (event) {
  event.preventDefault()
  getCityName()
  render()
}

const searchForm = document.querySelector('.search-form')
searchForm.addEventListener('submit', searchButtonHandler)

function saveButtonHandler (event) {
  event.preventDefault()
  saveCity()
  render()
}

const saveButton = document.querySelector('.city-like')
saveButton.addEventListener('click', saveButtonHandler)

document.addEventListener('DOMContentLoaded', function () {
  const loadList = storage.getFavoriteCities()
  if (loadList) {
    loadList.forEach((element) => {
      city_list.add(element)
    })
  }
  const currentCity = storage.getCurrentCity()
  if (currentCity) {
    getWeather(storage.getCurrentCity())
    getForecastWeather(storage.getCurrentCity())
  }
  render()
})
