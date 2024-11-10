"use client";

import StockSelect from "@/components/StockSelect";
import StockSelectFromKnown from "@/components/StockSelectFromKnown";
import {
  MOCK_STOCK_OPTIONS,
  MockStockTemplateResponse,
} from "@/types/StockTemplate";
import { styled, Typography } from "@mui/joy";
import { Stack } from "@mui/material";
import NumberFlow from "@number-flow/react";
import { useRouter } from "next/navigation";
import Sparkline from "./Sparkline";

const SpartlineContainer = styled("div")`
  height: 100px;
`;

const COLOR_PRIMARY = "#0b6bcb";
const COLOR_DANGER = "#e53e3e";
const COLOR_TEXT_TERTIARY = "#6b7280";

interface Props {
  stockA: MockStockTemplateResponse;
  stockB: MockStockTemplateResponse;
}

const Header = ({ stockA, stockB }: Props) => {
  const router = useRouter();

  const availableOptions = MOCK_STOCK_OPTIONS.filter(
    (item) => item.code !== stockA.code
  )
    .slice(0, 5)
    .map((item) => item.code);

  const randomSparklineA = Array.from(
    { length: 30 },
    () => Math.random() * 100
  );
  const randomSparklineB = Array.from(
    { length: 30 },
    () => Math.random() * 100
  );

  return (
    <>
      <Stack direction="row" spacing={4} sx={{ width: "100%" }}>
        <Stack spacing={2} sx={{ minWidth: 0 }} flex="1">
          <Typography level="title-lg">보유/관심 종목</Typography>
          <StockSelectFromKnown
            value={stockA}
            onChange={(value) => {
              if (!value) return;
              router.push(`/stock/${value.code}`);
            }}
          />
          <Typography
            level="title-lg"
            color={
              stockA.priceCurrent - stockA.priceYesterday > 0
                ? "danger"
                : stockA.priceCurrent - stockA.priceYesterday < 0
                ? "primary"
                : undefined
            }
          >
            <NumberFlow
              value={stockA.priceCurrent}
              style={{
                fontFeatureSettings: "'tnum'",
              }}
            />
            원<br />
            <small>
              <NumberFlow
                value={
                  ((stockA.priceCurrent - stockA.priceYesterday) /
                    stockA.priceYesterday) *
                  100
                }
                format={{
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }}
                style={{
                  fontFeatureSettings: "'tnum'",
                }}
              />
              %
            </small>
          </Typography>
          <SpartlineContainer>
            <Sparkline
              data={randomSparklineA}
              color={
                stockA.priceCurrent - stockA.priceYesterday > 0
                  ? COLOR_DANGER
                  : stockA.priceCurrent - stockA.priceYesterday < 0
                  ? COLOR_PRIMARY
                  : COLOR_TEXT_TERTIARY
              }
            />
          </SpartlineContainer>
        </Stack>
        <Stack spacing={2} sx={{ minWidth: 0 }} flex="1">
          <Typography level="title-lg">AI 추천 관련 종목</Typography>
          <StockSelect
            value={stockB}
            allowedCodes={availableOptions}
            onChange={(value) => {
              if (!value) return;
              router.push(`/stock/${stockA.code}/${value.code}`);
            }}
          />
          <Typography
            level="title-lg"
            color={
              stockB.priceCurrent - stockB.priceYesterday > 0
                ? "danger"
                : stockB.priceCurrent - stockB.priceYesterday < 0
                ? "primary"
                : undefined
            }
          >
            <NumberFlow
              value={stockB.priceCurrent}
              style={{
                fontFeatureSettings: "'tnum'",
              }}
            />
            원<br />
            <small>
              <NumberFlow
                value={
                  ((stockB.priceCurrent - stockB.priceYesterday) /
                    stockB.priceYesterday) *
                  100
                }
                format={{
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }}
                style={{
                  fontFeatureSettings: "'tnum'",
                }}
              />
              %
            </small>
          </Typography>
          <SpartlineContainer>
            <Sparkline
              data={randomSparklineB}
              color={
                stockB.priceCurrent - stockB.priceYesterday > 0
                  ? COLOR_DANGER
                  : stockB.priceCurrent - stockB.priceYesterday < 0
                  ? COLOR_PRIMARY
                  : COLOR_TEXT_TERTIARY
              }
            />
          </SpartlineContainer>
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
