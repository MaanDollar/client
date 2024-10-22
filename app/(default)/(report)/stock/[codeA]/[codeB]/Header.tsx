"use client";

import StockSelect from "@/components/StockSelect";
import StockSelectFromKnown from "@/components/StockSelectFromKnown";
import {
  MOCK_STOCK_OPTIONS,
  MockStockTemplateResponse,
} from "@/types/StockTemplate";
import { Typography, useTheme } from "@mui/joy";
import { Stack } from "@mui/material";
import { SparkLineChart } from "@mui/x-charts";
import NumberFlow from "@number-flow/react";
import { useRouter } from "next/navigation";

interface Props {
  stockA: MockStockTemplateResponse;
  stockB: MockStockTemplateResponse;
}

const Header = ({ stockA, stockB }: Props) => {
  const router = useRouter();
  const theme = useTheme();

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
          <SparkLineChart
            data={randomSparklineA}
            height={100}
            curve="natural"
            colors={[
              stockA.priceCurrent - stockA.priceYesterday > 0
                ? theme.palette.danger.plainColor
                : stockA.priceCurrent - stockA.priceYesterday < 0
                ? theme.palette.primary.plainColor
                : theme.palette.text.tertiary,
            ]}
          />
        </Stack>
        <Stack spacing={2} sx={{ minWidth: 0 }} flex="1">
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
          <SparkLineChart
            data={randomSparklineB}
            height={100}
            curve="natural"
            colors={[
              stockB.priceCurrent - stockB.priceYesterday > 0
                ? theme.palette.danger.plainColor
                : stockB.priceCurrent - stockB.priceYesterday < 0
                ? theme.palette.primary.plainColor
                : theme.palette.text.tertiary,
            ]}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Header;
