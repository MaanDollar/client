export interface MockStockResponse {
  code: string;
  name: string;
  amount: number;
  priceBought: number;
  priceCurrent: number;
  color?: string;
  addedAt: string;
}

export const MOCK_STOCK_PORTFOLIO: MockStockResponse[] = [
  {
    code: "005930",
    name: "삼성전자",
    amount: 12,
    priceBought: 80000,
    priceCurrent: 59000,
    color: "#0C4DA2",
    addedAt: "2024-10-20T00:00:00.000Z",
  },
  {
    code: "000660",
    name: "SK하이닉스",
    amount: 24,
    priceBought: 120000,
    priceCurrent: 190900,
    color: "#FF6347",
    addedAt: "2024-10-20T01:00:00.000Z",
  },
  {
    code: "035420",
    name: "NAVER",
    amount: 27,
    priceBought: 152500,
    priceCurrent: 176800,
    color: "#2DB400",
    addedAt: "2024-10-20T02:00:00.000Z",
  },
  {
    code: "035720",
    name: "카카오",
    amount: 51,
    priceBought: 89900,
    priceCurrent: 39400,
    color: "#F9E000",
    addedAt: "2024-10-20T03:00:00.000Z",
  },
  {
    code: "005380",
    name: "현대차",
    amount: 8,
    priceBought: 220000,
    priceCurrent: 237000,
    color: "#002C5F",
    addedAt: "2024-10-20T04:00:00.000Z",
  },
  {
    code: "051910",
    name: "LG화학",
    amount: 5,
    priceBought: 314000,
    priceCurrent: 330500,
    color: "#FF4500",
    addedAt: "2024-10-20T05:00:00.000Z",
  },
  {
    code: "207940",
    name: "삼성바이오로직스",
    amount: 3,
    priceBought: 800000,
    priceCurrent: 1091000,
    color: "#FFD700",
    addedAt: "2024-10-21T06:00:00.000Z",
  },
  {
    code: "068270",
    name: "셀트리온",
    amount: 7,
    priceBought: 189300,
    priceCurrent: 191700,
    color: "#FF6347",
    addedAt: "2024-10-21T07:00:00.000Z",
  },
  {
    code: "006400",
    name: "삼성SDI",
    amount: 4,
    priceBought: 430000,
    priceCurrent: 334500,
    color: "#4682B4",
    addedAt: "2024-10-21T08:00:00.000Z",
  },
];
