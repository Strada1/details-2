export const TABS = {
	BTN_TABS: document.querySelectorAll(".tablinks"),
	openItem(itemName, btn) {
		let tabcontent = document.querySelectorAll(".tabcontent");
		for (let tab of tabcontent) {
			if (tab.id !== itemName) {
				tab.style.display = "none";
			}
		}

		let tablinks = document.querySelectorAll(".tablinks");
		for (let tablink of tablinks) {
			tablink.className = tablink.className.replace(" active", "");
		}

		document.querySelector(`#${itemName}`).style.display = "block";
		btn.className += " active";
	},
	addEventTabChange() {
		for (let btn of this.BTN_TABS) {
			let btnValue = btn.getAttribute("value");
			btn.addEventListener("click", function () {
				TABS.openItem(btnValue, btn);
			});
		}
	}
}