"use client";

import { StockPriceResponse } from "@/types/StockPrice";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useEffect, useMemo, useRef } from "react";

interface Props {
  color?: string;
  price: StockPriceResponse | null;
}

const Sparkline = ({ color, price }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const data = useMemo(() => {
    if (!price) return [];
    return price.close_prices.map((close_price, index) => ({
      date: new Date(price.dates[index]),
      value: close_price,
    }));
  }, [price]);

  useEffect(() => {
    if (!containerRef.current) return;
    am4core.useTheme(am4themes_animated);
    const chart = am4core.create(containerRef.current, am4charts.XYChart);
    chart.padding(0, 0, 0, 0);
    chart.data = data;

    const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.grid.template.disabled = true;
    dateAxis.renderer.labels.template.disabled = true;
    dateAxis.start = 0;
    dateAxis.end = 1;

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.disabled = true;
    valueAxis.renderer.grid.template.disabled = true;
    valueAxis.renderer.baseGrid.disabled = true;

    const series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "value";
    series.strokeWidth = 2;
    series.tensionX = 0.8;
    series.fill = am4core.color(color);
    series.fillOpacity = 0.3;
    series.stroke = am4core.color(color);
    series.tooltipText = "{valueY.value}";

    const fillModifier = new am4core.LinearGradientModifier();
    fillModifier.opacities = [1, 0];
    fillModifier.offsets = [0, 1];
    fillModifier.gradient.rotation = 90;
    series.segments.template.fillModifier = fillModifier;

    return () => {
      chart.dispose();
    };
  }, [color, data]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default Sparkline;
