class CounterResult {
  type: number
  value: number

  constructor(type: number, value: number) {
    this.type = type;
    this.value = value;
  }
}

const currencyTypesInCent: number[] = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]

const toCent = (priceAsGermanString: string): number => {
  let priceInEuro = Number(priceAsGermanString.replace(',', '.'));
  return Math.round(priceInEuro * 100); // prevent precision problems e.g. 1.11 * 100 = 111.00000000000001
}

const count = (priceInCent: number): CounterResult[] => {
  const result: CounterResult[] = [];

  currencyTypesInCent.forEach(currencyType => {
    let countCurrencyType = Math.floor(priceInCent / currencyType);
    if (countCurrencyType > 0) {
      priceInCent = priceInCent - countCurrencyType * currencyType;
      result.push(new CounterResult(currencyType, countCurrencyType));
    }
  });
  return result;
};


export {count, toCent, currencyTypesInCent};
export type {CounterResult};
