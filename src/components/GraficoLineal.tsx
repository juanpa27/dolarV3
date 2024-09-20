import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface GraficoLinealProps {
  data: Array<{
    fecha: string;
    compra: number;
    venta: number;
  }>;
}

const chartConfig = {
  compra: {
    label: 'Compra',
    color: 'hsl(var(--chart-1))',
  },
  venta: {
    label: 'Venta',
    color: 'hsl(var(--chart-2))',
  },
};

const GraficoLineal: React.FC<GraficoLinealProps> = ({ data }) => {
  console.log(data);
  return (
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{
                left: 0,
                right: 50,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="fecha"
                tickLine={true}
                axisLine={true}
                tickMargin={3}
                interval={1}
                tickFormatter={(value) => {
                  const [day, month] = value.split("/"); 
                  return `${day}/${month}`;              
                }}
              />
              <YAxis domain={['auto', 'auto']} />
            
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Line
                dataKey="compra"
                type="monotone"
                stroke={chartConfig.compra.color}
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="venta"
                type="monotone"
                stroke={chartConfig.venta.color}
                strokeWidth={2}
                dot={false}
              />
              
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
  );
};

export default React.memo(GraficoLineal);