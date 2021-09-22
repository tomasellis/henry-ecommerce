import Home from "./components/Home/Home";
import "./App.css";
import Products from "./components/products/products";
import React, { useEffect } from "react";
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
import EditOrders from "./components/Orders/EditOrders";
import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { setDataUser, setProductsIdsInCart } from "./actions";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const state = useSelector((state: RootState) => state);

type User = {
  id: string;
  email: string;
  auth0_id: string;
};

interface RootState {
  user: User;
}

const { user, isAuthenticated } = useAuth0();
  const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
  const dispatch = useDispatch()

  useEffect(() => {
    (async () => {
      if (isAuthenticated && state.user.id.length === 0) {
        // get user data
        const dataUser = await axios.post(
          `${BASE_URL}/findOrCreateUserInDatabase`,
          {
            auth0_id: user.sub,
            email: user.email,
            name: user.name,
          }
        );

        dispatch(setDataUser(dataUser.data))

        if (localStorage.cartStorage) {
          const { data } = await axios.post(
            `${BASE_URL}/addLocalStorageToCart`,
            {
              cart: JSON.parse(localStorage.cartStorage),
              user_id: dataUser.data.user_id,
            }
          );
          if (data.insert_carts_products) {
            console.log(
              "se agregaron los productos de localstorage a la db"
            );
            localStorage.cartStorage = [];
            localStorage.idsInCartStorage = [];
          } else {
            console.log("errDataLoggedIn", data);
            console.log(
              "no se agregaron los productos de localstorage a la db"
            );
          }
          let idsInCart: AxiosResponse<any> = await axios.get(`${process.env.REACT_APP_BASE_REST_API_HASURA}/getProductsIdsInCart/${dataUser.data.user_id}`)

          idsInCart = idsInCart.data.carts_products.map(product => product.products_option.product_id)
          dispatch(setProductsIdsInCart(idsInCart))
        }
       
      }
    })();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  return (
    <BrowserRouter>
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <Route exact path="/admin/createproduct" component={Add} />
      <Route exact path="/admin/editusers" component={EditUsers} />
      <Route exact path="/admin/editorders" component={EditOrders} />
      <Route exact path="/loggedIn" component={LoggedIn} />
      <Route exact path="/cart" component={PrevCart} />
      <Route path="/profile" component={Profile} />
      <Route exact path="/clothing/details/:id" component={DetailProductCards} />
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
      <Route exact path="/clothing/details/:id" component={DetailProductCards} />
      <Route exact path="/profile/editprofile" component={EditProfile} />
    </BrowserRouter>
  );
}

export default App;
