import * as BrowserTools from "./BrowserTools.js";


//#region CONSTANTS
const browserLocal: BrowserTools.BrowserLocal = BrowserTools.BrowserLocal.getInstance();


const backButton = document.getElementById('backButton') as HTMLButtonElement;
const loadUserDataButton = document.getElementById('loadUserDataButton') as HTMLButtonElement;
const userdataText = document.getElementById('userdataText') as HTMLElement;
//#endregion

document.addEventListener('DOMContentLoaded', function (e) {
    browserLocal.Initializate();
});

backButton.addEventListener('click', function (e) {
    window.location.href = "index.html";
});

loadUserDataButton.addEventListener('click', function (e) {
    console.log("Try load data");
    const userData: BrowserTools.UserData[] = browserLocal.GetAllUserData();
    userdataText.textContent = userData[0]?.userName ?? null;
    console.log(userData[0]?.userName + "user");
});