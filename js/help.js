import { list, now, STATUS,  } from "./main.js"

const ERROR = {
	CHENGE: "Введите верную задачу",
	ADD: "Введите новую задачу",
	DELETE: "Введите старую задачу",
	TIME: "Введите корректную дату",
}

function showError(key) {
	let errorBlock = document.querySelector('.todo__error');
	errorBlock.textContent = ERROR[`${key}`]
	errorBlock.classList.add("todo__error_visible");
	setTimeout(() => errorBlock.classList.remove("todo__error_visible"), 4000)
}

const findEl = (task) => list.find(item => item.name === task)

const findIn = (task) => list.findIndex(item => item.name === task)

function searchPriority(item) {
	let blockPriority = item.closest('.todo__priority')
	let priority = blockPriority.dataset.priority
	return priority
}

function searchPlace(item) {
	let parent = item.closest(".todo__tasks")
	let place = parent.querySelector(".todo__list")
	return place
}

function searchName(item) {
	let label = item.closest('.todo__task').querySelector('.todo__label')
	let name = label.textContent
	return name
}

function countingTime(ms) {
	let day = Math.floor( ms / 1000 / 3600 / 24)
	let hour = Math.floor( ms / 1000 / 3600) % 24
	let min = Math.floor( ms / 1000 / 60 ) % 60
	let sec = Math.floor( ms / 1000 ) % 60
	let string = `${day} дней ${hour}:${min}:${sec}`
	return string
}

function checkForm(name, ms) {
	
	if (ms - now < 0 || !ms) {
		showError("TIME")
		return true
	};

	if (!name || name == " ") {
		showError("ADD")
		return true
	};

	if (findIn(name) != -1) {
		showError("ADD")
		return true
	};
}

function changeStatus(input) {
	let name = searchName(input)
	console.log(input.checked)
	list[findIn(name)].status = input.checked ? STATUS.DONE : STATUS.TODO
}

export { showError, findEl, findIn, searchPriority, searchPlace, searchName, countingTime, checkForm, changeStatus, }