import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { useContext, useState } from "react";
import { AuthContext } from "../context";

const pages_ = [
  {
    menuTitle: "Home",
    pageURL: "/"
  },
  {
    menuTitle: "Watchlist",
    pageURL: "/watchlist"
  },
  {
    menuTitle: "Watched",
    pageURL: "/watched"
  },
];

export const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(
    null
  );
  const { logoutLocal } = useContext(AuthContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    logoutLocal();
  }

  return (
    <AppBar
      position="static"
      sx={{ background: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters >
          <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Logo />
            <Search />
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" }
                }}
              >
                {pages_.map((page, index) => {
                  const { menuTitle, pageURL } = page;
                  return (
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Typography
                        key={index}
                        component={Link}
                        to={pageURL}
                        color="primary"
                      >
                        {menuTitle}
                      </Typography>
                    </MenuItem>
                  );
                })}
                <MenuItem onClick={handleLogout}>
                  <Logout />
                </MenuItem>
              </Menu>
            </Box>
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{
                display: { xs: "none", md: "flex" }
              }}
            >
              {pages_.map((page, index) => {
                const { menuTitle, pageURL } = page;
                return (
                  <Button
                    key={index}
                    component={Link}
                    to={pageURL}
                    variant="text"
                    color="inherit"
                  >
                    {menuTitle}
                  </Button>
                );
              })}
              <Button
                variant="text"
                color="inherit"
                onClick={handleLogout}
              >
                <Logout />
              </Button>
            </Box>
          </Container>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
