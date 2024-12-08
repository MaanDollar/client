import { ApiResponse } from "@/types/Api";
import { StockOwnedResponse } from "@/types/Stock";
import { StockInterestedResponse } from "@/types/StockInterest";
import { StockPriceResponse } from "@/types/StockPrice";
import { StockTemplateResponse } from "@/types/StockTemplate";
import { axiosParams } from "@/utils/axios";
import axios from "axios";
import { cache } from "react";

let stockCache: StockTemplateResponse[] | null = null;
let stockCachedAt: Date | null = null;
const STOCK_CACHE_INTERVAL = 1000 * 60 * 5; // 5 minutes

export const listAllStocks = cache(
  async (): Promise<StockTemplateResponse[] | null> => {
    try {
      if (
        stockCache &&
        stockCachedAt &&
        new Date().getTime() - stockCachedAt.getTime() < STOCK_CACHE_INTERVAL
      ) {
        return stockCache;
      }
      const { data } = await axios.get<
        ApiResponse<{
          stocks: StockTemplateResponse[];
        }>
      >("/api/ai/stock_list/", axiosParams());
      if (data.status === "error") {
        throw new Error(data.message);
      }
      stockCache = data.stocks;
      stockCachedAt = new Date();
      return data.stocks;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
);

export const listPortfolio = cache(
  async (): Promise<StockOwnedResponse[] | null> => {
    try {
      const { data } = await axios.get<
        ApiResponse<{
          data: { stocks: StockOwnedResponse[] };
        }>
      >("/api/stock/owned/list/", axiosParams());
      if (data.status === "error") {
        throw new Error(data.message);
      }
      return data.data.stocks;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
);

export const listInterest = cache(
  async (): Promise<StockInterestedResponse[] | null> => {
    try {
      const { data } = await axios.get<
        ApiResponse<{
          data: { stocks: StockInterestedResponse[] };
        }>
      >("/api/stock/recommended/list/", axiosParams());
      if (data.status === "error") {
        throw new Error(data.message);
      }
      return data.data.stocks;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
);

export const listPriceDetails = cache(
  async (code: string): Promise<StockPriceResponse | null> => {
    try {
      const { data } = await axios.get<StockPriceResponse>(
        `/api/ai/price/${code}/`,
        axiosParams()
      );
      return data;
    } catch (e) {
      console.error(e);
      return null;
    }
  }
);
