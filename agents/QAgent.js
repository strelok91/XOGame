class QAgent {

    constructor() {
        this.actionsHistory = []
        this.stateActionValue = {}
    }

    async getAction(state, possibleActions) {
        let action = possibleActions[Math.floor(Math.random() * possibleActions.length)]

        this.actionsHistory.push({ state, action })

        console.log(this.#getActionValues(state, possibleActions))
        console.log(this.stateActionValue)

        return await Promise.resolve(action)
    }

    #getActionValues(state, possibleActions) {
        if (!(state  in this.stateActionValue)) {
            console.log(possibleActions)
            this.stateActionValue[state] = possibleActions.reduce((a,x) => ({...a, [x]: 1}), {})
        }

        return this.stateActionValue[state]
    }
}