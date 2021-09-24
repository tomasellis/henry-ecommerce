import axios from "axios";

const URL = process.env.REACT_APP_BASE_BACKEND_URL || "http://localhost:4000";

export const searchArticles = (
    formSearch:string
    ) => async (dispatch:any) => {
    try{
      let res = await axios.get(`${URL}/fuzzySearch?search=${formSearch}&maxProducts=6
        `)
      dispatch({type: "SEARCH_ARTICLES", payload: res.data.data});
    }catch(error){
      console.log(error);
    }
}

export const searchProducts = (
    word:string
    ) => async (dispatch:any) => {
    try{
      let res = await axios.get(`${URL}/search?word=${word}
        `)
      dispatch({type: "SEARCH_PRODUCTS", payload: res.data.products});
    }catch(error){
      console.log(error);
    }
}
