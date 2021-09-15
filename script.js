let board = document.getElementById('board')
let restartButton = document.getElementById('restartButton')

let cellElements = document.querySelectorAll('[data-cell]')
let game = new XOGame(cellElements)

let winningMessageElement = document.getElementById('winningMessage')
let winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let messageHelper = new MessageHelper(winningMessageElement, winningMessageTextElement)

let environment = new XOEnvironment(
    game,
    new UserAgent(cellElements),
    new QAgent(),
    messageHelper,
    board
)

restartButton.addEventListener('click',  async _ => environment.startNewGame())

environment.startNewGame()