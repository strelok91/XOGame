const board = document.getElementById('board')
const restartButton = document.getElementById('restartButton')

const cellElements = document.querySelectorAll('[data-cell]')
const game = new XOGame(cellElements)

const winningMessageElement = document.getElementById('winningMessage')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
const messageHelper = new MessageHelper(winningMessageElement, winningMessageTextElement)

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  game.clearStates()

  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })

  setBoardHoverClass()

  messageHelper.hideMessage()
}

function handleClick(e) {
  const cell = e.target

  game.moveCell(cell)
  setBoardHoverClass()
  
  if (game.endGame) {
    showEndGameMessage()
  }
}

function showEndGameMessage() {
  if (game.checkWin(game.X_CLASS)) {
    messageHelper.displayPlayerWon("X")
  }

  if (game.checkWin(game.CIRCLE_CLASS)) {
    messageHelper.displayPlayerWon("O")
  }

  if (game.isDraw) {
    messageHelper.displayDraw()
  }
}

function setBoardHoverClass() {
  board.classList.remove(game.X_CLASS)
  board.classList.remove(game.CIRCLE_CLASS)

  board.classList.add(game.currentClass)
}