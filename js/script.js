const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('#score');
const level = document.querySelector('#level');
const modal = document.querySelector('#modal');
const modalScore = document.querySelector('#modal-score');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');
const modalText = document.querySelector('#modal-text')
const instr = document.querySelector('#instuctions')

let gameLevel = 1;
level.innerText = gameLevel;

//game audio
const gameSound = new Audio('/assets/theme.mp3');
const eatSound = new Audio('/assets/eat.mp3');
const lvlSound = new Audio('/assets/lvl.mp3');
const gameOverSound = new Audio('/assets/gameover.mp3');
const btnclick = new Audio('/assets/btn.mp3');

canvas.width = 360;
canvas.height = 480;

//class to add segments to snake body
class SnakeSegment {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

//control functions for for mobile
function moveUp() {
	if (game.yVelocity === 1) {
		return;
	}
	game.yVelocity = -1;
	game.xVelocity = 0;
	btnclick.play();
}

function moveDown() {
	if (game.yVelocity === -1) {
		return;
	}
	game.yVelocity = 1;
	game.xVelocity = 0;
	btnclick.play();
}

function moveLeft() {
	if (game.xVelocity === 1) {
		return;
	}
	game.yVelocity = 0;
	game.xVelocity = -1;
	btnclick.play();
}

function moveRight() {
	if (game.xVelocity === -1) {
		return;
	}
	game.yVelocity = 0;
	game.xVelocity = 1;
	btnclick.play();
}

const game = {
	gameScore: 0,
	//speed key will determine the speed of the game and the refresh rate of the animation
	speed: 4,
	//blockSize will determine the size of our blocks along the game grid
	blockSize: 18,
	//gameGridArea will determine the length the game window along the X axis in block size for object placement
	//gameGridArea will determine the cell size that our snake block
	gameGridArea: 20,
	//this will be the initial value for the snake head X spawn location
	headX: 10,
	//this will be the initial value for the snake head Y spawn location
	headY: 10,
	//snakeBody will hold the segments added to the snake head
	snakeBody: [],
	tailLength: 0,

	fruitX: 5,
	fruitY: 5,
	fruitRandomizerX: 17,
	fruitRandomizerY: 23,

	xVelocity: 0,
	yVelocity: 0,

	gameOver: false,
	drawSnake() {
		ctx.fillStyle = '#308AA7';
		for (let i = 0; i < game.snakeBody.length; i++) {
			let part = game.snakeBody[i];
			ctx.fillRect(
				part.x * game.gameGridArea,
				part.y * game.gameGridArea,
				game.blockSize,
				game.blockSize
			);
		}
		//snake body
		game.snakeBody.push(new SnakeSegment(game.headX, game.headY));
		if (game.snakeBody.length > game.tailLength) {
			game.snakeBody.shift();
		}
		//snake head
		ctx.fillStyle = '#A7304E';
		ctx.strokeStyle = 'white';
		ctx.fillRect(
			game.headX * game.gameGridArea,
			game.headY * game.gameGridArea,
			game.blockSize,
			game.blockSize
		);
	},
	changeSnakePosition() {
		game.headX += game.xVelocity;
		game.headY += game.yVelocity;
	},
	drawFruit() {
		//add array of fruit colors later
		ctx.fillStyle = 'orange';
		// let fruitColors = ['#ff0000','#ffa500','#ffff00','#008000','#0000ff','#4b0082','#ee82ee']
		// for(let i = 0; i < fruitColors.length; i++){
		// 	ctx.fillStyle = fruitColors[i]
		// }
		ctx.fillRect(
			game.fruitX * game.gameGridArea,
			game.fruitY * game.gameGridArea,
			game.blockSize,
			game.blockSize
		);
	},
	isGameOver() {
		//walls lose case
		if (game.headX < 0 || game.headX > game.fruitRandomizerX) {
			game.gameOver = true;
		}
		if (game.headY < 0 || game.headY > game.fruitRandomizerY) {
			game.gameOver = true;
		}
		//body touch lose case
		for (let i = 0; i < game.snakeBody.length; i++) {
			let part = game.snakeBody[i];
			if (part.x === game.headX && part.y === game.headY) {
				game.gameOver = true;
				break;
			}
		}	
		
		//add a game over screen
	},
	checkFruitCollision() {
		if (game.fruitX === game.headX && game.fruitY === game.headY) {
			game.fruitX = Math.floor(Math.random() * game.fruitRandomizerX);
			game.fruitY = Math.floor(Math.random() * game.fruitRandomizerY);
			game.tailLength++;
			game.gameScore += 100;
			score.innerText = game.gameScore;
			modalScore.innerText = game.gameScore;

			eatSound.play();

			if (game.gameScore === 500) {
				game.speed += 2;
				lvlSound.play();
				gameLevel++;
				level.innerText = gameLevel;
			}
			if (game.gameScore === 1000) {
				game.speed += 3;
				lvlSound.play();
				gameLevel++;
				level.innerText = gameLevel;
			}
			if (game.gameScore === 1500) {
				game.speed += 4;
				lvlSound.play();
				gameLevel++;
				level.innerText = gameLevel;
			}
			if (game.gameScore === 2000) {
				game.speed += 5;
				lvlSound.play();
				gameLevel++;
				level.innerText = gameLevel;
			}
			if (game.gameScore === 2500) {
				game.speed += 5;
				lvlSound.play();
				gameLevel++;
				level.innerText = gameLevel;
			}
			if (game.gameScore === 3000) {
				game.speed += 15;
				lvlSound.play();
				level.innerText = 'Final Level';
			}
		}
	},
	//add rock collision method
	moveSnake(event) {
		if (event.key === 'ArrowUp' || event.key === 'w') {
			//the nested conditional if statement prevents our snake from turning in on itself
			if (game.yVelocity === 1) {
				return;
			}
			game.yVelocity = -1;
			game.xVelocity = 0;
		}
		if (event.key === 'ArrowDown' || event.key === 's') {
			if (game.yVelocity === -1) {
				return;
			}
			game.yVelocity = 1;
			game.xVelocity = 0;
		}
		if (event.key === 'ArrowLeft' || event.key === 'a') {
			if (game.xVelocity === 1) {
				return;
			}
			game.yVelocity = 0;
			game.xVelocity = -1;
		}
		if (event.key === 'ArrowRight' || event.key === 'd') {
			if (game.xVelocity === -1) {
				return;
			}
			game.yVelocity = 0;
			game.xVelocity = 1;
		}
	},
	init() {
		game.gameScore = 0;
		game.speed = 5;
		game.blockSize = 18;
		game.gameGridArea = 20;
		game.headX = 10;
		game.headY = 10;
		game.snakeBody = [];
		game.tailLength = 0;
		game.fruitX = 5;
		game.fruitY = 5;
		game.fruitRandomizerX = 17;
		game.fruitRandomizerY = 23;
		game.xVelocity = 0;
		game.yVelocity = 0;

		score.innerText = 0;
		modalScore.innerText = 0;
		gameLevel = 1
		level.innerText = gameLevel;
		game.runGame()
	},
	runGame() {
		gameSound.play();
		game.changeSnakePosition();
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.isGameOver();
		//using a truthy statement to end the loop
		if (game.gameOver) {
			gameOverSound.play();
			modal.classList.toggle('hide');
			modalText.classList.remove('hide')
			restartBtn.classList.remove('hide');
			startBtn.classList.add('hide')
			return;
		}
		//the only win state
		if (game.gameScore === 3100) {
			modal.classList.remove('hide')
			modalText.innerText = 'You Win!'
			modalText.classList.remove('hide')
			return;
		}
		modal.classList.add('hide');
		game.checkFruitCollision();
		game.drawSnake();
		game.drawFruit();
		setTimeout(game.runGame, 1000 / game.speed);
	},
};

document.body.addEventListener('keydown', game.moveSnake);
