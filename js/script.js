const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('#score');

canvas.width = 360;
canvas.height = 480;

const game = {
	//speed key will determine the speed of the game and the refresh rate of the animation
	speed: 6,

	//blockSize will determine the size of our blocks along the game grid
	blockSize: 18,
	//gameWindowLengthX will determine the length the game window along the X axis in block size for object placement
	gameWindowLengthX: 18,
	//gameWindowLengthY will determine the length the game window along the Y axis in block size for object placement
	gameWindowLengthY: 24,

	//this will be the initial value for the snake head X spawn location
	headX: 10,
	//this will be the initial value for the snake head Y spawn location
	headY: 10,

	fruitX: 5,
	fruitY: 5,
	xVelocity: 0,
	yVelocity: 0,
	drawSnake() {
		ctx.fillStyle = 'red';
		ctx.strokeStyle = 'white';
		ctx.fillRect(
			game.headX * game.gameWindowLengthX,
			game.headY * game.gameWindowLengthY,
			game.blockSize,
			game.blockSize
		);
	},
	moveSnake(event) {
		if (event.key === 'ArrowUp') {
			game.yVelocity = -1;
		}
	},
	runGame() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		game.drawSnake();
		setTimeout(game.runGame, 1000 / game.speed);
	},
};

game.runGame();
document.body.addEventListener('keydown', game.moveSnake);
