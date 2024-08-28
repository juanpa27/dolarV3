import React from 'react';
import DollarQuoteCard from './DollarQuoteCard';
import useExchangeRates from '../hooks/useExchangeRates'; 

const ExchangeRateList: React.FC = () => {
  const { exchangeRates, loading } = useExchangeRates();

  if (loading) { 
    return <div>Cargando...</div>; 
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
      case 'vision': return 'VISION';
      
      
      default: return entidad.toUpperCase(); // Por defecto, convierte a mayúsculas
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(exchangeRates).map(([entidad, data]) => (
        <DollarQuoteCard
          key={entidad}
          entidad={formattedEntityName(entidad)}
          compra={data?.compra || 0}  // Usando valores por defecto si no existe la propiedad
          venta={data?.venta || 0}  
          referencial={entidad === 'bcp' ? data?.referencial_diario : undefined} //   // Usando valores por defecto si no existe la propiedad
        />
      ))}
    </div>
  );
}; 

export default ExchangeRateList;
