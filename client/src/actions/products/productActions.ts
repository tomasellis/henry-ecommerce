import axios from "axios";
import { Dispatch } from "redux";

export const PRODUCTS_ACTIONS = {
    BRING_CLOTHER: "BRING_CLOTHER",
}


const url = "http://localhost:4000/products?";

export function getArticles(gender,category,less_than,greater_than,color,size){
    return async (dispatch: Dispatch) => {
        const products = await axios.get(`${url}gender=${gender}&category=${category}&less_tan=${less_than}&greater_than=${greater_than}&color=${color}&size=${size}`)
        
    }
}