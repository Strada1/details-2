"use script"

const ELEMENTS = {

    inpCity : document.getElementById('inpCity'),
    searchCity : document.getElementById('searchCity'),
    listDetails : document.querySelector('.list_details'),
    temper : document.getElementById('temp'),
    city : document.getElementById('cityCurrentName'),
    imageTemp : document.querySelector('.imageTemp img'),
    
   
}

const TABS = {
    weatherButtons : document.querySelector('.screens1'),
    weatherButtonAll : Array.from( document.querySelectorAll('.weather__button')),
    weatherTabs : document.querySelector('.weather__tabs'),
    weatherTabAll : document.querySelectorAll('.weather__tab'),
}

export {ELEMENTS, TABS};