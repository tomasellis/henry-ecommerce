import axios from "axios";
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
      console.log('jsonnnnn',json.data.products);
      
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

export function getOptions() {
  return async function (dispatch : any) {
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
    console.log('soyjson',json.config.data, payload);
    
    return json.config.data;
  };
}

export function getFavorites(id) {
  return async function (dispatch) {
    let json = await axios(
      `${REACT_APP_BASE_BACKEND_URL}/getFavorites?user_id=${id}`,
      {}
    );
    return dispatch({ type: "GET_FAVORITES_ID", payload: json.data });
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

export function cleanProductDetail() {
  return { type: "CLEAN_PRODUCT_DETAIL" };
}

export function cleanProducts() {
  return { type: "CLEAN_PRODUCTS" };
}

export function setDataUser(user_id:string,user_email:string){
  return {type: 'SET_DATA_USER', payload: {user_id, user_email} }
}

export function setProductsIdsInCart(idsInCart){
  return {type: 'SET_PRODUCTS_IDS_IN_CART', payload: idsInCart}
}