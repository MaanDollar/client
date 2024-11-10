"use client";

import Contents from "@/components/Contents";
import { MockStockTemplateResponse } from "@/types/StockTemplate";
import { Card, Stack, Typography } from "@mui/joy";
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
      <Card sx={{ bgcolor: "white" }}>
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
            suppressHydrationWarning
          >
            {mockRelationCoeff}
          </Typography>
        </Stack>
      </Card>
      <div style={{ height: "1rem" }} />
      <Newsroom />
    </Contents>
  );
};

export default ClientPage;
