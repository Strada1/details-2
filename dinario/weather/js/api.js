export const URL = {
    WEATHER: "https://api.openweathermap.org/data/2.5/weather",
    FORECAST: "https://api.openweathermap.org/data/2.5/forecast",
    API_KEY: "3bfb7384f048b8e78896a10d694dd618",
};

export async function getFetch(cityName, serverUrl) {
    const urlWeather = `${serverUrl}?q=${cityName}&appid=${URL.API_KEY}&units=metric`;
    try {
        const wetherResponse = await fetch(urlWeather)
        const weatherData = await wetherResponse.json()
        if (weatherData.cod === "404") {
            throw new Error("Город не найден")
        } else {
            return weatherData
        }
    } catch (err) {
        alert(`${err}\n${serverUrl}`)
    }
}
