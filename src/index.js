import $ from 'jQuery';
import './css/styles.css';
import ExchangeControl from './js/exchangeController.js';

var moneyChanger = new ExchangeControl;

async function initializeController(){
  let data = await ExchangeControl.getExchangeRates();
  moneyChanger.exchangeList = data;
  console.log(moneyChanger);
  populateLists();
}

function populateLists(){
  for(let key in moneyChanger.exchangeList.conversion_rates){
    $("#originCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+','+key+'">'+key+'</option>')
    $("#destinationCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+','+key+'">'+key+'</option>')
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
  console.log(x+" , "+y+" "+yc+" , "+z+" "+zc);
  $("#output").text(x+" "+yc+" is "+ExchangeControl.convertCurrency(x,y,z)+" "+zc);
})