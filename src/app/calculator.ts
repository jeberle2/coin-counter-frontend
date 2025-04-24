interface CounterResult {
    type: number
    value: number
}

const currencyTypesInCent: number[] = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]

function calculate(priceAsText: string): CounterResult[] {
  const result: CounterResult[] = [];
  let priceInCentAsNumber = Number(priceAsText.replace(',', '.')) * 100;
  
  currencyTypesInCent.forEach(currencyTypeCent => {
      if(priceInCentAsNumber / currencyTypeCent >= 1) {
          let countCurrencyType = Math.floor(priceInCentAsNumber / currencyTypeCent);
          priceInCentAsNumber = priceInCentAsNumber - countCurrencyType * currencyTypeCent;
          result.push({type: currencyTypeCent, value: countCurrencyType})
      }
  });

  return result;
}
export {calculate}
export type {CounterResult}