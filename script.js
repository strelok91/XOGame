let board = document.getElementById('board')
let restartButton = document.getElementById('restartButton')

let cellElements = document.querySelectorAll('[data-cell]')
let game = new XOGame(cellElements)

let winningMessageHelper = new MessageHelper()

let agentX = new QAgent()
let agentO = new QAgent()
let userAgent = new UserAgent(cellElements)

let progressBar = new ProgressBar()

let environment = new XOEnvironment(
    game,
    winningMessageHelper,
    board
)

let train = async (steps) => {
    await environment.train(agentX, agentO, steps, progressBar)
}

let resetAgents = async () => {
    agentX.resetAgent()
    agentO.resetAgent()
}

let playX = async () => {
    await environment.startNewGame(userAgent, agentO)
}

let playO = async () => {
    await environment.startNewGame(agentX, userAgent)
}