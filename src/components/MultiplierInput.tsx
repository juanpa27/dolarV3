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

      // Convertir el valor limpio a número y enviarlo a la función de cambio
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
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
            $
          </span>
          <Input
            id="multiplier"
            type="text" // Cambiado a texto para permitir formato con puntos
            value={displayValue}
            onChange={handleInputChange}
            placeholder="Dólar(es)"
            className="pl-6 text-lg h-12"
            maxLength={9} // Limitar el tamaño del input si es necesario
            minLength={1}
          />
        </div>
      </div>
    </div>
  );
};

export default MultiplierInput;