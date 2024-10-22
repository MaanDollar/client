"use client";

import Contents from "@/components/Contents";
import { MOCK_STOCK_PORTFOLIO } from "@/types/Stock";
import { useMemo } from "react";
import ProtfolioSummary from "./PortfolioSummary";
import PortfolioDetails from "./PortfolioDetails";
import { Divider } from "@mui/joy";

const Page = () => {
  const portfolio = useMemo(
    () =>
      MOCK_STOCK_PORTFOLIO.sort((a, b) => {
        return b.priceCurrent * b.amount - a.priceCurrent * a.amount;
      }),
    []
  );

  return (
    <>
      <Contents>
        <div style={{ height: "1rem" }} />
        <ProtfolioSummary portfolio={portfolio} />
        <div style={{ height: "1rem" }} />
        <Divider />
        <div style={{ height: "1rem" }} />
        <PortfolioDetails portfolio={portfolio} />
      </Contents>
    </>
  );
};

export default Page;
