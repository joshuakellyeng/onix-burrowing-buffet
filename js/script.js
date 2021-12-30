const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('#score');

canvas.width = 360;
canvas.height = 480;

//class to add segments to snake body
class SnakeSegment {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

const game = {
	gameScore: 0,
	//speed key will determine the speed of the game and the refresh rate of the animation
	speed: 4,
	//blockSize will determine the size of our blocks along the game grid
	blockSize: 18,
	//gameWindowLengthX will determine the length the game window along the X axis in block size for object placement

	gameWindowLengthX: 20,
	//gameWindowLengthY will determine the length the game window along the Y axis in block size for object placement
	gameWindowLengthY: 20,
	//this will be the initial value for the snake head X spawn location
	headX: 10,
	//this will be the initial value for the snake head Y spawn location
	headY: 10,

	snakeBody: [],
	tailLength: 2,

	fruitX: 5,
	fruitY: 5,
	fruitRandomizerX: 17,
	fruitRandomizerY: 23,

	xVelocity: 0,
	yVelocity: 0,
	drawSnake() {

		ctx.fillStyle = '#308AA7';
		for (let i = 0; i < game.snakeBody.length; i++) {
			let part = game.snakeBody[i];
			ctx.fillRect(
				part.x * game.gameWindowLengthX,
				part.y * game.gameWindowLengthY,
				game.blockSize,
				game.blockSize
			);
		}
		//snake body
		game.snakeBody.push(new SnakeSegment(game.headX, game.headY))
		if(game.snakeBody.length > game.tailLength) {
			game.snakeBody.shift()
		}
		//snake head
		ctx.fillStyle = '#A7304E';
		ctx.strokeStyle = 'white';
		ctx.fillRect(
			game.headX * game.gameWindowLengthX,
			game.headY * game.gameWindowLengthY,
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
			game.fruitX * game.gameWindowLengthX,
			game.fruitY * game.gameWindowLengthY,
			game.blockSize,
			game.blockSize
		);
	},
	checkFruitCollision() {
		if (game.fruitX === game.headX && game.fruitY === game.headY) {
			game.fruitX = Math.floor(Math.random() * game.fruitRandomizerX);
			game.fruitY = Math.floor(Math.random() * game.fruitRandomizerY);
			game.tailLength++;
			game.gameScore += 100;
			score.innerText = game.gameScore;
			console.log(`the fruit is at x:${game.fruitX}, y:${game.fruitY}`)
		}
	},
	//add rock collision method
	moveSnake(event) {
		if (event.key === 'ArrowUp') {
			//the nested conditional if statement prevents our snake from turning in on itself
			if (game.yVelocity === 1) {
				return;
			}
			game.yVelocity = -1;
			game.xVelocity = 0;
		}
		if (event.key === 'ArrowDown') {
			if (game.yVelocity === -1) {
				return;
			}
			game.yVelocity = 1;
			game.xVelocity = 0;
		}
		if (event.key === 'ArrowLeft') {
			if (game.xVelocity === 1) {
				return;
			}
			game.yVelocity = 0;
			game.xVelocity = -1;
		}
		if (event.key === 'ArrowRight') {
			if (game.xVelocity === -1) {
				return;
			}
			game.yVelocity = 0;
			game.xVelocity = 1;
		}
	},
	runGame() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.changeSnakePosition();
		game.checkFruitCollision();
		game.drawSnake();
		game.drawFruit();
		setTimeout(game.runGame, 1000 / game.speed);
		console.log(game.headX,game.headY)
	},
};

document.body.addEventListener('keydown', game.moveSnake);
game.runGame();
