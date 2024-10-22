"use client";

import { MockStockResponse } from "@/types/Stock";
import { Stack, Typography, Box, styled } from "@mui/joy";
import {
  DefaultizedPieValueType,
  PieChart,
  pieArcLabelClasses,
} from "@mui/x-charts";
import NumberFlow from "@number-flow/react";
import { useState, useEffect, useMemo } from "react";

const ChartContainer = styled("div")`
  width: 50%;
  max-width: 12rem;
  aspect-ratio: 1;
`;

const ChartLegendRow = styled(Stack)`
  padding: 0.25rem 0;
`;

interface Props {
  portfolio: MockStockResponse[];
}

const ProtfolioSummary = ({ portfolio }: Props) => {
  const [flag, setFlag] = useState(false);

  const total = portfolio.reduce((acc, stock) => {
    return acc + stock.priceCurrent * stock.amount;
  }, 0);

  const totalBought = portfolio.reduce((acc, stock) => {
    return acc + stock.priceBought * stock.amount;
  }, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

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
              <NumberFlow
                value={flag ? ((total - totalBought) / totalBought) * 100 : 0}
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
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Box
                  sx={{
                    width: "0.5rem",
                    height: "0.5rem",
                    bgcolor: stock.color,
                  }}
                />
                <Typography
                  level="body-sm"
                  noWrap
                  sx={{
                    flex: 1,
                    minWidth: 0,
                  }}
                >
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
    </>
  );
};

export default ProtfolioSummary;
