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
    // const userData: BrowserTools.UserData[] = browserLocal.GetAllUserData();
    // userdataText.textContent = userData[0]?.userName ?? null;
    // console.log(userData[0]?.userName + "user");

    ClearUserDataTable();
    CreateElements();
});

function ClearUserDataTable(): void {
    while (userdataText.firstChild) {
        userdataText.removeChild(userdataText.firstChild)
    }
}

// function GetAllUserDataPretty (): string[] {
//     const userData: BrowserTools.UserData[] = browserLocal.GetAllUserData();
//     let prettyStrings: string[] = [];

//     userData.forEach(data => {
//         let stringToArray: string = "";
        
//         data.
//     });
// }

function CreateElements(): void {
    const userData: BrowserTools.UserData[] = browserLocal.GetAllUserData();
    let prettyStrings: string[] = [];

    userData.forEach(data => {
        const newRow = document.createElement("div");

        

        const nameElement = document.createElement("div");
        const dataElement = document.createElement("div");
        const distroElement = document.createElement("div");
        const basedElement = document.createElement("div");
        const auditoryElement = document.createElement("div");
        const philosofyElement = document.createElement("div");
        const initSystemElement = document.createElement("div");
        const desktopElement = document.createElement("div");
        const basePackagesElement = document.createElement("div");
        const updateTypeElement = document.createElement("div");
        const licenseElement = document.createElement("div");
        const packageManagerElement = document.createElement("div");

        newRow.classList.add("table-row");
        nameElement.classList.add("data-row");
        dataElement.classList.add("data-row");
        distroElement.classList.add("data-row");
        basedElement.classList.add("data-row");
        auditoryElement.classList.add("data-row");
        philosofyElement.classList.add("data-row");
        initSystemElement.classList.add("data-row");
        desktopElement.classList.add("data-row");
        basePackagesElement.classList.add("data-row");
        updateTypeElement.classList.add("data-row");
        licenseElement.classList.add("data-row");
        packageManagerElement.classList.add("data-row");

        nameElement.textContent = data.userName;

        newRow.appendChild(nameElement);
        userdataText.appendChild(newRow);
        userdataText.appendChild(dataElement);
        userdataText.appendChild(dist);
        userdataText.appendChild(newRow);
        userdataText.appendChild(newRow);
        userdataText.appendChild(newRow);
        userdataText.appendChild(newRow);
        userdataText.appendChild(newRow);
        userdataText.appendChild(newRow);
        userdataText.appendChild(newRow);
        userdataText.appendChild(newRow);

    });
}