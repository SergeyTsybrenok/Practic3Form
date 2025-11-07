//#region ENUMS
enum BasedOn {
    RedHat,
    Arch,
    Gentoo,
    Debian,
    Ubuntu,
    LFS,
    Slackware
}

enum InitSystem {
    Systemd,
    runit,
    OpenRC,
    Sinit,
    s6
}

enum TypeOfUpdate {
    LTS,
    RollingRelese
}

enum PakageManager {
    pacman,
    nix,
    dnf,
    apt
}
//#endregion

//#region COSNTANTS

const desktopEnvirenment = ["xfce4", "hyprland", "gnome", "dwm"]

const auditory = ["beginners", "advanced", "professionals", "gods"]

const auditoryCheckbox = new CheckboxSelector(auditory);

const mainForm = document.getElementById('mainForm') as HTMLFormElement;

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const errorText = document.getElementById('errorText') as HTMLElement;

const inputs: string[] = ["userName", "distroName", "philosofy", "base packages", "license"];
//#endregion

class UserData {
    userName: string;
    dateBirth: Date = new Date();

    distroName: string;
    basedOn: BasedOn;
    auditory: string;
    philosofy: string;
    initSystem: InitSystem;
    desktopEnvironment: string;
    basePackages: string;
    typeOfUpdate: TypeOfUpdate;
    license: string;
    packageManager: PakageManager;


    constructor(
        userName: string,
        distroName: string,
        basedOn: BasedOn,
        auditory: string,
        philosofy: string,
        initSystem: InitSystem,
        desktopEnvironment: string,
        basePackages: string,
        typeOfUpdate: TypeOfUpdate,
        license: string,
        packageManager: PakageManager)
        {
        this.userName = userName;
        this.distroName = distroName;
        this.basedOn = basedOn;
        this.auditory = auditory;
        this.philosofy = philosofy;
        this.initSystem = initSystem;
        this.desktopEnvironment = desktopEnvironment;
        this.basePackages = basePackages;
        this.typeOfUpdate = typeOfUpdate;
        this.license = license;
        this.packageManager = packageManager;
    };

    TrySetDatebirth(newDate: Date) {
        if (newDate.getTime() >= Date.now()) {
            return false
        }
        else {
            this.dateBirth = newDate;
            return true
        }
    };
};

class CheckboxSelector {
    idCheckbox: string[] = [];
    #checkboxs: HTMLInputElement[] = [];

    constructor(id: string[]) {
        this.idCheckbox = id;
    }

    Initialize() {
        this.idCheckbox.forEach(currentId => {
            const currentCheckbox = document.getElementById(currentId);

            this.#checkboxs.push(currentCheckbox as HTMLInputElement);
        });
    }

    GetAllCheckedCheckboxes(): string {
        let checkedList: string = "";

        this.#checkboxs.forEach(checkbox => {
            const checkbox = document.getElementById(checkbox) as HTMLInputElement;
            if (checkbox.checked) {
                checkedList += `${checkbox}, `
            }
        });

        return checkedList;
    }
}

document.addEventListener('DOMContentLoaded', function (e) {
    auditoryCheckbox.Initialize();
    desktop //todo
    
});
// function methodName (arguments) {
//     // body
// };j

function AddError (newError: string) {
    errorText.textContent += `\n ${newError}` 
}

function HaveError () {
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

function SendForm (form: HTMLFormElement) {
    const newUser: UserData = new UserData(
        form.userName.value,
        form.distroName.value,
        form.linux.value as BasedOn,
        form.au, //todo
        form.philosofy.value,
        form.initSystem as InitSystem,
        form.basePackage,
        form.typeOfUpdate as TypeOfUpdate,
        form.license,
        form.packageManager as PakageManager);
}

function TrySend () {
    ClearErrorText();

    CheckInputNotNull(inputs);

    if (!HaveError()) {
        // SendForm(mainForm);
    }

    AddError(mainForm.userName.value);
    AddError(mainForm.distroName.value);
    AddError(mainForm.linux.value);
    AddError(mainForm.init.value);
    AddError(mainForm.lts_rolling.value);
    AddError(mainForm.manager.value);
}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    TrySend();
});