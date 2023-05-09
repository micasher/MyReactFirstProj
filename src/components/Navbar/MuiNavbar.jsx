import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import AdbIcon from "@mui/icons-material/Adb";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import SearchPartial from "./SearchPartial";
import ROUTES from "../../routes/ROUTES";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponent";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import ProfileComponent from "./ProfileComponent";
import MuiNavBarHambComponent from "./MuiNavBarHambComponent";
// access to all
const pages = [
  {
    label: "About",
    url: ROUTES.ABOUT,
  },
];
//not logged in users
const notAuthPages = [
  {
    label: "Register",
    url: ROUTES.REGISTER,
  },
  {
    label: "Login",
    url: ROUTES.LOGIN,
  },
];
//logged in users
const authedPages = [
  {
    label: "FAV CARD",
    url: ROUTES.FAV,
  },
];
const avatarPages = [
  {
    label: "Profile",
    url: ROUTES.PROFILE,
  },
  {
    label: "Logout",
    url: ROUTES.LOGOUT,
  },
];
const adminPages = [
  {
    label: "Sand Box",
    url: ROUTES.SANDBOX,
  },
  {
    label: "CRM",
    url: ROUTES.CRM,
  },
];
const bizPages = [
  {
    label: "My Cards",
    url: ROUTES.MYCARD,
  },
];
const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const { payload } = useSelector((bigPie) => bigPie.authSlice);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };
  const logoutClick = () => {
    localStorage.clear();
    dispatch(authActions.logout());
  };
  const logoClick = () => {
    navigate(ROUTES.HOME);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <AdbIcon />
          <Typography
            variant="contained"
            onClick={logoClick}
            sx={{ display: { xs: "inline", md: "inline" } }}
          >
            MyBiz
          </Typography>
          {/* main navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn
              ? authedPages.map((page) =>
                  page.url === ROUTES.LOGOUT ? (
                    <NavLinkComponent
                      key={page.url}
                      {...page}
                      onClick={logoutClick}
                    />
                  ) : (
                    <NavLinkComponent key={page.url} {...page} />
                  )
                )
              : notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))}
            {payload && payload.isAdmin
              ? adminPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {payload && payload.biz
              ? bizPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
          </Box>
          <SearchPartial />
          <Box
            sx={{
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "inline", md: "inline" } }}>
              {isDarkTheme ? (
                <ModeNightIcon onClick={changeTheme} />
              ) : (
                <LightModeIcon onClick={changeTheme} />
              )}
            </Typography>
          </Box>
          {/* hamburger with menu */}
          <Box
            sx={{
              flexGrow: 1,
              flex: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "flex-end",
            }}
          >
            <IconButton
              size="large"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <MuiNavBarHambComponent
              anchorElNavProp={anchorElNav}
              handleCloseNavMenuProp={handleCloseNavMenu}
              pagesArray={pages}
              isLoggedInProp={isLoggedIn}
              authedPagesProp={authedPages}
              logoutClickProp={logoutClick}
              notAuthPagesProp={notAuthPages}
              isAdminProp={payload && payload.isAdmin}
              isBizProp={payload && payload.biz}
              adminPagesArr={adminPages}
              bizPagesArr={bizPages}
            />
          </Box>
          {isLoggedIn && (
            <ProfileComponent
              profilePages={avatarPages}
              logoutClickProp={logoutClick}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MuiNavbar;
