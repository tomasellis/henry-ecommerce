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

export const getArticles = (gender : any,category : any,less_than : any,greater_than : any,color : any,size : any) => async (dispatch : any) =>{
    try{
        let res = await axios.get(`http://localhost:4000/products?${
            gender !== undefined ? `gender=${gender}` : ""}&${
            category !== undefined ? `category=${category}` : ""}&${
            less_than !== undefined ? `less_than=${less_than}` : ""}&${
            greater_than !== undefined ? `greater_than=${greater_than}` : ""}&${
            color !== undefined ? `color=${color}` : ""}&${
            size !== undefined ? `size=${size}` : ""} 
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
};

export const getArticle =  () => {
        return async function(dispatch:any) {
            const res = await axios.get('http://localhost:4000/products');            
            return dispatch({
                type: 'articles',
                payload : res
            })
        }
    }
