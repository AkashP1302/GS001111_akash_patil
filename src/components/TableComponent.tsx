import React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteIcon from "@mui/icons-material/Delete";

interface TableComponentProps {
  headers: string[];
  rows: { [key: string]: any }[];
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDrop?: (event: React.DragEvent<HTMLTableRowElement>, id: number) => void;
  isDraggable?: boolean;
  onDelete?: (id: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  headers,
  rows,
  onDragStart,
  onDrop,
  isDraggable = false, // Default: No dragging
  onDelete,
}) => {
  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {isDraggable && <TableCell></TableCell>}{" "}
              {/* Show drag handle column only if draggable */}
              {headers.map((header, index) => (
                <TableCell key={index}>
                  {header.replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                  {/* Capitalize each word */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.id || index} // Ensure unique keys
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => row.id && onDrop?.(event, row.id)}
              >
                {/* Delete Button */}
                <TableCell>
                  <Button
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => onDelete?.(row.id)}
                  />
                </TableCell>

                {/* Drag Handle (Only if draggable) */}
                {isDraggable && (
                  <TableCell>
                    <Box
                      draggable
                      onDragStart={(event) =>
                        row.id && onDragStart?.(event, row.id)
                      }
                      sx={{ cursor: "grab", display: "inline-block" }}
                    >
                      <DragIndicatorIcon />
                    </Box>
                  </TableCell>
                )}

                {/* Render dynamic row data */}
                {headers.map((header, colIndex) => (
                  <TableCell key={colIndex}>{row[header] || "-"}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
