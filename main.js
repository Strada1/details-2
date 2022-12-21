"use strict";
import { HttpError } from "./error.js";
import {
  renderDetailsPage,
  renderNowPage,
  addFromLocalStorage,
  mainText,
} from "./render.js";

const API_KEY = "f25c680c140d3e0e97c58cec933cb0d2";
const URL = "http://api.openweathermap.org/data/2.5/weather";
const inputSearch = document.querySelector(".input_search");
const form = document.querySelector("form");
const nowButton = document.querySelector("#now");
const detailsButton = document.querySelector("#details");

let isPageNow = true;

export const fetchData = async (searchValueInput) => {
  try {
    const data = await fetch(
      `${URL}?q=${
        searchValueInput ? searchValueInput : inputSearch.value
      }&appid=${API_KEY}`
    );
    if (data.status !== 200) {
      throw new HttpError(data.statusText);
    }
    const response = await data.json();
    if (isPageNow) {
      renderNowPage(response);
    } else {
      renderDetailsPage(response);
    }
  } catch (e) {
    alert(e.message);
  }
};
form.addEventListener("submit", (e) => {
  console.log(form);
  e.preventDefault();
  fetchData();
});

addFromLocalStorage();
detailsButton.addEventListener("click", () => {
  detailsButton.classList.add("active");
  nowButton.classList.remove("active");
  isPageNow = false;

  if (mainText) fetchData(mainText);
});
nowButton.addEventListener("click", () => {
  detailsButton.classList.remove("active");
  nowButton.classList.add("active");
  isPageNow = true;
  console.log(mainText);
  fetchData(mainText);
});
