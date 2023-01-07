export const storage = {
    saveFavoriteCities(jsonParseLs) {
        localStorage.setItem('favoriteCities', JSON.stringify(jsonParseLs));
    },

    saveCurrentTab(clickCurrentTab) {
        let currentTabs = clickCurrentTab.textContent;
        localStorage.setItem('currentTabs', currentTabs);
    },

    getFavoriteCities() {
        let getLocalStorage = localStorage.getItem('favoriteCities');
        if (getLocalStorage === '') {
            let jsonParseLs = JSON.parse([]);
            return jsonParseLs;
        } else {
            let jsonParseLs = JSON.parse(getLocalStorage);
            return jsonParseLs;
        }
    },

    getCurrentTab() {
        let currentTab = localStorage.getItem('currentTabs');
        return currentTab;
    },

    defaultLocalStorage() {
        localStorage.setItem('favoriteCities', JSON.stringify([]));
        localStorage.setItem('currentTabs', 'Now');
    },
};
