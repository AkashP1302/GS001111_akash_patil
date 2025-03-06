import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import BarChartIcon from "@mui/icons-material/BarChart";
import DashboardIcon from "@mui/icons-material/Dashboard";

interface SidebarProps {
  setSelectedScreen: (screen: string) => void;
}

const menuItems = [
  { label: "Store", icon: <StoreIcon /> },
  { label: "SKU", icon: <InventoryIcon /> },
  { label: "Planning", icon: <DashboardIcon /> },
  { label: "Charts", icon: <BarChartIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ setSelectedScreen }) => {
  return (
    <Drawer variant="permanent">
      <List>
        {menuItems.map((item) => (
      <ListItem 
      component="button" 
      key={item.label} 
      onClick={() => setSelectedScreen(item.label)}
    >
      <ListItemIcon>{item.icon}</ListItemIcon>
      <ListItemText primary={item.label} />
    </ListItem>
    
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
