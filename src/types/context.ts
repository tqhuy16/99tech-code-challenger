import type { CurrencyRate } from "./currentcy";

export interface SelectedCurrencyValue {
  from: CurrencyRate | null;
  to: CurrencyRate | null;
}

export interface ContextType {
  selectedCurrency: SelectedCurrencyValue;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<SelectedCurrencyValue>>;
}
