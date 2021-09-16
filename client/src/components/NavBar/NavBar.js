import logoTiendaRopa from "../../logoTiendaRopa.png";
import { Link } from "react-router-dom";
import Search from "../Search";
import "./NavBar.css";
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
import { IoPersonCircleSharp } from "react-icons/io5";
import {BiShoppingBag} from "react-icons/bi";
import TitleFilter from "../TitleFilter";
import SearchList from "../SearchList";


export default function NavBar() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  // return (
  //   <div className="navbar">
  //     <Link to="/">
  //       <img className="logo" src={logoTiendaRopa} height={100} alt="Algo bonito" />
  //     </Link>
  //     <Search />
  //     <nav>
  //       <ul className="list">
  //         <li className="list-item">
  //           {isAuthenticated? <Link to="/profile">{user.name}</Link> : <Link to="/login">Login</Link> }
  //         </li>
  //         <li className="list-item">
  //           <Link to="/carrito">Carrito</Link>
  //         </li>
  //       </ul>
  //     </nav>
  //   </div>
  // )

  const headersData = [
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
        <IconButton>
          <Link to="/cart">
            <ShoppingBasketIcon style={{ color: "#000" }} />
          </Link>
        </IconButton>
      ),
    },

    {
      label: <TitleFilter mob={true} />,
    },
    {
      label: (
        <p style={{fontWeight: "bold", fontSize: "18px" }}>
          {isAuthenticated ? (
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#000", marginTop: '0' }}
            >
              {user.name}
            </Link>
          ) : (
            <button style={{ background:'transparent', border: 'none' }} onClick={loginWithRedirect}>
              Login
            </button>
          )}
        </p>
      ),
    },
  ];

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

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
      <Toolbar className={classes.divCtn}>
        <Link to="/">
          <img
            className="logo"
            src={logoTiendaRopa}
            height={70}
            width={200}
            alt="Algo bonito"
          />
        </Link>

        <div className={classes.titleCtn}>
          <TitleFilter mob={false} />
        </div>

        <div className={classes.div}>
          <div>
            <Search />
            <SearchList/>
          </div>

          <div className={classes.bolsa}>
            <IconButton>
              <Link to="/cart">
                <BiShoppingBag style = {{textDecoration: "none", color : "#000", marginBottom : "7px"}} />
              </Link>
            </IconButton>
          </div>

          <div>
            <p className={classes.login}>
              {isAuthenticated ? (
                <Link
                  to="/profile/editprofile"
                  style={{ textDecoration: "none", color: "#000", marginTop:'0' }}
                >
                  {user.name}
                </Link>
              ) : (
                <button style={{ background:'transparent', border: 'none' }} onClick={loginWithRedirect}>
                  <IoPersonCircleSharp style = {{marginTop : "15px", fontSize : "23px"}}/>
                </button>
              )}
                <Link to = '/created'> 
                Agregar
                </Link>
            </p>
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
          {...{
            edge: "start",
            color: "inherit",
            "aria-label": "menu",
            "aria-haspopup": "true",
            onClick: handleDrawerOpen,
          }}
        >
          <MenuIcon className={classes.menu} />
        </IconButton>
        <Drawer
          {...{
            anchor: "left",
            open: drawerOpen,
            onClose: handleDrawerClose,
          }}
        >
          <div className={classes.drawerContainer}>{getDrawerChoices()}</div>
        </Drawer>

        <div className={classes.searchMobile}>
          <Search />

        <div className={classes.listMobile}>
          <SearchList/>
        </div>
        </div>
      </Toolbar>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label }) => {
      return (
        <div
          {...{
            component: link,
            color: "inherit",
            style: { textDecoration: "none", textAlign: "center" },
            key: label,
          }}
        >
          {label}
        </div>
      );
    });
  };

  const classes = useStyles();

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

  titleCtn: {},
  bolsa: {
    marginLeft: "1px",
    marginRight: "1px",
  },
  icon: {
    color: "#000",
    marginBottom: "2px",
  },
  appBar: {
    background: "rgba(255, 255, 255, 0.767)",
  },
  login: {
    fontWeight: "bold",
    fontSize: "18px",
    marginLeft: "10px",
  },
  div: {
    display: "flex",
    alignItems: "center",
  },
  divCtn: {
    display: "flex",
    justifyContent: "space-between",
  },
  drawerContainer: {
    padding: "30px 30px",
    height: "100%",
    background: "rgb(170,10,70)",
  },
  searchMobile: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  listMobile:{
    marginRight: '250px'
  },
  menu: {
    color: "#000",
  },
}));
