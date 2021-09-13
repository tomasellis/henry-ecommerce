import { PRODUCTS_ACTIONS } from "../actions/products/productActions"

const initialState = {
  product: [],
  options: [],
  productsInCartByUser: [],
  articles: {
    products: [],
    next: []
  },
  cart: localStorage.cartStorage ? JSON.parse(localStorage.cartStorage) : [],
  idsInCart: localStorage.idsInCartStorage ? JSON.parse(localStorage.idsInCartStorage) : [],
  searchArticles: []
}

export const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case PRODUCTS_ACTIONS.BRING_CLOTHER:
      return {
        ...state,
        articles: {
          products: payload.data.products,
          next:payload.next.products
        }
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
      localStorage.cartStorage = JSON.stringify([...state.cart, payload])
      localStorage.idsInCartStorage = JSON.stringify([...state.idsInCart, payload.id])
      return {
        ...state,
        cart: [...state.cart, payload],
        idsInCart: [...state.idsInCart, payload.id]
      }

    case 'REMOVE_FROM_CART':
      const cartFiltered = state.cart.filter(product => product.id !== payload)
      const idsFiltered = state.idsInCart.filter(product => product !== payload)
      localStorage.cartStorage = JSON.stringify(cartFiltered)
      localStorage.idsInCartStorage = JSON.stringify(idsFiltered)
      return {
        ...state,
        cart: cartFiltered,
        idsInCart: idsFiltered
      }

    case 'UPDATE_QUANTITY':
      // eslint-disable-next-line
      state.cart.some(product => {
        if(product.id_option === payload.id_option){
          product.quantity = payload.quantity
          return true
        }
      })
      localStorage.cartStorage = JSON.stringify(state.cart)
      return state

    case 'SEARCH_ARTICLES':
      return{
        ...state,
        searchArticles : payload.fuzzy_search
      }

    default:
      return state
  }
}
