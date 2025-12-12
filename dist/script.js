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
    const currentDate = new Date();
    return currentDate === date;
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
    const newUser = new BrowserTools.UserData(form.userName.value, form.distroName.value, form.linux.value, auditoryCheckbox.GetAllCheckedCheckboxes(), form.philosofy.value, form.init.value, desktopEnvirenmentCheckbox.GetAllCheckedCheckboxes(), form.basepackages.value, form.lts_rolling.value, form.license.value, form.packageManager);
    return newUser;
}
function TrySend() {
    ClearErrorText();
    CheckInputNotNull(inputs);
    const great = CheckDate(mainForm.userDateBirth);
    console.log(great);
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