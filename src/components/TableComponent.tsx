import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface TableComponentProps {
  headers: string[];
  rows: { [key: string]: any }[];
  onDragStart?: (event: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDrop?: (event: React.DragEvent<HTMLTableRowElement>, id: number) => void;
  isDraggable?: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (updatedRow: { [key: string]: any }) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  headers,
  rows,
  onDragStart,
  onDrop,
  isDraggable = false,
  onDelete,
  onEdit,
}) => {
  const [tableData, setTableData] = useState(rows);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<{ [key: string]: any } | null>(
    null
  );

  useEffect(() => {
    setTableData(rows);
  }, [rows]);

  // Handle Page Change
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle Rows per Page Change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Open Modal for Editing
  const handleEdit = (row: { [key: string]: any }) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleSave = () => {
    if (selectedRow) {
      const updatedData = tableData.map((item) =>
        item.id === selectedRow.id ? selectedRow : item
      );

      setTableData(updatedData);
      onEdit?.(selectedRow);
      setOpenModal(false);
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Actions</TableCell>
              {headers.map((header, index) => (
                <TableCell key={index}>
                  {header.replace(/\b\w/g, (char) => char.toUpperCase())}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id || index}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => row.id && onDrop?.(event, row.id)}
                >
                  {/* Action Buttons */}
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onDelete?.(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    {isDraggable && (
                      <IconButton
                        draggable
                        onDragStart={(event: any) =>
                          row.id && onDragStart?.(event, row.id)
                        }
                        sx={{ cursor: "grab", ml: 1 }}
                      >
                        <DragIndicatorIcon />
                      </IconButton>
                    )}
                  </TableCell>

                  {/* Row Data */}
                  {headers.map((header, colIndex) => (
                    <TableCell key={colIndex}>{row[header] || "-"}</TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={tableData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Edit Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <h3>Edit Row</h3>
          {selectedRow && (
            <>
              {headers.map((header) => (
                <TextField
                  key={header}
                  label={header}
                  value={selectedRow[header] || ""}
                  onChange={(e) =>
                    setSelectedRow((prev) => ({
                      ...prev!,
                      [header]: e.target.value,
                    }))
                  }
                  fullWidth
                  margin="normal"
                  disabled={
                    header.toLowerCase() === "id" ||
                    header.toLowerCase() === "seq_no."
                  }
                />
              ))}

              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={() => setOpenModal(false)} color="secondary">
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  color="primary"
                  variant="contained"
                >
                  Save
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default TableComponent;
