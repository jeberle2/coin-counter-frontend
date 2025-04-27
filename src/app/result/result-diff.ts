import {CounterResult, currencyTypesInCent} from '../shared/counter';

class DiffResult {
  type: number
  diff: string

  constructor(type: number, diff: string) {
    this.type = type;
    this.diff = diff;
  }

}

const formatDiff = (diffValue: number) => diffValue > 0 ? '+' + diffValue : '' + diffValue;

const calculateDiff = (current: CounterResult[], previous: CounterResult[]): DiffResult[] => {
  const diff: DiffResult[] = [];
  if (previous.length != 0 && current.length != 0) {
    currencyTypesInCent.forEach(currencyType => {
      const currentValueOrZero = findValueOrZero(current, currencyType);
      const previousValueOrZero = findValueOrZero(previous, currencyType);
      if (!(currentValueOrZero == 0 && previousValueOrZero == 0)) {
        let diffValue = currentValueOrZero - previousValueOrZero;
        diff.push(new DiffResult(currencyType, formatDiff(diffValue)))
      }
    })
  }
  return diff;
};

const findValueOrZero = (results: CounterResult[], type: number) => {
  let result = results.find(currentResult => currentResult.type == type);
  return result?.value ?? 0;
}

export {calculateDiff};
export type {DiffResult};
