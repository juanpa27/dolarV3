import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type MultiplierInputProps = {
  multiplier: number | '';
  onMultiplierChange: (value: number) => void;
};

const MultiplierInput: React.FC<MultiplierInputProps> = ({ multiplier, onMultiplierChange }) => {
  const [displayValue, setDisplayValue] = useState<string>(multiplier.toString());

  // Función para limpiar el valor (quitar los puntos)
  const cleanNumber = (value: string) => {
    return value.replace(/\./g, ''); // Elimina los puntos y convierte a número limpio
  };

  // Función para aplicar el separador de miles
  const formatWithThousandSeparator = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Formato de miles (solo puntos)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    // Limpiar el valor ingresado
    const numericValue = cleanNumber(value);

    // Solo permitir números
    if (/^\d*$/.test(numericValue)) {
      const formattedValue = formatWithThousandSeparator(numericValue);
      setDisplayValue(formattedValue);

      
      onMultiplierChange(parseFloat(numericValue) || 0); // Enviar 0 si está vacío
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
            value={displayValue}
            onChange={handleInputChange}
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