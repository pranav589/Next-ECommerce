import * as React from "react";
import { styled, alpha, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/router";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useContext } from "react";
import { DataContext } from "../../store/GlobalState";
import { Button } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useState } from "react";
import { toast } from "react-toastify";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: "auto",
  marginLeft: "auto",
  width: "55% !important",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      if (searchQuery?.length > 3) {
        router.push({
          pathname: `/search/${searchQuery}`,
          query: {
            name: searchQuery,
          },
        });
      } else {
        toast.error("Search query should be greater than 3 letters");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    router.push("/");
    dispatch({
      type: "AUTH",
      payload: {
        token: null,
        user: null,
      },
    });
    window.location.reload();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const theme = createTheme();

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={() => {
          router.push("/cart");
          handleMenuClose();
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={cart?.length} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {auth?.isVerified && (
        <MenuItem
          onClick={() => {
            router.push("/profile");
            handleMenuClose();
          }}
        >
          <IconButton size="large" aria-label="Profile" color="inherit">
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      )}
      {auth?.isVerified &&
        (auth?.user?.role === "admin" || auth?.user?.root === true) && (
          <MenuItem
            onClick={() => {
              router.push("/adminDashboard");
              handleMenuClose();
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <DashboardIcon />
            </IconButton>
            <p>Admin Dashboard</p>
          </MenuItem>
        )}
      {auth?.isVerified && (
        <MenuItem
          onClick={() => {
            handleLogout();
            handleMenuClose();
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <LogoutIcon />
          </IconButton>
          <p>Logout</p>
        </MenuItem>
      )}
      {!auth?.isVerified && (
        <MenuItem
          onClick={() => {
            router.push("/login");
            handleMenuClose();
          }}
        >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: "#539165" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            Dev-Shop
          </Typography>
          <Search onKeyDown={(e) => handleEnterClick(e)}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Search>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button
              startIcon={
                <Badge badgeContent={cart?.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              }
              sx={{ color: "white", marginRight: "10px" }}
              onClick={() => router.push("/cart")}
            >
              Cart
            </Button>
            {auth?.isVerified && auth?.user?.role === "admin" && (
              <Button
                startIcon={<DashboardIcon />}
                sx={{ color: "white", marginRight: "10px" }}
                onClick={() => router.push("/adminDashboard")}
              >
                Admin Dashboard
              </Button>
            )}
            {auth?.isVerified && auth?.user?.role === "user" ? (
              <Button
                startIcon={<AccountCircle />}
                sx={{ color: "white" }}
                onClick={() => router.push("/profile")}
              >
                Profile
              </Button>
            ) : auth?.isVerified && auth?.user?.role === "admin" ? (
              <Button
                startIcon={<AccountCircle />}
                sx={{ color: "white" }}
                onClick={() => router.push("/profile")}
              >
                Profile
              </Button>
            ) : (
              <Button
                startIcon={<AccountCircle />}
                sx={{ color: "white" }}
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            )}
            {auth?.isVerified && (
              <Button
                startIcon={<LogoutIcon />}
                sx={{ color: "white", marginLeft: "10px" }}
                onClick={() => handleLogout()}
              >
                Logout
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
