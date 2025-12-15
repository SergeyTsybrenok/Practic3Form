import * as BrowserTools from "./BrowserTools.js";
//#region CONSTANTS
const browserLocal = BrowserTools.BrowserLocal.getInstance();
const backButton = document.getElementById('backButton');
const loadUserDataButton = document.getElementById('loadUserDataButton');
const userdataText = document.getElementById('userdataText');
//#endregion
document.addEventListener('DOMContentLoaded', function (e) {
    browserLocal.Initializate();
    RedrawTable();
});
backButton.addEventListener('click', function (e) {
    window.location.href = "index.html";
});
loadUserDataButton.addEventListener('click', function (e) {
    RedrawTable();
});
function RedrawTable() {
    ClearUserDataTable();
    CreateElements();
}
function ClearUserDataTable() {
    while (userdataText.firstChild) {
        userdataText.removeChild(userdataText.firstChild);
    }
}
const setTextContent = (element, text) => {
    if (element instanceof HTMLElement && text != undefined) {
        element.textContent = text;
    }
};
function CreateElements() {
    const userData = browserLocal.GetAllUserData();
    const rows = new Array();
    let indexG = 0; //TODO use for except foreach
    userData.forEach(data => {
        const newRow = document.createElement("div");
        console.log(indexG);
        const elements = new Array(12);
        for (let index = 0; index < elements.length; index++) {
            const newElement = document.createElement("div");
            newElement.classList.add("data-row");
            elements[index] = newElement;
        }
        setTextContent(elements[0], data.userName);
        setTextContent(elements[1], data.dateBirth.toString());
        setTextContent(elements[2], data.distroName);
        setTextContent(elements[3], data.basePackages);
        setTextContent(elements[4], data.auditory);
        setTextContent(elements[5], data.philosofy);
        setTextContent(elements[6], data.initSystem.toString());
        setTextContent(elements[7], data.desktopEnvironment);
        setTextContent(elements[8], data.basePackages);
        setTextContent(elements[9], data.typeOfUpdate.toString());
        setTextContent(elements[10], data.license);
        setTextContent(elements[11], data.packageManager.toString());
        elements.forEach(element => {
            console.log(element.classList.item(0));
            newRow.appendChild(element);
        });
        const deleteRowButton = CreateButton("Delete", "Remove current row and save new table", "delete-button");
        const newIndex = indexG; //Create new variable for bug
        // Вкратце: indexG перезаписываемая переменная и метод RemoveUserData будет брать именно переменную, а учитывая, что тут в моменте создается вся таблица
        // то будет использована последняя (зависит от рамера таблицы), поэтому создаем новую переменную и используем ее
        deleteRowButton.addEventListener('click', function (e) {
            userdataText.removeChild(newRow);
            browserLocal.RemoveUserData(newIndex, true); // тут
            console.log("Delete row", newIndex);
        });
        const removeRowButton = CreateButton("Remove", "Remove current row without save", "remove-button");
        removeRowButton.addEventListener('click', function (e) {
            userdataText.removeChild(newRow);
            console.log("remove row");
        });
        newRow.appendChild(deleteRowButton);
        newRow.appendChild(removeRowButton);
        newRow.classList.add("table-row");
        userdataText.appendChild(newRow);
        indexG++; //TODO use "for" loop instead of "foreach"
    });
}
function CreateButton(text, title, additiveClass) {
    const newButton = document.createElement("button");
    newButton.textContent = text;
    newButton.classList.add("button", "table-button", additiveClass);
    newButton.title = title;
    return newButton;
}
//# sourceMappingURL=AdminPanel.js.map