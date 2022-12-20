export function convertKelvinToCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

export function convertTimestampToTime(unix_timestamp, timezone) {
  let date = new Date(unix_timestamp * 1000)
  let hours = date.getUTCHours() + timezone / 3600
  if (hours < 0) {
    hours = hours + 24
  }
  if (hours > 24) {
    hours = hours - 24
  }
  let minutes = '0' + date.getMinutes()
  return hours + ':' + minutes.slice(-2)
}

export function convertTimestampToDayAndMonth(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000)

  let day = date.getUTCDate()
  let monthNum = date.getUTCMonth()
  let monthObj = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря',
  }
  let month
  for (let item in monthObj) {
    if (item == monthNum) {
      month = monthObj[item]
    }
  }

  return `${day} ${month}`
}

export function translateWeather(weatherFromData) {
  let weather = {
    Clouds: 'Облачно',
    Clear: 'Ясно',
    Snow: 'Снег',
    Thunderstorm: 'Гроза',
    Drizzle: 'Дождь',
    Rain: 'Дождь',
    Mist: 'Туман',
    Smoke: 'Смог',
    Haze: 'Туман',
    Dust: 'Пыль',
    Fog: 'Туман',
    Sand: 'Песок',
    Ash: 'Пепел',
    Squall: 'Ураган',
    Tornado: 'Торнадо',
  }
  return weather[weatherFromData]
}
