//#region ENUMS
var BasedOn;
(function (BasedOn) {
    BasedOn[BasedOn["RedHat"] = 0] = "RedHat";
    BasedOn[BasedOn["Arch"] = 1] = "Arch";
    BasedOn[BasedOn["Gentoo"] = 2] = "Gentoo";
    BasedOn[BasedOn["Debian"] = 3] = "Debian";
    BasedOn[BasedOn["Ubuntu"] = 4] = "Ubuntu";
    BasedOn[BasedOn["LFS"] = 5] = "LFS";
    BasedOn[BasedOn["Slackware"] = 6] = "Slackware";
})(BasedOn || (BasedOn = {}));
var InitSystem;
(function (InitSystem) {
    InitSystem[InitSystem["Systemd"] = 0] = "Systemd";
    InitSystem[InitSystem["runit"] = 1] = "runit";
    InitSystem[InitSystem["OpenRC"] = 2] = "OpenRC";
    InitSystem[InitSystem["Sinit"] = 3] = "Sinit";
    InitSystem[InitSystem["s6"] = 4] = "s6";
})(InitSystem || (InitSystem = {}));
var TypeOfUpdate;
(function (TypeOfUpdate) {
    TypeOfUpdate[TypeOfUpdate["LTS"] = 0] = "LTS";
    TypeOfUpdate[TypeOfUpdate["RollingRelese"] = 1] = "RollingRelese";
})(TypeOfUpdate || (TypeOfUpdate = {}));
var PakageManager;
(function (PakageManager) {
    PakageManager[PakageManager["pacman"] = 0] = "pacman";
    PakageManager[PakageManager["nix"] = 1] = "nix";
    PakageManager[PakageManager["dnf"] = 2] = "dnf";
    PakageManager[PakageManager["apt"] = 3] = "apt";
})(PakageManager || (PakageManager = {}));
//#endregion
class UserData {
    userName;
    dateBirth = new Date();
    distroName;
    basedOn;
    auditory;
    philosofy;
    initSystem;
    desktopEnvironment;
    basePackages;
    typeOfUpdate;
    license;
    packageManager;
    constructor(userName, distroName, basedOn, auditory, philosofy, initSystem, desktopEnvironment, basePackages, typeOfUpdate, license, packageManager) {
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
    }
    ;
    TrySetDatebirth(newDate) {
        if (newDate.getTime() >= Date.now()) {
            return false;
        }
        else {
            this.dateBirth = newDate;
            return true;
        }
    }
    ;
}
;
class BrowserLocal {
    static instance;
    allData = [];
    static getInstance() {
        if (!BrowserLocal.instance) {
            BrowserLocal.instance = new BrowserLocal();
        }
        return BrowserLocal.instance;
    }
    Initializate() {
        this.GetUserDataFromLocalStorage();
    }
    SaveUserData(userDataToSave, rewriteData = false) {
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
    GetAllUserData() {
        return this.allData;
    }
    ClearAllData() {
        this.allData = [];
        this.SaveUserDataToLocalStorage();
    }
    RemoveUserData(index, savePermanent = false) {
        console.log(this.allData);
        console.log(index);
        this.allData.splice(index, 1);
        console.log(this.allData);
        if (savePermanent) {
            this.SaveUserDataToLocalStorage();
        }
    }
    SaveUserDataToLocalStorage() {
        localStorage.setItem("data", JSON.stringify(this.allData));
    }
    GetUserDataFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem("data") || "[]");
        this.allData = Array.isArray(data) ? data : [];
    }
}
export { UserData, BrowserLocal, BasedOn, InitSystem, TypeOfUpdate, PakageManager };
// Or use export default BaseOn
// export default InitSystem
// export default TypeOfUpdate
//# sourceMappingURL=BrowserTools.js.map