import React, { useState } from "react";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import StoreScreen from "./pages/StoreScreen";

const App: React.FC = () => {
  const [selectedScreen, setSelectedScreen] = useState<string>("Store");

  return (
    <Box display="flex">
      <Sidebar setSelectedScreen={setSelectedScreen} />
      <Box flexGrow={1}>
        <Navbar />
        {selectedScreen === "Store" && <StoreScreen />}
      </Box>
    </Box>
  );
};

export default App;
