class MessageHelper {

    constructor(winningMessageElement, winningMessageTextElement) {
        this.winningMessageElement = winningMessageElement
        this.winningMessageTextElement = winningMessageTextElement
    }

    hideMessage() {
        winningMessageElement.classList.remove('show')
    }

    displayPlayerWon(player) {
        winningMessageTextElement.innerText = `${player}'s Wins!`

        winningMessageElement.classList.add('show')
    }

    displayDraw() {
        winningMessageTextElement.innerText = `Draw!`

        winningMessageElement.classList.add('show')
    }
}