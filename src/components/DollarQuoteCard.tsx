import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSpring, animated } from '@react-spring/web';
import GraficoLineal from './GraficoLineal';
import { ExchangeRateWithDate } from '../types/types';

interface DollarQuoteCardProps {
  compra: number;
  venta: number;
  entidad: string;
  referencial?: number;
  historicalData?: ExchangeRateWithDate[];
}

const DollarQuoteCard: React.FC<DollarQuoteCardProps> = ({
  compra,
  venta,
  entidad,
  referencial,
  historicalData,
}) => {
  const compraSpring = useSpring({ number: compra, from: { number: 0 }, config: { tension: 120, friction: 14 } });
  const ventaSpring = useSpring({ number: venta, from: { number: 0 }, config: { tension: 120, friction: 14 } });
  const referencialSpring = useSpring({ number: referencial || 0, from: { number: 0 }, config: { tension: 120, friction: 14 } });

  // Preparar los datos para el gráfico
  let chartData: Array<{ fecha: string; compra: number; venta: number }> = [];

  if (historicalData && historicalData.length > 0) {
    chartData = historicalData.map(item => ({
      fecha: item.fecha,
      compra: (item.compra),
      venta: (item.venta),
    }));

    // Ordenar los datos por fecha
    chartData.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2 flex justify-center text-center">
        <CardTitle className="text-3xl font-bold">{entidad}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-between items-center w-full">
            <span className="text-2xl font-bold">Compra:</span>
            <animated.span className="text-4xl font-bold digital-font text-green-600 dark:text-green-400">
              {compraSpring.number.to((n) => `₲${n.toFixed(0)}`)}
            </animated.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold">Venta:</span>
            <animated.span className="text-4xl font-bold digital-font text-red-600 dark:text-red-400">
              {ventaSpring.number.to((n) => `₲${n.toFixed(0)}`)}
            </animated.span>
          </div>
          {referencial !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">Ref. Diario:</span>
              <animated.span className="text-4xl font-bold digital-font text-blue-600 dark:text-blue-400">
                {referencialSpring.number.to((n) => `₲${n.toFixed(2)}`)}
              </animated.span>
            </div>
          )}
        </div>
       
      </CardContent>
    {chartData.length > 0 && (
      <div className="mt-4">
        <GraficoLineal data={chartData} />
      </div>
    )}
    </Card>
  );
};

export default React.memo(DollarQuoteCard);
