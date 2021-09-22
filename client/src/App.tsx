import Home from "./components/Home/Home";
import "./App.css";
import Products from "./components/products/products";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import LoggedIn from "./components/Login/LoggedIn";
import { DetailProductCards } from "./components/Details/DetailProductCards";
import Add from "./components/Add/Add";
import PrevCart from "./components/Cart/PrevCart";
import Favorites from './components/Perfil/Favorites/Favorites'
import EditProfile from "./components/Perfil/EditProfile/EditProfile";
import Profile from "./components/Perfil/Profile";
import SearchedProducts from "./components/Search/SearchedProducts";
import EditUsers from "./components/Users/EditUsers";
import History from "./components/Perfil/History/History";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route exact path="/admin/createproduct" component={Add} />
      <Route exact path="/admin/editusers" component={EditUsers} />
      <Route exact path="/loggedIn" component={LoggedIn} />
      <Route exact path="/cart" component={PrevCart} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/clothing/details/:id" component={DetailProductCards}/>
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/search" component={SearchedProducts} />
      <Route
        exact
        path="/clothing/details/:id"
        component={DetailProductCards}
      />
      <Route exact path="/clothing/:gender/:page" component={Products} />
      <Route exact path="/clothing/:id" component={DetailProductCards} />
      <Route exact path='/profile/favorites' component={Favorites} />
      <Route exact path="/clothing/details/:id" component={DetailProductCards}/>
      <Route exact path="/profile/editprofile" component={EditProfile} />
      <Route exact path='/profile/shopping-history' component={History} />
    </BrowserRouter>
  );
}

export default App;
