import React from 'react';
import GraficoBarra from './GraficoBarra';
import GraficoLienal from './GraficoLineal';

interface ChartData {
  entidad: string;
  compra: number;
  venta: number;
}

interface ExchangeRateChartsProps {
  chartData: ChartData[];
}

const ExchangeRateCharts: React.FC<ExchangeRateChartsProps> = React.memo(({ chartData }) => {
  return (
    <div className="mt-8 flex flex-col lg:flex-row justify-center">
      <div className="w-full max-w-xl min-h-max">
        <GraficoBarra data={chartData} />
      </div>
      
    </div>
  );
});

export default ExchangeRateCharts;
