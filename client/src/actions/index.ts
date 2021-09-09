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
    await axios.post(`http://localhost:3001/createProduct`, payload);
    return dispatch({ type: "POST_PRODUCT", payload: payload });
  };
}


export function addToCartStorage(productDetail) {
  return { type: "ADD_TO_CART", payload: productDetail };
}


