import Home from "./components/Home/Home";
import "./App.css";
import Products from "./components/products/products";
import React, { useState } from "react";
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
import { createTheme, Paper, ThemeProvider } from "@material-ui/core";

function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = createTheme({
    palette: {
      type: isDark? "dark" : "light"
      
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Paper>
          <BrowserRouter>
            <Route path="/"><NavBar isDark={isDark} setIsDark={setIsDark}/> </Route>
            <Route exact path="/" component={Home} />
            <Route exact path="/created" component={Add} />
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
          </BrowserRouter>
    </Paper>
    </ThemeProvider>
  );
}

export default App;
