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
            let action = await nextAgent.getAction(this.game.state, this.game.possibleActions)

            this.game.moveActionIndex(action)
        }

        this.#showEndGameMessage()
    }

    async train(numberOfGames) {
        let agents = {}
        agents[this.game.X_CLASS] = this.agentX
        agents[this.game.CIRCLE_CLASS] = this.agentO
        this.messageHelper.hideMessage()

        for (let i = 0; i < numberOfGames; ++i) {
            if (i % 100 == 0) {
                console.log(`Game: ${i + 1}`)
            }

            await this.#playTrainingGame(agents)
        }

        console.log(`Game: ${numberOfGames}`)
    }

    async #playTrainingGame(agents)
    {
        this.game.clearStates()

        while (!this.game.endGame) {
            let nextAgent = agents[this.game.currentClass]
            let action = await nextAgent.getAction(this.game.state, this.game.possibleActions)

            this.game.moveActionIndex(action)
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
        }

        if (this.game.checkWin(this.game.CIRCLE_CLASS)) {
            this.messageHelper.displayPlayerWon("O")
        }

        if (this.game.isDraw) {
            this.messageHelper.displayDraw()
        }
    }
}