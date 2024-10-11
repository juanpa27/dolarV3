import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MultiplierInputProps = {
  multiplier: number | '';
  onMultiplierChange: (value: number) => void;
};

const MultiplierInput: React.FC<MultiplierInputProps> = ({ multiplier, onMultiplierChange }) => {
  const [displayValue, setDisplayValue] = useState<string>(multiplier ? multiplier.toString() : '1');

  // Función para limpiar el valor (quitar los puntos)
  const cleanNumber = (value: string) => {
    return value.replace(/\./g, ''); // Elimina los puntos y convierte a número limpio
  };

  // Función para aplicar el separador de miles
  const formatWithThousandSeparator = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formato de miles (solo puntos)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    // Limpiar el valor ingresado
    let numericValue = cleanNumber(value);

    // Solo permitir números
    if (/^\d*$/.test(numericValue)) {
      if (numericValue === '') {
        // Si el campo está vacío, no modificar el valor visual (dejarlo vacío temporalmente)
        setDisplayValue('');
      } else {
        // Formatear con separadores de miles y actualizar el valor visual
        const formattedValue = formatWithThousandSeparator(numericValue);
        setDisplayValue(formattedValue);
        onMultiplierChange(parseFloat(numericValue));
      }
    }
  };

  // Si el usuario deja el campo vacío y pierde el foco, restablecer a "1"
  const handleInputBlur = () => {
    if (displayValue === '') {
      setDisplayValue('1');
      onMultiplierChange(1);
    }
  };

  return (
    <div className="flex justify-center mb-4">
      <div className="w-full max-w-xs relative">
        <Label htmlFor="multiplier" className="sr-only">
          Multiplicar por
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-2xl text-muted-foreground pointer-events-none">
            $
          </span>
          <Input
            id="multiplier"
            type="text" 
            inputMode="numeric" 
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur} 
            placeholder="Dólar(es)"
            className="pl-6 text-2xl"
            minLength={1}
            maxLength={9}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiplierInput;