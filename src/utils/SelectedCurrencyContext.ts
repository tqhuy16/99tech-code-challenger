import { createContext } from 'react';
import type { ContextType } from 'src/types/context';

export const SelectedCurrencyContext = createContext<ContextType | undefined>(undefined);
