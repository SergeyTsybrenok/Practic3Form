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
    RedrawTable();
});

function RedrawTable(): void {
    ClearUserDataTable();
    CreateElements();
}

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

const setTextContent = (element: Element | null | undefined, text: string) => {
    if (element instanceof HTMLElement && text != undefined) {
        element.textContent = text;
    }
};


function CreateElements(): void {
    const userData: BrowserTools.UserData[] = browserLocal.GetAllUserData();

    const rows: HTMLElement[] = new Array<HTMLElement>();

    let indexG: number = 0; //TODO use for except foreach
    userData.forEach(data => {
        const newRow = document.createElement("div");
        console.log(indexG);

        const elements: HTMLElement[] = new Array<HTMLElement>(12);

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
        // setTextContent(elements[11], data.packageManager.toString())
        setTextContent(elements[11], "packageManager"); //not working a bit

        elements.forEach(element => {
            console.log(element.classList.item(0));
            newRow.appendChild(element);
        });

        const deleteRowButton: HTMLButtonElement = document.createElement("button");
        deleteRowButton.textContent = "Delete";
        deleteRowButton.classList.add("button", "delete-button");
        deleteRowButton.title = "Remove current row and save new table"

        const newIndex: number = indexG; //Create new variable for bug
        // Вкратце: indexG перезаписываемая переменная и метод RemoveUserData будет брать именно переменную, а учитывая, что тут в моменте создается вся таблица
        // то будет использована последняя (зависит от рамера таблицы), поэтому создаем новую переменную и используем ее
        deleteRowButton.addEventListener('click', function (e) {
            userdataText.removeChild(newRow);
            browserLocal.RemoveUserData(newIndex, true); // тут
            console.log("Delete row");
        });

        //TODO mv to function
        const removeRowButton: HTMLButtonElement = document.createElement("button");
        removeRowButton.textContent = "Remove";
        removeRowButton.classList.add("button", "remove-button");
        removeRowButton.title = "Remove current row without save"

        removeRowButton.addEventListener('click', function (e) {
            userdataText.removeChild(newRow);
            console.log("remove row");
        });

        newRow.appendChild(deleteRowButton);
        newRow.appendChild(removeRowButton);

        newRow.classList.add("table-row");

        userdataText.appendChild(newRow);
    });

    indexG++;//TODO use for except foreach
}