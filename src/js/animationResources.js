var canvas = document.getElementById("background");
var brush = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

brush.clearRect(0,0,canvas.width, canvas.height);


export default class Ball{
  constructor(radius, color,startingX,startingY,dX,dY){
    this.r = radius;
    this.col = color;
    this.x = startingX;
    this.y = startingY;
    this.dX = dX;
    this.dY = dY;
  }
  drawSelf(){
    brush.fillStyle = this.col;
    brush.beginPath();
    brush.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    brush.fill();
  }
  move(){
    if(this.x<=(0-this.r)||this.x>=(canvas.width+this.r)){
      this.dX = this.dX*-1;

      
    }
    if(this.y<=(0-this.r)||this.y>=(canvas.height+this.r)){
      this.dY = this.dY*-1;

    }

    this.x = this.x+this.dX;
    this.y = this.y+this.dY;
    this.drawSelf();
  }
  randomColor(){
    let colors = ["rgba(0, 0, 255, 0.1)","rgba(0, 0, 255, 0.3)","rgba(0, 0, 255, 0.15)","rgba(0, 0, 255, 0.2)"];
    let output = colors[Math.round((Math.random()+.01)*colors.length)-1];
    this.col = output;
  }
}
