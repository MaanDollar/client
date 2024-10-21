"use client";

import Contents from "@/components/Contents";
import { MOCK_STOCK_PORTFOLIO } from "@/types/Stock";
import { Box, Stack, styled, Typography } from "@mui/joy";
import {
  DefaultizedPieValueType,
  pieArcLabelClasses,
  PieChart,
} from "@mui/x-charts";
import NumberFlow from "@number-flow/react";
import { useEffect, useMemo, useState } from "react";

const ChartContainer = styled("div")`
  width: 50%;
  max-width: 12rem;
  aspect-ratio: 1;
`;

const ChartLegendRow = styled(Stack)`
  padding: 0.25rem 0;
`;

const Page = () => {
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const portfolio = useMemo(
    () =>
      MOCK_STOCK_PORTFOLIO.sort((a, b) => {
        return b.priceCurrent * b.amount - a.priceCurrent * a.amount;
      }),
    []
  );

  const total = portfolio.reduce((acc, stock) => {
    return acc + stock.priceCurrent * stock.amount;
  }, 0);

  const totalBought = portfolio.reduce((acc, stock) => {
    return acc + stock.priceBought * stock.amount;
  }, 0);

  const pieChartItems = useMemo(() => {
    return portfolio
      .map((stock) => ({
        id: stock.code,
        value: stock.priceCurrent * stock.amount,
        label: stock.name,
        color: stock.color,
      }))
      .sort((a, b) => b.value - a.value);
  }, [portfolio]);

  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / total;
    if (percent < 0.1) {
      return "";
    }
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <>
      <Contents>
        <div style={{ height: "1rem" }} />
        <Stack direction="row">
          <Stack flex="1">
            <Typography level="title-sm">보유 자산</Typography>
            <Typography level="title-lg">
              <NumberFlow
                value={flag ? total : 0}
                style={{
                  fontFeatureSettings: "'tnum'",
                }}
              />
              원
            </Typography>
          </Stack>
          <Stack flex="1">
            <Typography level="title-sm">평가손익</Typography>
            <Typography
              level="title-lg"
              color={
                total - totalBought > 0
                  ? "danger"
                  : total - totalBought < 0
                  ? "primary"
                  : undefined
              }
            >
              <NumberFlow
                value={flag ? total - totalBought : 0}
                style={{
                  fontFeatureSettings: "'tnum'",
                }}
              />
              원<br />
              <small>
                {total - totalBought > 0 ? "+" : ""}
                <NumberFlow
                  value={flag ? ((total - totalBought) / totalBought) * 100 : 0}
                  format={{
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }}
                  style={{
                    fontFeatureSettings: "'tnum'",
                  }}
                />
                %
              </small>
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ChartContainer>
            <PieChart
              series={[
                {
                  data: pieChartItems,
                  arcLabel: getArcLabel,
                },
              ]}
              slotProps={{
                legend: { hidden: true },
              }}
              sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                  fill: "white",
                  fontSize: 14,
                },
              }}
            />
          </ChartContainer>
          <Stack
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {portfolio.slice(0, 5).map((stock) => (
              <ChartLegendRow
                key={stock.code}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Box
                    sx={{
                      width: "0.5rem",
                      height: "0.5rem",
                      bgcolor: stock.color,
                    }}
                  />
                  <Typography level="body-sm" noWrap>
                    {stock.name}
                  </Typography>
                </Stack>
                <Typography level="body-sm" noWrap>
                  <NumberFlow
                    value={((stock.priceCurrent * stock.amount) / total) * 100}
                    format={{
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    }}
                    style={{
                      fontFeatureSettings: "'tnum'",
                    }}
                  />
                  %
                </Typography>
              </ChartLegendRow>
            ))}
          </Stack>
        </Stack>
      </Contents>
    </>
  );
};

export default Page;
