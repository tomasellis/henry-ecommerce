import { PRODUCTS_ACTIONS } from "../actions/products/productActions"


const initialState = {

}

export default function rootReducer(state = initialState, action) {

  switch(action.type){
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      return {
        ...state,
        
      }
    
    default:
      return state
  }
}