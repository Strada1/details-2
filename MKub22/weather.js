"use script"

const weatherButtons = document.querySelector('.screens1');
const weatherButtonAll = Array.from( document.querySelectorAll('.weather__button'));
const weatherTabs = document.querySelector('.weather__tabs');
const weatherTabAll = document.querySelectorAll('.weather__tab');
weatherButtons.addEventListener("click", function (event) {
	const clickButton = event.target
	if (checkClickTabs(clickButton)){
		changeTabs(clickButton)
	}
});

function checkClickTabs(clickButton) {
	const clickButtonParent = clickButton.closest(".weather__button")
	const activeClickElementParent = clickButtonParent.classList.contains("-active")
	return clickButtonParent && !activeClickElementParent
}

function changeTabs(clickButton) {
	const activeButton = weatherButtons.querySelector('.weather__button.-active');
	activeButton.classList.remove("-active")
	clickButton.classList.add("-active")
	const indexClickButton = weatherButtonAll.findIndex(item => item === clickButton)
	const activeTab = weatherTabs.querySelector('.weather__tab.-active');
	activeTab.classList.remove("-active");
	const newActiveTab = weatherTabAll[indexClickButton];
	newActiveTab.classList.add("-active");
}


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

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
let inpCity = document.getElementById('inpCity');
const searchCity = document.getElementById('searchCity');

const listDetails = document.querySelector('.list_details');
const temper = document.getElementById('temp');
const city = document.getElementById('cityCurrentName');
const imageTemp = document.querySelector('.imageTemp img');

let currentCity = storage.getCurrentCity();

cityTemp();

async function cityTemp (){
    let cityName = `${inpCity.value}`;
//     let cityName2 = `${inpCity2.value}`;
    if(inpCity.value == ""){
        storage.getCurrentCity
    }
    else{
        currentCity = cityName;
    }
    try{
    
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${currentCity}&appid=${apiKey}`;

    
    let response = await fetch(url);
    
    // response.onload = () => resolve(response);
    // response.onerror = () => reject(new Error(`Ошибка загрузки скрипта ${url}`));
    let jss = await response.json();

    // console.log(jss)

    // jss => {
         const { 
            main: {temp, feels_like },
            sys: {sunrise, sunset},
            weather:{
                0: {main}
            },name} = jss;

            temper.textContent = `${Math.floor(temp - 273)}°`;
            city.textContent = name;
            imageTemp.src = `https://openweathermap.org/img/wn/${jss.weather[0]['icon']}@4x.png`
            currentCity = name;
            storage.saveCurrentCity(currentCity);

            
            document.querySelector('.chosenCity').textContent = name;
            listDetails.firstElementChild.textContent = `Temperature: ${Math.floor(temp - 273)}°`;
            listDetails.children[1].textContent = `Feels like: ${Math.floor(feels_like - 273)}°`;
            listDetails.children[2].textContent = `Weather: ${main}`;
            listDetails.children[3].textContent = `Sunrise: ${new Date(sunrise * 1000).getHours()}:${new Date(sunrise * 1000).getMinutes()}`;
            listDetails.children[4].textContent = `Sunset: ${new Date(sunset * 1000).getHours()}:${new Date(sunset * 1000).getMinutes()}`;
        
            
        let fav = [...favouriteCities].find(item => item == city.textContent);
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
}


    // response
    // .then(
    //     response => {
          
    // }
    
    // ).catch(alert)
}

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

    // newTask = {
    //     name : newTask,
    // };
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
        pushCity(city.textContent);
        svg.classList.add('filled');
        render();
        return;
    }

        let fav = [...favouriteCities].find(item => item == city.textContent);
            if(fav){
                console.log('gg');
                deleteCity(city.textContent);
                svg.classList.remove('filled');
                render();          
            }
            else{
            
                pushCity(city.textContent);
                svg.classList.add('filled');
                render();
            }

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
    
                    temper.textContent = `${Math.floor(temp - 273)}°`;
                    city.textContent = name;
                    imageTemp.src = `https://openweathermap.org/img/wn/${response.weather[0]['icon']}@4x.png`
                    currentCity = name;
                    storage.saveCurrentCity(currentCity);
    
                
                    document.querySelector('.chosenCity').textContent = name;
                    listDetails.firstElementChild.textContent = `Temperature: ${Math.floor(temp - 273)}°`;
                    listDetails.children[1].textContent = `Feels like: ${Math.floor(feels_like - 273)}°`;
                    listDetails.children[2].textContent = `Weather: ${main}`;
                    listDetails.children[3].textContent = `Sunrise: ${new Date(sunrise * 1000).getHours()}:${new Date(sunrise * 1000).getMinutes()}`;
                    listDetails.children[4].textContent = `Sunset: ${new Date(sunset * 1000).getHours()}:${new Date(sunset * 1000).getMinutes()}`;
                    

                    
                      
                    let fav = [...favouriteCities].find(item => item == city.textContent);
                        if(fav){
                            svg.classList.add('filled');
                            }
            console.log(response);
            
        },
       
        ).catch(alert)
    })
}

//переключение табов

