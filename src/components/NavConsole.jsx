import React, { useContext } from "react";
import { Link } from "react-router-dom";

// CSS imports
import "../styles/navconsole.css";
//authentication:
import { AuthContext } from "../context/auth.context";
import Club from "../pages/Club";
import Documents from "../pages/Documents";

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
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import EmojiPeopleOutlinedIcon from '@mui/icons-material/EmojiPeopleOutlined';
import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';

function NavConsole() {
  //authentication access
  const { loggedIn, user, logout } = useContext(AuthContext);

  return (
    <nav>
      {loggedIn ? (
        <>
          <List>

          <Link to="/profile"><ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/profile" className="navconsole-link">
                    <EmojiPeopleOutlinedIcon />
                  </Link>
                </ListItemIcon>
                <Link
                  to="/profile"
                  className="navconsole-link navconsole-link-text"
                >
                  <ListItemText
                    primary={` Hello ${user.name}`}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem></Link>


          <Link to="/home"><ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/home" className="navconsole-link">
                    <CottageOutlinedIcon />
                  </Link>
                </ListItemIcon>
                <Link
                  to="/home"
                  className="navconsole-link navconsole-link-text"
                >
                  <ListItemText
                    primary="Home"
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem></Link>

            <Link to="/calendar"><ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/calendar" className="navconsole-link">
                    <CalendarMonthIcon />
                  </Link>
                </ListItemIcon>
                <Link
                  to="/calendar"
                  className="navconsole-link navconsole-link-text"
                >
                  <ListItemText
                    primary={"Calendar"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem></Link>


            <Link to="/documents"><ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <DocumentScannerOutlinedIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/documents" className="navconsole-link">
                    <MailIcon />
                  </Link>
                </DocumentScannerOutlinedIcon>
                <Link
                  to="/documents"
                  className="navconsole-link navconsole-link-text"
                >
                  <ListItemText
                    primary={"Documents"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem></Link>


            <Link to="/photos"><ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/photos" className="navconsole-link">
                    <CollectionsOutlinedIcon />
                  </Link>
                </ListItemIcon>
                <Link
                  to="/photos"
                  className="navconsole-link navconsole-link-text"
                >
                  <ListItemText
                    primary={"Photo Gallery"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem></Link>


            {user.role === "staff" && (
              <Link to={`/club/${user.club}`}><ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Link to={`/club/${user.club}`} className="navconsole-link">
                      <ImportContactsOutlinedIcon />
                    </Link>
                  </ListItemIcon>
                  <Link
                    to={`/club/${user.club}`}
                    className="navconsole-link navconsole-link-text"
                  >
                    <ListItemText
                      primary={"Club Details"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </Link>
                </ListItemButton>
              </ListItem></Link>
            )}



                    

            <ListItem disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/" className="navconsole-link">
                    <CancelPresentationOutlinedIcon onClick={logout}/>
                  </Link>
                </ListItemIcon>
                <Link to="/" className="navconsole-link navconsole-link-text">
                  <ListItemText
                    onClick={logout}
                    primary={"Logout"}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </Link>
              </ListItemButton>
            </ListItem>
          </List>
        </>
      ) : (
        //-> OR, if the user is NOT logged in, we show on the navbar, the Signup and Login links
        <>
          <List>
            <Link to="/">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Link to="/" className="navconsole-link">
                      <CottageOutlinedIcon />
                    </Link>
                  </ListItemIcon>
                  <Link to="/" className="navconsole-link navconsole-link-text">
                    <ListItemText
                      primary={"Home"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </Link>
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/login">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Link to="/login" className="navconsole-link">
                      <ExitToAppOutlinedIcon />
                    </Link>
                  </ListItemIcon>
                  <Link
                    to="/login"
                    className="navconsole-link navconsole-link-text"
                  >
                    <ListItemText
                      primary={"Login"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </Link>
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to="/signup">
              <ListItem disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <Link to="/signup" className="navconsole-link">
                      <GroupAddOutlinedIcon />
                    </Link>
                  </ListItemIcon>
                  <Link
                    to="/signup"
                    className="navconsole-link navconsole-link-text"
                  >
                    <ListItemText
                      primary={"Signup"}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </Link>
                </ListItemButton>
              </ListItem>
            </Link>
          </List>
        </>
      )}
    </nav>
  );
}

export default NavConsole;
