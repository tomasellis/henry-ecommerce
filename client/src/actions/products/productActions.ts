import axios from "axios";

export const PRODUCTS_ACTIONS = {
    BRING_CLOTHER: "BRING_CLOTHER",
}


export const getArticles = (gender : any,category : any,less_than : any,greater_than : any,color : any,size : any) => async (dispatch : any) =>{
    try{
        
        let res = await axios.get(`http://localhost:4000/products?gender=${gender || ''}&category=${category || ''}&less_than=${ less_than || ''}&greater_than=${ greater_than || ''}&color=${ color || ''}&size=${size || ''}`)
        
        dispatch({
            type: PRODUCTS_ACTIONS.BRING_CLOTHER,
            payload: res.data.products
        })
        
    }catch(error){
        console.log(error)
    }
}