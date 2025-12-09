export default class CheckboxSelector {
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