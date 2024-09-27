import React from 'react';
import DollarQuoteCard from './DollarQuoteCard';
import { ExchangeRates, HistoricalExchangeRates } from '../types/types';

interface ExchangeRateCardsProps {
  exchangeRates: ExchangeRates;
  formattedEntityName: (entidad: string) => string;
  historicalRates: HistoricalExchangeRates | null;
  multiplier: number;
}

const ExchangeRateCards: React.FC<ExchangeRateCardsProps> = React.memo(
  ({ exchangeRates, formattedEntityName, historicalRates, multiplier }) => {
    
    const applyMultiplier = (value: number) => {
      return value * multiplier;
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(exchangeRates).map(([entidad, data]) => (
          <DollarQuoteCard
            key={entidad}
            entidad={formattedEntityName(entidad)}
            compra={applyMultiplier(data?.compra || 0)} 
            venta={applyMultiplier(data?.venta || 0)}   
            referencial={entidad === 'bcp' ? applyMultiplier(data?.referencial_diario || 0) : undefined} 
            historicalData={historicalRates ? historicalRates[entidad] : undefined}
          />
        ))}
      </div>
    );
  }
);

export default ExchangeRateCards;