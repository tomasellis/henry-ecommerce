import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Carrito from "./components/Carrito";
import Profile from "./components/Profile";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/carrito" exact component={Carrito} />
      <Route path="/profile" exact component={Profile} />
    </Switch>
  );
}

export default App;
