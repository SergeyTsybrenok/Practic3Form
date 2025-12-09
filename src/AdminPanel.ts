import * as BrowserTools from "./BrowserTools.js";

type BrowserLocalInstance = InstanceType<typeof BrowserTools.BrowserLocal>;

//#region CONSTANTS
const browserLocal: BrowserLocalInstance = BrowserTools.BrowserLocal.getInstance();

const backButton = document.getElementById('backButton') as HTMLButtonElement;
const loadUserDataButton = document.getElementById('loadUserDataButton') as HTMLButtonElement;
//#endregion


backButton.addEventListener('click', function (e) {
    window.location.href = "index.html";
});

loadUserDataButton.addEventListener('click', function (e) {
    console.log("Try load data");
});