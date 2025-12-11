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


class BrowserLocal {
    private static instance: BrowserLocal;
    private allData: UserData[] = [];

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

    public RemoveUserData(index: number, savePermanent: boolean = false): void {
        console.log(this.allData);
        console.log(index);
        this.allData.splice(index, 1);
        console.log(this.allData);

        if (savePermanent) {
            this.SaveUserDataToLocalStorage();
        }
    }
    

    private SaveUserDataToLocalStorage(): void {
        localStorage.setItem("data", JSON.stringify(this.allData))
    }

    private GetUserDataFromLocalStorage(): void {
        const data = JSON.parse(localStorage.getItem("data") || "[]");
        this.allData = Array.isArray(data) ? data as UserData[] : [];
    }
}

export {
    UserData,
    BrowserLocal,
    BasedOn,
    InitSystem,
    TypeOfUpdate,
    PakageManager
}
// Or use export default BaseOn
// export default InitSystem
// export default TypeOfUpdate