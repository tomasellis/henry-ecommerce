import { PRODUCTS_ACTIONS } from "../actions/products/productActions"

const initialState = {
  articles: []
}

export const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      console.log('AAAAAAAA',state.articles);
      return{
        ...state,
        articles: payload
      }
    
      default: 
        return state
  }
}