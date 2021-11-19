import $ from 'jQuery';
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
    
    // console.log(key+" : "+moneyChanger.exchangeList.conversion_rates[key]);

    $("#originCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+'">'+key+'</option>')
    $("#destinationCurrency").append('<option value="'+moneyChanger.exchangeList.conversion_rates[key]+'">'+key+'</option>')
  }
}

initializeController();

$('#exchange').submit(function(event){
  event.preventDefault();
  let x = $('#originAmount').val();
  let y = $('#originCurrency').val();
  let z = $('#destinationCurrency').val();
  console.log(x+" , "+y+" , "+z);
  ExchangeControl.convertCurrency(x,y,z);
})