'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Currency {
  code: string;
  symbol: string;
  name: string;
  rate: number;
}

export const currencies: Currency[] = [
  { code: 'ZAR', symbol: 'R', name: 'South African Rand', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.055 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.051 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.044 },
  { code: 'NAD', symbol: '$', name: 'Namibian Dollar', rate: 0.055 },
  { code: 'BWP', symbol: 'P', name: 'Botswana Pula', rate: 0.75 },
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling', rate: 6.75 },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira', rate: 42.5 },
];

const countryToCurrency: Record<string, string> = {
  ZA: 'ZAR',
  US: 'USD',
  GB: 'EUR',
  DE: 'EUR',
  FR: 'EUR',
  IT: 'EUR',
  ES: 'EUR',
  NL: 'EUR',
  NA: 'NAD',
  BW: 'BWP',
  KE: 'KES',
  NG: 'NGN',
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (code: string) => void;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedCurrency = localStorage.getItem('currency');
    if (savedCurrency) {
      const found = currencies.find(c => c.code === savedCurrency);
      if (found) {
        setCurrencyState(found);
        setIsInitialized(true);
        return;
      }
    }

    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const countryCode = data.country_code;
        const detectedCurrency = countryToCurrency[countryCode] || 'ZAR';
        const currencyObj = currencies.find(c => c.code === detectedCurrency) || currencies[0];
        setCurrencyState(currencyObj);
        localStorage.setItem('currency', currencyObj.code);
      })
      .catch(() => {
        setCurrencyState(currencies[0]);
      })
      .finally(() => setIsInitialized(true));
  }, []);

  const setCurrency = (code: string) => {
    const found = currencies.find(c => c.code === code);
    if (found) {
      setCurrencyState(found);
      localStorage.setItem('currency', code);
    }
  };

  const formatPrice = (priceInZar: number): string => {
    const converted = priceInZar * currency.rate;
    return `${currency.symbol}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
}