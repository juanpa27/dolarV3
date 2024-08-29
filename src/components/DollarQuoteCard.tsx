import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSpring, animated } from '@react-spring/web';

interface DollarQuoteCardProps {
  compra: number;
  venta: number;
  entidad: string;
  referencial?: number; // Prop opcional para mostrar solo si existe
}

const DollarQuoteCard: React.FC<DollarQuoteCardProps> = ({ compra, venta, entidad,referencial }) => {
  const compraSpring = useSpring({ number: compra, from: { number: 0 }, config: { tension: 120, friction: 14 } });
  const ventaSpring = useSpring({ number: venta, from: { number: 0 }, config: { tension: 120, friction: 14 } });
  const referencialSpring = useSpring({ number: referencial || 0, from: { number: 0 }, config: { tension: 120, friction: 14 } });

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{entidad}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex justify-between items-center w-full justify-start" >
            <span className="text-sm font-medium">Compra:</span>
              <animated.span className="text-4xl font-bold digital-font text-green-600 dark:text-green-400">
                {compraSpring.number.to((n) => `₲${n.toFixed(0)}`)}
              </animated.span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Venta:</span>
              <animated.span className="text-4xl font-bold digital-font text-red-600 dark:text-red-400">
                {ventaSpring.number.to((n) => `₲${n.toFixed(0)}`)}
              </animated.span>
          </div>
          {referencial !== undefined && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Referencial Diario:</span>
              <animated.span className="text-4xl font-bold digital-font text-blue-600 dark:text-blue-400">
                {referencialSpring.number.to((n) => `₲${n.toFixed(2)}`)}
              </animated.span>
            </div>
          )}
          
        </div>
      </CardContent>
    </Card>
  );
};

export default DollarQuoteCard;
