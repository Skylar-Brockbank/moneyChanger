import $ from 'jQuery';
import './css/styles.css';
import ExchangeControl from './js/exchangeController.js';
import Ball from './js/animationResources.js';

var moneyChanger = new ExchangeControl;
initializeController();



async function initializeController(){
  let data = {};
  if(window.sessionStorage.getItem('moneySaved') === null){
    data = await ExchangeControl.getExchangeRates();
    window.sessionStorage.setItem('moneySaved', JSON.stringify(data));
  }else{
    data = await JSON.parse(window.sessionStorage.getItem('moneySaved'));
  }
  if(data['result']==='error'){
    $("#output").text(data['error-type']);
    $("#outputHolder").show();
  }
  moneyChanger.exchangeList = data;
  populateLists();
}

function populateLists(){
  for(let key in moneyChanger.exchangeList.conversion_rates){
    $("#originCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+','+key+'">'+key+'</option>');
    $("#destinationCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+','+key+'">'+key+'</option>');
  }
}



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
  let colors = ["rgba(0, 0, 255, 0.1)","rgba(0, 0, 255, 0.3)","rgba(0, 0, 255, 0.15)","rgba(0, 0, 255, 0.2)"];
  return colors[Math.round((Math.random()+.01)*colors.length)-1];
}

var ballArray = [];
for(let i =0;i<10;i++){
  let radius = canvas.height/2+(Math.round(Math.random()*(canvas.height/2)));
  let color = randomColor();
  let startx = radius+(Math.random()*(canvas.width));
  let starty =radius+(Math.random()*(canvas.height));
  let xspd = Math.random()*1;
  let yspd = Math.random()*1;
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