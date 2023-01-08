"use script"


import { TABS } from "./uiElements.js";

TABS.weatherButtons.addEventListener("click", function (event) {
	const clickButton = event.target
	if (checkClickTabs(clickButton)){
		changeTabs(clickButton)
	}
});

function checkClickTabs(clickButton) {
	const clickButtonParent = clickButton.closest(".weather__button")
	const activeClickElementParent = clickButtonParent.classList.contains("-active")
	return clickButtonParent && !activeClickElementParent
}

function changeTabs(clickButton) {
	const activeButton = TABS.weatherButtons.querySelector('.weather__button.-active');
	activeButton.classList.remove("-active")
	clickButton.classList.add("-active")
	const indexClickButton = TABS.weatherButtonAll.findIndex(item => item === clickButton)
	const activeTab = TABS.weatherTabs.querySelector('.weather__tab.-active');
	activeTab.classList.remove("-active");
	const newActiveTab = TABS.weatherTabAll[indexClickButton];
	newActiveTab.classList.add("-active");
}

export{checkClickTabs, changeTabs};