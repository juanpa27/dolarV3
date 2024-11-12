import { useState, useEffect } from 'react';

export interface ExchangeRateWithDate {
  fecha: string;
  compra: number;
  venta: number;
  referencial_diario?: number;
}

const useExchangeRatesByProvider = (provider: string) => {
  const [ratesByProvider, setRatesByProvider] = useState<ExchangeRateWithDate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatesByProvider = async () => {
      try {
        const response = await fetch(
          `https://dolar-cotizaciones-admin.vercel.app/api/exchange-rates/provider/${provider}`
        );
        if (!response.ok) {
          throw new Error('Error al obtener los datos de la API');
        }

        const data = await response.json();

        const dataArray = data.data;

        if (!Array.isArray(dataArray)) {
          throw new Error('La estructura de los datos recibidos es incorrecta');
        }

        // Procesar los datos
        const processedData: ExchangeRateWithDate[] = dataArray.map(
          (item: {
            fecha: string;
            compra: string;
            venta: string;
            referencial_diario?: string;
          }) => {
            const formattedDate = new Date(item.fecha).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            });

            return {
              fecha: formattedDate,
              compra: parseFloat(item.compra),
              venta: parseFloat(item.venta),
              referencial_diario: item.referencial_diario
                ? parseFloat(item.referencial_diario)
                : undefined,
            };
          }
        );

        // Ordenar los datos por fecha en orden ascendente (más antiguo a más reciente)
        processedData.sort((a, b) => {
          const dateA = new Date(a.fecha.split('/').reverse().join('-'));
          const dateB = new Date(b.fecha.split('/').reverse().join('-'));
          return dateA.getTime() - dateB.getTime(); // Ordenar del más antiguo al más reciente
        });

        setRatesByProvider(processedData);
      } catch (error) {
        console.error('Error al obtener las tasas por proveedor:', error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Ocurrió un error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRatesByProvider();
  }, [provider]);

  return { ratesByProvider, loading, error };
};

export default useExchangeRatesByProvider;
