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
import { companyLogo } from "../assets";
import { useAuth } from "../context/AuthContext";

const drawerWidth = 240;

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const { logout } = useAuth();
  const isAuthenticated = true;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    logout();
    console.log("User logged out");
  };

  const menuItems = [
    { text: "Store", icon: <StoreIcon />, path: "/store" },
    { text: "SKU", icon: <InventoryIcon />, path: "/sku" },
    { text: "Planning", icon: <PlanningIcon />, path: "/planning" },
    { text: "Charts", icon: <BarChart />, path: "/charts" },
  ];

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
          borderBottom: "1px solid #ddd",
        }}
      >
        <img src={companyLogo} alt="Company Logo" style={{ height: 50 }} />
      </Box>

      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem
            key={text}
            component={Link}
            to={path}
            onClick={() => setMobileOpen(false)}
            sx={{
              backgroundColor:
                location.pathname === path ? "#f0f0f0" : "transparent",
              "&:hover": { backgroundColor: "#eeede7" },
              borderRadius: "4px",
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

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: "white",
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

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
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

      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
