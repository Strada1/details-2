import { WEATHER_CLASS } from "./constants.js";
import { render } from "./render.js";
import { createWeatherCity } from "./weather.js";
import { storage } from "./storage.js";

class NextRequest {
  constructor(delay = 5){
    this.startTime = Date.now();
    this.seconds = 0;
    this.delay = delay;
  }
  checkTime(){
    this.seconds = Math.floor((Date.now() - this.startTime) / 1000);
    return this.seconds < this.delay;
  }
  getTimeLeft(){
    return `Следующий запрос через ${this.delay - this.seconds} секунд`;
  }
  updateTime(){
    this.startTime = Date.now();
  }
}

const nextRequest = new NextRequest();

async function formHandler(event) {
  event.preventDefault();

  if(nextRequest.checkTime()){
    return render.showError(nextRequest.getTimeLeft());
  }
  nextRequest.updateTime();

  let input = event.target.querySelector(`.${WEATHER_CLASS.SEARCH_INPUT}`);
  let inputValue = input.value;
  if (inputValue === "") return;
  createWeatherCity(inputValue);
  input.value = "";
}

function cityHandler(event) {
  const target = event.target;
  if (target.className !== WEATHER_CLASS.ADD_CITY) return;
  let city = target.previousElementSibling.textContent;
  storage.addOrRemoveCity(city);
  render.allInfo(city);
}

function favouritesHandler(event) {
  let target = event.target;
  if (target.className === WEATHER_CLASS.FAVOURITES_REMOVE) {
    let city = target.closest(`.${WEATHER_CLASS.FAVOURITES_CITY}`).textContent;
    storage.addOrRemoveCity(city);
    render.allInfo(city);
  }

  if(nextRequest.checkTime()){
    return render.showError(nextRequest.getTimeLeft());
  }
  nextRequest.updateTime();
  
  if (target.className === WEATHER_CLASS.FAVOURITES_CITY)
    createWeatherCity(target.textContent);
}

function buttonHandler(event) {
  const button = event.target;
  render.changeActiveTab(button);
}

export { formHandler, buttonHandler, cityHandler, favouritesHandler };
