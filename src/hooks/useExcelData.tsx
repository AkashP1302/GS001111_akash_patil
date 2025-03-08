import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const useExcelData = (filePath: string, sheetName: string) => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch(filePath)
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });

        if (!workbook.SheetNames.includes(sheetName)) {
          console.error(`Sheet "${sheetName}" not found in ${filePath}`);
          return;
        }

        const sheet = workbook.Sheets[sheetName];

        // Convert sheet to JSON (auto-detects headers)
        const parsedData = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
          // raw: false,
        }) as any[][];

        if (!parsedData || parsedData.length < 2) {
          console.error("Sheet is empty or missing data.");
          return;
        }

        // Extract and normalize headers (first row)
        const headers = parsedData[0].map((h) =>
          String(h).trim().toLowerCase().replace(/\s+/g, "_")
        );

        console.log("Extracted Headers:", headers); // Debugging log

        // Map remaining rows dynamically
        const cleanedData = parsedData.slice(1).map((row) => {
          const rowData: Record<string, any> = {};
          row.forEach((value, index) => {
            rowData[headers[index]] = value;
          });
          return rowData;
        });

        console.log("Extracted & Normalized Data:", cleanedData);
        setData(cleanedData);
      })
      .catch((err) => console.error("Error loading file:", err));
  }, [filePath, sheetName]);

  return data;
};

export default useExcelData;
