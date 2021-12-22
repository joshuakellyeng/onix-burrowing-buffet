const canvas = document.querySelector('canvas');

let c = canvas.getContext('2d');
//set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


class Square {
	constructor(x, y, w, h) {
        //set square locations

		this.x = x;
		this.y = y;
		this.w = w;
		this.y = y;
		this.draw = function () {
            c.fillStyle = "pink"
            c.beginPath();
            c.fillRect()
		};
	}
}

const squareArray = []

for(let i = 0; i < 100; i++) {
    //set square locations
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;

    let w = 200;
    let h = 200;
    squareArray.push(new Square(x,y,w,h))
}