"use client";

import { StockTemplateResponse } from "@/types/StockTemplate";
import { createContext, PropsWithChildren, useContext } from "react";

interface SiteContextType {
  stocks: StockTemplateResponse[] | null;
}

const SiteContext = createContext({ stocks: null } as SiteContextType);

interface SiteContextProviderProps {
  stocks: StockTemplateResponse[] | null;
}

export const SiteProvider = ({
  stocks,
  children,
}: PropsWithChildren<SiteContextProviderProps>) => {
  return (
    <SiteContext.Provider value={{ stocks }}>{children}</SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (context === undefined) {
    throw new Error("useSite must be used within a SiteProvider");
  }
  return context;
};
