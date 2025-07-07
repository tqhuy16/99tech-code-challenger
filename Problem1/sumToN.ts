const SumToN_A = (number: number): number => {
    let sum = 0;
    for (let i = 1; i <= number; i++) {
        sum += i;
    }
    return sum
}

const SumToN_B = (number: number): number => {
    return number * (number + 1) / 2
}

const SumToN_C = (number: number): number => {
    if (number <= 1) return number
    return number + SumToN_C(number - 1)
}
