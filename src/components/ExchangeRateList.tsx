import React from 'react';
import DollarQuoteCard from './DollarQuoteCard';
import useExchangeRates from '../hooks/useExchangeRates'; 
import useExchangeHistorical from '../hooks/useExchangeHistorical';
import { Badge } from "@/components/ui/badge"
import GraficoBarra from './GraficoBarra';
import GraficoLienal from './GraficoLineal';
import SkeletonDollarQuoteCard from './SkeletonDollarQuoteCard';

const ExchangeRateList: React.FC = () => {
  const { exchangeRates,updated,loading } = useExchangeRates();
  const { historicalRates } = useExchangeHistorical();
  console.log(historicalRates);
  

  if (loading) { 
    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7 ,8 , 9].map((key) => (
            <SkeletonDollarQuoteCard key={key} />
          ))}
        </div>
      </>
    );
  }
  
  const formattedEntityName = (entidad: string) => {
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
      
      
      default: return entidad.toUpperCase(); // Por defecto convierte a mayúsculas
    }
  };

  const chartData = Object.entries(exchangeRates).map(([entidad, data]) => ({
    entidad: formattedEntityName(entidad),
    compra: data?.compra || 0,
    venta: data?.venta || 0,
  }));

  

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(exchangeRates).map(([entidad, data]) => (
          <DollarQuoteCard
            key={entidad}
            entidad={formattedEntityName(entidad)}
            compra={data?.compra || 0}  
            venta={data?.venta || 0}  
            referencial={entidad === 'bcp' ? data?.referencial_diario : undefined} 
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="w-full max-w-xl min-h-max">
          <GraficoBarra data={chartData} />
        </div>
        <div className="w-full max-w-xl min-h-max">
          <GraficoLienal />
        </div>
      </div>
      
      {updated && (
        <div className="text-center mt-4 mb-4">
          <span className="text-gray-900 dark:text-gray-200">
            <Badge variant="outline">Última actualización: {new Date(updated).toLocaleString()}</Badge>
          </span>
        </div>
      )}
    </>
  );
}; 

export default ExchangeRateList;
