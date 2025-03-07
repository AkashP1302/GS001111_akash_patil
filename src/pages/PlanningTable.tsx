// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";
// import React, { useState } from "react";
// import { AgGridReact } from "ag-grid-react";
// import { ColDef, ColGroupDef } from "ag-grid-community";
// import NumericEditor from "../components/NumericEditor";
// import {
//   ClientSideRowModelModule,
//   CustomEditorModule,
//   ModuleRegistry,
//   TextEditorModule,
//   TextFilterModule,
//   ValidationModule,
// } from "ag-grid-community";

// ModuleRegistry.registerModules([
//   TextEditorModule,
//   TextFilterModule,
//   CustomEditorModule,
//   ClientSideRowModelModule,
//   ValidationModule /* Development Only */,
// ]);

// interface RowData {
//   store: string; // Changed from number
//   sku: string; // Changed from number
//   price: number;
//   cost: number;
//   sales_units: number;
// }

// const PlanningScreen: React.FC = () => {
//   const [rowData, setRowData] = useState<RowData[]>([
//     { store: "Store A", sku: "SKU1", price: 20, cost: 10, sales_units: 10 },
//     { store: "Store A", sku: "SKU2", price: 30, cost: 15, sales_units: 5 },
//   ]);

//   const defaultColDef: ColDef<RowData> = {
//     editable: true,
//     flex: 1,
//     minWidth: 100,
//   };

//   const onCellValueChanged = (params: any) => {
//     if (params.column.getColId() === "sales_units") {
//       const updatedRowData = rowData.map((row) =>
//         row.sku === params.data.sku
//           ? { ...row, sales_units: params.newValue }
//           : row
//       );
//       setRowData(updatedRowData);
//     }
//   };

//   const columnDefs: (ColDef<RowData> | ColGroupDef<RowData>)[] = [
//     { headerName: "Store", field: "store", pinned: "left" },
//     { headerName: "SKU", field: "sku", pinned: "left" },
//     {
//       headerName: "January",
//       children: [
//         {
//           headerName: "Week -1",
//           children: [
//             {
//               headerName: "Sales Units",
//               field: "sales_units",
//               editable: true,
//               cellEditor: NumericEditor,
//               type: "numericColumn",
//             },
//             {
//               headerName: "Sales $",
//               //   valueGetter: (params) =>
//               //     params.data?.sales_units * params.data?.price ?? 0,
//               valueGetter: (params) => {
//                 const salesUnits = params.data?.sales_units ?? 0;
//                 const price = params.data?.price ?? 0;
//                 return salesUnits * price;
//               },
//               valueFormatter: (params) => `$${params.value?.toFixed(2)}`,
//             },
//             {
//               headerName: "GM $",
//               valueGetter: (params) =>
//                 (params.data?.sales_units ?? 0) * (params.data?.price ?? 0) -
//                 (params.data?.sales_units ?? 0) * (params.data?.cost ?? 0),
//               valueFormatter: (params) => `$${params.value?.toFixed(2)}`,
//             },
//             {
//               headerName: "GM %",
//               valueGetter: (params) => {
//                 const salesDollars =
//                   (params.data?.sales_units ?? 0) * (params.data?.price ?? 0);
//                 const gmDollars =
//                   salesDollars -
//                   (params.data?.sales_units ?? 0) * (params.data?.cost ?? 0);
//                 return salesDollars !== 0 ? gmDollars / salesDollars : 0;
//               },
//               valueFormatter: (params) => `${(params.value * 100).toFixed(2)}%`,
//             },
//           ],
//         },
//         {
//           headerName: "Week -2",
//           children: [
//             {
//               headerName: "Sales Units",
//               field: "sales_units",
//               editable: true,
//               cellEditor: NumericEditor,
//               type: "numericColumn",
//             },
//             {
//               headerName: "Sales $",
//               //   valueGetter: (params) =>
//               //     params.data?.sales_units * params.data?.price ?? 0,
//               valueGetter: (params) => {
//                 const salesUnits = params.data?.sales_units ?? 0;
//                 const price = params.data?.price ?? 0;
//                 return salesUnits * price;
//               },
//               valueFormatter: (params) => `$${params.value?.toFixed(2)}`,
//             },
//             {
//               headerName: "GM $",
//               valueGetter: (params) =>
//                 (params.data?.sales_units ?? 0) * (params.data?.price ?? 0) -
//                 (params.data?.sales_units ?? 0) * (params.data?.cost ?? 0),
//               valueFormatter: (params) => `$${params.value?.toFixed(2)}`,
//             },
//             {
//               headerName: "GM %",
//               valueGetter: (params) => {
//                 const salesDollars =
//                   (params.data?.sales_units ?? 0) * (params.data?.price ?? 0);
//                 const gmDollars =
//                   salesDollars -
//                   (params.data?.sales_units ?? 0) * (params.data?.cost ?? 0);
//                 return salesDollars !== 0 ? gmDollars / salesDollars : 0;
//               },
//               valueFormatter: (params) => `${(params.value * 100).toFixed(2)}%`,
//             },
//           ],
//         },
//       ],
//     },
//   ];

//   return (
//     <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
//       <AgGridReact<RowData>
//         columnDefs={columnDefs}
//         rowData={rowData}
//         defaultColDef={defaultColDef}
//         onCellValueChanged={onCellValueChanged}
//       />
//     </div>
//   );
// };

// export default PlanningScreen;

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import useExcelData from "../hooks/useExcelData";
import NumericEditor from "../components/NumericEditor";
import {
  ClientSideRowModelModule,
  CustomEditorModule,
  ModuleRegistry,
  TextEditorModule,
  TextFilterModule,
  ValidationModule,
} from "ag-grid-community";

ModuleRegistry.registerModules([
  TextEditorModule,
  TextFilterModule,
  CustomEditorModule,
  ClientSideRowModelModule,
  ValidationModule /* Development Only */,
]);

interface RowData {
  [key: string]: string | number;
}

const generateColumnDefs = (formData: RowData[]) => {
  if (!formData.length) return [];

  console.log("Received Form Data:", formData[0]);

  // Extract unique weeks from the dataset
  const weeks = Array.from(new Set(formData.map((row) => row.Week)));

  // Base pinned columns
  const columnDefs: ColDef<RowData>[] = [
    { headerName: "Store", field: "Store", pinned: "left" },
    { headerName: "SKU", field: "SKU", pinned: "left" },
  ];

  // Generate week-wise columns dynamically
  weeks.forEach((week) => {
    const weekColumn = {
      headerName: `Week ${week}`,
      children: [
        {
          headerName: "Sales Units",
          field: `salesUnits_${week}`, // Adjusted field naming
          editable: true,
          cellEditor: NumericEditor,
          type: "numericColumn",
          valueGetter: (params: any) => params.data.salesUnits ?? 0,
        },
        {
          headerName: "Sales $",
          field: `salesDollars_${week}`,
          valueGetter: (params: any) => params.data.salesDollars ?? 0,
          valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
        },
        {
          headerName: "GM $",
          valueGetter: (params: any) => {
            const salesUnits = params.data?.salesUnits ?? 0;
            const salesDollars = params.data?.salesDollars ?? 0;
            const cost = params.data?.cost ?? 0;
            // SalesDollars – Sales Units * Cost
            return salesDollars - salesUnits * cost;
          },
          valueFormatter: (params: any) => `$${params.value?.toFixed(2)}`,
        },
        {
          headerName: "GM %",
          valueGetter: (params: any) => {
            const salesUnits = params.data?.salesUnits ?? 0;
            const salesDollars = params.data?.salesDollars ?? 0;
            const cost = params.data?.cost ?? 0;

            const gmDollars = salesUnits * salesDollars - salesUnits * cost;
            return salesDollars !== 0 ? gmDollars / salesDollars : 0;
          },
          valueFormatter: (params: any) =>
            `${(params.value * 100).toFixed(2)}%`,
        },
      ],
    };

    columnDefs.push(weekColumn as ColDef<RowData>);
  });

  return columnDefs;
};

const PlanningScreen: React.FC = () => {
  const sheetName = "Calculations"; // Change this to the desired sheet
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

  const onCellValueChanged = (params: any) => {
    const columnId = params.column.getColId(); // Get the column ID
    if (columnId === `salesUnits_${params.data.Week}`) {
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
      <AgGridReact<RowData>
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{ flex: 1, minWidth: 100 }}
        onCellValueChanged={onCellValueChanged}
      />
    </div>
  );
};

export default PlanningScreen;
