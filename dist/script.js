import * as BrowserTools from "./BrowserTools.js";
import CheckboxSelector from "./CheckboxSelector.js";
//#region COSNTANTS
const desktopEnvirenment = ["xfce4", "hyprland", "gnome", "dwm"];
const auditory = ["beginners", "advanced", "professionals", "gods"];
const desktopEnvirenmentCheckbox = new CheckboxSelector(desktopEnvirenment);
const auditoryCheckbox = new CheckboxSelector(auditory);
const mainForm = document.getElementById('mainForm');
const submitButton = document.getElementById('submitButton');
const errorText = document.getElementById('errorText');
const notifyText = document.getElementById('notifyText');
const inputs = ["userName", "distroName", "philosofy", "basepackages", "license"];
const browserLocal = BrowserTools.BrowserLocal.getInstance();
//#endregion
document.addEventListener('DOMContentLoaded', function (e) {
    desktopEnvirenmentCheckbox.Initialize();
    auditoryCheckbox.Initialize();
    browserLocal.Initializate();
});
function AddNotification(newNotification) {
    notifyText.textContent += `\n ${newNotification}`;
}
function ClearNotification() {
    notifyText.textContent = "";
}
function AddError(newError) {
    errorText.textContent += `\n ${newError}`;
}
function CheckDate(date) {
    console.log("Date: " + date);
    if (date === null || date == undefined || date === "") {
        AddError("Please write you date of birth");
        return;
    }
    const currentDate = new Date();
    try {
        const userDate = new Date(date);
        if (userDate.getTime() >= currentDate.getTime()) {
            AddError("You can't register without being born first.");
        }
    }
    catch (error) {
        AddError(error);
    }
}
function CheckName(name) {
    const clearName = name.trim();
    if (clearName[0]?.toUpperCase() !== clearName[0]) {
        AddError("The first letter of the name must begin with a capital letter!");
    }
}
function HaveError() {
    if (errorText.textContent != "") {
        return true;
    }
    else {
        return false;
    }
}
// TODO mv to initialize all init inputs
function CheckInputNotNull(inputs) {
    inputs.forEach(inputString => {
        const currentInput = document.getElementById(inputString); //this one
        const val = currentInput.value;
        if (val === "") {
            AddError(`${inputString} not be empty`);
        }
    });
}
function ClearErrorText() {
    errorText.textContent = "";
}
function GetUserDataFromForm(form) {
    const newUser = new BrowserTools.UserData(form.userName.value.trim(), form.distroName.value.trim(), form.linux.value, auditoryCheckbox.GetAllCheckedCheckboxes(), form.philosofy.value.trim(), form.init.value, desktopEnvirenmentCheckbox.GetAllCheckedCheckboxes(), form.basepackages.value.trim(), form.lts_rolling.value, form.license.value.trim(), form.manager.value);
    return newUser;
}
function TrySend() {
    ClearErrorText();
    CheckInputNotNull(inputs);
    CheckDate(mainForm.userDateBirth.value);
    CheckName(mainForm.userName.value);
    if (!HaveError()) {
        const userData = GetUserDataFromForm(mainForm);
        browserLocal.SaveUserData(userData);
        AddNotification(`${userData.userName} data saved!`);
        console.log(userData.userName);
        console.log(browserLocal.GetAllUserData()[0]?.userName);
    }
}
submitButton?.addEventListener('click', function (e) {
    e.preventDefault();
    TrySend();
});
//# sourceMappingURL=script.js.map