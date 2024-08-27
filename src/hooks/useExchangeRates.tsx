import { useState, useEffect } from 'react';

interface ExchangeRate {
  compra: number;
  venta: number;
  referencial_diario?: number; // Este solo aplica a "bcp" según tu JSON.
}

interface ExchangeRates {
  bcp?: ExchangeRate;
  bonanza?: ExchangeRate;
  cambiosalberdi?: ExchangeRate;
  cambioschaco?: ExchangeRate;
  eurocambios?: ExchangeRate;
  gnbfusion?: ExchangeRate;
  lamoneda?: ExchangeRate;
  maxicambios?: ExchangeRate;
  mundialcambios?: ExchangeRate;
  mydcambios?: ExchangeRate;
  set?: ExchangeRate;
  vision?: ExchangeRate;
}

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Para manejar posibles errores

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dolar.melizeche.com/api/1.0/');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setExchangeRates(data.dolarpy);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { exchangeRates, loading, error };
};

export default useExchangeRates;
