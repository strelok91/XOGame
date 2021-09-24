class XOEnvironment {
    constructor(game, messageHelper, board) {
        this.game = game
        this.messageHelper = messageHelper
        this.board = board
        this.gameStarted = false
    }

    async startNewGame(agentX, agentO) {

        console.log(this.gameStarted)

        if(this.gameStarted)
        {
            this.messageHelper.displayMessage("Another game is in progress")
            
            return
        }

        this.gameStarted = true

        this.game.clearStates()

        let agents = {}
        agents[this.game.X_CLASS] = agentX
        agents[this.game.CIRCLE_CLASS] = agentO

        this.messageHelper.hideMessage()

        while (!this.game.endGame) {
            this.#setBoardHoverClass()

            let nextAgent = agents[this.game.currentClass]
            let action = await nextAgent.getBestAction(this.game.state, this.game.possibleActions)

            this.game.moveActionIndex(action)
        }

        this.#showEndGameMessage()

        this.gameStarted = false
    }

    async train(agentX, agentO, numberOfGames, progressBar) {
        let agents = {}
        agents[this.game.X_CLASS] = agentX
        agents[this.game.CIRCLE_CLASS] = agentO

        for (let i = 0; i < numberOfGames; ++i) {
            setTimeout(async () => {
                progressBar.setProgress(i * 100.0 / numberOfGames)
    
                await this.#playTrainingGame(agents)
    
                this.#updateAgentsRewards(agentX, agentO)
            }, 0);
        }
        
        progressBar.setProgress(100)
    }

    async #playTrainingGame(agents) {
        this.game.clearStates()

        while (!this.game.endGame) {
            let nextAgent = agents[this.game.currentClass]
            let action = await nextAgent.getAction(this.game.state, this.game.possibleActions)

            this.game.moveActionIndex(action)
        }
    }

    #updateAgentsRewards(agentX, agentO) {
        if (this.game.checkWin(this.game.X_CLASS)) {
            agentX.updateReward(3)
            agentO.updateReward(-3)
        } else if (this.game.checkWin(this.game.CIRCLE_CLASS)) {
            agentX.updateReward(-3)
            agentO.updateReward(3)
        } else if (this.game.isDraw) {
            agentX.updateReward(1)
            agentO.updateReward(1)
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