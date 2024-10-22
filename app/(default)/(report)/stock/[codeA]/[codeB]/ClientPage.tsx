"use client";

import Contents from "@/components/Contents";
import { MockStockTemplateResponse } from "@/types/StockTemplate";
import { Stack, Typography } from "@mui/joy";
import { Divider } from "@mui/material";
import Header from "./Header";
import Newsroom from "./Newsroom";

interface Props {
  stockA: MockStockTemplateResponse;
  stockB: MockStockTemplateResponse;
}

const ClientPage = ({ stockA, stockB }: Props) => {
  const mockRelationCoeff = Math.round(Math.random() * 200 - 100);

  return (
    <Contents>
      <div style={{ height: "1rem" }} />
      <Header stockA={stockA} stockB={stockB} />
      <div style={{ height: "1rem" }} />
      <Divider />
      <div style={{ height: "1rem" }} />
      <Stack direction="row" justifyContent="space-between">
        <Typography level="title-lg">상관계수</Typography>
        <Typography
          level="title-lg"
          sx={{ fontSize: "3rem" }}
          color={
            mockRelationCoeff < 0
              ? "primary"
              : mockRelationCoeff > 0
              ? "danger"
              : undefined
          }
        >
          {mockRelationCoeff}
        </Typography>
      </Stack>
      <div style={{ height: "1rem" }} />
      <Divider />
      <div style={{ height: "1rem" }} />
      <Newsroom />
    </Contents>
  );
};

export default ClientPage;
