import { useEffect, useRef, useState } from 'react';
import { Dropdown } from '@assets/img';
import type { CurrencyRate } from 'src/types/currentcy';
import styles from './inputCurrency.module.scss';

type InputCurrencyProps = {
  value: number;
  onChange: (value: number) => void;
  currency: string;
  onCurrencyChange: (currency: CurrencyRate) => void;
  availableCurrencies: CurrencyRate[];
  readOnly?: boolean;
};

const InputCurrency = ({
  value,
  onChange,
  currency,
  onCurrencyChange,
  availableCurrencies,
  readOnly = false
}: InputCurrencyProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const handleSelectCurrency = (selected: CurrencyRate) => {
    onCurrencyChange(selected);
    setShowDropdown(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className={styles.wrapper} ref={dropdownRef}>
      <input
        type="text"
        className={styles.input}
        value={value}
        readOnly={readOnly}
        onChange={(e) => {
          if (readOnly) return;
          const raw = e.target.value;
          const numeric = raw.replace(/[^\d.]/g, '');
          const parsed = parseFloat(numeric);
          if (!isNaN(parsed) && parsed >= 0) {
            onChange(parsed);
          } else if (raw === '') {
            onChange(0);
          }
        }}
      />

      <div className={styles.currency}>
        <div className={styles.code} onClick={toggleDropdown}>{currency.slice(0, 3)}</div>
        <Dropdown className={styles.dropdownIcon} onClick={toggleDropdown} />

        {showDropdown && (
          <div className={styles.dropdownList}>
            {availableCurrencies.map((cur) => (
              <div
                key={cur.currency}
                className={styles.dropdownItem}
                onClick={() => handleSelectCurrency(cur)}
              >
                {cur.currency}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputCurrency;
