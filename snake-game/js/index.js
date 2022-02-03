const grid = document.querySelector(".grid")
const startBtn = document.querySelector("#start")
const scoreEl = document.querySelector("#score")

let squares = []
let currentSnake = [2,1,0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.5
const width = 10
let timerId = 0

// Resetting values
function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    scoreEl.textContent = score
    direction = 1
    intervalTime = 1000
    generateApples()
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}
/**
 * Create a div element in grid
 * append the div as a child of the grid
 * Style the child
 * Add the child to the square array
 */

function createGrid() {
    for (let i = 0; i < width*width; i++) {
        const gridSquare = document.createElement("div")
        grid.appendChild(gridSquare)
        gridSquare.classList.add("square")
        squares.push(gridSquare)
    }
}
createGrid()

// Styling grid 
for (let i = 0; i < squares.length; i++) {
    if (i % 2 === 0) {
        squares[i].classList.add("square-even")
    } else {
        squares[i].classList.add("square-odd")
    }
}


// Passing the snake to the grid
currentSnake.forEach(index => squares[index].classList.add('snake'))

/**
 * Remove last item from currentSnake array
 * Remove styling from the last element 
 * Add square in the direction  I am heading
 * Add styling to the newly added square
 * Also check that the snake has not hit the wal
 */
function move() {
    //If snake hits sides
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width- 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width <  0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains('snake') 
    ) 
    return clearInterval(timerId)
    
    const tail = currentSnake.pop()
    squares[tail].classList.remove('snake')
    const head = currentSnake.unshift(currentSnake[0] + direction)

    /**
     * If snake hits apple
     * Remove class of apple
     * Grow snake by adding class of snake to it
     * Grow snake array
     * Generate new apple
     * Add one to the score
     * Display score
     * Speed up the snake
     */
    if(squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple")
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        generateApples()
        score++
        scoreEl.textContent = score
        intervalTime *= speed
    }
    squares[currentSnake[0]].classList.add('snake')
}

move()


// Create apple
function generateApples() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake')) {
        squares[appleIndex].classList.add('apple')
    }
}
generateApples()

// Using keycodes to get what the user pressed
function control(e) {
    if (e.key=== 'ArrowRight') {
        direction = 1
    } else if(e.key === 'ArrowUp') {
        direction  = -width
    } else if(e.key === 'ArrowLeft') {
        direction = -1
    } else if(e.key === 'ArrowDown') {
        direction  = +width
    }
}

document.addEventListener('keydown', control)
startBtn.addEventListener('click', startGame)
