import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { CellClassRules, CellStyleModule, ColDef } from "ag-grid-community";
import useExcelData from "../../hooks/useExcelData";
import NumericEditor from "../../components/NumericEditor";
import {
  ClientSideRowModelModule,
  CustomEditorModule,
  ModuleRegistry,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";
import "./styles.css";
ModuleRegistry.registerModules([
  TextEditorModule,
  TextFilterModule,
  CustomEditorModule,
  ClientSideRowModelModule,
  ValidationModule,
  CellStyleModule,
]);

interface RowData {
  [key: string]: string | number;
}

const generateColumnDefs = (formData: RowData[]) => {
  if (!formData.length) return [];

  // Extract unique weeks from the dataset
  const weeks = Array.from(new Set(formData.map((row) => row.week)));

  // Base pinned columns
  const columnDefs: ColDef<RowData>[] = [
    { headerName: "Store", field: "store", pinned: "left" },
    { headerName: "SKU", field: "sku", pinned: "left" },
  ];
  const ragCellClassRules: CellClassRules = {
    "rag-green": (params) => params.value > 50,
    "rag-yellow ": (params) => params.value >= 10 && params.value < 40,
    "rag-orange": (params) => params.value > 5 && params.value < 10,
    "rag-red": (params) => params.value <= 5,
  };
  // Generate week-wise columns dynamically
  weeks.forEach((week) => {
    const weekColumn = {
      headerName: `Week ${week}`,
      children: [
        {
          headerName: "Sales Units",
          field: `sales_units_${week}`,
          editable: true,
          cellEditor: NumericEditor,
          type: "numericColumn",
          valueGetter: (params: any) => {
            return params.data.sales_units ?? 0;
          },
        },
        {
          headerName: "Sales $",
          field: `sales_dollars_${week}`,
          valueGetter: (params: any) => params.data.sales_dollars ?? 0,
          valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
        },
        {
          headerName: "GM $",
          valueGetter: (params: any) => {
            const salesUnits = params.data.sales_units ?? 0;
            const salesDollars = params.data.sales_dollars ?? 0;
            const cost = params.data.cost_dollars ?? 0;
            return salesDollars - cost;
          },
          valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
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
    };

    columnDefs.push(weekColumn as ColDef<RowData>);
  });

  return columnDefs;
};

const PlanningScreen: React.FC = () => {
  const sheetName = "Calculations";
  const excelData = useExcelData("/GSIV25 - Sample Data.xlsx", sheetName);
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef<RowData>[]>([]);

  useEffect(() => {
    if (excelData.length > 0) {
      setColumnDefs(generateColumnDefs(excelData));

      // Format row data
      const formattedData: RowData[] = excelData.map((row: any) => {
        const formattedRow: RowData = {};
        for (const key in row) {
          formattedRow[key] = isNaN(Number(row[key]))
            ? row[key]
            : Number(row[key]);
        }
        return formattedRow;
      });

      setRowData(formattedData);
    }
  }, [excelData]);

  if (!excelData || excelData.length === 0 || !columnDefs) {
    return <div>Loading Excel Data...</div>;
  }

  const onCellValueChanged = (params: any) => {
    const columnId = params.column.getColId(); // Get the column ID
    if (columnId === `sales_units_${params.data.week}`) {
      const updatedRowData = rowData.map((row) =>
        row.sku === params.data.sku
          ? { ...row, [columnId]: params.newValue } // Dynamic key update
          : row
      );
      setRowData(updatedRowData);
    }
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
      {columnDefs.length > 0 && (
        <AgGridReact<RowData>
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{ flex: 1, minWidth: 100 }}
          onCellValueChanged={onCellValueChanged}
        />
      )}
    </div>
  );
};

export default PlanningScreen;
