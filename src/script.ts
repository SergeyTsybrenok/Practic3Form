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

class BrowserLocal {
    private static instance: BrowserLocal;
    private allData: UserData[] = [];

    //save /load user data to localStorage
    public static getInstance(): BrowserLocal {
        if (!BrowserLocal.instance) {
            BrowserLocal.instance = new BrowserLocal();
        }
        return BrowserLocal.instance;
    }

    public Initializate(): void {
       this.GetUserDataFromLocalStorage();
    }
    
    public SaveUserData(userDataToSave:UserData, rewriteData:boolean = false): void {
        if (rewriteData) {
            for (let index = 0; index < this.allData.length; index++) {
                const currentUserData = this.allData[index];
                if (currentUserData?.userName === userDataToSave.userName) {
                    this.allData[index] = userDataToSave;
                }
            }
        }
        else {
            this.allData.push(userDataToSave);
        }
        
        this.SaveUserDataToLocalStorage();
    }

    public GetAllUserData(): UserData[] {
        return this.allData;
    }

    public ClearAllData(): void {
        this.allData = [];
        this.SaveUserDataToLocalStorage();
    }
    

    private SaveUserDataToLocalStorage(): void {
        localStorage.setItem("data", JSON.stringify(this.allData))
    }

    private GetUserDataFromLocalStorage(): void {
        const data = JSON.parse(localStorage.getItem("data") || "[]");
        this.allData = Array.isArray(data) ? data as UserData[] : [];
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
const notifyText = document.getElementById('notifyText') as HTMLElement;

const inputs: string[] = ["userName", "distroName", "philosofy", "basepackages", "license"];

const browserLocal: BrowserLocal = BrowserLocal.getInstance();
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

function GetUserDataFromForm (form: HTMLFormElement): UserData {
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
        const userData: UserData = GetUserDataFromForm(mainForm);
        browserLocal.SaveUserData(userData);
        AddNotification(`${userData.userName} data saved!`)
    }

}

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    TrySend();
});