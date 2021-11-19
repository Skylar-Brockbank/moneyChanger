import $ from 'jQuery';
import './css/styles.css';
import ExchangeControl from './js/exchangeController.js';
import Ball from './js/animationResources.js';

var moneyChanger = new ExchangeControl;

async function initializeController(){
  let data = await ExchangeControl.getExchangeRates();
  moneyChanger.exchangeList = data;
  populateLists();
}

function populateLists(){
  for(let key in moneyChanger.exchangeList.conversion_rates){
    $("#originCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+','+key+'">'+key+'</option>');
    $("#destinationCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+','+key+'">'+key+'</option>');
  }
}

initializeController();

$('#exchange').submit(function(event){
  event.preventDefault();
  let x = $('#originAmount').val();
  let y = $('#originCurrency').val().split(",")[0];
  let z = $('#destinationCurrency').val().split(",")[0];
  let yc = $('#originCurrency').val().split(",")[1];
  let zc = $('#destinationCurrency').val().split(",")[1];
  $("#output").text(x+" "+yc+" is "+ExchangeControl.convertCurrency(x,y,z)+" "+zc);
  $("#outputHolder").show();
});



var canvas = document.getElementById("background");
var brush = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function randomColor(){
  let colors = ["rgb(0, 183, 255)","rgb(0, 255, 191)","rgb(0, 255, 115)","rgb(0, 68, 255)","rgb(119, 0, 255)"];
  return colors[Math.round((Math.random()+.01)*colors.length)-1];
}

var ballArray = [];
for(let i =0;i<20;i++){
  let radius = 25+(Math.round(Math.random()*20));
  let color = randomColor();
  let startx = radius+(Math.random()*(canvas.width-(2*radius)));
  let starty =radius+(Math.random()*(canvas.height-(2*radius)));
  let xspd = Math.random()*5;
  let yspd = Math.random()*5;
  ballArray.push(new Ball(radius,color,startx,starty,xspd,yspd));
}


function animate(){
  brush.clearRect(0,0,canvas.width, canvas.height);

  for(let i = 0; i< ballArray.length;i++){
    ballArray[i].move();
  }
  requestAnimationFrame(animate);
}
animate();