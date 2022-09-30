const yahooStockAPI  = require('yahoo-stock-api');
async function main()  {
	const startDate = new Date('08/21/2020');
	const endDate = new Date('08/26/2020');
	console.log(await yahooStockAPI.getHistoricalPrices(startDate, endDate, 'TSLA', '1d'));
}
//main();

async function ticker()  {
	console.log(await  yahooStockAPI.getSymbol('TSLA'));
}

ticker();

//https://www.npmjs.com/package/yahoo-stock-api
