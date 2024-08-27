import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DollarQuoteCardProps {
  compra: number;
  venta: number;
  entidad: string;
  referencial?: number; // Prop opcional para mostrar solo si existe
}

const DollarQuoteCard: React.FC<DollarQuoteCardProps> = ({ compra, venta, entidad,referencial }) => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{entidad}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Compra:</span>
            <span className="text-2xl font-bold text-green-600 dark:text-green-400">₲{compra}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Venta:</span>
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">₲{venta}</span>
          </div>
          {referencial && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Referencial Diario:</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">${referencial.toFixed(2)}</span>
            </div>
          )}
          
        </div>
      </CardContent>
    </Card>
  );
};

export default DollarQuoteCard;
