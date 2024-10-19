import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { jwtDecode } from "jwt-decode"; // Correct import
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import Cookies from "js-cookie";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logo from "../images/logo.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { ScrollContext } from "../context/ScrollContext";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const MySwal = withReactContent(Swal);

const Header = () => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const token = Cookies.get("token");
  let decoded = null;
  try {
    decoded = token ? jwtDecode(token) : null; // Correct variable
  } catch (error) {
    Cookies.remove("token"); // Correctly remove token
  }

  const isAuthenticated = Boolean(decoded);

  const { isScroll, jumpToTop } = useContext(ScrollContext);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (route) => {
    if (isScroll) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setDrawerOpen(false);
    navigate(route);
  };

  const onLogout = () => {
    setDrawerOpen(false);
    MySwal.fire({
      title: "Are you sure?",
      text: "Do you really want to logout?",
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        Swal.fire({
          title: "Success!",
          text: "Logout successful.",
          icon: "success",
          timer: 1500,
          buttons: false,
          timerProgressBar: true,
        });
        handleNavigation("/");
      }
    });
  };

  const drawerContent = (
    <Box sx={{ width: "70vw", height: "100%", bgcolor: "background.paper" }}>
      <div className="flex justify-between">
       {decoded &&  <div className="m-4 flex justify-start ">
          {decoded?.email}
          <br />
          +91 {decoded?.contact_no}
        </div>}
        <div className="m-4 flex justify-end">
          <CloseIcon onClick={toggleDrawer} />
        </div>
      </div>

      <List>
        {!isAuthenticated && (
          <ListItem button onClick={() => handleNavigation("/login")}>
            <ChevronRightIcon />
            <div className="flex-col w-full font-bold text-orange-600">
              <ListItemText primary="Login" />
              <div className="border-b w-120"></div>
            </div>
          </ListItem>
        )}
        <ListItem button onClick={() => handleNavigation("/")}>
          <ChevronRightIcon />
          <div className="flex-col w-full">
            <ListItemText primary="Home" />
            <div className="border-b w-120"></div>
          </div>
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/contact")}>
          <ChevronRightIcon />
          <div className="flex-col w-full">
            <ListItemText primary="Contact Us" />
            <div className="border-b w-120"></div>
          </div>
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/services")}>
          <ChevronRightIcon />
          <div className="flex-col w-full">
            <ListItemText primary="Services" />
            <div className="border-b w-120"></div>
          </div>
        </ListItem>
        <ListItem button onClick={() => handleNavigation("/booking")}>
          <ChevronRightIcon />
          <div className="flex-col w-full">
            <ListItemText primary="Book" />
            <div className="border-b w-120"></div>
          </div>
        </ListItem>
        {isAuthenticated && (
          <ListItem button onClick={() => handleNavigation("/your_trips")}>
            <ChevronRightIcon />
            <div className="flex-col w-full">
              <ListItemText primary="Your Trips" />
              <div className="border-b w-120"></div>
            </div>
          </ListItem>
        )}
        {isAuthenticated && decoded?.role === "admin" && (
          <>
            <ListItem button onClick={() => handleNavigation("/reservedSeats")}>
              <ChevronRightIcon />
              <div className="flex-col w-full">
                <ListItemText primary="Reserved Seates" />
                <div className="border-b w-120"></div>
              </div>
            </ListItem>
            <ListItem button onClick={() => handleNavigation("/busBook")}>
              <ChevronRightIcon />
              <div className="flex-col w-full">
                <ListItemText primary="All Trips" />
                <div className="border-b w-120"></div>
              </div>
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation("/user-management")}
            >
              <ChevronRightIcon />
              <div className="flex-col w-full">
                <ListItemText primary="User Management" />
                <div className="border-b w-120"></div>
              </div>
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation("/center-management")}
            >
              <ChevronRightIcon />
              <div className="flex-col w-full">
                <ListItemText primary="Center Management" />
                <div className="border-b w-120"></div>
              </div>
            </ListItem>
          </>
        )}

        {isAuthenticated && (
          <ListItem button onClick={onLogout}>
            <ChevronRightIcon />
            <div className="flex-col w-full">
              <ListItemText primary="Logout" />
              <div className="border-b w-120"></div>
            </div>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <div
      className={`z-50 bg-white h-16 shadow-xl fixed w-full ${
        isScroll ? "backdrop-blur-xl backdrop-filter" : ""
      }`}
    >
      <Toolbar>
        <Typography
          className="flex items-center"
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <Link to="/" className="h-full">
            <img src={logo} alt="Logo" className="w-40" />
          </Link>
        </Typography>
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" onClick={() => handleNavigation("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => handleNavigation("/services")}>
            Services
          </Button>
          <Button color="inherit" onClick={() => handleNavigation("/booking")}>
            Book
          </Button>
          <Button color="inherit" onClick={() => handleNavigation("/contact")}>
            Contact
          </Button>
          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                onClick={() => handleNavigation("/your_trips")}
              >
                Your Trips
              </Button>
              {decoded.role === "admin" && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/busBook")}
                  >
                    All Trips
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/user-management")}
                  >
                    User Management
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/center-management")}
                  >
                    Center Management
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/reservedSeats")}
                  >
                    Reserved Seates
                  </Button>
                </>
              )}
              {(decoded.role === "admin" || decoded.role === "coordinate") && (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleNavigation("/attendance")}
                  >
                    Attendance
                  </Button>
                </>
              )}
            </>
          )}

          {isAuthenticated ? (
            <div className="relative">
              <AccountCircleIcon
                onClick={toggleMenu}
                className="cursor-pointer"
              />
              {isOpen && (
                <Box className="absolute right-0 mt-2 w-48 text-black bg-white rounded-md shadow-lg z-20">
                  <List>
                    <div className="m-4 flex justify-start ">
                      {decoded?.email}
                      <br />
                      +91 {decoded?.contact_no}
                    </div>
                    
                    <ListItem button onClick={onLogout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Box>
              )}
            </div>
          ) : (
            <Button color="inherit" onClick={() => handleNavigation("/login")}>
              <p className="bg-orange-600 text-white px-4 rounded py-2">
                Login
              </p>
            </Button>
          )}
        </Box>
        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <DehazeIcon />
          </IconButton>
        </Box>
      </Toolbar>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer}>
        {drawerContent}
      </Drawer>
    </div>
  );
};

export default Header;
