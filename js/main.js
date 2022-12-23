import { UI_ELEMENTS, TODO_STATUS, TODO_PRIORITY } from "./constants.js";
import { createTaskDom, createItemInLow, createItemInHigh } from "./create.js";

let list = [
  { name: 'Посмотреть ютубчик', status: 'To Do', priority: 'low' },
  { name: 'Вот вам и супер интересная тема. Вы наверняка заметили что ваши файлы с кодом становятся все объемнее, что хочется вынести некоторые вещи куда-то за пределы основной программы.', status: 'To Do', priority: 'high' },
  { name: 'Сверстать этот TODO list', status: 'To Do', priority: 'high' },
  { name: 'Начать делать задачу', status: 'Done', priority: 'high' },
  { name: 'create a post', status: 'Done', priority: 'low' },
];

function CreateElementInList(taskName, taskPriority) {
  this.name = taskName;
  this.status = TODO_STATUS.TODO;
  this.priority = taskPriority;
}

UI_ELEMENTS.HIGH_FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = UI_ELEMENTS.INPUT_HIGH.value;
  const itemList = new CreateElementInList(name, TODO_PRIORITY.HIGHT);
  list.push(itemList);
  createStorageList();
  renderDocument();
  event.target.reset();
});

UI_ELEMENTS.LOW_FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = UI_ELEMENTS.INPUT_LOW.value;
  const itemList = new CreateElementInList(name, TODO_PRIORITY.LOW);
  list.push(itemList);
  createStorageList();
  renderDocument();
  event.target.reset();
});

export function changeStatus() {
  const taskName = this.parentNode.nextSibling.textContent;
  list.map((item) => {
    if (item.name === taskName) {
      if (item.status === TODO_STATUS.TODO) {
        item.status = TODO_STATUS.DONE;
      } else {
        item.status = TODO_STATUS.TODO;
      }
    }
  })
  const item = this.parentNode.parentNode;
  item.classList.toggle("item-checked");
  createStorageList();
}

export function deleteItem() {
  const taskName = this.parentNode.textContent;
  this.parentNode.remove();
  list = list.filter((item) => {
    return item.name != taskName;
  });
  createStorageList();
}

function renderDocument() {
  list = getStorageList();
  UI_ELEMENTS.HIGH_LIST.textContent = '';
  UI_ELEMENTS.LOW_LIST.textContent = '';
  recursionRenderDocument(list);
}

function recursionRenderDocument(array, i = 0) {
  if (i >= array.length) {
    return;
  }
  if (array[i].priority === TODO_PRIORITY.HIGHT) {
    const taskHigh = createTaskDom(list[i].name, list[i].status);
    createItemInHigh(taskHigh)
  } else {
    const taskLow = createTaskDom(list[i].name, list[i].status);
    createItemInLow(taskLow);
  }
  recursionRenderDocument(array, i + 1);
}

function createStorageList() {
  const storageList = JSON.stringify(list);
  localStorage.setItem('list', storageList);
}

function getStorageList() {
  const storageList = localStorage.getItem('list');
  if (storageList) {
    return JSON.parse(storageList);
  } else {
    return list;
  }
}

renderDocument();