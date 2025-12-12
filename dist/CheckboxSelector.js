export default class CheckboxSelector {
    idCheckbox = [];
    #checkboxs = [];
    constructor(id) {
        this.idCheckbox = id;
    }
    Initialize() {
        this.idCheckbox.forEach(currentId => {
            const currentCheckbox = document.getElementById(currentId);
            if (currentCheckbox === null) {
                console.error(`${currentId} can't be found`);
            }
            this.#checkboxs.push(currentCheckbox);
        });
    }
    GetAllCheckedCheckboxes() {
        let checkedList = "";
        this.#checkboxs.forEach(checkbox => {
            if (checkbox.checked) {
                checkedList += `${checkbox.id}, `;
            }
        });
        return checkedList;
    }
}
//# sourceMappingURL=CheckboxSelector.js.map