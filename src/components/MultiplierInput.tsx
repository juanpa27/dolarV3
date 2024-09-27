import React from 'react';
import { Input } from "@/components/ui/input";

type MultiplierInputProps = {
  multiplier: number | '';
  onMultiplierChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const MultiplierInput: React.FC<MultiplierInputProps> = ({ multiplier, onMultiplierChange }) => {
  return (
    <div className="flex justify-center mb-4">
      <Input
        type="number" // Acepta solo números
        value={multiplier}
        onChange={onMultiplierChange}
        placeholder="Multiplicar por..."
        className="text-lg"
      />
    </div>
  );
};

export default MultiplierInput;
