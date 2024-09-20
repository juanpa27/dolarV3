// ExchangeRateCards.tsx

import React from 'react';
import DollarQuoteCard from './DollarQuoteCard';
import { ExchangeRates, HistoricalExchangeRates } from '../types/types';

interface ExchangeRateCardsProps {
  exchangeRates: ExchangeRates;
  formattedEntityName: (entidad: string) => string;
  historicalRates: HistoricalExchangeRates | null;
}

const ExchangeRateCards: React.FC<ExchangeRateCardsProps> = React.memo(
  ({ exchangeRates, formattedEntityName, historicalRates }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(exchangeRates).map(([entidad, data]) => (
          <DollarQuoteCard
            key={entidad}
            entidad={formattedEntityName(entidad)}
            compra={data?.compra || 0} 
            venta={data?.venta || 0}
            referencial={entidad === 'bcp' ? data?.referencial_diario : undefined}
            historicalData={historicalRates ? historicalRates[entidad] : undefined}
          />
        ))}
      </div>
    );
  }
);

export default ExchangeRateCards;
