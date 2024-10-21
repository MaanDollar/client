export interface MockStockResponse {
  code: string;
  name: string;
  amount: number;
  priceBought: number;
  priceCurrent: number;
  color?: string;
}

export const MOCK_STOCK_PORTFOLIO: MockStockResponse[] = [
  {
    code: "005930",
    name: "삼성전자",
    amount: 12,
    priceBought: 80000,
    priceCurrent: 59000,
    color: "#0C4DA2",
  },
  {
    code: "000660",
    name: "SK하이닉스",
    amount: 24,
    priceBought: 120000,
    priceCurrent: 190900,
    color: "#FF6347",
  },
  {
    code: "035420",
    name: "NAVER",
    amount: 27,
    priceBought: 152500,
    priceCurrent: 176800,
    color: "#2DB400",
  },
  {
    code: "035720",
    name: "카카오",
    amount: 51,
    priceBought: 89900,
    priceCurrent: 39400,
    color: "#F9E000",
  },
  {
    code: "005380",
    name: "현대차",
    amount: 8,
    priceBought: 220000,
    priceCurrent: 237000,
    color: "#002C5F",
  },
  {
    code: "051910",
    name: "LG화학",
    amount: 5,
    priceBought: 314000,
    priceCurrent: 330500,
    color: "#FF4500",
  },
  {
    code: "207940",
    name: "삼성바이오로직스",
    amount: 3,
    priceBought: 800000,
    priceCurrent: 1091000,
    color: "#FFD700",
  },
  {
    code: "068270",
    name: "셀트리온",
    amount: 7,
    priceBought: 189300,
    priceCurrent: 191700,
    color: "#FF6347",
  },
  {
    code: "006400",
    name: "삼성SDI",
    amount: 4,
    priceBought: 430000,
    priceCurrent: 334500,
    color: "#4682B4",
  },
];
