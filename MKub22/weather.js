"use script"

import { ELEMENTS } from "./uiElements.js";
import { TABS } from "./uiElements.js";
import { checkClickTabs, changeTabs} from "./changingTabs.js";
import { cityTemp } from "./api.js";


TABS.weatherButtons.addEventListener("click", function (event) {
	const clickButton = event.target
	if (checkClickTabs(clickButton)){
		changeTabs(clickButton)
	}
});

let storage = [];

storage.getFavoriteCities = function(){
return JSON.parse(localStorage.getItem('query'));
  
}

storage.saveFavoriteCities = function(value){
    localStorage.setItem('query', JSON.stringify(value));
}

storage.getCurrentCity = function(){
   return localStorage.getItem('currentCity');
}
storage.saveCurrentCity = function(value){
    localStorage.setItem('currentCity', value)
}

// //поиск города

export let obj = {currentCity : storage.getCurrentCity()};

cityTemp();

searchCity.addEventListener('click', function(e){
    e.preventDefault();
    cityTemp();
    
})


//добавление в избранное

let like = document.getElementById('like');
const cities = document.querySelector('.listOfCities');
let svg = document.getElementById('svg_2');
let list = [];

let favouriteCities = new Set();
// favouriteCities = storage.getFavoriteCities();
// const favouriteCities = storage.getFavoriteCities();

function pushCity(newTask){

    list.push(newTask);
    favouriteCities.add(newTask);
    storage.saveFavoriteCities([...favouriteCities]);
 
}

function deleteCity(task){
    let obj = list.map(x => {
        return x.name;
    }).indexOf(task);
    list.splice(obj, 1);
    favouriteCities.delete(task);
    storage.saveFavoriteCities([...favouriteCities]);
}

like.addEventListener('click', function(){
    if (favouriteCities.size === 0){
        pushCity(ELEMENTS.city.textContent);
        svg.classList.add('filled');
        render();
        return;
    }

        let fav = [...favouriteCities].find(item => item == ELEMENTS.city.textContent);
            if(fav){
                console.log('gg');
                deleteCity(ELEMENTS.city.textContent);
                svg.classList.remove('filled');
                render();          
            }
            else{
                pushCity(ELEMENTS.city.textContent);
                svg.classList.add('filled');
                render();
            }
            console.log([...favouriteCities])
})

render();

function render(){
    cities.textContent = "";
    storage.getFavoriteCities();
    let map = new Set(storage.getFavoriteCities());
    favouriteCities = map;
    console.log();
    function arrayAdd(array, i=0){
        if (i === array.length){
            return;
        }   
        else {
            addCity(array[i]);
            i++;
            arrayAdd(array, i);
            // return array
        }
    }
    arrayAdd([...favouriteCities]);

    // [...favouriteCities].forEach(elem => {
    //     addCity(elem)
    // })
    
}


function addCity(favCity){
    let li = document.createElement('li');
    li.className = "li";
    li.textContent = favCity;
    
    let close = document.createElement('pop_up_close');
    close.className = 'pop_up_close';
    close.innerHTML = '&#10006';

    li.append(close);
    cities.append(li);

    close.addEventListener('click', function(){
        deleteCity(favCity);
        render();
    })
            
    li.addEventListener('click', function(){
        let cityName = `${li.firstChild.textContent}`;
        const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
        const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
        let response = fetch(url);
                
        response.onload = () => resolve(response);
        response.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${url}`));
                
        response
            .then(
                response => response.json()
                )
            .then(
                response => {
                    const { 
                        main: {temp, feels_like },
                    sys: {sunrise, sunset},
                    weather:{
                        0: {main}
                    },name} = response;
    
                    ELEMENTS.temper.textContent = `${Math.floor(temp - 273)}°`;
                    ELEMENTS.city.textContent = name;
                    ELEMENTS.imageTemp.src = `https://openweathermap.org/img/wn/${response.weather[0]['icon']}@4x.png`
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
            console.log(response);
            
        },
       
        ).catch(alert)
    })
}

export{storage, favouriteCities, svg};