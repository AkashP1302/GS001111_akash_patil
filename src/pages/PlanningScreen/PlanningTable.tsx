import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  CellClassRules,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
} from "ag-grid-community";
import "./styles.css";
import NumericEditor from "../../components/NumericEditor";
import useExcelData from "../../hooks/useExcelData";

ModuleRegistry.registerModules([AllCommunityModule]);

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const PlanningScreen: React.FC = () => {
  const sheetName = "Calculations";
  const excelData = useExcelData("/GSIV25 - Sample Data.xlsx", sheetName);
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (excelData && excelData.length > 0) {
      setRowData(excelData);
      setLoading(false);
    }
  }, [excelData]);
  const ragCellClassRules: CellClassRules = {
    "rag-green": (params) => {
      return params.value > 50;
    },
    "rag-yellow ": (params) => params.value >= 10 && params.value < 40,
    "rag-orange": (params) => params.value > 5 && params.value < 10,
    "rag-red": (params) => params.value <= 5,
  };

  const weeks = Array.from(
    new Set(excelData.filter((row) => row.week).map((row) => row.week))
  ).sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));

  // Group weeks into months dynamically (each month contains 5 weeks)
  const weekGroups: ColGroupDef[] = [];
  weeks.forEach((week, index) => {
    const monthIndex = Math.floor(index / 5); // Every 5 weeks, switch to next month
    const monthName = monthNames[monthIndex] || "Other";

    // Find existing month group or create a new one
    let monthGroup = weekGroups.find((group) => group.headerName === monthName);
    if (!monthGroup) {
      monthGroup = { headerName: monthName, children: [] };
      weekGroups.push(monthGroup);
    }

    // Add week columns inside the month group
    monthGroup.children.push({
      headerName: week,
      field: `week_${week}`,
      children: [
        {
          headerName: "Sales Units",
          field: `sales_units`,
          editable: true,
          cellEditor: NumericEditor,
          type: "numericColumn",
        },
        {
          headerName: "Sales $",
          valueGetter: (params) => {
            return params.data.sales_units * params.data.sales_dollars;
          },
          valueFormatter: (params) => {
            return `$${params.value?.toFixed(2)}`;
          },
        },
        {
          headerName: "GM $",
          valueGetter: (params) =>
            params.data.gm_dollars * params.data.sales_dollars -
            params.data.gm_dollars * params.data.cost_dollars,
          valueFormatter: (params) => `$${params.value?.toFixed(2)}`,
        },
        {
          headerName: "GM %",
          valueGetter: (params: any) => {
            const salesUnits = params.data.sales_units ?? 0;
            const salesDollars = params.data.sales_dollars ?? 0;
            const cost = params.data.cost_dollars ?? 0;
            const gmDollars = salesDollars - cost;
            const gmPercentage =
              salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;

            return gmPercentage.toFixed(2);
          },
          valueFormatter: (params: any) => `${params.value}%`,
          cellClassRules: ragCellClassRules,
        },
      ],
    });
  });

  // Final Column Definitions
  const columnDefs: (ColDef | ColGroupDef)[] = [
    { headerName: "Store", field: "store", pinned: "left" },
    { headerName: "SKU", field: "sku", pinned: "left" },
    ...weekGroups,
  ];

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{
            editable: false,
            flex: 1,
            minWidth: 100,
          }}
          rowModelType="clientSide"
        />
      )}
    </div>
  );
};

export default PlanningScreen;
