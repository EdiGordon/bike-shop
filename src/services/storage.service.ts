
export const storageService = {
    getRefreshToken,
    getFromLocalStorage,
    setRefreshToken,
    setToLocalStorage,
    removeFromLocalStorage,
    removeUserFromStorage,
    getLocalUser
};

const REFRESH_TOKEN_KEY = "refresh_token";
const i18n_CONFIG_KEY = "i18nConfig";


function getLocalUser() {
    return localStorage.getItem("loggedinUser");
    // localStorage.getItem(path)

}

function getRefreshToken() {
    return getFromLocalStorage(REFRESH_TOKEN_KEY);
}

function setRefreshToken(value: string) {
    return setToLocalStorage(REFRESH_TOKEN_KEY, value);
}


function getFromLocalStorage(path: string) {
    return JSON.parse(localStorage.getItem(path) || "null");
}

function removeFromLocalStorage(path: string) {
    localStorage.removeItem(path);
    return true;
}

function setToLocalStorage(path: string, value: any) {
    return localStorage.setItem(path, JSON.stringify(value));
}

function removeUserFromStorage() {
    removeFromLocalStorage("loggedinUser");
    removeFromLocalStorage("refresh_token");
}