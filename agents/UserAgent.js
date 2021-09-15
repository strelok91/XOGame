class UserAgent {

    constructor(cellElements) {
        this.cellElements = cellElements
    }

    restart() {
        console.log("restart")
    }

    async getAction(state, possibleActions) {
        return this.#waitUserClick([...this.cellElements]
            .filter((_, i) => possibleActions.indexOf(i) >= 0))
    }

    #waitUserClick(elements) {
        console.log(elements)
        return new Promise((resolve, _) => {

            let listener = event => {
                elements.forEach(c => c.removeEventListener('click', listener));

                resolve(event.target);
            };

            elements.forEach(c => c.addEventListener('click', listener));
        });
    }
}