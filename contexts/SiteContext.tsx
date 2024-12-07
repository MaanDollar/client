"use client";

import { StockOwnedResponse, StockOwnedResponseWithData } from "@/types/Stock";
import { StockTemplateResponse } from "@/types/StockTemplate";
import axios from "axios";
import { hsl, parseToHsl } from "polished";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
} from "react";

const NOTABLE_COLORS = {
  삼성: "#1428A0",
  현대: "#002C5F",
  LG: "#A50034",
  SK: "#FF0000",
  롯데: "#ED1C24",
  한화: "#FF8C00",
  포스코: "#0078A7",
  GS: "#1E90FF",
  두산: "#005BAC",
  CJ: "#FF8000",
  NAVER: "#03C75A",
  카카오: "#FFCD00",
  NHN: "#0095D9",
  넷마블: "#7621D7",
  엔씨소프트: "#6C6C6C",
};

interface SiteContextType {
  stocks: StockTemplateResponse[] | null;
  portfolio: StockOwnedResponseWithData[] | null;
}

const SiteContext = createContext({ stocks: null } as SiteContextType);

interface SiteContextProviderProps {
  stocks: StockTemplateResponse[] | null;
  portfolio: StockOwnedResponse[] | null;
}

export const SiteProvider = ({
  stocks,
  portfolio,
  children,
}: PropsWithChildren<SiteContextProviderProps>) => {
  useEffect(() => {
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.withCredentials = true;
    axios.defaults.withXSRFToken = true;
  }, []);

  const stocksWithColors = useMemo(() => {
    const randomColorByName = (name: string) => {
      const notableColor = Object.entries(NOTABLE_COLORS).find(([key]) =>
        name.includes(key)
      )?.[1];
      const hash = name
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
      if (notableColor) {
        const { hue, saturation, lightness } = parseToHsl(notableColor);
        const newLightness = lightness * (0.5 + (hash % 10) / 20);
        return hsl(hue, saturation, newLightness);
      }
      const hue = hash % 360;
      return hsl(hue, 0.5, 0.5);
    };

    return (
      stocks?.map((stock) => ({
        ...stock,
        color: randomColorByName(stock.name),
      })) || null
    );
  }, [stocks]);

  const convertedPortfolio = useMemo(() => {
    if (!stocksWithColors) return null;
    const stocksMap = new Map<string, StockTemplateResponse>();
    if (stocksWithColors) {
      stocksWithColors.forEach((stock) => {
        stocksMap.set(stock.code, stock);
      });
    }
    const ret =
      portfolio?.map(({ price, ...stock }) => {
        const template = stocksMap.get(stock.code)!;
        return {
          ...stock,
          name: template.name,
          priceBought: parseFloat(price),
          priceCurrent: template.close,
          color: template.color,
        };
      }) || null;
    return ret;
  }, [portfolio, stocksWithColors]);

  const contextValues = useMemo(
    () => ({
      stocks: stocksWithColors,
      portfolio: convertedPortfolio,
    }),
    [stocksWithColors, convertedPortfolio]
  );

  return (
    <SiteContext.Provider value={contextValues}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
};
