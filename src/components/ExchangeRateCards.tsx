import React from 'react';
import DollarQuoteCard from './DollarQuoteCard';
import { ExchangeRates } from '../types/types'; // Asegúrate de que la ruta es correcta

interface ExchangeRateCardsProps {
  exchangeRates: ExchangeRates;
  formattedEntityName: (entidad: string) => string;
}

const ExchangeRateCards: React.FC<ExchangeRateCardsProps> = React.memo(({ exchangeRates, formattedEntityName }) => {
  return (
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
  );
});

export default ExchangeRateCards;
