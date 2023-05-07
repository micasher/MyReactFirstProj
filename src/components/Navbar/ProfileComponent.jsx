import { AccountCircle } from "@mui/icons-material";
import { Avatar, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponent";
import { useSelector } from "react-redux";
import axios from "axios";

const ProfileComponent = ({ profilePages, logoutClickProp }) => {
  const [isProfilePic, setIsProfilePic] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profilePicAlt, setProfilePicAlt] = useState("");
  useEffect(() => {
    /*
          useEffect cant handle async ()=>{}
          this is why we use the old promise way
        */
    axios
      .get("/users/userInfo")
      .then(({ data }) => {
        if (data.imageUrl) {
          setIsProfilePic(true);
          setProfilePic(data.imageUrl);
        } else {
          setIsProfilePic(false);
          setProfilePic("");
        }
        if (data.imageAlt) {
          setProfilePicAlt(data.imageAlt);
        } else {
          setProfilePicAlt(
            "Profile picture of" + data.firstName + " " + data.lastName
          );
        }
      })
      .catch((err) => {
        setIsProfilePic(false);
      });
  }, []);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const logoutClick = () => {
    logoutClickProp();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const avatarPages = [...profilePages];
  return (
    <Fragment>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {isProfilePic ? (
          <Avatar alt={profilePicAlt} src={profilePic} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {avatarPages.map((page) => (
          <MenuItem
            key={"miniLinks" + page.url}
            onClick={handleClose}
            sx={{ padding: "8px", minWidth: "100px" }}
          >
            {page.url === ROUTES.LOGOUT ? (
              <NavLinkComponent
                key={page.url}
                {...page}
                onClick={logoutClick}
              />
            ) : (
              <NavLinkComponent key={page.url} {...page} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
};

export default ProfileComponent;
