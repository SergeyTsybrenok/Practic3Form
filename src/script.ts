import * as BrowserTools from "./BrowserTools.js";
import CheckboxSelector from "./CheckboxSelector.js";

type BrowserLocalInstance = InstanceType<typeof BrowserTools.BrowserLocal>; //remove
type UserDataInstance = InstanceType<typeof BrowserTools.UserData>; //remove


//#region COSNTANTS

const desktopEnvirenment = ["xfce4", "hyprland", "gnome", "dwm"]
const auditory = ["beginners", "advanced", "professionals", "gods"]

const desktopEnvirenmentCheckbox = new CheckboxSelector(desktopEnvirenment);
const auditoryCheckbox = new CheckboxSelector(auditory);

const mainForm = document.getElementById('mainForm') as HTMLFormElement;

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const errorText = document.getElementById('errorText') as HTMLElement;
const notifyText = document.getElementById('notifyText') as HTMLElement;

const inputs: string[] = ["userName", "distroName", "philosofy", "basepackages", "license"];

const browserLocal: BrowserLocalInstance = BrowserTools.BrowserLocal.getInstance();
//#endregion

document.addEventListener('DOMContentLoaded', function (e) {
        desktopEnvirenmentCheckbox.Initialize();
        auditoryCheckbox.Initialize();
        browserLocal.Initializate();
});

function AddNotification (newNotification: string): void { //TODO move to class
    notifyText.textContent += `\n ${newNotification}`;
}

function ClearNotification (): void {
    notifyText.textContent = "";
}

function AddError (newError: string): void { //TODO move to class
    errorText.textContent += `\n ${newError}` 
}

function HaveError (): boolean {
    if (errorText.textContent != "") {
        return true
    }
    else{
        return false
    }
}

// TODO mv to initialize all init inputs
function CheckInputNotNull (inputs: string[]) {
    inputs.forEach(inputString => {
        const currentInput = document.getElementById(inputString) as HTMLInputElement; //this one
        const val = currentInput.value;

        if (val === "") {
            AddError(`${inputString} not be empty`)
        }
    });
}

function ClearErrorText () {
    errorText.textContent = "";
}

function GetUserDataFromForm (form: HTMLFormElement): UserDataInstance {
    const newUser: UserDataInstance = new BrowserTools.UserData(
        form.userName.value as string,
        form.distroName.value as string,
        form.linux.value as BrowserTools.BasedOn,
        auditoryCheckbox.GetAllCheckedCheckboxes(),
        form.philosofy.value as string,
        form.init.value as BrowserTools.InitSystem,
        desktopEnvirenmentCheckbox.GetAllCheckedCheckboxes(),
        form.basepackages.value as string,
        form.lts_rolling.value as BrowserTools.TypeOfUpdate,
        form.license.value as string,
        form.packageManager as BrowserTools.PakageManager);

        return newUser;
}

function TrySend () {
    ClearErrorText();

    CheckInputNotNull(inputs);

    if (!HaveError()) {
        const userData: BrowserTools.UserData = GetUserDataFromForm(mainForm);
        browserLocal.SaveUserData(userData);
        AddNotification(`${userData.userName} data saved!`)
        console.log(userData.userName);
        console.log(browserLocal.GetAllUserData()[0]?.userName);
    }

}

submitButton?.addEventListener('click', function (e) { 
    e.preventDefault();
    TrySend();
});