import { useAuth0 } from "@auth0/auth0-react";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setDataUser, setProductsIdsInCart } from "../../actions";
import "./styles.css";

export default function LoggedIn() {
  const { user, isAuthenticated } = useAuth0();
  const BASE_URL = process.env.REACT_APP_BASE_BACKEND_URL;
  const history = useHistory();
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        // get user data
        const dataUser = await axios.post(
          `${BASE_URL}/findOrCreateUserInDatabase`,
          {
            auth0_id: user.sub,
            email: user.email,
            name: user.name,
          }
        );

        dispatch(setDataUser(dataUser.data.user_id, user.email, user.sub))

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
              "se agregaron los productos de localstorage a la db (averiguar por que sale 2 veces el cartel. no afecta el funcionamiento...)"
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
        setLoaded(true);
      }
    })();
    // eslint-disable-next-line
  }, [isAuthenticated]);

  useEffect(() => {
    if (loaded) {
      history.push("/");
    }
    // eslint-disable-next-line
  }, [loaded]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className="lds-ellipsis">
        <div>.</div>
        <div>.</div>
        <div>.</div>
        <div>.</div>
      </div>
    </div>
  );
}
