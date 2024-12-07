export interface StockTemplateResponse {
  code: string;
  name: string;
  close: number;
  previous_close: number;
  changes: number;
  color?: string;
}
