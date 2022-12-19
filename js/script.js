import { UI_ELEMENT, STATUS, PRIORITY, TODO_CLASS } from "./constants.js";
import { render } from "./render.js";
import { StorageTask } from "./storage.js";
import { diffTime } from "./utils.js";

const LOCAL_KEY = "todo_tasks";
const storageTask = new StorageTask(LOCAL_KEY);

let dateNow = Date.now();

const forms = Array.from(document.forms);
forms.forEach((form) => form.addEventListener("submit", formHandler));
UI_ELEMENT.MAIN.addEventListener("click", todoHandler);

function formHandler(e) {
  e.preventDefault();
  let form = e.target;
  let inputTask = form.firstElementChild;
  let inputDate = form.querySelector('input[type="datetime-local"]');
  if (!inputDate || !inputTask) return;
  let date = new Date(inputDate.value);
  createTaskObj(inputTask.value, inputTask.dataset.priority, date.getTime());
  inputTask.value = "";
  inputDate.value = "";
  render(storageTask.getList());
}

function todoHandler(e) {
  let target = e.target;

  if (isRemove(target)) removeTask(target);

  if (isCheckbox(target)) changeStatus(target);
}

function createTaskObj(taskName, taskPriority, date) {
  let task = {
    name: taskName,
    status: STATUS.TODO,
    priority: taskPriority,
    endDate: date,
  };
  storageTask.addTask(task);
}

function changeStatus(target) {
  let id = target.closest(".task-list__task").id;
  let status = target.checked ? STATUS.DONE : STATUS.TODO;
  storageTask.getTask(id).status = status;
  storageTask.saveToLocal();
  render(storageTask.getList());
}

function removeTask(target) {
  let id = target.closest(".task-list__task").id;
  storageTask.removeTask(id);
  render(storageTask.getList());
}

const isCheckbox = (target) => target.className === TODO_CLASS.CHECKBOX;

const isRemove = (target) => target.className === TODO_CLASS.REMOVE;

render(storageTask.getList());

setTimeout(function run() {
  dateNow = Date.now();
  rewriteTime();
  setTimeout(run, 1000);
}, 10);

function rewriteTime() {
  let dateTimeNow = Date.now();
  let taskList = storageTask.getList();
  if (taskList.size < 1) return;
  taskList.forEach((value, key) => {
    let task = document.querySelector(`#${key}`);
    let dateTime = task.querySelector(`.${TODO_CLASS.DATE_TIME}`);
    if (value.status !== STATUS.DONE)
      dateTime.textContent = diffTime(value, dateTimeNow);
  });
}
