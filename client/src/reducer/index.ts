import { PRODUCTS_ACTIONS } from "../actions/products/productActions"

const initialState = {
  product: [],
  options: [],
  productsInCartByUser: [],
  articles: [],
  cart: [],
  idsInCart: []
}

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      return {
        ...state,
        articles: payload
      }
    case "GET_PRODUCT_INFO":
      return {
        ...state,
        product: payload
      }
    case "GET_OPTIONS":
      return {
        ...state,
        options: payload
      }
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, payload],
        idsInCart: [...state.idsInCart, payload.id_option]
      }

    case 'REMOVE_FROM_CART':
      const cartFiltered = state.cart.filter(product => product.id_option !== payload)
      const idsFiltered = state.idsInCart.filter(product => product !== payload)
      return {
        ...state,
        cart: cartFiltered,
        idsInCart: idsFiltered
      }

    case 'UPDATE_QUANTITY':
      state.cart.some(product => {
        if(product.id_option === payload.id_option){
          product.quantity = payload.quantity
          return true
        }
      })
      return state

    default:
      return state
  }
}


