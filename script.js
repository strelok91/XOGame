const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'

const cellElements = document.querySelectorAll('[data-cell]')
const game = new XOGame(cellElements)
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')


startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  game.clearStates()

  cellElements.forEach(cell => {
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target

  game.placeMark(cell)
  console.log(game.state)
  console.log(game.possibleActions)
  if (game.endGame) {
    showEndGameMessage()
  } else {
    game.swapTurns()
    setBoardHoverClass()
  }
}

function showEndGameMessage() {
  if (game.checkWin(game.currentClass)) {
    winningMessageTextElement.innerText = `${game.currentClassName}'s Wins!`
  } else {
    winningMessageTextElement.innerText = 'Draw!'
  }

  winningMessageElement.classList.add('show')
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)

  board.classList.add(game.currentClass)
}