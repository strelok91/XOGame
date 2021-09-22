class XOEnvironment {
    constructor(game, agentX, agentO, messageHelper, board) {
        this.game = game
        this.agentX = agentX
        this.agentO = agentO
        this.messageHelper = messageHelper
        this.board = board
    }

    async startNewGame() {
        this.game.clearStates()

        let agents = {}
        agents[this.game.X_CLASS] = this.agentX
        agents[this.game.CIRCLE_CLASS] = this.agentO

        this.messageHelper.hideMessage()

        while (!this.game.endGame) {
            this.#setBoardHoverClass()

            let nextAgent = agents[this.game.currentClass]
            let action = await nextAgent.getBestAction(this.game.state, this.game.possibleActions)

            this.game.moveActionIndex(action)
        }

        this.#showEndGameMessage()
    }

    async train(numberOfGames) {
        let agents = {}
        agents[this.game.X_CLASS] = this.agentX
        agents[this.game.CIRCLE_CLASS] = this.agentO

        for (let i = 0; i < numberOfGames; ++i) {
            if (i % 1000 == 0) {
                console.log(`Game: ${i + 1}`)
            }

            await this.#playTrainingGame(agents)

            this.#updateAgentsRewards()
        }

        console.log(`Game: ${numberOfGames}`)
    }

    async #playTrainingGame(agents) {
        this.game.clearStates()

        while (!this.game.endGame) {
            let nextAgent = agents[this.game.currentClass]
            let action = await nextAgent.getAction(this.game.state, this.game.possibleActions)

            this.game.moveActionIndex(action)
        }
    }

    #updateAgentsRewards() {
        if (this.game.checkWin(this.game.X_CLASS)) {
            this.agentX.updateReward(3)
            this.agentO.updateReward(-3)
        } else if (this.game.checkWin(this.game.CIRCLE_CLASS)) {
            this.agentX.updateReward(-3)
            this.agentO.updateReward(3)
        } else if (this.game.isDraw) {
            this.agentX.updateReward(1)
            this.agentO.updateReward(1)
        }
    }

    #setBoardHoverClass() {
        this.board.classList.remove(this.game.X_CLASS)
        this.board.classList.remove(this.game.CIRCLE_CLASS)

        this.board.classList.add(this.game.currentClass)
    }

    #showEndGameMessage() {
        if (this.game.checkWin(this.game.X_CLASS)) {
            this.messageHelper.displayPlayerWon("X")
        } else if (this.game.checkWin(this.game.CIRCLE_CLASS)) {
            this.messageHelper.displayPlayerWon("O")
        } else if (this.game.isDraw) {
            this.messageHelper.displayDraw()
        }
    }
}