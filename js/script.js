const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const score = document.querySelector('#score');

canvas.width = 360;
canvas.height = 480;

let speed = 7;
let gridSize = 18
let gridCountX = 18;
let gridCountY = 24;
let gridLengthX = canvas.width / gridCountX;
let gridLengthY = canvas.height / gridCountY;
let headX = 10;
let headY = 10;

let fruitX = 5
let fruitY = 5

let xVelocity = 0
let yVelocity = 0

class Pixel {
	constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.draw = function () {
			ctx.fillStyle = this.color;
			ctx.strokeStyle = "white"
			ctx.fillRect(this.x, this.y, this.w, this.h);
		};
	}
}
const snake = new Pixel(headX * gridLengthX, headY * gridLengthY, gridSize, gridSize, '#A7304E');
// function init() {
// 	/*    x = Math.floor(Math.random() * (canvas.width - apple.w))
// 	y = Math.floor(Math.random() *(canvas.height - apple.h)) */
// }


const fruit = new Pixel(fruitX * gridLengthX, fruitY * gridLengthY, gridSize, gridSize, "purple")

// init();animate();

console.l

function initGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fruit.draw()
	snake.draw();
	setTimeout(initGame, 1000 / speed);

}
 initGame()