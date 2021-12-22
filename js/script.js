const canvas = document.querySelector('canvas');

let c = canvas.getContext('2d');
//set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



// let pixels = []
// for(let i = 0; i<100 ;i++) {
//     let w = 20
//     let h = 20
//     let x = Math.random() * (innerWidth - (w+h)*2)+(w+h)
//     let y = Math.random() * (innerHeight - (w+h)*2)+(w+h)
//     c.fillStyle = 'red'
//     c.strokeStyle = 'black'
//     pixels.push(c.fillRect(x,y,w,h))
// }

// console.log(pixels)




// c.fillRect(x,y,5,5)


class Pixel {
    constructor(x,y,w,h,dx,dy) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.dx = dx
        this.dy = dy
        this.draw = function() {
            c.fillStyle = 'red'
            c.fillRect(this.x,this.y,this.w,this.h)
        }
        this.update= function() {

            if(this.x > innerWidth || this.x < 0){
                this.dx = -this.dx
            }
            if(this.y > innerHeight || this.y < 0){
                
                this.dy = -this.dy
            }
            this.x += this.dx
            this.y += this.dy
            this.draw()
        }
    }
}


const pixels = []

for(let i = 0; i < 50; i++) {
    //these two variables will set the  spawn location
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight
    //these two variables will set the actual directional speed
    let dx = (Math.random() - 0.5) 
    let dy = (Math.random() - 0.5)
    //these two variables set width and height of the object
    let w = (Math.random() * 20)
    let h = (Math.random() * 20)
    pixels.push(new Pixel(x,y,w,h,dx,dy))

}

function animate() {
    requestAnimationFrame(animate)
    
    c.clearRect(0,0, innerWidth,innerHeight)
    for(let i = 0; i < pixels.length; i++) {
        pixels[i].update()
    }
}
animate()