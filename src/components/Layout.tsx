import React, { useState } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Store as StoreIcon,
  Inventory as InventoryIcon,
  EventNote as PlanningIcon,
  AccountCircle,
  BarChart,
} from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import ChartComponent from "./ChartComponent";
import { companyLogo } from "../assets";

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation(); // Get current path

  const isAuthenticated = true; // Replace with actual authentication logic
  const userInfo = { fullname: "John Doe" }; // Replace with real user data

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    console.log("User logged out");
    // Add logout logic here
  };

  const menuItems = [
    { text: "Store", icon: <StoreIcon />, path: "/store" },
    { text: "SKU", icon: <InventoryIcon />, path: "/sku" },
    { text: "Planning", icon: <PlanningIcon />, path: "/planning" },
    { text: "Charts", icon: <BarChart />, path: "/charts" },
  ];

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <img
          src={companyLogo}
          alt="Company Logo"
          style={{ height: 50 }} // Adjust the height as needed
        />
      </Box>

      {/* Menu Items */}
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            key={text}
            component={Link}
            to={path}
            onClick={() => setMobileOpen(false)}
            sx={{
              backgroundColor:
                location.pathname === path ? "#f0f0f0" : "transparent", // Active menu item background
              "&:hover": { backgroundColor: "#eeede7" }, // Hover effect
              borderRadius: "4px", // Rounded corners for better look
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white", // Set background color to white
          color: "black",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            sx={{ mr: 2, display: { sm: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{}}></Typography>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
            }}
          >
            Data Viewer App
          </Typography>

          {isAuthenticated ? (
            <>
              <IconButton
                color="inherit"
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <AccountCircle />
                <Typography
                  variant="h6"
                  sx={{ fontSize: 14, marginLeft: "8px" }}
                >
                  {userInfo.fullname}
                </Typography>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit">Sign In</Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Sidebar with Logo and Menu */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Permanent Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
