"use script"
import { ELEMENTS } from "./uiElements.js";
import { storage } from "./weather.js";
import { obj, favouriteCities,svg } from "./weather.js";

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';

async function cityTemp (){
    let cityName = `${ELEMENTS.inpCity.value}`;
    if(ELEMENTS.inpCity.value == ""){
        storage.getCurrentCity
    }
    else{
        obj.currentCity = cityName;
    }
    try{
    
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${obj.currentCity}&appid=${apiKey}`;

    
    let response = await fetch(url);

    let jss = await response.json();


         const { 
            main: {temp, feels_like },
            sys: {sunrise, sunset},
            weather:{
                0: {main}
            },name} = jss;

            ELEMENTS.temper.textContent = `${Math.floor(temp - 273)}°`;
            ELEMENTS.city.textContent = name;
            ELEMENTS.imageTemp.src = `https://openweathermap.org/img/wn/${jss.weather[0]['icon']}@4x.png`
            obj.currentCity = name;
            storage.saveCurrentCity(obj.currentCity);

            
            document.querySelector('.chosenCity').textContent = name;
            ELEMENTS.listDetails.firstElementChild.textContent = `Temperature: ${Math.floor(temp - 273)}°`;
            ELEMENTS.listDetails.children[1].textContent = `Feels like: ${Math.floor(feels_like - 273)}°`;
            ELEMENTS.listDetails.children[2].textContent = `Weather: ${main}`;
            ELEMENTS.listDetails.children[3].textContent = `Sunrise: ${new Date(sunrise * 1000).getHours()}:${new Date(sunrise * 1000).getMinutes()}`;
            ELEMENTS.listDetails.children[4].textContent = `Sunset: ${new Date(sunset * 1000).getHours()}:${new Date(sunset * 1000).getMinutes()}`;
        
            
        let fav = [...favouriteCities].find(item => item == ELEMENTS.city.textContent);
        if(fav){
            svg.classList.add('filled');
        }
        else{
            svg.classList.remove('filled');
        }
        console.log(jss);
    // }
} catch(err){
    alert(err);
}}

export {cityTemp}