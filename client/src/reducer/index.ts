import { PRODUCTS_ACTIONS } from "../actions/products/productActions"

const initialState = {
  articles: [],
  products: []
}

export const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      console.log(state.articles);
      return{
        ...state,
        articles: payload
      };
    case 'articles' : 
    return {
      ...state,
      products : payload
    }
      default: 
        return state
  }
}