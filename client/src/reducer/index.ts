import { PRODUCTS_ACTIONS } from "../actions/products/productActions"

const initialState = {
  product: [],
  options: [],
  productsInCartByUser:[],
  articles:{
    products: [],
    next: []
  }
}

export const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      return{
        ...state,
        articles: {
          products: payload.data.products,
          next:payload.next.products
        }
      }
      case "GET_PRODUCT_INFO":
        return {
          ...state,
          product:payload
        }
      case "GET_OPTIONS":
        return {
          ...state,
          options:payload
        }


      default:
        return state
  }
}
