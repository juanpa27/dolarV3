import React from 'react';
import DollarQuoteCard from './DollarQuoteCard';
import useExchangeRates from '../hooks/useExchangeRates'; 

const ExchangeRateList: React.FC = () => {
  const { exchangeRates, loading } = useExchangeRates();

  if (loading) { 
    return <div>Cargando...</div>; 
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(exchangeRates).map(([entidad, data]) => (
        <DollarQuoteCard
          key={entidad}
          entidad={entidad.toUpperCase()}
          compra={data?.compra || 0}  // Usando valores por defecto si no existe la propiedad
          venta={data?.venta || 0}  
          referencial={entidad === 'bcp' ? data?.referencial_diario : undefined} //   // Usando valores por defecto si no existe la propiedad
        />
      ))}
    </div>
  );
}; 

export default ExchangeRateList;
