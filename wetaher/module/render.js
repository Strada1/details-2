import { UI } from "./ui.js";
import { favoriteCities } from "../weather2.0.js";

export function render() {
  UI.FAVORITE_LIST.innerHTML = "";

  favoriteCities.forEach((city) => {
    const li = document.createElement("li");
    li.className = "locations__list-item";
    li.id = city.id;

    const span = document.createElement("span");
    span.className = "locations__list-city";
    span.dataset.action = "city-info";
    span.textContent = city.name;
    li.append(span);
    UI.FAVORITE_LIST.append(li);

    const button = document.createElement("button");
    button.classList = "delete__btn";
    button.dataset.action = "delete";
    li.append(button);
  });
}

