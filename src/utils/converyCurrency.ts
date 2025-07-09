import type { CurrencyRate } from "src/types/currentcy";

export function convertCurrency(
    amountFrom: number,
    from?: CurrencyRate | null,
    to?: CurrencyRate | null
): number {
    if (!from || !to || from.price === 0) return 0;
    return amountFrom * (to.price / from.price);
}
