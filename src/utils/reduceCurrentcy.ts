import type { CurrencyRate } from "src/types/currentcy";


export function getLatestUniqueCurrencies(data: CurrencyRate[]): CurrencyRate[] {
    const map = new Map<string, CurrencyRate>();

    data.forEach((item) => {
        const existing = map.get(item.currency);
        if (!existing) {
            map.set(item.currency, item);
        } else {
            const existingDate = new Date(existing.date).getTime();
            const currentDate = new Date(item.date).getTime();

            if (currentDate > existingDate) {
                map.set(item.currency, item);
            }
        }
    });

    return Array.from(map.values());
}
