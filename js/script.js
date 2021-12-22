const canvas = document.querySelector('canvas');

let c = canvas.getContext('2d');
//set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



let pixels = []
for(let i = 0; i<100 ;i++) {
    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    c.fillStyle = 'red'
    pixels.push(c.fillRect(x,y,20,20))
}

console.log(pixels)