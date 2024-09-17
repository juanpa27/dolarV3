import { useState, useEffect, useCallback } from 'react';

interface ExchangeRateWithDate {
  compra: number;
  venta: number;
  referencial_diario?: number;
  fecha: string;
}

interface HistoricalExchangeRates {
  [entidad: string]: ExchangeRateWithDate[];
}

const useExchangeHistorical = () => {
  const [historicalRates, setHistoricalRates] = useState<HistoricalExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalRates = useCallback(async () => {
    try {
      console.log('fetchHistoricalRates ejecutado');
      const response = await fetch('https://dolar-cotizaciones-admin.vercel.app/api/exchange-rates');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }

      const data = await response.json();

      // Guardar en localStorage con un timestamp
      const timestamp = new Date().getTime();
      localStorage.setItem('historicalRates', JSON.stringify({ data, timestamp }));

      setHistoricalRates(data);
    } catch (error) {
      console.error('Error al obtener los datos históricos:', error);
      setError((error as any).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect ejecutado');  // Para ver cuántas veces se ejecuta

    const storedData = localStorage.getItem('historicalRates');

    if (storedData) {
      const { data, timestamp } = JSON.parse(storedData);
      const now = new Date().getTime();

      // Verificar si los datos tienen más de 24 horas
      if (now - timestamp < 86400000) {
        setHistoricalRates(data);
        setLoading(false);
      } else {
        fetchHistoricalRates();  // Si los datos son antiguos, volver a hacer la llamada a la API
      }
    } else {
      fetchHistoricalRates();  // Si no hay datos en localStorage, hacer la llamada a la API
    }
  }, [fetchHistoricalRates]);

  return { historicalRates, loading, error };
};

export default useExchangeHistorical;
