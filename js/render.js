import { UI_ELEMENT, STATUS, PRIORITY } from "./constants.js";
import { CreateTaskHTML } from "./taskHTML.js";

const createTaskHTML = new CreateTaskHTML();

export function render(list) {
  let dom = document.body.querySelectorAll(".task-list");
  dom.forEach((element) => element.replaceChildren());

  list.forEach((value, key) => {
    let task = createTaskHTML.makeTask(key, checkboxStatus(value), value);
    let taskList = choiceTaskList(value);
    taskList.append(task);
  });
}

function checkboxStatus({ status }) {
  return status === STATUS.DONE;
}

function choiceTaskList({ priority }) {
  let result =
    priority === PRIORITY.HIGH ? UI_ELEMENT.HIGH_TASK : UI_ELEMENT.LOW_TASK;
  return result.querySelector(".task-list");
}
