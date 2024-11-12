import React, { useCallback, useState } from 'react';
import useExchangeRates from '../hooks/useExchangeRates';
import useExchangeHistorical from '../hooks/useExchangeHistorical';
import useExchangeRatesByProvider from '../hooks/useExchangeRatesByProvider';
import { Badge } from '@/components/ui/badge';
import SkeletonDollarQuoteCard from './SkeletonDollarQuoteCard';
import SkeletonMultiplier from './SkeletonMultiplier';
import ExchangeRateCards from './ExchangeRateCards';
import ExchangeRateCharts from './ExchangeRateCharts';
import GraficoLineal from './GraficoLineal';
import MultiplierInput from './MultiplierInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const ExchangeRateList: React.FC = () => {
  const { exchangeRates, updated, loading } = useExchangeRates();
  const { historicalRates } = useExchangeHistorical();

  const [multiplier, setMultiplier] = useState<number>(1); 
  const [selectedProvider, setSelectedProvider] = useState<string>('bcp'); 
  const { ratesByProvider } = useExchangeRatesByProvider(selectedProvider);

  // Formateo de nombres de entidades
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
      <>
        <SkeletonMultiplier />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(9)].map((_, index) => (
            <SkeletonDollarQuoteCard key={index} />
          ))}
        </div>
      </>
    );
  }

  const chartData = Object.entries(exchangeRates).map(([entidad, data]) => ({
    entidad: formattedEntityName(entidad),
    compra: data?.compra || 0,
    venta: data?.venta || 0,
  }));

  // Manejador de cambio de proveedor en el `Select`
  const handleProviderChange = (value: string) => {
    setSelectedProvider(value);
  };

  return (
    <>
      <MultiplierInput multiplier={multiplier} onMultiplierChange={setMultiplier} />
      {updated && (
        <div className="text-center mt-4 mb-4">
          <span className="text-gray-900 dark:text-gray-200">
            <Badge variant="outline">
              Última actualización: {new Date(updated).toLocaleString()}
            </Badge>
          </span>
        </div>
      )}

      <ExchangeRateCards
        exchangeRates={exchangeRates}
        originalExchangeRates={exchangeRates}
        formattedEntityName={formattedEntityName}
        historicalRates={historicalRates}
        multiplier={multiplier}
      />

      <ExchangeRateCharts chartData={chartData} />

      <div className="my-4 mt-15">
        <Select onValueChange={handleProviderChange} defaultValue={selectedProvider}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona un proveedor" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(exchangeRates).map((provider) => (
              <SelectItem key={provider} value={provider}>
                {formattedEntityName(provider)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-4">   
        Historico por Entidad 
      </h1>
      <GraficoLineal data={ratesByProvider} interval={10}  />
    </>
  );
};

export default ExchangeRateList;