class QAgent {

    constructor() {

    }

    restart() {
    }

    async getAction(state, possibleActions) {
        return possibleActions[Math.floor(Math.random() * possibleActions.length)]
    }
}