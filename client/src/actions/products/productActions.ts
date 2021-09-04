import axios from "axios";
import { Dispatch } from "redux";

export const PRODUCTS_ACTIONS = {
    BRING_CLOTHER: "BRING_CLOTHER",
}


const url = "http://localhost:4000/products?";

export function getArticles(gender,category,less_than,greater_than,color,size){
    return async (dispatch: Dispatch) => {
        const products = await axios.get(`${url}${
            gender !== undefined ? `gender=${gender}` : "nada"
        }&${category !== undefined ? `category=${category}` : "nada"
        }&${less_than !== undefined ? `less_than=${less_than}` : "nada"
        }&${greater_than !== undefined ? `greater_than=${greater_than}` : "nada"
        }&${color !== undefined ? `color=${color}` : "nada"
        }&${size !== undefined ? `size=${size}` : "nada"}`)
        
    }
}