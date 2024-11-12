import { useState, useEffect, useCallback } from 'react';
import { HistoricalExchangeRates } from '../types/types'; // Asegúrate de que la ruta es correcta

const useExchangeHistorical = () => {
  const [historicalRates, setHistoricalRates] = useState<HistoricalExchangeRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHistoricalRates = useCallback(async () => {
    try {
      
      const response = await fetch('https://dolar-cotizaciones-admin.vercel.app/api/exchange-rates');
      if (!response.ok) {
        throw new Error('Error al obtener los datos de la API');
      }

      const data = await response.json();

      // Procesar los datos para convertir 'compra', 'venta', y 'referencial_diario' a números
      const processedData: HistoricalExchangeRates = {};
      for (const entidad in data) {
        processedData[entidad] = data[entidad].map((item: { compra: string; venta: string; referencial_diario?: string }) => ({
          ...item,
          compra: parseFloat(item.compra),
          venta: parseFloat(item.venta),
          referencial_diario: item.referencial_diario ? parseFloat(item.referencial_diario) : undefined,
        }));
      }

      // Guardar en localStorage con un timestamp
      const timestamp = new Date().getTime();
      localStorage.setItem('historicalRates', JSON.stringify({ data: processedData, timestamp }));

      // Actualizar el estado con los datos procesados
      setHistoricalRates(processedData);
    } catch (error) {
      console.error('Error al obtener los datos históricos:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
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