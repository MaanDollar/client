export interface MockStockTemplateResponse {
  code: string;
  name: string;
  priceCurrent: number;
  color?: string;
}

export const MOCK_STOCK_OPTIONS: MockStockTemplateResponse[] = [
  {
    code: "005930",
    name: "삼성전자",
    priceCurrent: 59000,
    color: "#0C4DA2",
  },
  {
    code: "000660",
    name: "SK하이닉스",
    priceCurrent: 190900,
    color: "#FF6347",
  },
  {
    code: "035420",
    name: "NAVER",
    priceCurrent: 176800,
    color: "#2DB400",
  },
  {
    code: "035720",
    name: "카카오",
    priceCurrent: 39400,
    color: "#F9E000",
  },
  {
    code: "005380",
    name: "현대차",
    priceCurrent: 237000,
    color: "#002C5F",
  },
  {
    code: "051910",
    name: "LG화학",
    priceCurrent: 330500,
    color: "#FF4500",
  },
  {
    code: "207940",
    name: "삼성바이오로직스",
    priceCurrent: 1091000,
    color: "#FFD700",
  },
  {
    code: "068270",
    name: "셀트리온",
    priceCurrent: 191700,
    color: "#FF6347",
  },
  {
    code: "006400",
    name: "삼성SDI",
    priceCurrent: 334500,
    color: "#4682B4",
  },
  {
    code: "005490",
    name: "POSCO",
    priceCurrent: 369500,
    color: "#FF4500",
  },
  {
    code: "000270",
    name: "기아",
    priceCurrent: 85300,
    color: "#FF6347",
  },
  {
    code: "012330",
    name: "현대모비스",
    priceCurrent: 268500,
    color: "#002C5F",
  },
];
