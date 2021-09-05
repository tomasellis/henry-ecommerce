import axios from "axios";
// import { Dispatch } from "redux";

export const PRODUCTS_ACTIONS = {
    BRING_CLOTHER: "BRING_CLOTHER",
}



// export function getArticles(gender,category,less_than,greater_than,color,size){
    //     return async (dispatch: Dispatch) => {
        //         const products = await axios.get(`${url}${
        //                 gender !== undefined ? `gender=${gender}` : "nada"
        //             }&${category !== undefined ? `category=${category}` : "nada"
        // }&${less_than !== undefined ? `less_than=${less_than}` : "nada"
        // }&${greater_than !== undefined ? `greater_than=${greater_than}` : "nada"
        // }&${color !== undefined ? `color=${color}` : "nada"
        // }&${size !== undefined ? `size=${size}` : "nada"}`)
        
//     }
// }

// const URL:string = `http://localhost:4000/products?`;

export const getArticles = (gender,category,less_than,greater_than,color,size) => async (dispatch) =>{
    try{
        let res = await axios.get(`http://localhost:4000/products?${
            gender !== undefined ? `gender=${gender}` : null}&${
            category !== undefined ? `category=${category}` : null}&${
            less_than !== undefined ? `less_than=${less_than}` : null}&${
            greater_than !== undefined ? `greater_than=${greater_than}` : null}&${
            color !== undefined ? `color=${color}` : null}&${
            size !== undefined ? `size=${size}` : null} 
        `)
        // let result = res.data;
        dispatch({
            type: PRODUCTS_ACTIONS.BRING_CLOTHER,
            payload: res,
            // payload: result.data
        })
    }catch(error){
        console.log(error)
    }
}