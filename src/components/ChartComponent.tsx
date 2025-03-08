import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgCategoryAxisOptions, AgChartOptions } from "ag-charts-community";

interface IData {
  [key: string]: string | number;
}

interface ChartComponentProps {
  data: IData[];
  xKey: string;
  yKeys: { key: string; name: string; type: "bar" | "line" }[];
  title?: string;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  xKey,
  yKeys,
  title,
}) => {
  const [options, setOptions] = useState<AgChartOptions>({
    data: [],
    series: [],
    title: { text: title || "Chart", enabled: !!title },
  });

  useEffect(() => {
    if (data.length > 0) {
      setOptions({
        data,
        series: yKeys.map(({ key, name, type }) => ({
          type,
          xKey,
          yKey: key,
          yName: name,
          stacked: false,
          marker: type === "line" ? { enabled: true } : undefined,
          strokeWidth: type === "line" ? 2 : undefined,
        })),
        axes: [
          {
            type: "category",
            position: "bottom",
          } as AgCategoryAxisOptions,
          {
            type: "category",
            position: "bottom",
            title: { text: xKey },
            interval: { values: [10] },
          }, // Dynamic X-axis
          { type: "number", position: "left", title: { text: "Values" } },
        ],
        legend: { position: "bottom" },
      });
    }
  }, [data, xKey, yKeys, title]);

  return <AgCharts options={options} />;
};

export default ChartComponent;
