import { UI_ELEMENTS, showWeather, showWeatherDetails } from "./UI.js";
// объявление переменных

const form = document.querySelector(".form");
let city__name = document.querySelector(".city__name"); //////
const city__list = document.querySelector(".city__list");
const now__temp = document.querySelector(".now__temp");
const serverUrl = "http://api.openweathermap.org/data/2.5/weather";
// const cityName = 'boston';
const apiKey = "f660a2fb1e4bad108d6160b7f58c555f";
let degrees;
const cityName = document.querySelector(".search__input"); /////
let cities = document.querySelectorAll('.city');
// зачем это?
window.location.hash = "now";

// общая схема работы
// определяем пустой массив под наши любимые города
let favoriteCityList = new Set();/////////////------///////////////

// функция проверки как заполнить массив: есть ли массив в localStorage если да - заполняем. нет заполняем по готовой форме
function fillArray() {
  // если есть в localStorage то парсим из него
  if (localStorage.getItem("favoriteCityList")) {
    favoriteCityList = JSON.parse(localStorage.getItem("favoriteCityList"));
  } else {
    //если нет - заполняем по готовому образцу
    favoriteCityList = [
      {
        id: 1670256675529,
        name: "Amur Oblast",
      },
      {
        id: 1670264104402,
        name: "Baku",
      },
      {
        id: 1670268455470,
        name: "Samara Oblast",
      },
      {
        id: 1670268460654,
        name: "Bali",
      },
      {
        id: 1670268462774,
        name: "Dane",
      },
      {
        id: 1670268465406,
        name: "Kilo",
      },
      {
        id: 1670268467534,
        name: "Nur-Sultan",
      },
    ];
  }
}

// функция рендера нашего массива на страницу
function renderFavoriteList() {
  city__list.textContent = '';
  favoriteCityList.forEach((city) => {
    const taskHTML = `
    <li id ='${city.id}' class="city">
      <p>${city.name}</p>
      <button type="button" data-action="delete" class="btn-action">
			</button>
    </li>
  `;
    city__list.insertAdjacentHTML("beforeend", taskHTML);
  });
}

// функция обращения по имени города к серверу для получения данных
function sendDataToServer(name) {
  let url = `${serverUrl}?q=${name}&appid=${apiKey}&units=metric`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      city__name.textContent = `${data.name}`
      now__temp.textContent = Math.round(`${data.main.temp}`) + ` C°`
      showWeatherDetails(data)
    })
    .catch(error => alert(`Server not answered ${error}`));
}

// функция проверки лайка имени к тому что уже есть в массиве
function checkNametoFavorite(cityName) {
  // поиск по массиву введенного имени города и занесение true если есть и false если нет
  const isContain = favoriteCityList.some((city) => {
    return city.name === cityName
  })
  // console.log(isContain);
  if (isContain) {
    return console.log(`city ${cityName} is already in favorite`);
  }
  addCityToLike(cityName);
  console.log(`add city ${cityName} to array`);
{
  // const index = favoriteCityList.findIndex(
  //   (city) => toString(city.name) === toString(cityName)
  // );
  // if (index === -1) return alert("this city is already in favorite");
  // если города нет - добавления его в массив favoriteCityList
  // addCityToLike(cityName);

  // поиск индекса по условию: введенное имя = имя города в массиве
  // const index = favoriteCityList.findIndex((city) => {
  //   console.log(city.name === cityName);
  //   return toString(city.name) !== toString(cityName)

  // })
  // console.log((index));
  // if (existOnFavoriteArray) {
  //   return console.log('this city already exist');
  // } 
  // addCityToLike(cityName);
  // console.log('add city to array');
}
}

// функция добавления имени в массив favoriteCityList
export function addCityToLike(cityName) {
  const newCity = {
    id: Date.now(),
    name: cityName,
  };
  favoriteCityList.push(newCity);
  saveToLocalStorage();
  renderFavoriteList();
}

// добавление класса лайк к лайкнутому имени города
function likeMe() {
  UI_ELEMENTS.LIKE.classList.toggle("now__sities-btn--like");
}

// сохранение списка городов в LocalStorage
function saveToLocalStorage() {
	localStorage.setItem('favoriteCityList', JSON.stringify([...favoriteCityList]))
}

// удаление города из списка
export function removeCityFromLike(event) {
  if (event.target.dataset.action !== 'delete' || event.target.dataset.action === 'btn-action--img') return
  const parentNode = event.target.closest('.city');
	const id = Number(parentNode.id)
  // favoriteCityList = favoriteCityList.filter((city) => city.id !== id)
  const index = favoriteCityList.findIndex((task) => task.id === id)
  // console.log(index);
  favoriteCityList.splice(index, 1)
  console.log(favoriteCityList);
  parentNode.remove();
  saveToLocalStorage();
}

// при клике на кнопку удаления запускаем удаление города из списка
UI_ELEMENTS.BTN_DELETE.addEventListener('click', removeCityFromLike);

// при клике на кнопке детали - показать и заполнить таб детали
UI_ELEMENTS.BTN_DETAILS.addEventListener('click', () => {
  console.log('jjj');
  const cityName = document.querySelector('.city__name')
  sendDataToServer(cityName)
  showWeatherDetails(cityName)

})

// заполнение массива
fillArray();
// рендер нашего массива на страницу
renderFavoriteList();
// заполнение погоды сейчас по первому городу в массиве
sendDataToServer(favoriteCityList[0].name)

// после ввода имени города и клике загрузить погоду по нему
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const cityName = document.querySelector('.city__name')
  sendDataToServer(e.target[0].value);
  
})
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
document.querySelectorAll('.city').forEach((item) => {
  item.addEventListener('click', () => {
    sendDataToServer(item.textContent.trim());
    {
      // let url = `${serverUrl}?q=${item.textContent.trim()}&appid=${apiKey}&units=metric`;

    //   fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => { 
    //         // console.log(data)            
    //         city__name.textContent =  `${data.name}`
    //         now__temp.textContent = Math.round(`${data.main.temp}`)+` C°`
    //         showWeatherDetails(data)
    // })
		// .catch(error => alert(`Server not answered ${error}`));
    }
    
    }
  );
})
{
  // document.querySelectorAll('.city').forEach((item) => {
//   item.addEventListener('click', () => {

//   })
// })

// cities.forEach((item) => {
//   item.addEventListener('click', () => {
//     console.log(item);
//     // sendDataToServer(name)
//   }
//   );
// })
}

////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
UI_ELEMENTS.LIKE.addEventListener("click", () => {
	const cityName = document.querySelector('.city__name').textContent;
	checkNametoFavorite(cityName);

});


export function convertTime(time) {
  const date = new Date(time * 1000);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const result = `${hours}:${minutes}`;
  return result;
}
