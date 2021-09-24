import axios from "axios";
import { Dispatch } from "redux";
const { REACT_APP_BASE_BACKEND_URL } = process.env;

export function getArticles() {}

export function getProduct(id: any) {
  return async function (dispatch: any) {
    let json = await axios(
      `${REACT_APP_BASE_BACKEND_URL}/product?id=${id}`,
      {}
    );

    return dispatch({ type: "GET_PRODUCT_INFO", payload: json.data });
  };
}

export function getFavProduct(id: any) {
  return async function (dispatch: any) {
    let json = await axios(
      `${REACT_APP_BASE_BACKEND_URL}/product?id=${id}`,
      {}
    );
    return dispatch({ type: "GET_FAVORITES", payload: json.data.products[0] });
  };
}

export function postCategory(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/createNewCategories`,
      payload
    );
    return json;
  };
}

export function removeProduct (payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/removeProduct`,
      payload
    );
    return json;
  };
}

export function removeOption (payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/removeOptionFromProduct`,
      payload
    );
    return json;
  };
}

export function updateOption (payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/updateDataOption`,
      payload
    );
    return json;
  };
}

export function updateCategory (payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/updateDataCategory`,
      payload
    );
    return json;
  };
}

export function updateDataProduct (payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/updateDataProduct`,
      payload
    );
    return json;
  };
}

export function addNewOption (payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/addOptionToProduct`,
      payload
    );
    return json;
  };
}

export function addNewCategory (payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/addCategoryToProduct`,
      payload
    );
    return json;
  };
}

export function getOptions() {
  return async function (dispatch: any) {
    let json = await axios.get(`${REACT_APP_BASE_BACKEND_URL}/options`, {});
    return dispatch({ type: "GET_OPTIONS", payload: json.data });
  };
}

export function postProduct(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/createProduct`,
      payload
    );
    return json;
  };
}

export function addFavorite(payload) {
  return async function (dispatch) {
    const json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/addToFavorites`,
      payload
    );

    return json.config.data;
  };
}

export function deleteFavProduct(payload) {
  return async function (dispatch) {
    let json = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/deleteFavorites`,
      payload
    );
    return json.config.data;
  };
}

export function favoriteProducts(payload) {
  return {
    type: "ADD_FAVORITE_PRODUCT",
    payload: payload,
  };
}

export function deleteFilterFav(payload) {
  return { type: "DELETE_FAVORITES", payload };
}

export function getFavorites(id) {
  return async function (dispatch) {
    let json = await axios(
      `${REACT_APP_BASE_BACKEND_URL}/getFavorites?user_id=${id}`,
      {}
    );
    return dispatch({ type: "GET_FAVORITES", payload: json.data });
  };
}

export function addToCartStorage(productDetail: Object) {
  return { type: "ADD_TO_CART", payload: productDetail };
}

export function removeToCartStorage(id_option: string) {
  return { type: "REMOVE_FROM_CART", payload: id_option };
}

export function updateQuantity(id_option: string, quantity: number) {
  return { type: "UPDATE_QUANTITY", payload: { id_option, quantity } };
}

export function cartIsLoading(boolean: boolean) {
  return { type: "CART_IS_LOADING", payload: boolean };
}

export function cleanProductDetail() {
  return { type: "CLEAN_PRODUCT_DETAIL" };
}

export function cleanProducts() {
  return { type: "CLEAN_PRODUCTS", payload: [] };
}

export function setDataUser(dataUser) {
  return { type: "SET_DATA_USER", payload: dataUser };
}

export function setProductsIdsInCart(idsInCart) {
  return { type: "SET_PRODUCTS_IDS_IN_CART", payload: idsInCart };
}

export function changePassword2(data) {
  return async (dispatch: Dispatch) => {
    let user = {
      auth0_id: data.auth0_id,
      newPassword: data.newPassword,
    };
    const newpass = await axios.post(
      `${REACT_APP_BASE_BACKEND_URL}/changePassword`,
      user
    );
    dispatch({ type: "CHANGE_PASSWORD", payload: newpass.data });
  };
}

export function setUserOrder(userId) {
  return async (dispatch: Dispatch) => {
    const product = await axios.get(
      `${REACT_APP_BASE_BACKEND_URL}/getUserOrders?userId=${userId}`
    );
    console.log(product.data);
    dispatch({ type: "SET_STORE_HISTORY", payload: product.data });
  };
};
