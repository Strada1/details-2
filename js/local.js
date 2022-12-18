import { renderList, } from "./ui.js";
import { searchPriority, } from "./help.js";
import { list, todoList, } from "./main.js";


let localMetods = {
	LIST: "list",
	getLocal: function () {
		let listSrt = localStorage.getItem(this.list)
		let list = JSON.parse(listSrt) || []
		return list
	},
	putLocal: function (list) {
		let listLocal = JSON.stringify(list)
		localStorage.setItem(this.list, listLocal)
	},
	writeOld: function () {
		if (list.length > 0) {
			todoList.forEach(element => {
				let priority = searchPriority(element)
				console.log(priority)
				renderList(element, priority)
			});
		}
	},
}

export { localMetods, }