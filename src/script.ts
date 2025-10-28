console.log("Hello world");

const helloText = document.getElementById('hello-text') as HTMLElement;

const mainForm = document.getElementById('mainForm') as HTMLFormElement;

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const errorText = document.getElementById('errorText') as HTMLElement;

const inputs: string[] = ["userName", "distroName", "philosofy", "base packages", "license"];

function AddError (newError: string) {
    errorText.textContent += `\n ${newError}` 
}

// TODO mv to initialize all init inputs
function CheckInputNotNull (inputs: string[]) {
    inputs.forEach(inputString => {
        const currentInput = document.getElementById(inputString) as HTMLInputElement;
        const val = currentInput.value;

        if (val === "") {
            AddError(`${inputString} not be empty`)
        }
    });
}

function ClearErrorText () {
    errorText.textContent = "";
}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    ClearErrorText();

    CheckInputNotNull(inputs);

    AddError(mainForm.userName.value);

});

function checkAll () {


};