class CounterResult {
  type: number
  value: number

  constructor(type: number, value: number) {
    this.type = type;
    this.value = value;
  }

}

class DiffResult {
  type: number
  diff: string

  constructor(type: number, diff: string) {
    this.type = type;
    this.diff = diff;
  }

}

const currencyTypesInCent: number[] = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]

const toCent = (priceAsGermanString: string): number => {
  let priceInEuro = Number(priceAsGermanString.replace(',', '.'));
  return Math.round(priceInEuro * 100); // prevent precision problems e.g. 1.11 * 100 = 111.00000000000001
}

const calculate = (priceInCent: number): CounterResult[] => {
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

const formatDiff = (diffValue: number) => diffValue > 0 ? '+' + diffValue : '' + diffValue;

const calculateDiff = (current: CounterResult[], previous: CounterResult[]): DiffResult[] => {
  const diff: DiffResult[] = [];
  currencyTypesInCent.forEach(currencyType => {
    const currentValueOrZero = findValueOrZero(current, currencyType);
    const previousValueOrZero = findValueOrZero(previous, currencyType);
    if (!(currentValueOrZero == 0 && previousValueOrZero == 0)) {
      let diffValue = currentValueOrZero - previousValueOrZero;
      diff.push(new DiffResult(currencyType, formatDiff(diffValue)))
    }
  })
  return diff;
};

const findValueOrZero = (results: CounterResult[], type: number) => {
  let result = results.find(currentResult => currentResult.type == type);
  return result?.value ?? 0;
}

export {calculate, calculateDiff, toCent};
export type {CounterResult, DiffResult};
