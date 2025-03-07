import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const useExcelData = (filePath: string, sheetName: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });

        // Check if the requested sheet exists
        if (!workbook.SheetNames.includes(sheetName)) {
          console.error(`Sheet "${sheetName}" not found in ${filePath}`);
          return;
        }

        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet); // Convert sheet to JSON
        const cleanedData = parsedData.map((row: any) => ({
          Store: row["Store"],
          SKU: row["SKU"],
          Week: row["Week"],
          salesUnits: row["Sales Units"], // Remove space
          salesDollars: row["Sales Dollars"], // Remove space
        }));
        setData(cleanedData);
      })
      .catch((err) => console.error("Error loading file:", err));
  }, [filePath, sheetName]);

  return data;
};

export default useExcelData;
