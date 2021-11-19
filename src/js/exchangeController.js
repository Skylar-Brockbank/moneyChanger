export default class ExchangeControl{
  constructor(){
    this.exchangeList = {};
  }
  static async getExchangeRates(){
    try{
      const rawPromise = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
      if(!rawPromise.ok){
        throw Error(rawPromise.statusText);
      }
      return await rawPromise.json();
    }catch(error){
      return error.message;
    } 
  }
  static convertCurrency(amount, origin, destination){
    let cFactor = origin/destination;
    let output = amount*cFactor;
    return output.toFixed(2);
  }
}