interface CounterResult {
    type: number
    value: number
}

const currencyTypesInCent: number[] = [20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50, 20, 10, 5, 2, 1]

function toCent(priceAsGermanString: string) {
    return Number(priceAsGermanString.replace(',', '.')) * 100;
}

function calculate(priceInCentAsNumber: number): CounterResult[] {
    const result: CounterResult[] = [];

    currencyTypesInCent.forEach(currencyTypeCent => {
        let countCurrencyType = Math.floor(priceInCentAsNumber / currencyTypeCent);
        if (countCurrencyType > 0) {
            priceInCentAsNumber = priceInCentAsNumber - countCurrencyType * currencyTypeCent;
            result.push({ type: currencyTypeCent, value: countCurrencyType })
        }
    });
    return result;
}

function calculateDiff(current: CounterResult[], previous: CounterResult[]) {
    const diff: CounterResult[] = [];
    currencyTypesInCent.forEach(currencyType => {
        var currentValueOrZero = current.find(currentResult => currentResult.type == currencyType)?.value ?? 0;
        var previousValueOrZero = previous.find(previousResult => previousResult.type == currencyType)?.value ?? 0;
        if (!(currentValueOrZero == 0 && previousValueOrZero == 0)) {
            diff.push({ type: currencyType, value: currentValueOrZero - previousValueOrZero })
        }
    })
    return diff;
}
export { calculate, calculateDiff, toCent };
export type { CounterResult };
