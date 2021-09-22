let board = document.getElementById('board')
let restartButton = document.getElementById('restartButton')

let cellElements = document.querySelectorAll('[data-cell]')
let game = new XOGame(cellElements)

let winningMessageElement = document.getElementById('winningMessage')
let winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let messageHelper = new MessageHelper(winningMessageElement, winningMessageTextElement)

let agentX = new QAgent()
let agentO = new QAgent()

let trainEnvironment = new XOEnvironment(
    game,
    agentX,
    // new UserAgent(cellElements),
    agentO,
    messageHelper,
    board
)

let environment = new XOEnvironment(
    game,
    agentX,
    new UserAgent(cellElements),
    // agentO,
    messageHelper,
    board
)



let runScenario = async () => {

    restartButton.addEventListener('click', async _ => environment.startNewGame())

    await trainEnvironment.train(50000)

    console.log("finished trainig")

    await environment.startNewGame()
}

runScenario()