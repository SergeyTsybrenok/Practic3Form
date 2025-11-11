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

//#region CLASS
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
            if (currentCheckbox === null) {
                console.error(`${currentId} can't be found`);
            }

            this.#checkboxs.push(currentCheckbox as HTMLInputElement);
        });
    }

    GetAllCheckedCheckboxes(): string {
        let checkedList: string = "";

        this.#checkboxs.forEach(checkbox => {
            if (checkbox.checked) {
                checkedList += `${checkbox.id}, `
            }
        });

        return checkedList;
    }
}
//#endregion

//#region COSNTANTS

const desktopEnvirenment = ["xfce4", "hyprland", "gnome", "dwm"]
const auditory = ["beginners", "advanced", "professionals", "gods"]

const desktopEnvirenmentCheckbox = new CheckboxSelector(desktopEnvirenment);
const auditoryCheckbox = new CheckboxSelector(auditory);

const mainForm = document.getElementById('mainForm') as HTMLFormElement;

const submitButton = document.getElementById('submitButton') as HTMLButtonElement;
const errorText = document.getElementById('errorText') as HTMLElement;

const inputs: string[] = ["userName", "distroName", "philosofy", "basepackages", "license"];
//#endregion

document.addEventListener('DOMContentLoaded', function (e) {
    desktopEnvirenmentCheckbox.Initialize();
    auditoryCheckbox.Initialize();
});

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

function SendForm (form: HTMLFormElement): UserData {
    const newUser: UserData = new UserData(
        form.userName.value as string,
        form.distroName.value as string,
        form.linux.value as BasedOn,
        auditoryCheckbox.GetAllCheckedCheckboxes(),
        form.philosofy.value as string,
        form.init.value as InitSystem,
        desktopEnvirenmentCheckbox.GetAllCheckedCheckboxes(),
        form.basepackages.value as string,
        form.lts_rolling.value as TypeOfUpdate,
        form.license.value as string,
        form.packageManager as PakageManager);

        return newUser;
}

function TrySend () {
    ClearErrorText();

    CheckInputNotNull(inputs);

    if (!HaveError()) {
        const user: UserData = SendForm(mainForm);
        AddError(user.userName);
        AddError(user.distroName);
        AddError(user.auditory);
        AddError(user.basedOn.toString());
        AddError(user.initSystem.toString());
    }

}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    TrySend();
});