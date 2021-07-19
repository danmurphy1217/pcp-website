import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Logo from "../Logo/pathstream-logo.png";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import scriptConfigJson from "../../pages/ScriptConf"

const StyledLink = styled.a`
  text-decoration: none;
  color: #525252;
  padding: 20px;
  font-weight: bold;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  siteNavitation: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0),
    width: "100%",
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
    },
  },
}));

const Nav = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const MenuItemNames = (scriptConfigJson) => {
    const menuItems = [];
    for (var key in scriptConfigJson) {
      menuItems.push(<MenuItem key={key} onClick={handleClose} component={Link} to={`/script/${key}`}>{scriptConfigJson[key].title}</MenuItem>)
    }

    return menuItems;
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar>
          <Typography className={classes.logo}>
            <a href="/">
              <img src={Logo} alt="Pathstream Logo" height="18%" width="35%" />
            </a>
          </Typography>
          <div className={classes.siteNavitation}>
            <StyledLink>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                PROJECTS
                <ArrowDropDownIcon/>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {MenuItemNames(scriptConfigJson)}
              </Menu>
            </StyledLink>
            <StyledLink href="about">
              <Button>ABOUT</Button>
            </StyledLink>
            <StyledLink href="logout">
              <Button>SIGN OUT</Button>
            </StyledLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export { Nav };
