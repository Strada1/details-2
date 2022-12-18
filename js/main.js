// ToDo
import { searchPriority, searchPlace, checkForm, changeStatus, searchName, } from "./help.js"
import { renderList, rewriteTime, } from './ui.js';
import { localMetods, } from './local.js';
// import { showError, findEl, findIn, checkTask, } from "./help.js"
const STATUS = {
	// IN_PROGRESS: "In Progress",
	DONE: "Done",
	TODO: "To Do",
	// NOT_WANT: 'don`t want'
}

const PRIORITY = {
	HIGH: 'high',
	LOW: 'low',
}

let todoList = document.querySelectorAll('.todo__list');

let list = localMetods.getLocal()

localMetods.writeOld()

let todoTimer = document.querySelectorAll('.todo__task');

let now = Date.now()



let forms = document.forms;
[...forms].forEach(element => {
	element.addEventListener("submit", formsHendler);
});

todoList.forEach(element => {
	element.addEventListener("click", todoListHendler)
});

setTimeout(function run() {
	now = Date.now()
	todoTimer = document.querySelectorAll('.todo__task');
	// console.log(now)
	if (todoTimer) {
		rewriteTime(todoTimer)
	}
	setTimeout(run, 1000);
}, 1000);

function formsHendler(e) {
	e.preventDefault()
	let form = e.target
	let task = form.querySelector('.todo__add')
	let name = task.value;
	let date = new Date(form.querySelector('.todo__date').value)
	let ms = date.getTime()

	if (checkForm(name, ms)){
		return
		
	}

	newTask(form, name, ms)
	form.reset()
}

function newTask(form, name, ms) {
	let priority = searchPriority(form)
	let newTask = new AddTask(name, priority, ms)
	list.push(newTask)
	renderList(searchPlace(form), priority)
	localMetods.putLocal(list)
	console.log(localMetods.getLocal())
}

function todoListHendler(event) {
	let clickElement = event.target;
	if (clickElement.closest('.-delet')) {
		deleteTask(clickElement)
		
		renderList(searchPlace(clickElement), searchPriority(clickElement))
	}
	if (clickElement.closest(".todo__checkbox")) {
		changeStatus(clickElement)
		renderList(searchPlace(clickElement), searchPriority(clickElement))
	}
	localMetods.putLocal(list)
	console.log(localMetods.getLocal())
}

function deleteTask(task) {
	let name = searchName(task)
	console.log(name)
	list = list.filter(item => item.name !== name)
}

function AddTask(name, priority, ms) {
	this.name = name;
	this.priority = priority;
	this.status = STATUS.TODO;
	this.deadline = ms;
}


export { STATUS, now, list, todoList, }