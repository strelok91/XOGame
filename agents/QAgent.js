class QAgent {

    constructor() {
        this.actionsHistory = []
        this.stateActionValue = {}
    }

    resetAgent() {
        this.actionsHistory = []
        this.stateActionValue = {}
    }

    async getAction(state, possibleActions) {

        let actionValues = this.#getActionValues(state, possibleActions)
        let action = this.#getMostProbableAction(actionValues)

        this.#addHistory(state, action)

        return await Promise.resolve(action)
    }

    async getBestAction(state, possibleActions) {

        let actionValues = this.#getActionValues(state, possibleActions)

        let actionIndex = Object.values(actionValues).reduce((a, l, i) => a.v >= l ? a : { i: i, v: l }, { i: -1, v: 0 }).i
        let action = Object.keys(actionValues)[actionIndex]

        return await Promise.resolve(action)
    }

    async updateReward(reward) {

        for (let i = 0; i < this.actionsHistory.length; ++i) {
            let t = this.actionsHistory[i]

            this.#updateStateActionReward(t.state, t.action, reward * (i + 1) / this.actionsHistory.length)
        }

        this.actionsHistory = []
    }

    #updateStateActionReward(state, action, reward) {
        let actionValues = this.stateActionValue[state]

        if (reward > 0) {
            actionValues[action] += reward
        } else {
            for (let i in actionValues) {
                if (i != action) {
                    actionValues[i] -= reward
                }
            }
        }
    }

    #addHistory(state, action) {
        this.actionsHistory.push({ state, action })
    }

    #getActionValues(state, possibleActions) {
        if (!(state in this.stateActionValue)) {
            this.stateActionValue[state] = possibleActions.reduce((a, x) => ({ ...a, [x]: 1 }), {})
        }

        return this.stateActionValue[state]
    }

    #getMostProbableAction(actionValues) {

        let sumProbabilites = Object.values(actionValues).reduce((a, v) => a + v, 0)
        let rand = Math.random()
        let actionProbability = Math.floor(rand * sumProbabilites)

        for (let i in actionValues) {
            let p = actionValues[i]

            if (actionProbability < p) {
                return i
            } else {
                actionProbability -= p
            }
        }

        return Object.keys(actionValues)[0]
    }

    #gaussianRand() {
        let rand = 0;
        let count = 10;

        for (var i = 0; i < count; i += 1) {
            rand += Math.random();
        }

        return rand / count;
    }
}