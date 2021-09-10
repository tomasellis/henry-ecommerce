import axios from "axios";

export function getArticles() {

}

export function getProduct (id:any) {
  return async function (dispatch:any){
    let json = await axios(`http://localhost:4000/product?id=${id}`, {
    });
    
    return dispatch({ type: "GET_PRODUCT_INFO", payload: json.data});
  }
}

export function getOptions () {
  return async function (dispatch:any){
    let json = await axios(`http://localhost:4000/options`, {
    });
    return dispatch({ type: "GET_OPTIONS", payload: json.data});
  }
}

export function postProduct(payload) {
  return async function (dispatch) {
    const json = await axios.post(`http://localhost:4000/createProduct`, payload);
    return json;
  };
}
