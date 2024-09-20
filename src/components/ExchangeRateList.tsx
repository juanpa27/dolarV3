import React, { useCallback } from 'react';
import useExchangeRates from '../hooks/useExchangeRates';
import useExchangeHistorical from '../hooks/useExchangeHistorical';
import { Badge } from '@/components/ui/badge';
import SkeletonDollarQuoteCard from './SkeletonDollarQuoteCard';
import ExchangeRateCards from './ExchangeRateCards';
import ExchangeRateCharts from './ExchangeRateCharts';


const ExchangeRateList: React.FC = () => {
  const { exchangeRates, updated, loading } = useExchangeRates();
  const { historicalRates } = useExchangeHistorical();
  console.log(historicalRates);

  const formattedEntityName = useCallback((entidad: string) => {
    switch (entidad) {
      case 'bcp': return 'BCP';
      case 'cambiosalberdi': return 'CAMBIOS ALBERDI';
      case 'cambioschaco': return 'CAMBIOS CHACO';
      case 'eurocambios': return 'EUROCAMBIOS';
      case 'gnbfusion': return 'GNB FUSION';
      case 'lamoneda': return 'LA MONEDA';
      case 'maxicambios': return 'MAXICAMBIOS';
      case 'mundialcambios': return 'MUNDIAL CAMBIOS';
      case 'mydcambios': return 'MYD CAMBIOS';
      case 'set': return 'SET';
      case 'vision': return 'UENO';
      default: return entidad.toUpperCase();
    }
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(9)].map((_, index) => (
          <SkeletonDollarQuoteCard key={index} />
        ))}
      </div>
    );
  }

  const chartData = Object.entries(exchangeRates).map(([entidad, data]) => ({
    entidad: formattedEntityName(entidad),
    compra: data?.compra || 0,
    venta: data?.venta || 0,
  }));

  return (
    <>
      <ExchangeRateCards
        exchangeRates={exchangeRates}
        formattedEntityName={formattedEntityName}
        historicalRates={historicalRates}
      />

      <ExchangeRateCharts
        chartData={chartData}
        
      />

      {updated && (
        <div className="text-center mt-4 mb-4">
          <span className="text-gray-900 dark:text-gray-200">
            <Badge variant="outline">
              Última actualización: {new Date(updated).toLocaleString()}
            </Badge>
          </span>
        </div>
      )}
    </>
  );
};

export default ExchangeRateList;
