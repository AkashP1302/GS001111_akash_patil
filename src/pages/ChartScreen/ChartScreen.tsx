import React from "react";
import ChartComponent from "../../components/ChartComponent";
import useExcelData from "../../hooks/useExcelData";

const ChartScreen = () => {
  const sheetName = "Chart"; // Change this to the desired sheet
  const excelData = useExcelData("/GSIV25 - Sample Data.xlsx", sheetName);

  if (!excelData || excelData.length === 0) {
    return <div>Loading Excel Data...</div>;
  }
  const formattedData = excelData.map((item) => ({
    ...item,
    ["gm_%"]: item["gm_%"] * 100, // Convert 0.5847 → 58.47
  }));

  return (
    <div>
      <ChartComponent
        title="Weekly GM Dollars & GM%"
        data={formattedData}
        xKey="week"
        yKeys={[
          { key: "gm_dollars", name: "GM Dollars ($)", type: "bar" }, // ✅ GM Dollars as Bar
          { key: "sales_dollars", name: "GM %", type: "line" }, // ✅ GM % as Line
        ]}
      />
    </div>
  );
};

export default ChartScreen;
