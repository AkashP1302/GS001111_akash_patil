import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import TableComponent from "../components/TableComponent";

interface Store {
  id: number;
  name: string;
  city: string;
  state: string;
}

const initialStores: Store[] = [
  { id: 1, name: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { id: 2, name: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { id: 3, name: "Houston Harvest Market", city: "Houston", state: "TX" },
  { id: 4, name: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
];

const StoreScreen: React.FC = () => {
  const [stores, setStores] = useState<Store[]>(initialStores);

  const handleDelete = (id: number) => {
    setStores((prevStores) => prevStores.filter((store) => store.id !== id));
  };

  return (
    <Box p={3}>
      <TableComponent
        headers={["S.No", "Store", "City", "State"]}
        rows={stores}
        onDelete={handleDelete}
      />
      <Box mt={2}>
        <Button variant="contained" color="primary">New Store</Button>
      </Box>
    </Box>
  );
};

export default StoreScreen;
