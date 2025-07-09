import { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { SwapVert } from '@assets/img';
import { InputCurrency } from '@components';
import { getLatestUniqueCurrencies } from 'src/utils/reduceCurrentcy';
import { convertCurrency } from 'src/utils/converyCurrency';
import type { CurrencyRate } from 'src/types/currentcy';
import { SelectedCurrencyContext } from 'src/utils/SelectedCurrencyContext';
import styles from './formConvert.module.scss';

const FormConvert = () => {
  const context = useContext(SelectedCurrencyContext);
  const [listCurrency, setListCurrency] = useState<CurrencyRate[]>([]);
  const [currencyValueFrom, setCurrencyValueFrom] = useState<number>(0);
  const [currencyValueTo, setCurrencyValueTo] = useState<number>(0);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const res = await axios.get('https://interview.switcheo.com/prices.json');
        const uniqueListCurrency = getLatestUniqueCurrencies(res.data);
        setListCurrency(uniqueListCurrency);

        if (context?.setSelectedCurrency) {
          context.setSelectedCurrency({
            from: uniqueListCurrency[0],
            to: uniqueListCurrency[1] ?? null
          });
        }
      } catch (err) {
        console.error('Error fetching currency list:', err);
      }
    };

    fetchCurrencyList();
  }, []);

  const from = context?.selectedCurrency.from;
  const to = context?.selectedCurrency.to;

  useEffect(() => {
    if (from && to) {
      const result = convertCurrency(currencyValueFrom, from, to);
      setCurrencyValueTo(Number(result.toFixed(6)));
    } else {
      setCurrencyValueTo(0);
    }
  }, [currencyValueFrom, from, to]);

  const swapCurrency = () => {
    if (context?.setSelectedCurrency && from && to) {
      context.setSelectedCurrency({ from: to, to: from });
    }
  };

  return (
    <div className={styles.convert}>
      <div className={styles.convertInfo}>
        <div className={styles.rate}>Mid-market exchange rate</div>
        <div>
          {currencyValueFrom} {from?.currency} = {currencyValueTo} {to?.currency}
        </div>
      </div>

      <div className={styles.mainConvert}>
        <div className={styles.convertFrom}>
          <div>Số tiền</div>
          <InputCurrency
            value={currencyValueFrom}
            onChange={(v) => setCurrencyValueFrom(v)}
            currency={from?.currency || ''}
            onCurrencyChange={(cur) => {
              if (context?.setSelectedCurrency)
                context.setSelectedCurrency({ from: cur, to: to ?? null, });
            }}
            availableCurrencies={listCurrency.filter((cur) => cur.currency !== to?.currency)}
          />
        </div>

        <div className={styles.changeButton} onClick={swapCurrency}>
          <SwapVert className={styles.swapBtn} />
        </div>

        <div className={styles.convertTo}>
          <div>Thành tiền</div>
          <InputCurrency
            value={currencyValueTo}
            onChange={() => { }}
            currency={to?.currency || ''}
            onCurrencyChange={(cur) => {
              if (context?.setSelectedCurrency)
                context.setSelectedCurrency({ from: from ?? null, to: cur });
            }}
            availableCurrencies={listCurrency.filter((cur) => cur.currency !== from?.currency)}
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default FormConvert;
