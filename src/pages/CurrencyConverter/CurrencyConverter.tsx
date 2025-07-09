import { useState } from 'react';
import { FormConvert } from '@components/index';
import type { SelectedCurrencyValue } from 'src/types/context';
import { SelectedCurrencyContext } from 'src/utils/SelectedCurrencyContext';
import styles from './currencyConverer.module.scss';


const CurrentcyConverter = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<SelectedCurrencyValue>({
    from: null,
    to: null,
  });

  return (
    <SelectedCurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency }}>
      <div className={styles.app}>
        <div className={styles.appTitle}>Currency Convert</div>
        <div className={styles.appDescription}>
          Convert {selectedCurrency.from?.currency || '...'} to {selectedCurrency.to?.currency || '...'} at the mid-market exchange rate.
        </div>
        <div className={styles.formConvert}>
          <FormConvert />
        </div>
      </div>
    </SelectedCurrencyContext.Provider>
  );
};

export default CurrentcyConverter;
