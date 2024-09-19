
export interface ExchangeRate {
  compra: number;
  venta: number;
  referencial_diario?: number;
}

export interface ExchangeRates {
  [entidad: string]: ExchangeRate;
}

export interface ExchangeRateWithDate extends ExchangeRate {
  fecha: string;
}

export interface HistoricalExchangeRates {
  [entidad: string]: ExchangeRateWithDate[];
}
