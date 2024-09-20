// GraficoLineal.tsx

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
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
  return (
    <Card>
      <CardHeader>
        
      </CardHeader>
      <CardContent>
        {/* Aquí envolvemos el gráfico con ChartContainer */}
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="fecha"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                  })
                }
              />
              <YAxis domain={['auto', 'auto']} />
              {/* Usamos ChartTooltip dentro del contexto de ChartContainer */}
              <Tooltip content={<ChartTooltipContent />} />
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
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tendencia actual <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Mostrando datos de compra y venta
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default React.memo(GraficoLineal);
