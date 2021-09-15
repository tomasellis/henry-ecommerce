import Home from "./components/Home/Home";
import "./App.css";
import Products from "./components/products/products";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
/* import Profile from "./components/Perfil/Profile"; */
import NavBar from "./components/NavBar/NavBar";
import LoggedIn from "./components/Login/LoggedIn";
import { DetailProductCards } from "./components/Details/DetailProductCards";
import Add from "./components/Add/Add";
import PrevCart from "./components/Cart/PrevCart";
import EditProfile from "./components/Perfil/EditProfile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route exact path="/created" component={Add} />
      <Route exact path="/loggedIn" component={LoggedIn} />
      <Route exact path="/cart" component={PrevCart} />
      {/* <Route exact path="/profile" component={Profile} /> */}
      <Route exact path="/clothing/details/:id" component={DetailProductCards}/>
      <Route exact path="/clothing/:gender/:page" component={Products} />
      <Route exact path="/clothing/:id" component={DetailProductCards} />
      <Route exact path="/editprofile" component={EditProfile} />
    </BrowserRouter>
  );
}

export default App;
