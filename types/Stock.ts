export interface StockOwnedResponse {
  id: number;
  code: string;
  quantity: number;
  price: string;
}

export interface StockOwnedResponseWithData {
  id: number;
  code: string;
  name: string;
  quantity: number;
  priceBought: number;
  priceCurrent: number;
  color?: string;
}
