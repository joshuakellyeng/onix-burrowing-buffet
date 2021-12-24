const canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');

canvas.width = 360;
canvas.height = 480;





class Pixel {
	constructor(x, y, w, h, color) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.velocity = {
			x: 1,
			y: 1,
		};
		this.draw = function () {
			c.fillRect(this.x, this.y, this.w, this.h);
			c.fillStyle = this.color;
			c.fill();
		};
		this.update = function () {
			this.draw();
			if (this.x > (canvas.width - this.w)|| this.x < 0) {
				this.velocity.x = -this.velocity.x
			}
			if (this.y > (canvas.height - this.h)|| this.y < 0) {
				this.velocity.y = -this.velocity.y
			}
			// this.x += this.velocity.x;
			// this.y += this.velocity.y;
		};
	}
}

function init() {
	snake = new Pixel(20, 20, 20, 20, '#0C5AC0');
}

function animate() {
	requestAnimationFrame(animate) 
	c.clearRect(0,0, canvas.width, canvas.height)
	snake.update()
}

init()
animate()

addEventListener('keydown', KeyboardEvent => {
	let move = KeyboardEvent.code;
switch(move) {
				case "ArrowUp":
          snake.y -= 20;
          console.log(snake.x, snake.y);
          snake.update();
          break;
       case "ArrowDown":
       		snake.y += 20;
          console.log(snake.x, snake.y);
          snake.update();
          break;
       case "ArrowLeft":
       		snake.x -= 20;
          console.log(snake.x, snake.y);
          snake.update();
          break;
       case "ArrowRight":
       		snake.x += 20;
          console.log(snake.x, snake.y);
          snake.update();
          break;
        }
/* 	if(KeyboardEvent.code === "ArrowUp" ){
	  snake.y -= 20;
	    console.log(snake.y)
	    snake.update()
	} else {
	  console.log(KeyboardEvent.code)
	} */
})



/* 
color pallet
100D22
A7304E
0C5AC0
17346F
2AA5D8
*/















// console.log(pixels)

// c.fillRect(x,y,5,5)

// class Pixel {
// 	constructor(x, y, w, h, dx, dy) {
// 		this.x = x;
// 		this.y = y;
// 		this.w = w;
// 		this.h = h;
// 		this.dx = dx;
// 		this.dy = dy;
// 		this.draw = function () {
// 			c.fillStyle = 'red';
// 			c.fillRect(this.x, this.y, this.w, this.h);
// 		};
// 		this.update = function () {
// 			if (this.x > (canvas.width - this.w)|| this.x < 0) {
// 				this.dx = -this.dx;
// 			}
// 			if (this.y > (canvas.height - this.h) || this.y < 0) {
// 				this.dy = -this.dy;
// 			}
// 			this.x += this.dx;
// 			this.y += this.dy;
// 			this.draw();
// 		};
// 	}
// }

// const pixels = [];

// for (let i = 0; i < 50; i++) {
//     these two variables set width and height of the object
// 	let w = 10;
// 	let h = 10;
// 	these two variables will set the spawn location
//     canvas.width,height - width and height of the object prevents the object from spawning on the edges
// 	let x = Math.random() * (canvas.width - w);
// 	let y = Math.random() * (canvas.height - h) ;
// 	these two variables will set the actual directional speed
// 	let dx = Math.random() - 0.5;
// 	let dy = Math.random() - 0.5;

// 	pixels.push(new Pixel(x, y, w, h, dx, dy));
// }

