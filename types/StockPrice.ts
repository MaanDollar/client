export interface StockPriceResponse {
  stock_code: string;
  close_price: number;
  change_rate: number;
  dates: string[];
  close_prices: number[];
}
