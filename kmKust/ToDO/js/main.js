const STATUS = {
	TODO: "to do",
	DONE: "done",
}

const PRIORITY = {
	LOW: "low",
	HIGHT: "hight",
}

let list = [];

const INPUT_HIGH = document.querySelectorAll('.inputAddTask')[0];
const INPUT_LOW = document.querySelectorAll('.inputAddTask')[1];

const DIV_TASKS_HIGH = document.querySelector('.tasksHigh');
const DIV_TASKS_LOW = document.querySelector('.tasksLow');

const CONTAINER_ELEMENTS = document.querySelector('.containerSheet');

const BTN_ADD_HIGH = document.querySelector('.btnAdd');
const BTN_ADD_LOW = document.querySelectorAll('.btnAdd')[1];

const TODO_FORM_HIGH = document.querySelector('.toDoForm');
const TODO_FORM_LOW = document.querySelectorAll('.toDoForm')[1];

function addTask(priorityTask) {
	try {
		let input1Task = list.findIndex(item => item.name === INPUT_HIGH.value);
		let input2Task = list.findIndex(item => item.name === INPUT_LOW.value);
		let inputHighValue = INPUT_HIGH.value
		let inputLowValue = INPUT_LOW.value;
		if (input1Task >= 0 || input2Task >= 0) {
			alert('Такая задача уже есть')
			return
		} else if (inputHighValue > "" || inputLowValue > "") {
			let inputValue = inputHighValue || inputLowValue
			const tasks = new Task(inputValue, priorityTask);
			list.push(tasks);
		}
		render()
		clearInput()

	} catch (addTaskError) {
		alert(addTaskError.stack);
	}
}

function Task(inputValue, priorityTask) {
	this.name = inputValue;
	this.status = STATUS.TODO;
	this.priority = priorityTask;
	this.date = dateNow();
}

function clearInput() {
	INPUT_HIGH.value = "";
	INPUT_LOW.value = "";
}

function newTask(inputHigh, status, priority, date) {
	let divTask = document.createElement('div');
	let divTaskText = document.createElement('div');
	let divDate = document.createElement('div');
	divDate.className = "date"
	divTask.className = "task"
	divTaskText.className = "taskText";
	divDate.innerHTML = date;
	divTaskText.innerHTML = inputHigh;

	switch (priority) {
		case PRIORITY.HIGHT:
			DIV_TASKS_HIGH.append(divTask);
			break;
		case PRIORITY.LOW:
			DIV_TASKS_LOW.append(divTask);
			break;
	}
	divTask.append(divTaskText);
	divTask.append(divDate);

	let newCheckbox = document.createElement('input');
	newCheckbox.className = "squareCheckbox";
	newCheckbox.type = "checkbox";
	newCheckbox.checked = status === STATUS.DONE ? true : false;
	divTask.prepend(newCheckbox);

	let buttonClose = document.createElement('button');
	buttonClose.className = "closeTask";
	buttonClose.innerHTML = "+";
	divTask.append(buttonClose);
}

function dateNow() {
	let currentDate = new Date();

	let hours = currentDate.getHours();
	let minutes = currentDate.getMinutes();
	let getDate = currentDate.getDate();
	let month = currentDate.getMonth() + 1;
	let year = currentDate.getFullYear()

	function check() {
		(hours < 10) ?
			hours = (`0${hours}`) : hours;

		(minutes < 10) ?
			minutes = (`0${minutes}`) : minutes;

		(getDate < 10) ?
			getDate = (`0${getDate}`) : getDate;

		(month < 10) ?
			month = `0${(month + 1)}` : month;

		let timeNow = ` ${hours}:${minutes}, ${getDate}.${month}.${year}`;
		return timeNow;
	}
	return check();
}

function render() {
	DIV_TASKS_HIGH.replaceChildren();
	DIV_TASKS_LOW.replaceChildren();

	list.forEach(item => {
		let priority = item.priority;
		let task = item.name;
		let status = item.status;
		let date = item.date;
		newTask(task, status, priority, date);
	});
}

function deleteTask(event) {
	let closeTask = event.target;
	let parentCloseTask = closeTask.previousElementSibling;
	list = list.filter(item => item.name !== parentCloseTask.textContent);
	render();
}

function changeStatus(event) {
	let changeStatusTaask = event.target;
	let parentChangeStatusTaask = changeStatusTaask.nextElementSibling;
	parentChangeStatusTaask = parentChangeStatusTaask.textContent;
	let numberTasks = list.findIndex(item => item.name === parentChangeStatusTaask);
	let statusName = list[numberTasks].status;

	if (statusName === STATUS.TODO) {
		list.splice(numberTasks, 1, {
			name: parentChangeStatusTaask,
			status: STATUS.DONE,
			priority: list[numberTasks].priority,
		})
	} else if (statusName === STATUS.DONE) {
		list.splice(numberTasks, 1, {
			name: parentChangeStatusTaask,
			status: STATUS.TODO,
			priority: list[numberTasks].priority,
		});
	}
	render();
}

CONTAINER_ELEMENTS.addEventListener("click", event => {
	let cancelTask = event.target.closest('.closeTask');
	let checkboxStatus = event.target.closest('.squareCheckbox');
	if (cancelTask) {
		deleteTask(event);
	}
	if (checkboxStatus) {
		changeStatus(event);
	}
});


BTN_ADD_HIGH.addEventListener("click", () => {
	let priorityTask = PRIORITY.HIGHT;
	addTask(priorityTask);
});

BTN_ADD_LOW.addEventListener("click", () => {
	let priorityTask = PRIORITY.LOW;
	addTask(priorityTask);
});

TODO_FORM_HIGH.addEventListener("submit", event => event.preventDefault());
TODO_FORM_LOW.addEventListener("submit", event => event.preventDefault());











/*const STATUS = {
	TODO: "to do",
	DONE: "done",
}

const PRIORITY = {
	LOW: "low",
	HIGHT: "hight",
}

let list = [];

const INPUT_HIGH = document.querySelectorAll('.inputAddTask')[0];
const INPUT_LOW = document.querySelectorAll('.inputAddTask')[1];
const DIV_TASKS_HIGH = document.querySelector('.tasksHigh');
const DIV_TASKS_LOW = document.querySelector('.tasksLow')

const BTN_ADD_HIGH = document.querySelector('.btnAdd');
const BTN_ADD_LOW = document.querySelectorAll('.btnAdd')[1];
const TODO_FORM_HIGH = document.querySelector('.toDoForm');
const TODO_FORM_LOW = document.querySelectorAll('.toDoForm')[1];


function addTask() {
	try {
		let input1Task = list.findIndex(item => item.name === INPUT_HIGH.value);
		let input2Task = list.findIndex(item => item.name === INPUT_LOW.value);

		if (input1Task >= 0 || input2Task >= 0) {
			alert('Такая задача уже есть')
			return
		} else if (INPUT_HIGH.value > "") {
			list.push({
				name: INPUT_HIGH.value,
				status: STATUS.TODO,
				priority: PRIORITY.HIGHT,
			});
		} else if (INPUT_LOW.value > "") {
			list.push({
				name: INPUT_LOW.value,
				status: STATUS.TODO,
				priority: PRIORITY.LOW,
			});
		}
		render()
		clearInput()

	} catch (addTaskError) {
		alert(addTaskError.stack);
	}
}

function clearInput() {
	INPUT_HIGH.value = "";
	INPUT_LOW.value = "";
}

function newTaskHigh(inputHigh, status) {
	let divTask = document.createElement('div');
	let divTaskText = document.createElement('div');
	divTask.className = "task"
	divTaskText.className = "taskText";
	divTaskText.innerHTML = inputHigh;
	DIV_TASKS_HIGH.append(divTask);
	divTask.append(divTaskText);

	let newCheckbox = document.createElement('input');
	newCheckbox.className = "squareCheckbox";
	newCheckbox.type = "checkbox";
	newCheckbox.checked = status === STATUS.DONE ? true : false;
	divTask.prepend(newCheckbox);

	let buttonClose = document.createElement('button');
	buttonClose.className = "closeTask";
	buttonClose.innerHTML = "+";
	divTask.append(buttonClose);
}

function newTaskLow(inputLow, status) {
	let divTask = document.createElement('div');
	let divTaskText = document.createElement('div');
	divTask.className = "task";
	divTaskText.className = "taskText";
	divTaskText.innerHTML = inputLow;
	DIV_TASKS_LOW.append(divTask);
	divTask.append(divTaskText);

	let newCheckbox = document.createElement('input');
	newCheckbox.className = "squareCheckbox";
	newCheckbox.type = "checkbox";
	newCheckbox.checked = status === STATUS.DONE ? true : false;
	divTask.prepend(newCheckbox);

	let buttonClose = document.createElement('button');
	buttonClose.className = "closeTask";
	buttonClose.innerHTML = "+";
	divTask.append(buttonClose);
}

function render() {
	DIV_TASKS_HIGH.replaceChildren();
	DIV_TASKS_LOW.replaceChildren();
	list.forEach(item => {
		let priority = item.priority
		let task = item.name
		let status = item.status
		switch (priority) {
			case PRIORITY.HIGHT:
				newTaskHigh(task, status);
				return
			case PRIORITY.LOW:
				newTaskLow(task, status);
				return
		}
	});
	console.log(list)
}

function deleteTask(event) {
	let closeTask = event.target;
	let parentCloseTask = closeTask.previousElementSibling;
	list = list.filter(item => item.name !== parentCloseTask.textContent);
	render()
}

function changeStatus(event) {
	let changeStatusTaask = event.target;
	let parentChangeStatusTaask = changeStatusTaask.nextElementSibling;
	parentChangeStatusTaask = parentChangeStatusTaask.textContent;
	let numberTasks = list.findIndex(item => item.name === parentChangeStatusTaask);
	let statusName = list[numberTasks].status;

	if (statusName === STATUS.TODO) {
		list.splice(numberTasks, 1, {
			name: parentChangeStatusTaask,
			status: STATUS.DONE,
			priority: list[numberTasks].priority,
		})
	} else if (statusName === STATUS.DONE) {
		list.splice(numberTasks, 1, {
			name: parentChangeStatusTaask,
			status: STATUS.TODO,
			priority: list[numberTasks].priority,
		});
	}
	render();
}

DIV_TASKS_HIGH.addEventListener("click", event => {
	let cancelTask = event.target.closest('.closeTask');
	let checkboxStatus = event.target.closest('.squareCheckbox');
	if (cancelTask) {
		deleteTask(event)
	}
	if (checkboxStatus) {
		changeStatus(event)
	}
});

DIV_TASKS_LOW.addEventListener("click", event => {
	let cancelTask = event.target.closest('.closeTask');
	let checkboxStatus = event.target.closest('.squareCheckbox');
	if (cancelTask) {
		deleteTask(event)
	}
	if (checkboxStatus) {
		changeStatus(event)
	}
});

BTN_ADD_HIGH.addEventListener("click", addTask);
BTN_ADD_LOW.addEventListener("click", addTask);

TODO_FORM_HIGH.addEventListener("submit", event => event.preventDefault());
TODO_FORM_LOW.addEventListener("submit", event => event.preventDefault());*/