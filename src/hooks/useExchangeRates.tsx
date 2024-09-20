import { useState, useEffect } from 'react';
import { ExchangeRates } from '../types/types'; // Asegúrate de que la ruta es correcta

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [updated, setUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dolar.melizeche.com/api/1.0/');
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setExchangeRates(data.dolarpy);
        setUpdated(data.updated);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { exchangeRates, updated, loading, error };
};

export default useExchangeRates;
