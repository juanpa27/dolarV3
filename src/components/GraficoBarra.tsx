import { Bar, BarChart, CartesianGrid, XAxis ,YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const chartConfig: ChartConfig = {
  compra: {
    label: "Compra",
    color: "hsl(var(--color-compra))", // Usando la variable CSS definida
  },
  venta: {
    label: "Venta",
    color: "hsl(var(--color-venta))", // Usando la variable CSS definida
  },
};

type GraficoBarraProps = {
  data: Array<{ entidad: string; compra: number; venta: number }>;
};

export default function GraficoBarra({ data }: GraficoBarraProps) {

  const filteredData = data.filter(item => item.compra > 0 || item.venta > 0);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Cotizaciones</CardTitle>
        <CardDescription>Compra y Venta</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={filteredData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="entidad"
              tickLine={false}
              tickMargin={10}
              axisLine={true}
              tickFormatter={(value) => value.slice(0, 3)}
            />
           <YAxis
              type="number"
              domain={[7000, 8000]}
              tickCount={3}
              tickFormatter={(value) => value.toFixed(0)}
              allowDataOverflow={true}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="compra" fill="#4ade80"  radius={4} />
            <Bar dataKey="venta"  fill="#f87171"  radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      
    </Card>
  );
}
