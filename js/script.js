let grid = document.querySelector('.grid');
let popup = document.querySelector('.popup')
let playAgain = document.querySelector('.playAgain')
let scoreDisplay = document.querySelector('.scoreDisplay')
let left = document.querySelector('.left')
let down = document.querySelector('.down')
let right = document.querySelector('.right')
let up = document.querySelector('.up')
let width = 20;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;

document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener('keyup', control);
    createBoard();
    startGame();
    playAgain.addEventListener('click', replay)
})
//function creates the board
function createBoard() {
    popup.style.display = 'none';
    for(let i = 0; i < 200; i++) {
        let div = document.createElement('div');
        grid.appendChild(div)
    }
}

function startGame() {
    let squares = document.querySelectorAll('.grid div');
    randomApple(squares);
}