import React from "react";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

const stores: Store[] = [
  { id: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { id: 2, name: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { id: 3, name: "Houston Harvest Market", city: "Houston", state: "TX" },
  { id: 4, name: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
];

const StoreScreen: React.FC = () => {
  return (
    <Box p={3}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>S.No</TableCell>
              <TableCell>Store</TableCell>
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stores.map((store, index) => (
              <TableRow key={store.id}>
                <TableCell><DragIndicatorIcon /></TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{store.name}</TableCell>
                <TableCell>{store.city}</TableCell>
                <TableCell>{store.state}</TableCell>
                <TableCell>
                  <Button color="error" startIcon={<DeleteIcon />}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={2}>
        <Button variant="contained" color="primary">New Store</Button>
      </Box>
    </Box>
  );
};

export default StoreScreen;
