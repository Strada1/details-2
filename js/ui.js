import { findEl, countingTime } from "./help.js";
import { list, now, STATUS } from "./main.js"

function renderList(place, priority) {
	place.replaceChildren()
	list.forEach(element => {
		if (element.priority === priority) {
			let task = element.status === STATUS.DONE ? createTask(element.name, true) : createTask(element.name)
			place.prepend(task)
		}
	});
}

function createTask(name, status = false) {
	let todoTask = document.createElement('div')
	todoTask.className = status ? "todo__task todo__task_todo" : "todo__task";

	let todoCheckbox = document.createElement('input');
	todoCheckbox.className = "todo__checkbox";
	todoCheckbox.type = "checkbox"
	todoCheckbox.checked = status ? true : false

	let todoLabel = document.createElement('label');
	todoLabel.className = "todo__label";
	todoLabel.textContent = name;

	let todoPlus = document.createElement('div');
	todoPlus.className = "todo__plus todo__plus_rotate -delet";

	let time = document.createElement("span")
	time.className = "todo__timer"
	
	todoTask.prepend(todoPlus);
	todoTask.prepend(time);
	todoTask.prepend(todoLabel);
	todoTask.prepend(todoCheckbox);
	return todoTask
}

function rewriteTime(tasks) {
	tasks.forEach(element => {
		let nameTask = element.querySelector(".todo__label").textContent
		let deadline = findEl(nameTask).deadline
		let deadlineTask = element.querySelector(".todo__timer")
		deadlineTask.textContent = countingTime(deadline - now)
	});
}

export { renderList, rewriteTime, }