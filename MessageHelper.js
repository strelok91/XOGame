class MessageHelper {

    constructor() {
        this.winningMessageElement = document.getElementById('winningMessage')
        this.winningMessageTextElement = document.querySelector('[data-winning-message-text]')
        
        this.winningMessageElement.addEventListener('click', () => this.hideMessage())
    }

    hideMessage() {
        this.winningMessageElement.classList.remove('show')
    }

    displayPlayerWon(player) {
        this.displayMessage(`${player}'s Wins!`)
    }

    displayDraw() {
        this.displayMessage(`Draw!`)    }

    displayMessage(message)
    {
        this.winningMessageTextElement.innerText = message

        this.winningMessageElement.classList.add('show')
    }
}