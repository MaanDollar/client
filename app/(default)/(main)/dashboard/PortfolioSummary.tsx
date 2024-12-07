"use client";

import { StockOwnedResponseWithData } from "@/types/Stock";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Box, Stack, styled, Typography } from "@mui/joy";
import NumberFlow from "@number-flow/react";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartContainer = styled("div")`
  width: 50%;
  height: 16rem;
`;

const ChartLegendRow = styled(Stack)`
  padding: 0.25rem 0;
`;

interface Props {
  portfolio: StockOwnedResponseWithData[];
}

const PortfolioSummary = ({ portfolio }: Props) => {
  const [flag, setFlag] = useState(false);
  const pieChartContainerRef = useRef<HTMLDivElement>(null);

  const total = portfolio.reduce((acc, stock) => {
    return acc + stock.priceCurrent * stock.quantity;
  }, 0);

  const totalBought = portfolio.reduce((acc, stock) => {
    return acc + stock.priceBought * stock.quantity;
  }, 0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(true);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  const sortedPortfolio = useMemo(() => {
    return [...portfolio].sort(
      (a, b) => b.priceCurrent * b.quantity - a.priceCurrent * a.quantity
    );
  }, [portfolio]);

  const pieChartItems = useMemo(() => {
    return sortedPortfolio
      .map((stock) => ({
        id: stock.code,
        value: stock.priceCurrent * stock.quantity,
        label: stock.name,
        color: stock.color,
      }))
      .sort((a, b) => b.value - a.value);
  }, [sortedPortfolio]);

  useEffect(() => {
    if (!pieChartContainerRef.current) return;
    am4core.useTheme(am4themes_animated);
    const chart = am4core.create(
      pieChartContainerRef.current,
      am4charts.PieChart3D
    );
    chart.hiddenState.properties.opacity = 0;
    chart.data = pieChartItems;
    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.category = "label";
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
    series.colors.list = pieChartItems.map((item) => am4core.color(item.color));

    return () => {
      chart.dispose();
    };
  }, [pieChartItems]);

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
            {totalBought !== 0 && (
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
            )}
          </Typography>
        </Stack>
      </Stack>
      {totalBought !== 0 && (
        <Stack direction="row" alignItems="center">
          <ChartContainer ref={pieChartContainerRef} />
          <Stack
            sx={{
              flex: 1,
              minWidth: 0,
            }}
          >
            {sortedPortfolio.slice(0, 5).map((stock) => (
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
                    value={
                      ((stock.priceCurrent * stock.quantity) / total) * 100
                    }
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
      )}
    </>
  );
};

export default PortfolioSummary;
