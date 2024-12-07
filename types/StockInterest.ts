export interface StockInterestedResponse {
  id: number;
  code: string;
}

export interface StockInterestedResponseWithData {
  id: number;
  code: string;
  name: string;
  priceYesterday: number;
  priceCurrent: number;
  color?: string;
}
