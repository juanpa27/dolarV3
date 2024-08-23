import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Variantes usando cva para controlar los estilos del Card
const cardVariants = cva("rounded-lg shadow-lg transition-transform hover:scale-105", {
  variants: {
    variant: {
      default: "bg-white text-black",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-500 text-white",
      error: "bg-red-500 text-white",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

// Props para controlar las variantes, íconos y otros elementos
interface CustomCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  entityName: string;
  buyPrice: string;
  sellPrice: string;
  icon?: React.ReactNode; // Opción para agregar un ícono en la cabecera
}

export const CustomCard: React.FC<CustomCardProps> = ({ entityName, buyPrice, sellPrice, icon, variant, ...props }) => {
  return (
    <Card className={cn(cardVariants({ variant }), "w-full max-w-xs mx-auto shadow-lg")} {...props}>
      <CardHeader className="flex items-center justify-between bg-teal-500 p-4 text-white">
        <CardTitle className="text-lg">{entityName}</CardTitle>
        {icon && <div>{icon}</div>} {/* Opción para un ícono en la cabecera */}
      </CardHeader>
      <CardContent className="bg-teal-500 p-4 flex flex-col gap-4 text-white">
        <div className="flex justify-between">
          <span>Compra:</span>
          <span>₲ {buyPrice}</span>
        </div>
        <div className="flex justify-between">
          <span>Venta:</span>
          <span>₲ {sellPrice}</span>
        </div>
      </CardContent>
      <CardFooter className="bg-white text-teal-600 p-2 text-center">
        <span className="font-semibold">{entityName}</span>
      </CardFooter>
    </Card>
  );
};