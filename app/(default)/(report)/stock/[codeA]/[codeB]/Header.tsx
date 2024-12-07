"use client";

import StockSelect from "@/components/StockSelect";
import StockSelectFromKnown from "@/components/StockSelectFromKnown";
import { useSite } from "@/contexts/SiteContext";
import { StockPriceResponse } from "@/types/StockPrice";
import { StockTemplateResponse } from "@/types/StockTemplate";
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
  stockA: StockTemplateResponse;
  stockB: StockTemplateResponse;
  priceA: StockPriceResponse | null;
  priceB: StockPriceResponse | null;
}

const Header = ({ stockA, stockB, priceA, priceB }: Props) => {
  const { stocks } = useSite();
  const router = useRouter();

  // TODO replace this with AI recommendations
  const availableOptions = (stocks || [])
    .filter((item) => item.code !== stockA.code)
    .slice(0, 5)
    .map((item) => item.code);

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
              stockA.close - stockA.previous_close > 0
                ? "danger"
                : stockA.close - stockA.previous_close < 0
                ? "primary"
                : undefined
            }
          >
            <NumberFlow
              value={stockA.close}
              style={{
                fontFeatureSettings: "'tnum'",
              }}
            />
            원<br />
            <small>
              <NumberFlow
                value={
                  ((stockA.close - stockA.previous_close) /
                    stockA.previous_close) *
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
              price={priceA}
              color={
                stockA.close - stockA.previous_close > 0
                  ? COLOR_DANGER
                  : stockA.close - stockA.previous_close < 0
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
              stockB.close - stockB.previous_close > 0
                ? "danger"
                : stockB.close - stockB.previous_close < 0
                ? "primary"
                : undefined
            }
          >
            <NumberFlow
              value={stockB.close}
              style={{
                fontFeatureSettings: "'tnum'",
              }}
            />
            원<br />
            <small>
              <NumberFlow
                value={
                  ((stockB.close - stockB.previous_close) /
                    stockB.previous_close) *
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
              price={priceB}
              color={
                stockB.close - stockB.previous_close > 0
                  ? COLOR_DANGER
                  : stockB.close - stockB.previous_close < 0
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
