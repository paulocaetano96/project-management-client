// ---------------------------------------------------- package imports
import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { AuthContext } from "./context/auth.context";

/* import Link from '@mui/material/Link';
 */
// ---------------------------------------------------- CSS imports
import "./App.css";
// ---------------------------------------------------- component imports
import NavConsole from "./components/NavConsole";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Calendar from "./pages/Calendar";
import Club from "./pages/Club";
import Documents from "./pages/Documents";
import PhotoGallery from "./pages/PhotoGallery";
import Profile from "./pages/Profile";
import Private from "./components/Private";

//---------------------------------------------------- MUI COMPONENT IMPORTS
//------------DRAWER IMPORTS
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CollectionsIcon from "@mui/icons-material/Collections";

function App() {
  //Drawer function for all pages
  const [open, setOpen] = useState(false);
  const { loggedIn, user, logout } = useContext(AuthContext);

  const theme = useTheme();

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Box sx={{ display: "flex", overflow: "hidden"}} >
        <CssBaseline />
        <AppBar position="fixed" open={open} id="bar-box">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {/* TEAM COMMS LOGOTYPE IMAGE - INSTERT ALL OTHER IMAGES FOR THE NAVBAR HERE */}
              <img
                src="../images/teamcomms-logo.png"
                alt="team comms logotype picture"
                id="team-comms-logo"
              />
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} id="console-box">
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />

          <NavConsole />

          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, padding: 0 }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/calendar"
              element={
                <Private>
                  <Calendar />
                </Private>
              }
            />
            <Route
              path="/club/:id"
              element={
                <Private>
                  <Club />
                </Private>
              }
            />
            <Route
              path="/documents"
              element={
                <Private>
                  <Documents />
                </Private>
              }
            />
            <Route
              path="/photos"
              element={
                <Private>
                  <PhotoGallery />
                </Private>
              }
            />
            <Route
              path="/profile"
              element={
                <Private>
                  <Profile />
                </Private>
              }
            />
          </Routes>
        </Box>
      </Box>
    </div>
  );
}
export default App;
