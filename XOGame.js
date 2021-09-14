class XOGame {
    WINNING_COMBINATIONS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    X_CLASS = 'x'
    CIRCLE_CLASS = 'circle'

    constructor(cellElements) {
        this.cellElements = cellElements
        this.circleTurn = false
        console.log(cellElements)
    }

    get currentClass() {
        return this.isCircleTurn() ? CIRCLE_CLASS : X_CLASS
    }

    get currentClassName() {
        return this.isCircleTurn() ? "O" : "X"
    }

    get endGame() {
        return this.isDraw || this.checkWin(this.X_CLASS) || this.checkWin(this.CIRCLE_CLASS)
    }

    get isDraw() {
        return [...this.cellElements].every(cell => {
            return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
        })
    }

    get state() {
        return [...this.cellElements].map((c, i) => {
            let digit = 0
            if (c.classList.contains(this.X_CLASS)) {
                digit = 1
            } else if (c.classList.contains(this.CIRCLE_CLASS)) {
                digit = 2
            }

            return Math.pow(3, i) * digit
        }).reduce((a, b) => a + b, 0)
    }

    get possibleActions() {
        return [...this.cellElements]
            .map((c, i) => { return { cell: c, index: i } })
            .filter(m => !m.cell.classList.contains(this.X_CLASS) && !m.cell.classList.contains(this.CIRCLE_CLASS))
            .map(m => m.index)
    }

    setState(state) {
        this.clearStates()

        let digits = this.toBase(state, 3);

        [...this.cellElements].map((c, i) => {
            let digit = digits[digits.length - i - 1]

            if (digit == 1) {
                c.classList.add(this.X_CLASS)
            } else if (digit == 2) {
                c.classList.add(this.CIRCLE_CLASS)
            }
        })

        this.adjustCircleTurn()
    }

    adjustCircleTurn() {
        let xCellsCount = [...this.cellElements].filter(c => c.classList.contains(this.X_CLASS))
        let oCellsCount = [...this.cellElements].filter(c => c.classList.contains(this.CIRCLE_CLASS_CLASS))

        if (xCellsCount <= oCellsCount) {
            this.circleTurn = false
        } else {
            this.circleTurn = true
        }
    }

    isCircleTurn() {
        return this.circleTurn
    }

    placeMark(cell) {
        cell.classList.add(this.currentClass)
    }

    swapTurns() {
        this.circleTurn = !this.circleTurn
    }

    checkWin(currentClass) {
        return this.WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return this.cellElements[index].classList.contains(currentClass)
            })
        })
    }

    clearStates() {
        cellElements.forEach(cell => {
            cell.classList.remove(X_CLASS)
            cell.classList.remove(CIRCLE_CLASS)
        })
        this.adjustCircleTurn()
    }

    toBase(num, radix = 10) {
        var keys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        if (!(radix >= 2 && radix <= keys.length)) throw new RangeError("toBase() radix argument must be between 2 and " + keys.length)

        if (num < 0) var isNegative = true
        if (isNaN(num = Math.abs(+num))) return NaN

        let output = [];
        do {
            let index = num % radix;
            output.unshift(keys[index]);
            num = Math.trunc(num / radix);
        } while (num != 0);
        if (isNegative) output.unshift('-')
        return output
    }
}