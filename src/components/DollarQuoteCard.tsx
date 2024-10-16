import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSpring, animated } from "@react-spring/web";
import GraficoLineal from "./GraficoLineal";
import { ExchangeRateWithDate } from "../types/types";
import { useShareCard } from "../hooks/useShareCard";
import { ShareIcon } from "lucide-react";

interface DollarQuoteCardProps {
  compra: number;
  venta: number;
  entidad: string;
  referencial?: number;
  historicalData?: ExchangeRateWithDate[];
  originalCompra: number; // Valor original sin multiplicar
  originalVenta: number; // Valor original sin multiplicar
}

const DollarQuoteCard: React.FC<DollarQuoteCardProps> = ({
  compra,
  venta,
  entidad,
  referencial,
  historicalData,
  originalCompra,
  originalVenta,
}) => {
  const { handleShare } = useShareCard();

  const compraSpring = useSpring({
    number: compra,
    from: { number: 0 },
    config: { tension: 170, friction: 14 },
  });
  const ventaSpring = useSpring({
    number: venta,
    from: { number: 0 },
    config: { tension: 170, friction: 14 },
  });
  const referencialSpring = useSpring({
    number: referencial || 0,
    from: { number: 0 },
    config: { tension: 170, friction: 14 },
  });

  let chartData: Array<{ fecha: string; compra: number; venta: number }> = [];

  if (historicalData && historicalData.length > 0) {
    chartData = historicalData.map((item) => ({
      fecha: new Date(item.fecha).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      compra: item.compra,
      venta: item.venta,
    }));

    // Se añade valores originales del día de hoy para el gráfico (sin multiplicar)
    const today = new Date();
    chartData.push({
      fecha: today.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      compra: originalCompra, // Usar original sin multiplicar
      venta: originalVenta, // Usar original sin multiplicar
    });

    // Ordenar los datos por fecha
    chartData.sort((a, b) => {
      const dateA = new Date(a.fecha.split("/").reverse().join("-"));
      const dateB = new Date(b.fecha.split("/").reverse().join("-"));
      return dateA.getTime() - dateB.getTime();
    });
  }

  return (
    <Card id={`card-${entidad}`} className="relative w-full max-w-md">
      <CardHeader className="pb-2 flex justify-center text-center relative">
        <CardTitle className="text-3xl font-bold">{entidad}</CardTitle>
        {/* Botón de compartir posicionado dentro del header */}
        <button
          className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 z-10"
          onClick={() => handleShare(`card-${entidad}`, entidad)}
          aria-label={`Compartir cotización de ${entidad}`}
          title={`Compartir cotización de ${entidad}`}
        >
          <ShareIcon className="w-5 h-5" />
        </button>
      </CardHeader>
      <CardContent className="mb-12">
        <div className="grid gap-4">
          <div className="flex flex-col md:flex-row justify-start md:justify-between items-center w-full md:space-x-2 p-2">
            <span className="text-xl md:text-2xl font-bold">Compra:</span>
            <div className="flex items-baseline md:space-x-1 mt-2 md:mt-0">
              <span
                className="text-2xl md:text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400"
                style={{ fontFamily: "Arial, Roboto, sans-serif" }}
              >
                ₲
              </span>
              <animated.span className="text-2xl md:text-2xl lg:text-3xl font-bold digital-font text-blue-600 dark:text-blue-400">
                {compraSpring.number.to(
                  (n) =>
                    `${n.toLocaleString("es-ES", { minimumFractionDigits: 0 })}`
                )}
              </animated.span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-start md:justify-between items-center w-full md:space-x-2 p-2">
            <span className="text-xl md:text-2xl font-bold">Venta:</span>
            <div className="flex items-baseline md:space-x-1 mt-2 md:mt-0">
              <span
                className="text-2xl md:text-2xl lg:text-3xl font-bold digital-font text-red-600 dark:text-red-400"
                style={{ fontFamily: "Arial, Roboto, sans-serif" }}
              >
                ₲
              </span>
              <animated.span className="text-2xl md:text-2xl lg:text-3xl font-bold digital-font text-red-600 dark:text-red-400">
                {ventaSpring.number.to(
                  (n) =>
                    `${n.toLocaleString("es-ES", { minimumFractionDigits: 0 })}`
                )}
              </animated.span>
            </div>
          </div>

          {referencial !== undefined && (
            <div className="flex flex-col md:flex-row justify-start md:justify-between items-center w-full md:space-x-2 p-2">
              <span className="text-xl md:text-2xl font-bold">
                Ref. Diario:
              </span>
              <div className="flex items-baseline md:space-x-1 mt-2 md:mt-0">
                <span
                  className="text-2xl md:text-2xl lg:text-3xl font-bold digital-font text-green-600 dark:text-green-400"
                  style={{ fontFamily: "Arial, Roboto, sans-serif" }}
                >
                  ₲
                </span>
                <animated.span className="text-2xl md:text-2xl lg:text-3xl font-bold digital-font text-green-600 dark:text-green-400">
                  {referencialSpring.number.to(
                    (n) =>
                      `${n.toLocaleString("es-ES", {
                        minimumFractionDigits: 0,
                      })}`
                  )}
                </animated.span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      {chartData.length > 0 && (
        <div className="mt-4 mb-6">
          <GraficoLineal data={chartData} />
        </div>
      )}
    </Card>
  );
};

export default React.memo(DollarQuoteCard);