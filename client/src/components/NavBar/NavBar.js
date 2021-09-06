import logoTiendaRopa from "../../logoTiendaRopa.png";
import { Link } from "react-router-dom";
import Search from "../Search";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Drawer } from "@material-ui/core";
import { Link as link } from "@material-ui/core";

export default function NavBar() {
  const { user, isAuthenticated } = useAuth0();
  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });
  const { mobileView, drawerOpen } = state;
  const classes = useStyles();
  
  const menuData = [
    {
      label: (
        <Link to="/">
          <img
            className="logo"
            src={logoTiendaRopa}
            height={70}
            width={120}
            alt="Algo bonito"
          />
        </Link>
      ),
    },
    {
      label: (
          <Link to="/cart">
            <IconButton>
              <ShoppingBasketIcon style={{ color: "#000" }} />
            </IconButton>
          </Link>
      ),
    },
    {
      label: (
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>
          {isAuthenticated ? (
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#000" }}
            >
              {user.name}
            </Link>
          ) : (
            <Link to="/login" style={{ textDecoration: "none", color: "#000" }}>
              Login
            </Link>
          )}
        </p>
      ),
    },
  ];

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const displayDesktop = () => {
    return (
      <Toolbar className={classes.divCtn} >
        
        <Link to="/">
          <img
            className="logo"
            src={logoTiendaRopa}
            height={70}
            width={200}
            alt="Algo bonito"
          />
        </Link>

        <div className={classes.div}>
          
          <Search />
            
          <Link to="/cart">
            <IconButton className={classes.icon}>
              <ShoppingBasketIcon  />
            </IconButton>
          </Link>
          

          

          <div className={classes.login}>
            
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  {user.name}
                </Link>
              ) : (
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "#000" }}
                >
                  Login
                </Link>
              )}
            
          </div>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));
    return (
      <Toolbar>
        <IconButton
          edge= "start"
          color= "inherit"
          aria-label= "menu"
          aria-haspopup= "true"
          onClick={ handleDrawerOpen}
        
        >
          <MenuIcon className={classes.menu} />
        </IconButton>
        <Drawer   
          anchor= "left"
          open= {drawerOpen}
          onClose= {handleDrawerClose}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div className={classes.searchMobile}>
          {" "}
          <Search />{" "}
        </div>
      
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return menuData.map(({ label }) => {
      return (
        <div
          component= {link}
          color= "inherit"
          style= {{ textDecoration: "none", textAlign: "center" }}
          key= {label}
        >{label}
        </div>
      );
    });
  };


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },


  icon: {
    color: "#000",
    marginBottom: '4px',
    marginRight: '2px'
  },
  appBar: {
    background: "rgb(170,10,70)",
  },
  login: {
    display:'flex',
    fontWeight: "bold",
    fontSize: "18px",
  },
  div:{
    display:'flex',
    alignItems: "center"
  },
  divCtn: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  drawerContainer: {
    padding: "30px 30px",
    height: "100%",
    background: "rgb(170,10,70)",
  },
  searchMobile: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  menu: {
    color: "#000",
  },
}));
