import axios from "axios";

export function getArticles() {

}

export function getProduct(id: any) {
  return async function (dispatch: any) {
    let json = await axios(`http://localhost:4000/product?id=${id}`, {
    });

    return dispatch({ type: "GET_PRODUCT_INFO", payload: json.data });
  }
}

export function getOptions() {
  return async function (dispatch: any) {
    let json = await axios(`http://localhost:4000/options`, {
    });
    return dispatch({ type: "GET_OPTIONS", payload: json.data });
  }
}

export function postProduct(payload) {
  return async function (dispatch) {
    const json = await axios.post(`http://localhost:4000/createProduct`, payload);
    return json;
  };
}

export function postCategory(payload) {
  return async function (dispatch) {
    const json = await axios.post(`http://localhost:4000/createNewCategories`, payload);
    return json;
  };
}


export function addToCartStorage(productDetail : Object) {
  return { type: "ADD_TO_CART", payload: productDetail };
}

export function removeToCartStorage(id_option : string){
  return { type: "REMOVE_FROM_CART", payload: id_option };
}

export function updateQuantity(id_option:string, quantity:number){
  return { type: "UPDATE_QUANTITY", payload: {id_option,quantity} };
}