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
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface TableComponentProps {
  headers: string[];
  rows: Record<string, any>[]; // Use Record<string, any> to handle generic row data
  onDelete?: (id: number) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ headers, rows, onDelete }) => {
  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {headers.map((header, index) => (
                <TableCell key={index}>{header}</TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell>
                  <DragIndicatorIcon />
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                {Object.values(row).map((value, idx) =>
                  idx === 0 ? null : <TableCell key={idx}>{String(value)}</TableCell> // Convert to string
                )}
                <TableCell>
                  <Button color="error" startIcon={<DeleteIcon />} onClick={() => onDelete?.(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableComponent;
