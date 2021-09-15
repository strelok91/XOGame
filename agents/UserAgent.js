class UserAgent {

    constructor(cellElements) {
        this.cellElements = cellElements
    }

    restart() {
    }

    async getAction(state, possibleActions) {
        return this.#waitUserClick([...this.cellElements]
            .map((c, i) => { return { cell: c, index: i } })
            .filter(m => possibleActions.indexOf(m.index) >= 0))
    }

    #waitUserClick(elements) {
        return new Promise((resolve, _) => {

            let listener = event => {
                elements.forEach(m => m.cell.removeEventListener('click', listener));

                resolve([...this.cellElements].indexOf(event.target));
            };

            elements.forEach(m => m.cell.addEventListener('click', listener));
        });
    }
}