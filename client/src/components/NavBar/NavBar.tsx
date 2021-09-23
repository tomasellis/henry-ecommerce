import logoTiendaRopa from "../../logoTiendaRopa.png";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./NavBar.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Drawer } from "@material-ui/core";
// import { Link as link } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import { IoPersonCircleSharp } from "react-icons/io5";
import { BiShoppingBag } from "react-icons/bi";
import TitleFilter from "../TitleFilter";
import SearchList from "../Search/SearchList";

export default function NavBar() {
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();
  const history = useHistory();

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  const handleDrawerOpen = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: true }));
  const handleDrawerClose = () =>
    setState((prevState) => ({ ...prevState, drawerOpen: false }));

  let id: number = 0;
  const headersData = [
    {
      label: (
        <IconButton onClick={handleDrawerClose}>
          <CancelIcon fontSize="large" />
        </IconButton>
      ),
      id: ++id,
    },
    {
      label: <TitleFilter mob={true} />,
      id: ++id,
    },
    {
      label: (
        <Link to="/cart">
          <IconButton>
            <BiShoppingBag style={{ textDecoration: "none", color: "#000" }} />
          </IconButton>
        </Link>
      ),
      id: ++id,
    },
    {
      label: (
        <p style={{ fontWeight: "bold", fontSize: "18px" }}>
          {isAuthenticated ? (
            <Link
              to="/profile"
              style={{ textDecoration: "none", color: "#000", marginTop: "0" }}
            >
              {user.name}
            </Link>
          ) : (
            <IconButton onClick={loginWithRedirect}>
              <IoPersonCircleSharp
                style={{ fontSize: "23px", color: "#000" }}
              />
            </IconButton>
          )}
        </p>
      ),
      id: ++id,
    },
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
      id: ++id,
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
      <Toolbar className={classes.divCtn} style={{ zIndex: 10 }}>
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
                <BiShoppingBag
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    marginBottom: "7px",
                  }}
                />
              </Link>
            </IconButton>
          </div>

          <div style={{ overflow: "hidden" }}>
            <p className={classes.login}>
              {isAuthenticated ? (
                <Link
                  to="/profile"
                  style={{
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  {user.name.split(" ")[0] + " " /*solo el primer nombre */}
                </Link>
              ) : (
                <button
                  style={{ background: "transparent", border: "none" }}
                  onClick={loginWithRedirect}
                >
                  <IoPersonCircleSharp
                    style={{ marginTop: "15px", fontSize: "23px" }}
                  />
                </button>
              )}
              <select
                className=""
                name=""
                value="/admin"
                onChange={(e) => history.push(e.target.value)}
              >
                <option value="/admin" disabled>
                  Admin
                </option>
                <option value="/admin/createproduct">Create product</option>
                <option value="/admin/editusers">Edit users</option>
                <option value="/admin/editorders">Edit orders</option>
              </select>
            </p>
          </div>
        </div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    return (
      <Toolbar style={{ zIndex: 10 }}>
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
    return headersData.map((ele) => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          key={ele.id}
        >
          {ele.label}
        </div>
      );
    });
  };

  const classes = useStyles();

  return (
    <div className={classes.root} style={{ zIndex: 10 }}>
      <AppBar
        position="static"
        className={classes.appBar}
        style={{ zIndex: 10 }}
      >
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
    overflow: "hidden",
    display: "flex",
    flexFlow: "column nowrap",
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
    background: "rgba(255, 255, 255, 0.767)",
  },
  searchMobile: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  listMobile: {
    marginRight: "250px",
  },
  menu: {
    color: "#000",
  },
  labelItem: {
    display: "flex",
  },
}));
